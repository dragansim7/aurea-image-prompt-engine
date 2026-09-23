import { nameColor, rgbToHex } from "@/lib/color";
import type { Measured, Swatch } from "@/lib/types";

const ACCEPT = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export class ImageReadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ImageReadError";
  }
}

export type PreparedImage = {
  fileName: string;
  objectUrl: string;
  width: number;
  height: number;
  measured: Measured;
  jpegBase64: string;
  thumb: string;
};

export function assertImageFile(file: File) {
  const named = /\.(jpe?g|png|webp|gif)$/i.test(file.name);
  if (!ACCEPT.has(file.type) && !named) {
    throw new ImageReadError("Use a JPEG, PNG, WebP, or GIF from this device.");
  }
  if (file.type === "image/svg+xml" || /\.svg$/i.test(file.name)) {
    throw new ImageReadError("SVG files are not supported. Export a PNG or JPEG instead.");
  }
  if (file.size > 25 * 1024 * 1024) {
    throw new ImageReadError("That file is over 25 MB. Choose a smaller image.");
  }
}

function drawCover(source: CanvasImageSource, sw: number, sh: number, max: number) {
  const scale = Math.min(1, max / Math.max(sw, sh));
  const w = Math.max(1, Math.round(sw * scale));
  const h = Math.max(1, Math.round(sh * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new ImageReadError("This browser could not read the image.");
  ctx.drawImage(source, 0, 0, w, h);
  return { canvas, ctx, w, h };
}

function sample(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const data = ctx.getImageData(0, 0, w, h).data;
  const step = Math.max(1, Math.floor(Math.sqrt((w * h) / 5000)));
  const buckets = new Map<string, { r: number; g: number; b: number; n: number }>();
  let lumSum = 0;
  let lumSq = 0;
  let n = 0;
  let edgeSum = 0;
  let edgeN = 0;
  const cells = Array.from({ length: 9 }, () => ({ lum: 0, n: 0 }));
  const lumAt = (x: number, y: number) => {
    const i = (y * w + x) * 4;
    return (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
  };

  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const i = (y * w + x) * 4;
      const a = data[i + 3];
      if (a < 180) continue;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      lumSum += lum;
      lumSq += lum * lum;
      n++;
      const cx = Math.min(2, Math.floor((x / w) * 3));
      const cy = Math.min(2, Math.floor((y / h) * 3));
      const cell = cells[cy * 3 + cx];
      cell.lum += lum;
      cell.n++;
      const key = `${Math.round(r / 24)},${Math.round(g / 24)},${Math.round(b / 24)}`;
      const bucket = buckets.get(key) ?? { r: 0, g: 0, b: 0, n: 0 };
      bucket.r += r;
      bucket.g += g;
      bucket.b += b;
      bucket.n++;
      buckets.set(key, bucket);
      if (x + step < w && y + step < h) {
        const dx = Math.abs(lum - lumAt(Math.min(w - 1, x + step), y));
        const dy = Math.abs(lum - lumAt(x, Math.min(h - 1, y + step)));
        edgeSum += dx + dy;
        edgeN++;
      }
    }
  }

  const luminance = n ? lumSum / n : 0;
  const variance = n ? Math.max(0, lumSq / n - luminance * luminance) : 0;
  const contrast = Math.sqrt(variance);
  const edge = edgeN ? edgeSum / edgeN : 0;
  const cellLum = cells.map((c) => (c.n ? c.lum / c.n : luminance));
  return { buckets, luminance, contrast, edge, cellLum, n };
}

function paletteFrom(buckets: Map<string, { r: number; g: number; b: number; n: number }>): Swatch[] {
  const ranked = [...buckets.values()].sort((a, b) => b.n - a.n);
  const picked: Swatch[] = [];
  let total = 0;
  for (const bucket of ranked) {
    if (picked.length >= 6) break;
    const hex = rgbToHex(bucket.r / bucket.n, bucket.g / bucket.n, bucket.b / bucket.n);
    const twin = picked.find((swatch) => colorDistance(swatch.hex, hex) < 28);
    if (twin) {
      twin.weight += bucket.n;
    } else {
      picked.push({ hex, name: nameColor(hex), weight: bucket.n });
    }
    total += bucket.n;
  }
  return picked
    .map((swatch) => ({ ...swatch, weight: total ? swatch.weight / total : 0 }))
    .sort((a, b) => b.weight - a.weight);
}

function colorDistance(a: string, b: string) {
  const parse = (hex: string) => {
    const h = hex.replace("#", "");
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  };
  const pa = parse(a);
  const pb = parse(b);
  return Math.hypot(pa[0] - pb[0], pa[1] - pb[1], pa[2] - pb[2]);
}

function frameNote(cells: number[]): string {
  const labels = [
    "upper left",
    "upper center",
    "upper right",
    "middle left",
    "center",
    "middle right",
    "lower left",
    "lower center",
    "lower right",
  ];
  let max = 0;
  let min = 0;
  cells.forEach((value, index) => {
    if (value > cells[max]) max = index;
    if (value < cells[min]) min = index;
  });
  const spread = cells[max] - cells[min];
  if (spread < 0.08) return "Tonal weight is spread fairly evenly across the frame.";
  return `The brightest weight sits in the ${labels[max]}. The darkest passage is ${labels[min]}.`;
}

export function describeMeasured(partial: {
  width: number;
  height: number;
  luminance: number;
  contrast: number;
  edge: number;
  palette: Swatch[];
  frame: string;
}): Measured {
  const light =
    partial.luminance < 0.28
      ? "Low key. Most of the frame sits in shadow."
      : partial.luminance > 0.72
        ? "High key. The frame is bright overall."
        : "Mid key. Highlights and shadows share the frame.";
  const contrastNote =
    partial.contrast < 0.1
      ? "Tonal range is compressed."
      : partial.contrast > 0.22
        ? "Tonal range is wide."
        : "Contrast is moderate.";
  const detail =
    partial.edge < 0.045
      ? "Surfaces read as soft or very smooth."
      : partial.edge > 0.14
        ? "Edges are crisp, with fine local detail."
        : "Surface detail is moderate.";
  return {
    width: partial.width,
    height: partial.height,
    palette: partial.palette,
    luminance: partial.luminance,
    contrast: partial.contrast,
    edge: partial.edge,
    light,
    contrastNote,
    frame: partial.frame,
    detail,
  };
}

export async function prepareImage(file: File): Promise<PreparedImage> {
  assertImageFile(file);
  const bitmap = await createImageBitmap(file).catch(() => {
    throw new ImageReadError("This image could not be decoded. Try another file.");
  });
  try {
    if (bitmap.width < 8 || bitmap.height < 8) {
      throw new ImageReadError("That image is too small to read.");
    }
    const analysis = drawCover(bitmap, bitmap.width, bitmap.height, 1024);
    const sampled = sample(analysis.ctx, analysis.w, analysis.h);
    if (!sampled.n) throw new ImageReadError("The image has no visible pixels.");
    const palette = paletteFrom(sampled.buckets);
    const measured = describeMeasured({
      width: bitmap.width,
      height: bitmap.height,
      luminance: sampled.luminance,
      contrast: sampled.contrast,
      edge: sampled.edge,
      palette,
      frame: frameNote(sampled.cellLum),
    });
    const jpegBase64 = analysis.canvas.toDataURL("image/jpeg", 0.82).split(",")[1] ?? "";
    if (jpegBase64.length < 32 || jpegBase64.length > 2_400_000) {
      throw new ImageReadError("The image could not be prepared for reading. Try a simpler file.");
    }
    const thumbCanvas = drawCover(bitmap, bitmap.width, bitmap.height, 280).canvas;
    const thumb = thumbCanvas.toDataURL("image/jpeg", 0.72);
    return {
      fileName: file.name || "image",
      objectUrl: URL.createObjectURL(file),
      width: bitmap.width,
      height: bitmap.height,
      measured,
      jpegBase64,
      thumb,
    };
  } finally {
    bitmap.close();
  }
}
