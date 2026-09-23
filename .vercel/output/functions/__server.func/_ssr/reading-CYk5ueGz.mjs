//#region node_modules/.nitro/vite/services/ssr/assets/reading-CYk5ueGz.js
var EMPTY = {
	text: "",
	confidence: "low",
	source: "inferred"
};
function isConfidence(value) {
	return value === "high" || value === "medium" || value === "low";
}
function isSource(value) {
	return value === "observed" || value === "inferred";
}
function asFinding(value, fallback = EMPTY) {
	if (!value || typeof value !== "object") return fallback;
	const record = value;
	const text = typeof record.text === "string" ? record.text.trim().slice(0, 420) : "";
	if (!text) return fallback;
	return {
		text,
		confidence: isConfidence(record.confidence) ? record.confidence : "medium",
		source: isSource(record.source) ? record.source : "inferred"
	};
}
function asObjects(value) {
	if (!Array.isArray(value)) return [];
	return value.map((item) => {
		if (!item || typeof item !== "object") return null;
		const record = item;
		const name = typeof record.name === "string" ? record.name.trim().slice(0, 60) : "";
		if (!name) return null;
		return {
			name,
			confidence: isConfidence(record.confidence) ? record.confidence : "medium"
		};
	}).filter((item) => Boolean(item)).slice(0, 8);
}
function asNotes(value) {
	if (!Array.isArray(value)) return [];
	return value.map((item) => asFinding(item)).filter((item) => item.text).slice(0, 4);
}
function asLines(value) {
	if (!Array.isArray(value)) return [];
	return value.filter((item) => typeof item === "string" && item.trim().length > 0).map((item) => item.trim().slice(0, 180)).slice(0, 6);
}
function parseVision(raw) {
	if (!raw || typeof raw !== "object") return null;
	const record = raw;
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
		uncertainties: asLines(record.uncertainties)
	};
}
function localQuality(measured) {
	const notes = [];
	if (measured.width * measured.height / 1e6 < .35) notes.push({
		text: "The source is small, so fine detail is limited.",
		confidence: "high",
		source: "observed"
	});
	const ratio = measured.width / measured.height;
	if (ratio > 2.15 || ratio < .46) notes.push({
		text: "The frame is strongly wide or strongly tall.",
		confidence: "high",
		source: "observed"
	});
	notes.push({
		text: measured.detail,
		confidence: "medium",
		source: "observed"
	});
	return notes;
}
function measuredReading(measured) {
	return {
		mode: "measured",
		subject: {
			text: "Subject not identified from pixels alone.",
			confidence: "low",
			source: "inferred"
		},
		scene: {
			text: "Setting not identified from pixels alone.",
			confidence: "low",
			source: "inferred"
		},
		objects: [],
		composition: {
			text: measured.frame,
			confidence: "medium",
			source: "observed"
		},
		lighting: {
			text: `${measured.light} ${measured.contrastNote}`,
			confidence: "high",
			source: "observed"
		},
		texture: {
			text: measured.detail,
			confidence: "medium",
			source: "observed"
		},
		mood: {
			text: "Mood was not inferred.",
			confidence: "low",
			source: "inferred"
		},
		style: {
			text: "Style was not inferred.",
			confidence: "low",
			source: "inferred"
		},
		camera: {
			text: "Camera character was not inferred.",
			confidence: "low",
			source: "inferred"
		},
		materials: {
			text: "Materials were not identified.",
			confidence: "low",
			source: "inferred"
		},
		qualityNotes: localQuality(measured),
		visibleText: "",
		uncertainties: ["Subject, setting, and materials need a vision reading."]
	};
}
function visionReading(fields, measured) {
	const local = localQuality(measured);
	const merged = [...fields.qualityNotes];
	for (const note of local) if (!merged.some((item) => item.text === note.text)) merged.push(note);
	return {
		mode: "vision",
		...fields,
		lighting: fields.lighting.text ? fields.lighting : {
			text: `${measured.light} ${measured.contrastNote}`,
			confidence: "high",
			source: "observed"
		},
		composition: fields.composition.text ? fields.composition : {
			text: measured.frame,
			confidence: "medium",
			source: "observed"
		},
		qualityNotes: merged.slice(0, 5)
	};
}
//#endregion
export { parseVision as n, visionReading as r, measuredReading as t };
