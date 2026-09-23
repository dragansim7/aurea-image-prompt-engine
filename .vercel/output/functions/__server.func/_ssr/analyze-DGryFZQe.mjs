import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { n as parseVision } from "./reading-CYk5ueGz.mjs";
import { a as string, i as object, r as number, t as array } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analyze-DGryFZQe.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var Input = object({
	imageBase64: string().min(100).max(24e5),
	width: number().int().positive().max(2e4),
	height: number().int().positive().max(2e4),
	palette: array(string().regex(/^#[0-9a-fA-F]{6}$/)).max(6),
	light: string().max(240),
	contrastNote: string().max(240)
});
var recent = [];
function allowCall() {
	const now = Date.now();
	while (recent.length && now - recent[0] > 6e4) recent.shift();
	if (recent.length >= 8) return false;
	recent.push(now);
	return true;
}
var INSTRUCTIONS = `You are a careful visual analyst for a prompt studio. Study the image and return only JSON, no markdown.
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
function extractText(body) {
	if (!body || typeof body !== "object") return "";
	const record = body;
	if (typeof record.output_text === "string" && record.output_text.trim()) return record.output_text;
	if (Array.isArray(record.output)) {
		const chunks = [];
		for (const item of record.output) {
			if (!item || typeof item !== "object") continue;
			const content = item.content;
			if (!Array.isArray(content)) continue;
			for (const part of content) if (part && typeof part === "object" && typeof part.text === "string") chunks.push(part.text);
		}
		if (chunks.length) return chunks.join("\n");
	}
	if (Array.isArray(record.choices)) {
		const message = record.choices[0]?.message;
		if (typeof message?.content === "string") return message.content;
	}
	return "";
}
function extractJson(text) {
	const source = text.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1] ?? text;
	const start = source.indexOf("{");
	const end = source.lastIndexOf("}");
	if (start < 0 || end <= start) throw new Error("The reading was not structured JSON.");
	return JSON.parse(source.slice(start, end + 1));
}
async function postJson(url, apiKey, body) {
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify(body),
		signal: AbortSignal.timeout(75e3)
	});
	const raw = await res.text();
	return {
		ok: res.ok,
		status: res.status,
		raw
	};
}
var visionStatus_createServerFn_handler = createServerRpc({
	id: "f1f986b271d260c920985d4e870337bbc7d9a19967abcc96881afc56d730f622",
	name: "visionStatus",
	filename: "src/lib/analyze.ts"
}, (opts) => visionStatus.__executeServer(opts));
var visionStatus = createServerFn({ method: "GET" }).handler(visionStatus_createServerFn_handler, async () => {
	return { available: Boolean(process.env.XAI_API_KEY) };
});
var analyzeImage_createServerFn_handler = createServerRpc({
	id: "b7c56c215f1af8bd4ed0879d22e803276cb9843919d91f2f7534e58b54d3e3d3",
	name: "analyzeImage",
	filename: "src/lib/analyze.ts"
}, (opts) => analyzeImage.__executeServer(opts));
var analyzeImage = createServerFn({ method: "POST" }).validator((input) => Input.parse(input)).handler(analyzeImage_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Vision reading is unavailable in this session.",
		unavailable: true
	};
	if (!allowCall()) return {
		ok: false,
		error: "Too many readings in a short time. Wait a minute and try again."
	};
	const note = `Measured context: ${data.width}×${data.height}. Light: ${data.light} ${data.contrastNote}. Dominant colors: ${data.palette.join(", ") || "unknown"}.`;
	const imageUrl = `data:image/jpeg;base64,${data.imageBase64}`;
	const responses = await postJson("https://api.x.ai/v1/responses", apiKey, {
		model: "grok-4.7",
		input: [{
			role: "user",
			content: [{
				type: "input_image",
				image_url: imageUrl,
				detail: "high"
			}, {
				type: "input_text",
				text: `${INSTRUCTIONS}\n\n${note}`
			}]
		}]
	});
	let payload = responses;
	if (!responses.ok && (responses.status === 400 || responses.status === 404 || responses.status === 422)) payload = await postJson("https://api.x.ai/v1/chat/completions", apiKey, {
		model: "grok-4.5",
		temperature: .2,
		max_tokens: 1400,
		messages: [{
			role: "user",
			content: [{
				type: "text",
				text: `${INSTRUCTIONS}\n\n${note}`
			}, {
				type: "image_url",
				image_url: { url: imageUrl }
			}]
		}]
	});
	if (payload.status === 429) return {
		ok: false,
		error: "Vision is busy right now. Try again in a moment."
	};
	if (!payload.ok) return {
		ok: false,
		error: "The reading failed before a description came back."
	};
	let parsedBody;
	try {
		parsedBody = JSON.parse(payload.raw);
	} catch {
		return {
			ok: false,
			error: "The reading came back in an unexpected form."
		};
	}
	const text = extractText(parsedBody);
	if (!text.trim()) return {
		ok: false,
		error: "The reading was empty. Try again."
	};
	try {
		const fields = parseVision(extractJson(text));
		if (!fields) return {
			ok: false,
			error: "The reading did not include a usable subject or scene."
		};
		return {
			ok: true,
			fields
		};
	} catch {
		return {
			ok: false,
			error: "The reading could not be parsed. Try again."
		};
	}
});
//#endregion
export { analyzeImage_createServerFn_handler, visionStatus_createServerFn_handler };
