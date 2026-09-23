import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { parseVision } from "@/lib/reading";
import type { VisionFields } from "@/lib/types";

const Input = z.object({
  imageBase64: z.string().min(100).max(2_400_000),
  width: z.number().int().positive().max(20000),
  height: z.number().int().positive().max(20000),
  palette: z.array(z.string().regex(/^#[0-9a-fA-F]{6}$/)).max(6),
  light: z.string().max(240),
  contrastNote: z.string().max(240),
});

export type AnalyzeResult =
  | { ok: true; fields: VisionFields }
  | { ok: false; error: string; unavailable?: boolean };

const recent: number[] = [];

function allowCall(): boolean {
  const now = Date.now();
  while (recent.length && now - recent[0] > 60_000) recent.shift();
  if (recent.length >= 8) return false;
  recent.push(now);
  return true;
}

const INSTRUCTIONS = `You are a careful visual analyst for a prompt studio. Study the image and return only JSON, no markdown.
Separate what is directly visible from stylistic inference. If you are unsure, set confidence to "low" and say so in uncertainties. Never invent people, brands, logos, or readable text. Do not name an exact camera body unless the evidence is strong, and then mark source as "inferred".
Write each text field as a direct phrase with no hedging words like "possibly" — the app adds hedges from confidence.
Measured notes from the file are context, not a substitute for looking. Do not contradict obvious color or brightness.

Schema:
{
  "subject": { "text": "", "confidence": "high"|"medium"|"low", "source": "observed"|"inferred" },
  "scene": { "text": "", "confidence": "high"|"medium"|"low", "source": "observed"|"inferred" },
  "objects": [{ "name": "", "confidence": "high"|"medium"|"low" }],
  "composition": { "text": "", "confidence": "high"|"medium"|"low", "source": "observed"|"inferred" },
  "lighting": { "text": "", "confidence": "high"|"medium"|"low", "source": "observed"|"inferred" },
  "texture": { "text": "", "confidence": "high"|"medium"|"low", "source": "observed"|"inferred" },
  "mood": { "text": "", "confidence": "high"|"medium"|"low", "source": "inferred" },
  "style": { "text": "", "confidence": "high"|"medium"|"low", "source": "inferred" },
  "camera": { "text": "", "confidence": "high"|"medium"|"low", "source": "inferred" },
  "materials": { "text": "", "confidence": "high"|"medium"|"low", "source": "observed"|"inferred" },
  "qualityNotes": [{ "text": "", "confidence": "high"|"medium"|"low", "source": "observed" }],
  "visibleText": "",
  "uncertainties": [""]
}

Rules:
- subject, scene, lighting, texture, materials, composition: prefer source "observed".
- mood, style, camera: source "inferred".
- qualityNotes describe the source image (soft focus, crop, noise), not a wish list for a generator. Max 4.
- objects: concrete visible things, max 8, short names.
- visibleText: exact readable text only, or an empty string. This is the OCR field.
- uncertainties: short lines, max 5, or an empty array.
- Keep every text field to one or two sentences.`;

function extractText(body: unknown): string {
  if (!body || typeof body !== "object") return "";
  const record = body as Record<string, unknown>;
  if (typeof record.output_text === "string" && record.output_text.trim()) return record.output_text;
  if (Array.isArray(record.output)) {
    const chunks: string[] = [];
    for (const item of record.output) {
      if (!item || typeof item !== "object") continue;
      const content = (item as { content?: unknown }).content;
      if (!Array.isArray(content)) continue;
      for (const part of content) {
        if (part && typeof part === "object" && typeof (part as { text?: string }).text === "string") {
          chunks.push((part as { text: string }).text);
        }
      }
    }
    if (chunks.length) return chunks.join("\n");
  }
  if (Array.isArray(record.choices)) {
    const message = (record.choices[0] as { message?: { content?: unknown } } | undefined)?.message;
    if (typeof message?.content === "string") return message.content;
  }
  return "";
}

function extractJson(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const source = fenced?.[1] ?? text;
  const start = source.indexOf("{");
  const end = source.lastIndexOf("}");
  if (start < 0 || end <= start) throw new Error("The reading was not structured JSON.");
  return JSON.parse(source.slice(start, end + 1));
}

async function postJson(url: string, apiKey: string, body: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(75_000),
  });
  const raw = await res.text();
  return { ok: res.ok, status: res.status, raw };
}

export const visionStatus = createServerFn({ method: "GET" }).handler(async () => {
  return { available: Boolean(process.env.XAI_API_KEY) };
});

export const analyzeImage = createServerFn({ method: "POST" })
  .validator((input: unknown) => Input.parse(input))
  .handler(async ({ data }): Promise<AnalyzeResult> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false, error: "Vision reading is unavailable in this session.", unavailable: true };
    }
    if (!allowCall()) {
      return { ok: false, error: "Too many readings in a short time. Wait a minute and try again." };
    }

    const note = `Measured context: ${data.width}×${data.height}. Light: ${data.light} ${data.contrastNote}. Dominant colors: ${data.palette.join(", ") || "unknown"}.`;
    const imageUrl = `data:image/jpeg;base64,${data.imageBase64}`;

    const responses = await postJson("https://api.x.ai/v1/responses", apiKey, {
      model: "grok-4.7",
      input: [
        {
          role: "user",
          content: [
            { type: "input_image", image_url: imageUrl, detail: "high" },
            { type: "input_text", text: `${INSTRUCTIONS}\n\n${note}` },
          ],
        },
      ],
    });

    let payload = responses;
    if (!responses.ok && (responses.status === 400 || responses.status === 404 || responses.status === 422)) {
      payload = await postJson("https://api.x.ai/v1/chat/completions", apiKey, {
        model: "grok-4.5",
        temperature: 0.2,
        max_tokens: 1400,
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: `${INSTRUCTIONS}\n\n${note}` },
              { type: "image_url", image_url: { url: imageUrl } },
            ],
          },
        ],
      });
    }

    if (payload.status === 429) {
      return { ok: false, error: "Vision is busy right now. Try again in a moment." };
    }
    if (!payload.ok) {
      return { ok: false, error: "The reading failed before a description came back." };
    }

    let parsedBody: unknown;
    try {
      parsedBody = JSON.parse(payload.raw);
    } catch {
      return { ok: false, error: "The reading came back in an unexpected form." };
    }
    const text = extractText(parsedBody);
    if (!text.trim()) {
      return { ok: false, error: "The reading was empty. Try again." };
    }
    try {
      const fields = parseVision(extractJson(text));
      if (!fields) return { ok: false, error: "The reading did not include a usable subject or scene." };
      return { ok: true, fields };
    } catch {
      return { ok: false, error: "The reading could not be parsed. Try again." };
    }
  });
