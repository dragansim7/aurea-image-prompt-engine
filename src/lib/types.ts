export type Confidence = "high" | "medium" | "low";
export type Source = "observed" | "inferred";

export type Finding = {
  text: string;
  confidence: Confidence;
  source: Source;
};

export type Swatch = {
  hex: string;
  name: string;
  weight: number;
};

export type Measured = {
  width: number;
  height: number;
  palette: Swatch[];
  luminance: number;
  contrast: number;
  edge: number;
  light: string;
  contrastNote: string;
  frame: string;
  detail: string;
};

export type VisionFields = {
  subject: Finding;
  scene: Finding;
  objects: { name: string; confidence: Confidence }[];
  composition: Finding;
  lighting: Finding;
  texture: Finding;
  mood: Finding;
  style: Finding;
  camera: Finding;
  materials: Finding;
  qualityNotes: Finding[];
  visibleText: string;
  uncertainties: string[];
};

export type Reading = VisionFields & {
  mode: "vision" | "measured";
};

export type PresetId =
  | "cinematic"
  | "editorial"
  | "photorealistic"
  | "product"
  | "concept"
  | "minimalist"
  | "fantasy"
  | "luxury";

export type PromptLength = "brief" | "standard" | "extended";
export type DetailLevel = "lean" | "balanced" | "exhaustive";
export type OutputFormat = "paragraph" | "comma" | "template";
export type ThemeMode = "dark" | "light" | "system";
export type TextSize = "sm" | "md" | "lg";
export type PreviewFit = "contain" | "cover";

export type Settings = {
  theme: ThemeMode;
  length: PromptLength;
  detail: DetailLevel;
  creativity: number;
  format: OutputFormat;
  autoCopy: boolean;
  textSize: TextSize;
  accessibility: boolean;
  previewFit: PreviewFit;
  includeNegative: boolean;
  preset: PresetId;
};

export type HistoryItem = {
  id: string;
  createdAt: number;
  fileName: string;
  thumb: string;
  width: number;
  height: number;
  reading: Reading;
  measured: Measured;
  prompt: string;
  negative: string;
  favorite: boolean;
  preset: PresetId;
  format: OutputFormat;
};

export const defaultSettings: Settings = {
  theme: "dark",
  length: "standard",
  detail: "balanced",
  creativity: 42,
  format: "paragraph",
  autoCopy: false,
  textSize: "md",
  accessibility: false,
  previewFit: "contain",
  includeNegative: false,
  preset: "photorealistic",
};
