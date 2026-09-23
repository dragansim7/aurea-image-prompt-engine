export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const c = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

export function nameColor(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2 / 255;
  const s = max === min ? 0 : (max - min) / (255 - Math.abs(max + min - 255));
  let h = 0;
  if (max !== min) {
    const d = max - min;
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  if (s < 0.12) {
    if (l < 0.12) return "Ink";
    if (l < 0.28) return "Charcoal";
    if (l < 0.45) return "Slate";
    if (l < 0.62) return "Stone";
    if (l < 0.82) return "Parchment";
    return "Paper";
  }
  const tone = l < 0.32 ? "Deep " : l > 0.78 ? "Pale " : "";
  const hue =
    h < 16 || h >= 348
      ? "rose"
      : h < 42
        ? "clay"
        : h < 70
          ? "sand"
          : h < 95
            ? "olive"
            : h < 160
              ? "moss"
              : h < 200
                ? "teal"
                : h < 250
                  ? "slate blue"
                  : h < 295
                    ? "indigo"
                    : "plum";
  const named = `${tone}${hue}`;
  return named.charAt(0).toUpperCase() + named.slice(1);
}
