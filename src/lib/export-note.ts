import type { HistoryItem, Measured, Reading } from "@/lib/types";

function findingLine(label: string, text: string, confidence: string, source: string) {
  if (!text) return "";
  return `- ${label}: ${text} (${source}, ${confidence})`;
}

export function toPlain(item: Pick<HistoryItem, "fileName" | "prompt" | "negative" | "reading">): string {
  const blocks = [item.prompt.trim()];
  if (item.negative.trim()) blocks.push("", "Negative", item.negative.trim());
  if (item.reading.visibleText) blocks.push("", "Visible text", item.reading.visibleText);
  blocks.push("", `Source file: ${item.fileName}`);
  return blocks.join("\n");
}

export function toMarkdown(item: Pick<HistoryItem, "fileName" | "prompt" | "negative" | "reading" | "measured" | "createdAt">): string {
  const reading: Reading = item.reading;
  const measured: Measured = item.measured;
  const lines = [
    `# Aurea Vision`,
    ``,
    `File: ${item.fileName}`,
    `Frame: ${measured.width} × ${measured.height}`,
    `Saved: ${new Date(item.createdAt).toLocaleString()}`,
    `Reading: ${reading.mode === "vision" ? "Vision" : "Measured only"}`,
    ``,
    `## Prompt`,
    ``,
    item.prompt.trim() || "_No prompt._",
    ``,
  ];
  if (item.negative.trim()) {
    lines.push(`## Negative`, ``, item.negative.trim(), ``);
  }
  lines.push(`## Findings`, ``);
  const rows: [string, { text: string; confidence: string; source: string }][] = [
    ["Subject", reading.subject],
    ["Scene", reading.scene],
    ["Lighting", reading.lighting],
    ["Materials", reading.materials],
    ["Texture", reading.texture],
    ["Composition", reading.composition],
    ["Camera", reading.camera],
    ["Mood", reading.mood],
    ["Style", reading.style],
  ];
  for (const [label, finding] of rows) {
    const line = findingLine(label, finding.text, finding.confidence, finding.source);
    if (line) lines.push(line);
  }
  if (reading.objects.length) {
    lines.push(`- Objects: ${reading.objects.map((object) => `${object.name} (${object.confidence})`).join(", ")}`);
  }
  if (measured.palette.length) {
    lines.push(`- Palette: ${measured.palette.map((swatch) => `${swatch.name} ${swatch.hex}`).join(", ")}`);
  }
  if (reading.visibleText) lines.push(`- Visible text: ${reading.visibleText}`);
  if (reading.qualityNotes.length) {
    lines.push(``, `## Quality notes`, ``);
    reading.qualityNotes.forEach((note) => lines.push(`- ${note.text}`));
  }
  if (reading.uncertainties.length) {
    lines.push(``, `## Uncertainties`, ``);
    reading.uncertainties.forEach((note) => lines.push(`- ${note}`));
  }
  lines.push("");
  return lines.join("\n");
}

export function download(filename: string, contents: string, type: string) {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
