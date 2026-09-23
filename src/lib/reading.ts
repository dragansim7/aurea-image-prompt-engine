import type { Confidence, Finding, Measured, Reading, Source, VisionFields } from "@/lib/types";

const EMPTY: Finding = {
  text: "",
  confidence: "low",
  source: "inferred",
};

function isConfidence(value: unknown): value is Confidence {
  return value === "high" || value === "medium" || value === "low";
}

function isSource(value: unknown): value is Source {
  return value === "observed" || value === "inferred";
}

export function asFinding(value: unknown, fallback = EMPTY): Finding {
  if (!value || typeof value !== "object") return fallback;
  const record = value as Record<string, unknown>;
  const text = typeof record.text === "string" ? record.text.trim().slice(0, 420) : "";
  if (!text) return fallback;
  return {
    text,
    confidence: isConfidence(record.confidence) ? record.confidence : "medium",
    source: isSource(record.source) ? record.source : "inferred",
  };
}

function asObjects(value: unknown): Reading["objects"] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const record = item as Record<string, unknown>;
      const name = typeof record.name === "string" ? record.name.trim().slice(0, 60) : "";
      if (!name) return null;
      return {
        name,
        confidence: isConfidence(record.confidence) ? record.confidence : "medium",
      };
    })
    .filter((item): item is Reading["objects"][number] => Boolean(item))
    .slice(0, 8);
}

function asNotes(value: unknown): Finding[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => asFinding(item))
    .filter((item) => item.text)
    .slice(0, 4);
}

function asLines(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    .map((item) => item.trim().slice(0, 180))
    .slice(0, 6);
}

export function parseVision(raw: unknown): VisionFields | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  const subject = asFinding(record.subject);
  const scene = asFinding(record.scene);
  if (!subject.text && !scene.text) return null;
  return {
    subject,
    scene,
    objects: asObjects(record.objects),
    composition: asFinding(record.composition),
    lighting: asFinding(record.lighting),
    texture: asFinding(record.texture),
    mood: asFinding(record.mood),
    style: asFinding(record.style),
    camera: asFinding(record.camera),
    materials: asFinding(record.materials),
    qualityNotes: asNotes(record.qualityNotes),
    visibleText: typeof record.visibleText === "string" ? record.visibleText.trim().slice(0, 500) : "",
    uncertainties: asLines(record.uncertainties),
  };
}

export function localQuality(measured: Measured): Finding[] {
  const notes: Finding[] = [];
  const megapixels = (measured.width * measured.height) / 1_000_000;
  if (megapixels < 0.35) {
    notes.push({
      text: "The source is small, so fine detail is limited.",
      confidence: "high",
      source: "observed",
    });
  }
  const ratio = measured.width / measured.height;
  if (ratio > 2.15 || ratio < 0.46) {
    notes.push({
      text: "The frame is strongly wide or strongly tall.",
      confidence: "high",
      source: "observed",
    });
  }
  notes.push({
    text: measured.detail,
    confidence: "medium",
    source: "observed",
  });
  return notes;
}

export function measuredReading(measured: Measured): Reading {
  return {
    mode: "measured",
    subject: {
      text: "Subject not identified from pixels alone.",
      confidence: "low",
      source: "inferred",
    },
    scene: {
      text: "Setting not identified from pixels alone.",
      confidence: "low",
      source: "inferred",
    },
    objects: [],
    composition: {
      text: measured.frame,
      confidence: "medium",
      source: "observed",
    },
    lighting: {
      text: `${measured.light} ${measured.contrastNote}`,
      confidence: "high",
      source: "observed",
    },
    texture: {
      text: measured.detail,
      confidence: "medium",
      source: "observed",
    },
    mood: {
      text: "Mood was not inferred.",
      confidence: "low",
      source: "inferred",
    },
    style: {
      text: "Style was not inferred.",
      confidence: "low",
      source: "inferred",
    },
    camera: {
      text: "Camera character was not inferred.",
      confidence: "low",
      source: "inferred",
    },
    materials: {
      text: "Materials were not identified.",
      confidence: "low",
      source: "inferred",
    },
    qualityNotes: localQuality(measured),
    visibleText: "",
    uncertainties: ["Subject, setting, and materials need a vision reading."],
  };
}

export function visionReading(fields: VisionFields, measured: Measured): Reading {
  const local = localQuality(measured);
  const merged = [...fields.qualityNotes];
  for (const note of local) {
    if (!merged.some((item) => item.text === note.text)) merged.push(note);
  }
  return {
    mode: "vision",
    ...fields,
    lighting: fields.lighting.text
      ? fields.lighting
      : {
          text: `${measured.light} ${measured.contrastNote}`,
          confidence: "high",
          source: "observed",
        },
    composition: fields.composition.text
      ? fields.composition
      : { text: measured.frame, confidence: "medium", source: "observed" },
    qualityNotes: merged.slice(0, 5),
  };
}
