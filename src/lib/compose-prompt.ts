import { presetById } from "@/lib/presets";
import type { Finding, OutputFormat, Reading, Settings, Swatch } from "@/lib/types";

const PLACEHOLDER = /not identified|not inferred|was not /i;

export function isUseful(finding: Finding | undefined): finding is Finding {
  return Boolean(finding?.text && !PLACEHOLDER.test(finding.text));
}

function clause(text: string): string {
  return text.trim().replace(/\s+/g, " ").replace(/[.!?]+$/, "");
}

function sentence(text: string): string {
  const clean = clause(text);
  if (!clean) return "";
  return `${clean.charAt(0).toUpperCase()}${clean.slice(1)}.`;
}

function phrase(finding: Finding): string {
  const text = clause(finding.text);
  if (!text) return "";
  if (finding.confidence !== "low") return text;
  if (/^(possibly|something like|unidentified|unclear|not )/i.test(text)) return text;
  return `something like ${text}`;
}

function lowerFirst(text: string): string {
  const second = text[1];
  if (text[0] && text[0] === text[0].toUpperCase() && second && second === second.toLowerCase()) {
    return text.charAt(0).toLowerCase() + text.slice(1);
  }
  return text;
}

function paletteLine(swatches: Swatch[]): string {
  const names = [...new Set(swatches.map((swatch) => swatch.name.toLowerCase()))].slice(0, 4);
  if (!names.length) return "";
  if (names.length === 1) return `Palette of ${names[0]}`;
  return `Palette of ${joinList(names)}`;
}

function fitWords(text: string, max: number): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= max) return text.trim();
  const sentences = text.trim().split(/(?<=[.!?])\s+/);
  while (sentences.length > 1 && sentences.join(" ").split(/\s+/).length > max) sentences.pop();
  let out = sentences.join(" ");
  if (out.split(/\s+/).length > max) {
    out = `${out.split(/\s+/).slice(0, max).join(" ").replace(/[,:;]$/, "")}.`;
  }
  return out;
}

function wordBudget(settings: Settings): number {
  const base = settings.length === "brief" ? 58 : settings.length === "extended" ? 210 : 120;
  if (settings.detail === "lean") return Math.round(base * 0.8);
  if (settings.detail === "exhaustive") return Math.round(base * 1.15);
  return base;
}

function collect(reading: Reading, settings: Settings, palette: Swatch[]): string[] {
  const preset = presetById(settings.preset);
  const creativity = settings.creativity;
  const parts: string[] = [];
  const subject = isUseful(reading.subject) ? phrase(reading.subject) : "";
  const lead = creativity < 28 && !preset.stylistic ? "Photograph" : preset.lead;
  if (subject) parts.push(sentence(`${lead} of ${lowerFirst(subject)}`));
  else parts.push(sentence(lead));

  if (isUseful(reading.scene) && settings.detail !== "lean") {
    parts.push(sentence(phrase(reading.scene)));
  } else if (isUseful(reading.scene) && settings.detail === "lean") {
    parts.push(sentence(phrase(reading.scene)));
  }

  if (settings.detail !== "lean" && isUseful(reading.materials)) {
    parts.push(sentence(phrase(reading.materials)));
  }
  if (settings.detail !== "lean" && isUseful(reading.texture)) {
    parts.push(sentence(phrase(reading.texture)));
  }

  if (isUseful(reading.lighting)) parts.push(sentence(phrase(reading.lighting)));

  if (settings.detail !== "lean" && isUseful(reading.composition)) {
    parts.push(sentence(phrase(reading.composition)));
  }
  if ((settings.detail === "exhaustive" || creativity > 62) && isUseful(reading.camera)) {
    parts.push(sentence(phrase(reading.camera)));
  }

  const colors = paletteLine(palette);
  if (colors) parts.push(sentence(colors));

  if (settings.detail === "exhaustive" && reading.objects.length) {
    const names = reading.objects.slice(0, 6).map((object) => {
      return object.confidence === "low" ? `possibly ${object.name}` : object.name;
    });
    parts.push(sentence(`Also visible: ${joinList(names)}`));
  }

  if (creativity > 30 && settings.detail !== "lean" && isUseful(reading.mood)) {
    parts.push(sentence(phrase(reading.mood)));
  }

  if (creativity > 48 && (preset.stylistic || isUseful(reading.style))) {
    const style = isUseful(reading.style) ? phrase(reading.style) : "";
    const voice = creativity > 68 ? preset.voice.slice(0, 3).join(", ") : preset.voice[0];
    const layer = [style, voice].filter(Boolean).join(", ");
    if (layer) parts.push(sentence(`Style direction: ${layer}`));
  }

  return parts.filter(Boolean);
}

function joinList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function paragraph(reading: Reading, settings: Settings, palette: Swatch[]): string {
  return fitWords(collect(reading, settings, palette).join(" "), wordBudget(settings));
}

function comma(reading: Reading, settings: Settings, palette: Swatch[]): string {
  const preset = presetById(settings.preset);
  const tags: string[] = [];
  if (isUseful(reading.subject)) tags.push(phrase(reading.subject));
  if (isUseful(reading.scene)) tags.push(phrase(reading.scene));
  if (isUseful(reading.lighting)) tags.push(phrase(reading.lighting));
  if (settings.detail !== "lean" && isUseful(reading.materials)) tags.push(phrase(reading.materials));
  if (settings.detail !== "lean" && isUseful(reading.texture)) tags.push(phrase(reading.texture));
  if (settings.detail !== "lean" && isUseful(reading.composition)) tags.push(phrase(reading.composition));
  if ((settings.detail === "exhaustive" || settings.creativity > 60) && isUseful(reading.camera)) {
    tags.push(phrase(reading.camera));
  }
  palette.slice(0, 4).forEach((swatch) => tags.push(swatch.name.toLowerCase()));
  if (settings.detail !== "lean") {
    reading.objects.slice(0, settings.detail === "exhaustive" ? 6 : 3).forEach((object) => {
      tags.push(object.confidence === "low" ? `possibly ${object.name}` : object.name);
    });
  }
  if (settings.creativity > 34 && isUseful(reading.mood)) tags.push(phrase(reading.mood));
  if (settings.creativity > 40) tags.push(...preset.voice.slice(0, settings.creativity > 70 ? 4 : 2));
  const unique = [...new Set(tags.map((tag) => tag.toLowerCase()))];
  const cap = settings.length === "brief" ? 10 : settings.length === "extended" ? 24 : 16;
  return unique.slice(0, cap).join(", ");
}

function template(reading: Reading, settings: Settings, palette: Swatch[]): string {
  const preset = presetById(settings.preset);
  const line = (label: string, finding: Finding | null, raw?: string) => {
    const text = raw ?? (finding && isUseful(finding) ? finding.text : "");
    if (!text) return "";
    const mark = finding?.confidence === "low" ? " (uncertain)" : finding?.source === "inferred" ? " (inferred)" : "";
    return `${label}: ${clause(text)}${mark}`;
  };
  const lines = [
    line("Subject", reading.subject),
    line("Scene", reading.scene),
    settings.detail === "lean" ? "" : line("Materials", reading.materials),
    settings.detail === "lean" ? "" : line("Texture", reading.texture),
    line("Lighting", reading.lighting),
    settings.detail === "lean" ? "" : line("Composition", reading.composition),
    settings.detail === "exhaustive" || settings.creativity > 60 ? line("Camera", reading.camera) : "",
    palette.length ? `Palette: ${palette.slice(0, 5).map((swatch) => `${swatch.name} ${swatch.hex}`).join(", ")}` : "",
    settings.detail !== "lean" && reading.objects.length
      ? `Objects: ${reading.objects.map((object) => (object.confidence === "low" ? `${object.name} (uncertain)` : object.name)).join(", ")}`
      : "",
    settings.detail !== "lean" && settings.creativity > 25 ? line("Mood", reading.mood) : "",
    settings.creativity > 45 && isUseful(reading.style) ? line("Observed style cues", reading.style) : "",
    settings.creativity > 35 ? `Direction: ${preset.lead}. ${preset.voice.join(", ")}.` : `Direction: ${preset.lead}.`,
  ];
  if (reading.visibleText && settings.detail === "exhaustive") {
    lines.push(`Visible text: ${reading.visibleText}`);
  }
  return lines.filter(Boolean).join("\n");
}

const SHARED_NEGATIVE = [
  "watermark",
  "logo overlay",
  "misspelled text",
  "extra fingers",
  "distorted anatomy",
  "warped geometry",
];

export function composeNegative(reading: Reading, settings: Settings): string {
  const preset = presetById(settings.preset);
  const tags = [...SHARED_NEGATIVE, ...preset.negative];
  if (!reading.visibleText) tags.push("unwanted text");
  if (reading.mode === "measured") tags.push("invented subject details");
  return [...new Set(tags)].join(", ");
}

export function composePrompt(reading: Reading, settings: Settings, palette: Swatch[]): { prompt: string; negative: string } {
  const prompt =
    settings.format === "comma"
      ? comma(reading, settings, palette)
      : settings.format === "template"
        ? template(reading, settings, palette)
        : paragraph(reading, settings, palette);
  return { prompt, negative: composeNegative(reading, settings) };
}

export function wordCount(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}
