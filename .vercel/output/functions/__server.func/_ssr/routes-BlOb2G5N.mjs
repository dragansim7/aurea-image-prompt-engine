import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { r as visionReading, t as measuredReading } from "./reading-CYk5ueGz.mjs";
import { a as string, i as object, r as number, t as array } from "../_libs/zod.mjs";
import { a as Star, c as Check, n as ZoomOut, o as RotateCcw, r as X, s as Copy, t as ZoomIn } from "../_libs/lucide-react.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider } from "../_libs/@radix-ui/react-slider+[...].mjs";
import { n as SwitchThumb, t as Switch } from "../_libs/radix-ui__react-switch.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BlOb2G5N.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Button = (0, import_react.forwardRef)(function Button({ variant = "quiet", size = "md", className, type = "button", ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		ref,
		type,
		className: cn("press inline-flex items-center justify-center gap-2 rounded-sm font-medium disabled:cursor-not-allowed disabled:opacity-40", size === "md" ? "h-11 px-4 text-sm" : "h-9 px-3 text-xs", variant === "primary" && "bg-fg text-bg hover:opacity-90", variant === "quiet" && "border border-line bg-subtle text-fg hover:bg-surface", variant === "ghost" && "text-muted hover:text-fg", className),
		...props
	});
});
function Chip({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex h-6 items-center rounded-full border border-line px-2 text-xs text-muted", className),
		children
	});
}
function Segmented({ label, value, options, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "radiogroup",
		"aria-label": label,
		className: cn("grid gap-1 rounded-md bg-subtle p-1", options.length === 2 ? "grid-cols-2" : "grid-cols-3"),
		children: options.map((option) => {
			const active = option.value === value;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				role: "radio",
				"aria-checked": active,
				onClick: () => onChange(option.value),
				className: cn("press h-9 rounded-sm px-2 text-sm", active ? "bg-surface text-fg" : "text-muted hover:text-fg"),
				children: option.label
			}, option.value);
		})
	});
}
function FieldLabel({ children, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-2 flex items-baseline justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-medium",
			children
		}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-faint",
			children: hint
		}) : null]
	});
}
function ToggleRow({ id, label, hint, checked, onCheckedChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor: id,
			className: "text-sm font-medium",
			children: label
		}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: hint
		}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			id,
			checked,
			onCheckedChange,
			className: "relative h-7 w-12 shrink-0 rounded-full border border-line bg-subtle data-[state=checked]:bg-fg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "block size-5 translate-x-1 rounded-full bg-fg transition-transform duration-150 data-[state=checked]:translate-x-6 data-[state=checked]:bg-bg" })
		})]
	});
}
function RangeField({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
		hint: String(value),
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider, {
		className: "relative flex h-11 w-full touch-none items-center",
		min: 0,
		max: 100,
		step: 1,
		value: [value],
		onValueChange: (next) => onChange(next[0] ?? 0),
		"aria-label": label,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
			className: "relative h-px grow bg-line-strong",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-px bg-fg" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block size-4 rounded-full border border-line-strong bg-fg" })]
	})] });
}
var PRESETS = [
	{
		id: "photorealistic",
		label: "Photoreal",
		blurb: "Lens-true, little garnish",
		lead: "Photorealistic photograph",
		voice: [
			"natural color",
			"believable materials",
			"optically plausible depth"
		],
		negative: [
			"illustration look",
			"plastic skin",
			"waxy surfaces",
			"CGI sheen"
		],
		stylistic: false
	},
	{
		id: "cinematic",
		label: "Cinematic",
		blurb: "Motivated light, film still",
		lead: "Cinematic film still",
		voice: [
			"motivated lighting",
			"gentle falloff",
			"restrained grain",
			"widescreen framing"
		],
		negative: [
			"flat sitcom lighting",
			"harsh on-camera flash",
			"oversaturated grade"
		],
		stylistic: true
	},
	{
		id: "editorial",
		label: "Editorial",
		blurb: "Controlled, magazine-quiet",
		lead: "Editorial photograph",
		voice: [
			"controlled styling",
			"precise crop",
			"print-like color"
		],
		negative: [
			"snapshot clutter",
			"crooked horizon",
			"busy background"
		],
		stylistic: true
	},
	{
		id: "product",
		label: "Product",
		blurb: "Clean surface, clear form",
		lead: "Studio product photograph",
		voice: [
			"clean sweep",
			"controlled highlight",
			"true material color",
			"sharp product edges"
		],
		negative: [
			"cluttered set",
			"warped geometry",
			"muddy reflections"
		],
		stylistic: true
	},
	{
		id: "concept",
		label: "Concept",
		blurb: "Design-forward, still specific",
		lead: "Concept art",
		voice: [
			"designed shapes",
			"clear silhouette",
			"painterly finish held in check"
		],
		negative: [
			"muddy values",
			"illegible silhouette",
			"random detail noise"
		],
		stylistic: true
	},
	{
		id: "minimalist",
		label: "Minimal",
		blurb: "Few forms, open space",
		lead: "Minimalist photograph",
		voice: [
			"generous negative space",
			"few objects",
			"quiet palette"
		],
		negative: [
			"clutter",
			"competing focal points",
			"decorative excess"
		],
		stylistic: true
	},
	{
		id: "fantasy",
		label: "Fantasy",
		blurb: "A style layer, not a fact",
		lead: "Fantasy illustration",
		voice: [
			"mythic atmosphere",
			"tactile costume materials",
			"storybook light"
		],
		negative: [
			"modern logos",
			"photographic snapshot",
			"flat vector shapes"
		],
		stylistic: true
	},
	{
		id: "luxury",
		label: "Luxury",
		blurb: "Quiet materials, brand still",
		lead: "Luxury brand photograph",
		voice: [
			"quiet luxury",
			"refined material",
			"uncluttered set",
			"soft specular highlights"
		],
		negative: [
			"cheap plastic",
			"loud graphics",
			"cluttered props",
			"harsh flash"
		],
		stylistic: true
	}
];
function presetById(id) {
	return PRESETS.find((preset) => preset.id === id) ?? PRESETS[0];
}
var defaultSettings = {
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
	preset: "photorealistic"
};
function Drawer({ open, onOpenChange, title, description, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "veil fixed inset-0 z-40 bg-bg/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "drawer fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-line bg-surface outline-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3 border-b border-line px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "font-display text-2xl tracking-tight",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "mt-1 text-sm text-muted",
					children: description
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto px-5 py-4",
				children
			})]
		})] })
	});
}
function SettingsDrawer({ open, onOpenChange, settings, onChange }) {
	const set = (key, value) => onChange({
		...settings,
		[key]: value
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer, {
		open,
		onOpenChange,
		title: "Settings",
		description: "How drafts are shaped, and how the studio looks.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Theme" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
				label: "Theme",
				value: settings.theme,
				onChange: (theme) => set("theme", theme),
				options: [
					{
						value: "dark",
						label: "Dark"
					},
					{
						value: "light",
						label: "Light"
					},
					{
						value: "system",
						label: "System"
					}
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Prompt length" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
					label: "Prompt length",
					value: settings.length,
					onChange: (length) => set("length", length),
					options: [
						{
							value: "brief",
							label: "Brief"
						},
						{
							value: "standard",
							label: "Standard"
						},
						{
							value: "extended",
							label: "Extended"
						}
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Detail" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
					label: "Detail level",
					value: settings.detail,
					onChange: (detail) => set("detail", detail),
					options: [
						{
							value: "lean",
							label: "Lean"
						},
						{
							value: "balanced",
							label: "Balanced"
						},
						{
							value: "exhaustive",
							label: "Full"
						}
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeField, {
					label: "Creativity",
					value: settings.creativity,
					onChange: (creativity) => set("creativity", creativity)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Low stays with what was seen. High adds the preset’s style language."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Output format" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
					label: "Output format",
					value: settings.format,
					onChange: (format) => set("format", format),
					options: [
						{
							value: "paragraph",
							label: "Paragraph"
						},
						{
							value: "comma",
							label: "Tags"
						},
						{
							value: "template",
							label: "Template"
						}
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Preset" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-2",
					children: PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => set("preset", preset.id),
						className: preset.id === settings.preset ? "press rounded-md border border-fg bg-fg px-3 py-2 text-left text-bg" : "press rounded-md border border-line bg-bg px-3 py-2 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-medium",
							children: preset.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: preset.id === settings.preset ? "block text-xs opacity-80" : "block text-xs text-muted",
							children: preset.blurb
						})]
					}, preset.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 border-t border-line",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						id: "auto-copy",
						label: "Copy after reading",
						hint: "Places the new prompt on the clipboard.",
						checked: settings.autoCopy,
						onCheckedChange: (autoCopy) => set("autoCopy", autoCopy)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						id: "negative-default",
						label: "Show negative prompt",
						checked: settings.includeNegative,
						onCheckedChange: (includeNegative) => set("includeNegative", includeNegative)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						id: "a11y",
						label: "Stronger contrast",
						hint: "Darkens secondary text and borders.",
						checked: settings.accessibility,
						onCheckedChange: (accessibility) => set("accessibility", accessibility)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Text size" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
					label: "Text size",
					value: settings.textSize,
					onChange: (textSize) => set("textSize", textSize),
					options: [
						{
							value: "sm",
							label: "Small"
						},
						{
							value: "md",
							label: "Default"
						},
						{
							value: "lg",
							label: "Large"
						}
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Image preview" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
					label: "Image preview",
					value: settings.previewFit,
					onChange: (previewFit) => set("previewFit", previewFit),
					options: [{
						value: "contain",
						label: "Fit"
					}, {
						value: "cover",
						label: "Fill"
					}]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-6",
				onClick: () => onChange({
					...defaultSettings,
					theme: settings.theme
				}),
				children: "Reset preferences"
			})
		]
	});
}
function HistoryDrawer({ open, onOpenChange, items, favoritesOnly, onFavoritesOnly, onOpen, onToggleFavorite, onDelete, onClear, confirmClear, onConfirmClear }) {
	const visible = favoritesOnly ? items.filter((item) => item.favorite) : items;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer, {
		open,
		onOpenChange,
		title: "History",
		description: "Readings stay on this device. Full images are not kept.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
				id: "favorites-only",
				label: "Favorites only",
				checked: favoritesOnly,
				onCheckedChange: onFavoritesOnly
			}),
			visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-8 text-sm text-muted",
				children: items.length === 0 ? "No readings yet." : "No favorites yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-3",
				children: visible.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-lg border border-line bg-bg p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onOpen(item),
						className: "flex w-full gap-3 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.thumb,
							alt: "",
							className: "h-16 w-16 shrink-0 rounded-sm object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate text-sm font-medium",
								children: item.fileName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-1 block text-xs text-muted",
								children: [
									new Date(item.createdAt).toLocaleString(),
									" · ",
									item.reading.mode === "vision" ? "Vision" : "Measured"
								]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => onToggleFavorite(item.id),
							children: item.favorite ? "Unfavorite" : "Favorite"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => onDelete(item.id),
							children: "Delete"
						})]
					})]
				}, item.id))
			}),
			items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 border-t border-line pt-4",
				children: confirmClear ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "primary",
						onClick: onClear,
						children: "Clear all readings"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => onConfirmClear(false),
						children: "Cancel"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => onConfirmClear(true),
					children: "Clear history"
				})
			}) : null
		]
	});
}
var PLACEHOLDER = /not identified|not inferred|was not /i;
function isUseful(finding) {
	return Boolean(finding?.text && !PLACEHOLDER.test(finding.text));
}
function clause(text) {
	return text.trim().replace(/\s+/g, " ").replace(/[.!?]+$/, "");
}
function sentence(text) {
	const clean = clause(text);
	if (!clean) return "";
	return `${clean.charAt(0).toUpperCase()}${clean.slice(1)}.`;
}
function phrase(finding) {
	const text = clause(finding.text);
	if (!text) return "";
	if (finding.confidence !== "low") return text;
	if (/^(possibly|something like|unidentified|unclear|not )/i.test(text)) return text;
	return `something like ${text}`;
}
function lowerFirst(text) {
	const second = text[1];
	if (text[0] && text[0] === text[0].toUpperCase() && second && second === second.toLowerCase()) return text.charAt(0).toLowerCase() + text.slice(1);
	return text;
}
function paletteLine(swatches) {
	const names = [...new Set(swatches.map((swatch) => swatch.name.toLowerCase()))].slice(0, 4);
	if (!names.length) return "";
	if (names.length === 1) return `Palette of ${names[0]}`;
	return `Palette of ${joinList(names)}`;
}
function fitWords(text, max) {
	if (text.trim().split(/\s+/).length <= max) return text.trim();
	const sentences = text.trim().split(/(?<=[.!?])\s+/);
	while (sentences.length > 1 && sentences.join(" ").split(/\s+/).length > max) sentences.pop();
	let out = sentences.join(" ");
	if (out.split(/\s+/).length > max) out = `${out.split(/\s+/).slice(0, max).join(" ").replace(/[,:;]$/, "")}.`;
	return out;
}
function wordBudget(settings) {
	const base = settings.length === "brief" ? 58 : settings.length === "extended" ? 210 : 120;
	if (settings.detail === "lean") return Math.round(base * .8);
	if (settings.detail === "exhaustive") return Math.round(base * 1.15);
	return base;
}
function collect(reading, settings, palette) {
	const preset = presetById(settings.preset);
	const creativity = settings.creativity;
	const parts = [];
	const subject = isUseful(reading.subject) ? phrase(reading.subject) : "";
	const lead = creativity < 28 && !preset.stylistic ? "Photograph" : preset.lead;
	if (subject) parts.push(sentence(`${lead} of ${lowerFirst(subject)}`));
	else parts.push(sentence(lead));
	if (isUseful(reading.scene) && settings.detail !== "lean") parts.push(sentence(phrase(reading.scene)));
	else if (isUseful(reading.scene) && settings.detail === "lean") parts.push(sentence(phrase(reading.scene)));
	if (settings.detail !== "lean" && isUseful(reading.materials)) parts.push(sentence(phrase(reading.materials)));
	if (settings.detail !== "lean" && isUseful(reading.texture)) parts.push(sentence(phrase(reading.texture)));
	if (isUseful(reading.lighting)) parts.push(sentence(phrase(reading.lighting)));
	if (settings.detail !== "lean" && isUseful(reading.composition)) parts.push(sentence(phrase(reading.composition)));
	if ((settings.detail === "exhaustive" || creativity > 62) && isUseful(reading.camera)) parts.push(sentence(phrase(reading.camera)));
	const colors = paletteLine(palette);
	if (colors) parts.push(sentence(colors));
	if (settings.detail === "exhaustive" && reading.objects.length) {
		const names = reading.objects.slice(0, 6).map((object) => {
			return object.confidence === "low" ? `possibly ${object.name}` : object.name;
		});
		parts.push(sentence(`Also visible: ${joinList(names)}`));
	}
	if (creativity > 30 && settings.detail !== "lean" && isUseful(reading.mood)) parts.push(sentence(phrase(reading.mood)));
	if (creativity > 48 && (preset.stylistic || isUseful(reading.style))) {
		const layer = [isUseful(reading.style) ? phrase(reading.style) : "", creativity > 68 ? preset.voice.slice(0, 3).join(", ") : preset.voice[0]].filter(Boolean).join(", ");
		if (layer) parts.push(sentence(`Style direction: ${layer}`));
	}
	return parts.filter(Boolean);
}
function joinList(items) {
	if (items.length <= 1) return items[0] ?? "";
	if (items.length === 2) return `${items[0]} and ${items[1]}`;
	return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}
function paragraph(reading, settings, palette) {
	return fitWords(collect(reading, settings, palette).join(" "), wordBudget(settings));
}
function comma(reading, settings, palette) {
	const preset = presetById(settings.preset);
	const tags = [];
	if (isUseful(reading.subject)) tags.push(phrase(reading.subject));
	if (isUseful(reading.scene)) tags.push(phrase(reading.scene));
	if (isUseful(reading.lighting)) tags.push(phrase(reading.lighting));
	if (settings.detail !== "lean" && isUseful(reading.materials)) tags.push(phrase(reading.materials));
	if (settings.detail !== "lean" && isUseful(reading.texture)) tags.push(phrase(reading.texture));
	if (settings.detail !== "lean" && isUseful(reading.composition)) tags.push(phrase(reading.composition));
	if ((settings.detail === "exhaustive" || settings.creativity > 60) && isUseful(reading.camera)) tags.push(phrase(reading.camera));
	palette.slice(0, 4).forEach((swatch) => tags.push(swatch.name.toLowerCase()));
	if (settings.detail !== "lean") reading.objects.slice(0, settings.detail === "exhaustive" ? 6 : 3).forEach((object) => {
		tags.push(object.confidence === "low" ? `possibly ${object.name}` : object.name);
	});
	if (settings.creativity > 34 && isUseful(reading.mood)) tags.push(phrase(reading.mood));
	if (settings.creativity > 40) tags.push(...preset.voice.slice(0, settings.creativity > 70 ? 4 : 2));
	const unique = [...new Set(tags.map((tag) => tag.toLowerCase()))];
	const cap = settings.length === "brief" ? 10 : settings.length === "extended" ? 24 : 16;
	return unique.slice(0, cap).join(", ");
}
function template(reading, settings, palette) {
	const preset = presetById(settings.preset);
	const line = (label, finding, raw) => {
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
		settings.detail !== "lean" && reading.objects.length ? `Objects: ${reading.objects.map((object) => object.confidence === "low" ? `${object.name} (uncertain)` : object.name).join(", ")}` : "",
		settings.detail !== "lean" && settings.creativity > 25 ? line("Mood", reading.mood) : "",
		settings.creativity > 45 && isUseful(reading.style) ? line("Observed style cues", reading.style) : "",
		settings.creativity > 35 ? `Direction: ${preset.lead}. ${preset.voice.join(", ")}.` : `Direction: ${preset.lead}.`
	];
	if (reading.visibleText && settings.detail === "exhaustive") lines.push(`Visible text: ${reading.visibleText}`);
	return lines.filter(Boolean).join("\n");
}
var SHARED_NEGATIVE = [
	"watermark",
	"logo overlay",
	"misspelled text",
	"extra fingers",
	"distorted anatomy",
	"warped geometry"
];
function composeNegative(reading, settings) {
	const preset = presetById(settings.preset);
	const tags = [...SHARED_NEGATIVE, ...preset.negative];
	if (!reading.visibleText) tags.push("unwanted text");
	if (reading.mode === "measured") tags.push("invented subject details");
	return [...new Set(tags)].join(", ");
}
function composePrompt(reading, settings, palette) {
	return {
		prompt: settings.format === "comma" ? comma(reading, settings, palette) : settings.format === "template" ? template(reading, settings, palette) : paragraph(reading, settings, palette),
		negative: composeNegative(reading, settings)
	};
}
function wordCount(text) {
	const trimmed = text.trim();
	if (!trimmed) return 0;
	return trimmed.split(/\s+/).length;
}
function Insights({ measured, reading, pending, step }) {
	if (!measured) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-5 sm:p-8 lg:pt-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-3xl leading-tight tracking-tight",
			children: "Nothing on the desk yet."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-sm text-sm text-muted",
			children: "Choose an image. Color, light, and frame are measured here. A vision reading adds subject, materials, and a prompt."
		})]
	});
	const vision = reading?.mode === "vision" ? reading : null;
	const uncertain = vision ? [
		vision.subject,
		vision.scene,
		vision.lighting,
		vision.materials,
		vision.composition
	].some((item) => item.confidence === "low") || vision.uncertainties.length > 0 : false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3 p-4 sm:p-5",
		children: [
			pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rise rounded-lg border border-line bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: step
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rail mt-3",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
				})]
			}) : null,
			uncertain ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Uncertain findings are labeled. They are not stated as fact."
			}) : null,
			vision ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FindingCard, {
						title: "Subject",
						finding: vision.subject
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FindingCard, {
						title: "Scene",
						finding: vision.scene
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FindingCard, {
						title: "Lighting",
						finding: vision.lighting
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FindingCard, {
						title: "Composition",
						finding: vision.composition
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FindingCard, {
						title: "Materials",
						finding: vision.materials
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FindingCard, {
						title: "Texture",
						finding: vision.texture
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FindingCard, {
						title: "Mood",
						finding: vision.mood
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FindingCard, {
						title: "Style cues",
						finding: vision.style
					}),
					isUseful(vision.camera) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FindingCard, {
						title: "Camera feel",
						finding: vision.camera
					}) : null
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlainCard, {
						title: "Light",
						body: `${measured.light} ${measured.contrastNote}`,
						meta: "Seen · Clear"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlainCard, {
						title: "Frame",
						body: measured.frame,
						meta: "Seen · Likely"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlainCard, {
						title: "Surface",
						body: measured.detail,
						meta: "Seen · Likely"
					})
				]
			}),
			vision && vision.objects.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rise rounded-lg border border-line bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium",
					children: "Objects"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: vision.objects.map((object) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, { children: [object.name, object.confidence === "low" ? " · uncertain" : ""] }, object.name))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rise rounded-lg border border-line bg-surface p-4 sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium",
						children: "Palette"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: "Measured" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-3 gap-3 sm:grid-cols-6",
					children: measured.palette.map((swatch) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-10 rounded-sm border border-line",
							style: { backgroundColor: swatch.hex }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted",
							children: swatch.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-faint",
							children: swatch.hex
						})
					] }, swatch.hex))
				})]
			}),
			vision?.visibleText ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rise rounded-lg border border-line bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium",
						children: "Visible text"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: "Read from image" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 whitespace-pre-wrap text-sm text-muted",
					children: vision.visibleText
				})]
			}) : vision ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-faint",
				children: "No readable text was found in the image."
			}) : null,
			vision?.qualityNotes.length || !vision ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rise rounded-lg border border-line bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium",
					children: "Quality notes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-2 flex flex-col gap-2 text-sm text-muted",
					children: [(vision?.qualityNotes ?? []).map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: note.text }, note.text)), !vision ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: measured.detail }) : null]
				})]
			}) : null,
			vision && vision.uncertainties.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rise rounded-lg border border-line bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium",
					children: "Uncertainties"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 flex flex-col gap-2 text-sm text-muted",
					children: vision.uncertainties.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
				})]
			}) : null
		]
	});
}
function FindingCard({ title, finding }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rise rounded-lg border border-line bg-surface p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-medium",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: finding.source === "observed" ? "Seen" : "Inferred" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: finding.confidence === "low" ? "Uncertain" : finding.confidence === "medium" ? "Likely" : "Clear" })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: finding.text || "Not available."
		})]
	});
}
function PlainCard({ title, body, meta }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rise rounded-lg border border-line bg-surface p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-medium",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: meta })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: body
		})]
	});
}
function PromptDesk({ reading, prompt, negative, format, includeNegative, dirty, copied, favorite, onFormat, onPrompt, onNegative, onToggleNegative, onCopy, onCopyNegative, onExportText, onExportMarkdown, onFavorite, onRestore, onOpenSettings, shape }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "border-t border-line bg-bg p-4 sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl leading-none tracking-tight",
					children: "Prompt"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: reading?.mode === "vision" ? "Edit freely. Cards keep seen details separate from inferred style." : reading?.mode === "measured" ? "Measured draft only. Subject, scene, and materials were not identified." : "A prompt appears after you read the image."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "primary",
					onClick: onCopy,
					disabled: !prompt.trim(),
					"aria-live": "polite",
					children: [copied === "prompt" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), copied === "prompt" ? "Copied" : "Copy"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
					label: "Prompt format",
					value: format,
					onChange: onFormat,
					options: [
						{
							value: "paragraph",
							label: "Paragraph"
						},
						{
							value: "comma",
							label: "Tags"
						},
						{
							value: "template",
							label: "Template"
						}
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-3 block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Generated prompt"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: prompt,
					onChange: (event) => onPrompt(event.target.value),
					rows: 8,
					placeholder: "The draft will land here.",
					className: "w-full resize-y rounded-md border border-line bg-surface p-3 text-sm leading-relaxed text-fg placeholder:text-faint"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums",
						children: [wordCount(prompt), " words"]
					}) }),
					dirty && reading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: "Custom wording" }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onOpenSettings,
						className: "text-sm text-muted underline-offset-4 hover:text-fg hover:underline",
						children: shape
					}),
					dirty && reading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onRestore,
						className: "text-sm text-muted underline-offset-4 hover:text-fg hover:underline",
						children: "Rebuild"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 border-t border-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					id: "negative-prompt",
					label: "Negative prompt",
					hint: "A filter list for generators. It is not a description of this image.",
					checked: includeNegative,
					onCheckedChange: onToggleNegative
				})
			}),
			includeNegative ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				value: negative,
				onChange: (event) => onNegative(event.target.value),
				rows: 3,
				"aria-label": "Negative prompt",
				className: "w-full resize-y rounded-md border border-line bg-surface p-3 text-sm leading-relaxed text-fg"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				className: "mt-2",
				onClick: onCopyNegative,
				disabled: !negative.trim(),
				children: copied === "negative" ? "Copied" : "Copy negative"
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: onExportText,
						disabled: !prompt.trim(),
						children: "Export text"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: onExportMarkdown,
						disabled: !reading,
						children: "Export markdown"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: onFavorite,
						disabled: !reading,
						"aria-pressed": favorite,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: favorite ? "size-4 fill-current" : "size-4" }), favorite ? "Favorited" : "Favorite"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "sr-only",
				role: "status",
				children: copied === "prompt" ? "Prompt copied." : copied === "negative" ? "Negative prompt copied." : ""
			})
		]
	});
}
function Stage({ src, name, width, height, fit, referenceOnly }) {
	const frame = (0, import_react.useRef)(null);
	const pointers = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const pinch = (0, import_react.useRef)(null);
	const drag = (0, import_react.useRef)(null);
	const [scale, setScale] = (0, import_react.useState)(1);
	const [pos, setPos] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	(0, import_react.useEffect)(() => {
		setScale(1);
		setPos({
			x: 0,
			y: 0
		});
	}, [src, fit]);
	(0, import_react.useEffect)(() => {
		const node = frame.current;
		if (!node) return;
		const onWheel = (event) => {
			event.preventDefault();
			setScale((current) => clamp(current * (event.deltaY < 0 ? 1.08 : .92), 1, 6));
		};
		node.addEventListener("wheel", onWheel, { passive: false });
		return () => node.removeEventListener("wheel", onWheel);
	}, []);
	function reset() {
		setScale(1);
		setPos({
			x: 0,
			y: 0
		});
	}
	function onPointerDown(event) {
		event.currentTarget.setPointerCapture(event.pointerId);
		pointers.current.set(event.pointerId, {
			x: event.clientX,
			y: event.clientY
		});
		if (pointers.current.size === 2) {
			const [a, b] = [...pointers.current.values()];
			pinch.current = {
				dist: Math.hypot(a.x - b.x, a.y - b.y),
				scale
			};
			drag.current = null;
			return;
		}
		drag.current = {
			x: event.clientX,
			y: event.clientY,
			px: pos.x,
			py: pos.y
		};
	}
	function onPointerMove(event) {
		if (!pointers.current.has(event.pointerId)) return;
		pointers.current.set(event.pointerId, {
			x: event.clientX,
			y: event.clientY
		});
		if (pointers.current.size >= 2 && pinch.current) {
			const [a, b] = [...pointers.current.values()];
			const dist = Math.hypot(a.x - b.x, a.y - b.y);
			setScale(clamp(pinch.current.scale * dist / Math.max(1, pinch.current.dist), 1, 6));
			return;
		}
		if (!drag.current || scale <= 1) return;
		setPos({
			x: drag.current.px + event.clientX - drag.current.x,
			y: drag.current.py + event.clientY - drag.current.y
		});
	}
	function onPointerUp(event) {
		pointers.current.delete(event.pointerId);
		if (pointers.current.size < 2) pinch.current = null;
		if (pointers.current.size === 0) drag.current = null;
	}
	const ratio = width / height;
	const shape = Math.abs(ratio - 1) < .06 ? "Square" : ratio > 1.7 ? "Wide" : ratio < .62 ? "Tall" : ratio > 1 ? "Horizontal" : "Vertical";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: frame,
			className: "relative min-h-96 w-full flex-1 overflow-hidden rounded-xl border border-line bg-subtle frame-shadow touch-none lg:min-h-0",
			onPointerDown,
			onPointerMove,
			onPointerUp,
			onPointerCancel: onPointerUp,
			onDoubleClick: reset,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt: name,
				draggable: false,
				className: fit === "cover" && scale === 1 ? "absolute inset-0 h-full w-full object-cover" : "absolute inset-0 h-full w-full object-contain",
				style: { transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})` }
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: shape }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular-nums",
					children: [
						width,
						" × ",
						height
					]
				}) }),
				referenceOnly ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: "Saved reference" }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							"aria-label": "Zoom out",
							onClick: () => setScale((current) => clamp(current / 1.2, 1, 6)),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOut, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "w-12 text-center text-xs tabular-nums text-muted",
							children: [Math.round(scale * 100), "%"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							"aria-label": "Zoom in",
							onClick: () => setScale((current) => clamp(current * 1.2, 1, 6)),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							"aria-label": "Reset view",
							onClick: reset,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" })
						})
					]
				})
			]
		})]
	});
}
function clamp(value, min, max) {
	return Math.min(max, Math.max(min, value));
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
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
var visionStatus = createServerFn({ method: "GET" }).handler(createSsrRpc("f1f986b271d260c920985d4e870337bbc7d9a19967abcc96881afc56d730f622"));
var analyzeImage = createServerFn({ method: "POST" }).validator((input) => Input.parse(input)).handler(createSsrRpc("b7c56c215f1af8bd4ed0879d22e803276cb9843919d91f2f7534e58b54d3e3d3"));
function findingLine(label, text, confidence, source) {
	if (!text) return "";
	return `- ${label}: ${text} (${source}, ${confidence})`;
}
function toPlain(item) {
	const blocks = [item.prompt.trim()];
	if (item.negative.trim()) blocks.push("", "Negative", item.negative.trim());
	if (item.reading.visibleText) blocks.push("", "Visible text", item.reading.visibleText);
	blocks.push("", `Source file: ${item.fileName}`);
	return blocks.join("\n");
}
function toMarkdown(item) {
	const reading = item.reading;
	const measured = item.measured;
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
		``
	];
	if (item.negative.trim()) lines.push(`## Negative`, ``, item.negative.trim(), ``);
	lines.push(`## Findings`, ``);
	const rows = [
		["Subject", reading.subject],
		["Scene", reading.scene],
		["Lighting", reading.lighting],
		["Materials", reading.materials],
		["Texture", reading.texture],
		["Composition", reading.composition],
		["Camera", reading.camera],
		["Mood", reading.mood],
		["Style", reading.style]
	];
	for (const [label, finding] of rows) {
		const line = findingLine(label, finding.text, finding.confidence, finding.source);
		if (line) lines.push(line);
	}
	if (reading.objects.length) lines.push(`- Objects: ${reading.objects.map((object) => `${object.name} (${object.confidence})`).join(", ")}`);
	if (measured.palette.length) lines.push(`- Palette: ${measured.palette.map((swatch) => `${swatch.name} ${swatch.hex}`).join(", ")}`);
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
function download(filename, contents, type) {
	const blob = new Blob([contents], { type });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	link.click();
	URL.revokeObjectURL(url);
}
function hexToRgb(hex) {
	const h = hex.replace("#", "");
	return {
		r: parseInt(h.slice(0, 2), 16),
		g: parseInt(h.slice(2, 4), 16),
		b: parseInt(h.slice(4, 6), 16)
	};
}
function rgbToHex(r, g, b) {
	const c = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
	return `#${c(r)}${c(g)}${c(b)}`;
}
function nameColor(hex) {
	const { r, g, b } = hexToRgb(hex);
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const l = (max + min) / 2 / 255;
	const s = max === min ? 0 : (max - min) / (255 - Math.abs(max + min - 255));
	let h = 0;
	if (max !== min) {
		const d = max - min;
		if (max === r) h = (g - b) / d % 6;
		else if (max === g) h = (b - r) / d + 2;
		else h = (r - g) / d + 4;
		h *= 60;
		if (h < 0) h += 360;
	}
	if (s < .12) {
		if (l < .12) return "Ink";
		if (l < .28) return "Charcoal";
		if (l < .45) return "Slate";
		if (l < .62) return "Stone";
		if (l < .82) return "Parchment";
		return "Paper";
	}
	const named = `${l < .32 ? "Deep " : l > .78 ? "Pale " : ""}${h < 16 || h >= 348 ? "rose" : h < 42 ? "clay" : h < 70 ? "sand" : h < 95 ? "olive" : h < 160 ? "moss" : h < 200 ? "teal" : h < 250 ? "slate blue" : h < 295 ? "indigo" : "plum"}`;
	return named.charAt(0).toUpperCase() + named.slice(1);
}
var ACCEPT = /* @__PURE__ */ new Set([
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/gif"
]);
var ImageReadError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "ImageReadError";
	}
};
function assertImageFile(file) {
	const named = /\.(jpe?g|png|webp|gif)$/i.test(file.name);
	if (!ACCEPT.has(file.type) && !named) throw new ImageReadError("Use a JPEG, PNG, WebP, or GIF from this device.");
	if (file.type === "image/svg+xml" || /\.svg$/i.test(file.name)) throw new ImageReadError("SVG files are not supported. Export a PNG or JPEG instead.");
	if (file.size > 26214400) throw new ImageReadError("That file is over 25 MB. Choose a smaller image.");
}
function drawCover(source, sw, sh, max) {
	const scale = Math.min(1, max / Math.max(sw, sh));
	const w = Math.max(1, Math.round(sw * scale));
	const h = Math.max(1, Math.round(sh * scale));
	const canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;
	const ctx = canvas.getContext("2d", { willReadFrequently: true });
	if (!ctx) throw new ImageReadError("This browser could not read the image.");
	ctx.drawImage(source, 0, 0, w, h);
	return {
		canvas,
		ctx,
		w,
		h
	};
}
function sample(ctx, w, h) {
	const data = ctx.getImageData(0, 0, w, h).data;
	const step = Math.max(1, Math.floor(Math.sqrt(w * h / 5e3)));
	const buckets = /* @__PURE__ */ new Map();
	let lumSum = 0;
	let lumSq = 0;
	let n = 0;
	let edgeSum = 0;
	let edgeN = 0;
	const cells = Array.from({ length: 9 }, () => ({
		lum: 0,
		n: 0
	}));
	const lumAt = (x, y) => {
		const i = (y * w + x) * 4;
		return (.2126 * data[i] + .7152 * data[i + 1] + .0722 * data[i + 2]) / 255;
	};
	for (let y = 0; y < h; y += step) for (let x = 0; x < w; x += step) {
		const i = (y * w + x) * 4;
		if (data[i + 3] < 180) continue;
		const r = data[i];
		const g = data[i + 1];
		const b = data[i + 2];
		const lum = (.2126 * r + .7152 * g + .0722 * b) / 255;
		lumSum += lum;
		lumSq += lum * lum;
		n++;
		const cx = Math.min(2, Math.floor(x / w * 3));
		const cell = cells[Math.min(2, Math.floor(y / h * 3)) * 3 + cx];
		cell.lum += lum;
		cell.n++;
		const key = `${Math.round(r / 24)},${Math.round(g / 24)},${Math.round(b / 24)}`;
		const bucket = buckets.get(key) ?? {
			r: 0,
			g: 0,
			b: 0,
			n: 0
		};
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
	const luminance = n ? lumSum / n : 0;
	const variance = n ? Math.max(0, lumSq / n - luminance * luminance) : 0;
	return {
		buckets,
		luminance,
		contrast: Math.sqrt(variance),
		edge: edgeN ? edgeSum / edgeN : 0,
		cellLum: cells.map((c) => c.n ? c.lum / c.n : luminance),
		n
	};
}
function paletteFrom(buckets) {
	const ranked = [...buckets.values()].sort((a, b) => b.n - a.n);
	const picked = [];
	let total = 0;
	for (const bucket of ranked) {
		if (picked.length >= 6) break;
		const hex = rgbToHex(bucket.r / bucket.n, bucket.g / bucket.n, bucket.b / bucket.n);
		const twin = picked.find((swatch) => colorDistance(swatch.hex, hex) < 28);
		if (twin) twin.weight += bucket.n;
		else picked.push({
			hex,
			name: nameColor(hex),
			weight: bucket.n
		});
		total += bucket.n;
	}
	return picked.map((swatch) => ({
		...swatch,
		weight: total ? swatch.weight / total : 0
	})).sort((a, b) => b.weight - a.weight);
}
function colorDistance(a, b) {
	const parse = (hex) => {
		const h = hex.replace("#", "");
		return [
			parseInt(h.slice(0, 2), 16),
			parseInt(h.slice(2, 4), 16),
			parseInt(h.slice(4, 6), 16)
		];
	};
	const pa = parse(a);
	const pb = parse(b);
	return Math.hypot(pa[0] - pb[0], pa[1] - pb[1], pa[2] - pb[2]);
}
function frameNote(cells) {
	const labels = [
		"upper left",
		"upper center",
		"upper right",
		"middle left",
		"center",
		"middle right",
		"lower left",
		"lower center",
		"lower right"
	];
	let max = 0;
	let min = 0;
	cells.forEach((value, index) => {
		if (value > cells[max]) max = index;
		if (value < cells[min]) min = index;
	});
	if (cells[max] - cells[min] < .08) return "Tonal weight is spread fairly evenly across the frame.";
	return `The brightest weight sits in the ${labels[max]}. The darkest passage is ${labels[min]}.`;
}
function describeMeasured(partial) {
	const light = partial.luminance < .28 ? "Low key. Most of the frame sits in shadow." : partial.luminance > .72 ? "High key. The frame is bright overall." : "Mid key. Highlights and shadows share the frame.";
	const contrastNote = partial.contrast < .1 ? "Tonal range is compressed." : partial.contrast > .22 ? "Tonal range is wide." : "Contrast is moderate.";
	const detail = partial.edge < .045 ? "Surfaces read as soft or very smooth." : partial.edge > .14 ? "Edges are crisp, with fine local detail." : "Surface detail is moderate.";
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
		detail
	};
}
async function prepareImage(file) {
	assertImageFile(file);
	const bitmap = await createImageBitmap(file).catch(() => {
		throw new ImageReadError("This image could not be decoded. Try another file.");
	});
	try {
		if (bitmap.width < 8 || bitmap.height < 8) throw new ImageReadError("That image is too small to read.");
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
			frame: frameNote(sampled.cellLum)
		});
		const jpegBase64 = analysis.canvas.toDataURL("image/jpeg", .82).split(",")[1] ?? "";
		if (jpegBase64.length < 32 || jpegBase64.length > 24e5) throw new ImageReadError("The image could not be prepared for reading. Try a simpler file.");
		const thumb = drawCover(bitmap, bitmap.width, bitmap.height, 280).canvas.toDataURL("image/jpeg", .72);
		return {
			fileName: file.name || "image",
			objectUrl: URL.createObjectURL(file),
			width: bitmap.width,
			height: bitmap.height,
			measured,
			jpegBase64,
			thumb
		};
	} finally {
		bitmap.close();
	}
}
var KEY = "aurea-vision-v1";
var presetIds = new Set(PRESETS.map((preset) => preset.id));
function isSettings(value) {
	if (!value || typeof value !== "object") return {};
	return value;
}
function sanitizeSettings(value) {
	const raw = isSettings(value);
	const creativity = typeof raw.creativity === "number" ? Math.min(100, Math.max(0, Math.round(raw.creativity))) : defaultSettings.creativity;
	return {
		theme: raw.theme === "light" || raw.theme === "system" ? raw.theme : "dark",
		length: raw.length === "brief" || raw.length === "extended" ? raw.length : "standard",
		detail: raw.detail === "lean" || raw.detail === "exhaustive" ? raw.detail : "balanced",
		creativity,
		format: raw.format === "comma" || raw.format === "template" ? raw.format : "paragraph",
		autoCopy: Boolean(raw.autoCopy),
		textSize: raw.textSize === "sm" || raw.textSize === "lg" ? raw.textSize : "md",
		accessibility: Boolean(raw.accessibility),
		previewFit: raw.previewFit === "cover" ? "cover" : "contain",
		includeNegative: Boolean(raw.includeNegative),
		preset: raw.preset && presetIds.has(raw.preset) ? raw.preset : defaultSettings.preset
	};
}
function isHistoryItem(value) {
	if (!value || typeof value !== "object") return false;
	const item = value;
	return typeof item.id === "string" && typeof item.prompt === "string" && typeof item.thumb === "string" && item.thumb.startsWith("data:image") && Boolean(item.reading?.subject) && Boolean(item.measured?.palette);
}
function loadStore() {
	if (typeof localStorage === "undefined") return {
		settings: defaultSettings,
		history: []
	};
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return {
			settings: defaultSettings,
			history: []
		};
		const parsed = JSON.parse(raw);
		const history = Array.isArray(parsed.history) ? parsed.history.filter(isHistoryItem).slice(0, 30) : [];
		return {
			settings: sanitizeSettings(parsed.settings),
			history
		};
	} catch {
		return {
			settings: defaultSettings,
			history: []
		};
	}
}
function saveStore(store) {
	const history = store.history.slice(0, 30);
	const payload = JSON.stringify({
		settings: store.settings,
		history
	});
	try {
		localStorage.setItem(KEY, payload);
	} catch {
		const smaller = history.slice(0, Math.max(1, Math.floor(history.length / 2)));
		localStorage.setItem(KEY, JSON.stringify({
			settings: store.settings,
			history: smaller
		}));
	}
}
function applyTheme(settings) {
	const root = document.documentElement;
	root.dataset.theme = settings.theme;
	root.dataset.text = settings.textSize;
	root.dataset.a11y = settings.accessibility ? "on" : "off";
}
var STEPS = [
	"Framing the image",
	"Reading light and material",
	"Separating what is seen from what is inferred",
	"Drafting language"
];
function Studio() {
	const inputRef = (0, import_react.useRef)(null);
	const generation = (0, import_react.useRef)(0);
	const [settings, setSettings] = (0, import_react.useState)(defaultSettings);
	const [history, setHistory] = (0, import_react.useState)([]);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [session, setSession] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(false);
	const [step, setStep] = (0, import_react.useState)(STEPS[0]);
	const [error, setError] = (0, import_react.useState)(null);
	const [visionAvailable, setVisionAvailable] = (0, import_react.useState)(true);
	const [copied, setCopied] = (0, import_react.useState)(null);
	const [over, setOver] = (0, import_react.useState)(false);
	const [settingsOpen, setSettingsOpen] = (0, import_react.useState)(false);
	const [historyOpen, setHistoryOpen] = (0, import_react.useState)(false);
	const [favoritesOnly, setFavoritesOnly] = (0, import_react.useState)(false);
	const [confirmClear, setConfirmClear] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const store = loadStore();
		setSettings(store.settings);
		setHistory(store.history);
		applyTheme(store.settings);
		setReady(true);
		let cancel = false;
		visionStatus().then((result) => {
			if (!cancel) setVisionAvailable(result.available);
		}).catch(() => {
			if (!cancel) setVisionAvailable(false);
		});
		return () => {
			cancel = true;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		saveStore({
			settings,
			history
		});
		applyTheme(settings);
	}, [
		settings,
		history,
		ready
	]);
	(0, import_react.useEffect)(() => {
		const url = session?.objectUrl;
		return () => {
			if (url) URL.revokeObjectURL(url);
		};
	}, [session?.objectUrl]);
	(0, import_react.useEffect)(() => {
		if (!pending) return;
		setStep(STEPS[0]);
		let index = 0;
		const timer = window.setInterval(() => {
			index = Math.min(STEPS.length - 1, index + 1);
			setStep(STEPS[index]);
		}, 900);
		return () => window.clearInterval(timer);
	}, [pending]);
	(0, import_react.useEffect)(() => {
		if (!session?.historyId) return;
		const id = session.historyId;
		const prompt = session.prompt;
		const negative = session.negative;
		const timer = window.setTimeout(() => {
			setHistory((prev) => prev.map((item) => item.id === id ? {
				...item,
				prompt,
				negative,
				preset: settings.preset,
				format: settings.format
			} : item));
		}, 400);
		return () => window.clearTimeout(timer);
	}, [
		session?.historyId,
		session?.prompt,
		session?.negative,
		settings.preset,
		settings.format
	]);
	function openPicker() {
		inputRef.current?.click();
	}
	async function takeFile(file) {
		if (!file) return;
		setError(null);
		try {
			adopt(await prepareImage(file));
		} catch (err) {
			setError(err instanceof ImageReadError ? err.message : "That file could not be opened.");
		}
	}
	function adopt(prepared) {
		generation.current += 1;
		setPending(false);
		setCopied(null);
		setSession({
			fileName: prepared.fileName,
			previewUrl: prepared.objectUrl,
			objectUrl: prepared.objectUrl,
			width: prepared.width,
			height: prepared.height,
			jpegBase64: prepared.jpegBase64,
			thumb: prepared.thumb,
			measured: prepared.measured,
			reading: null,
			prompt: "",
			negative: "",
			dirty: false,
			historyId: null
		});
	}
	function commit(next) {
		const id = next.historyId ?? crypto.randomUUID();
		setHistory((prev) => {
			const existing = prev.find((item) => item.id === id);
			return [{
				id,
				createdAt: existing?.createdAt ?? Date.now(),
				fileName: next.fileName,
				thumb: next.thumb,
				width: next.width,
				height: next.height,
				reading: next.reading,
				measured: next.measured,
				prompt: next.prompt,
				negative: next.negative,
				favorite: existing?.favorite ?? false,
				preset: settings.preset,
				format: settings.format
			}, ...prev.filter((item) => item.id !== id)].slice(0, 30);
		});
		setSession({
			...next,
			historyId: id
		});
		if (settings.autoCopy && next.prompt.trim()) copyText(next.prompt, "prompt");
	}
	async function readImage(forceMeasured = false) {
		if (!session || pending) return;
		setError(null);
		const token = generation.current;
		const current = session;
		if (forceMeasured || !visionAvailable) {
			if (!current.jpegBase64) return;
			const reading = measuredReading(current.measured);
			const draft = composePrompt(reading, settings, current.measured.palette);
			commit({
				...current,
				reading,
				prompt: current.dirty ? current.prompt : draft.prompt,
				negative: current.dirty ? current.negative : draft.negative,
				dirty: current.dirty
			});
			return;
		}
		if (!current.jpegBase64) return;
		setPending(true);
		try {
			const result = await analyzeImage({ data: {
				imageBase64: current.jpegBase64,
				width: current.width,
				height: current.height,
				palette: current.measured.palette.map((swatch) => swatch.hex),
				light: current.measured.light,
				contrastNote: current.measured.contrastNote
			} });
			if (token !== generation.current) return;
			if (!result.ok) {
				if (result.unavailable) setVisionAvailable(false);
				setError(result.error);
				return;
			}
			const reading = visionReading(result.fields, current.measured);
			const draft = composePrompt(reading, settings, current.measured.palette);
			commit({
				...current,
				reading,
				prompt: current.dirty ? current.prompt : draft.prompt,
				negative: current.dirty ? current.negative : draft.negative,
				dirty: current.dirty
			});
		} catch {
			if (token !== generation.current) return;
			setError("The reading could not be completed. You can try again, or draft from the measurement.");
		} finally {
			if (token === generation.current) setPending(false);
		}
	}
	function applySettings(next) {
		const rebuild = next.length !== settings.length || next.detail !== settings.detail || next.creativity !== settings.creativity || next.format !== settings.format || next.preset !== settings.preset;
		setSettings(next);
		if (!rebuild || !session?.reading) return;
		const draft = composePrompt(session.reading, next, session.measured.palette);
		setSession({
			...session,
			prompt: draft.prompt,
			negative: draft.negative,
			dirty: false
		});
	}
	function restore() {
		if (!session?.reading) return;
		const draft = composePrompt(session.reading, settings, session.measured.palette);
		setSession({
			...session,
			prompt: draft.prompt,
			negative: draft.negative,
			dirty: false
		});
	}
	async function copyText(text, which) {
		try {
			await navigator.clipboard.writeText(text);
		} catch {
			const area = document.createElement("textarea");
			area.value = text;
			area.setAttribute("readonly", "");
			area.style.position = "fixed";
			area.style.left = "-999px";
			document.body.appendChild(area);
			area.select();
			const ok = document.execCommand("copy");
			area.remove();
			if (!ok) {
				setError("Clipboard is unavailable. Select the prompt and copy it manually.");
				return;
			}
		}
		setCopied(which);
		window.setTimeout(() => setCopied((current) => current === which ? null : current), 1800);
	}
	function exportBundle() {
		if (!session?.reading) return null;
		return {
			fileName: session.fileName,
			prompt: session.prompt,
			negative: settings.includeNegative ? session.negative : "",
			reading: session.reading,
			measured: session.measured,
			createdAt: Date.now()
		};
	}
	function slug(name) {
		return name.replace(/\.[^.]+$/, "").replace(/[^\w-]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "aurea";
	}
	function openHistory(item) {
		setSettings((current) => ({
			...current,
			preset: item.preset,
			format: item.format
		}));
		setSession({
			fileName: item.fileName,
			previewUrl: item.thumb,
			objectUrl: null,
			width: item.width,
			height: item.height,
			jpegBase64: null,
			thumb: item.thumb,
			measured: item.measured,
			reading: item.reading,
			prompt: item.prompt,
			negative: item.negative,
			dirty: true,
			historyId: item.id
		});
		setHistoryOpen(false);
		setError(null);
	}
	const favorite = history.some((item) => item.id === session?.historyId && item.favorite);
	const preset = presetById(settings.preset);
	const shape = `${settings.length === "brief" ? "Brief" : settings.length === "extended" ? "Extended" : "Standard"} · ${settings.detail === "lean" ? "Lean" : settings.detail === "exhaustive" ? "Full" : "Balanced"} · Creativity ${settings.creativity}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-bg text-fg lg:h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-2xl leading-none tracking-tight",
					children: ["Aurea ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Vision"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Read an image. Draft a prompt."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => setHistoryOpen(true),
						children: "History"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => setSettingsOpen(true),
						children: "Settings"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)] lg:overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: cn("flex min-h-0 min-w-0 flex-col gap-4 border-b border-line p-4 sm:p-6 lg:overflow-y-auto lg:border-r lg:border-b-0", over && "bg-subtle"),
					onDragOver: (event) => {
						event.preventDefault();
						setOver(true);
					},
					onDragLeave: () => setOver(false),
					onDrop: (event) => {
						event.preventDefault();
						setOver(false);
						takeFile(event.dataTransfer.files?.[0]);
					},
					children: [session ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, {
						src: session.previewUrl,
						name: session.fileName,
						width: session.width,
						height: session.height,
						fit: settings.previewFit,
						referenceOnly: !session.jpegBase64
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: openPicker,
						className: "press flex min-h-96 flex-1 flex-col items-start justify-end rounded-xl border border-line bg-surface p-6 text-left frame-shadow lg:min-h-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-4xl leading-none tracking-tight",
								children: "Place an image"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-3 max-w-sm text-sm text-muted",
								children: "JPEG, PNG, WebP, or GIF from this device. The original stays here. A smaller copy is used for the reading."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-6 inline-flex h-11 items-center rounded-sm bg-fg px-4 text-sm font-medium text-bg",
								children: "Choose image"
							})
						]
					}), session ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm text-muted",
									children: session.fileName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									onClick: openPicker,
									children: "Replace"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-2 overflow-x-auto pb-1",
								children: PRESETS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => applySettings({
										...settings,
										preset: item.id
									}),
									className: cn("press h-11 shrink-0 rounded-full border px-4 text-sm", item.id === settings.preset ? "border-fg bg-fg text-bg" : "border-line bg-surface text-fg"),
									children: item.label
								}, item.id))
							}),
							preset.id === "fantasy" || preset.id === "concept" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-faint",
								children: "This preset adds a style direction. It does not change what the cards mark as seen."
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "primary",
								onClick: () => void readImage(),
								disabled: pending || !session.jpegBase64,
								"aria-busy": pending,
								children: pending ? "Reading" : !session.jpegBase64 ? "Original file needed" : !visionAvailable ? "Draft from measurement" : session.reading ? "Read again" : "Read image"
							}),
							!session.jpegBase64 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "This is a saved reference. Open the original file to read it again."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-faint",
								children: visionAvailable ? "One reading of a reduced copy. You can edit the prompt before copying." : "Vision reading is unavailable. A draft can still be built from measured color, light, and frame."
							}),
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								role: "alert",
								className: "rounded-md border border-line bg-surface p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-danger",
									children: error
								}), session.jpegBase64 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										onClick: () => void readImage(),
										children: "Try again"
									}), visionAvailable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										onClick: () => void readImage(true),
										children: "Use measurement only"
									}) : null]
								}) : null]
							}) : null
						]
					}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "text-sm text-danger",
						children: error
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "flex min-h-0 min-w-0 flex-col lg:overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:min-h-0 lg:flex-1 lg:overflow-y-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Insights, {
							measured: session?.measured ?? null,
							reading: session?.reading ?? null,
							pending,
							step
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptDesk, {
						reading: session?.reading ?? null,
						prompt: session?.prompt ?? "",
						negative: session?.negative ?? "",
						format: settings.format,
						includeNegative: settings.includeNegative,
						dirty: Boolean(session?.dirty),
						copied,
						favorite,
						shape,
						onFormat: (format) => applySettings({
							...settings,
							format
						}),
						onPrompt: (prompt) => session && setSession({
							...session,
							prompt,
							dirty: true
						}),
						onNegative: (negative) => session && setSession({
							...session,
							negative,
							dirty: true
						}),
						onToggleNegative: (includeNegative) => setSettings({
							...settings,
							includeNegative
						}),
						onCopy: () => session?.prompt && void copyText(session.prompt, "prompt"),
						onCopyNegative: () => session?.negative && void copyText(session.negative, "negative"),
						onExportText: () => {
							const bundle = exportBundle();
							if (bundle) download(`${slug(bundle.fileName)}.txt`, toPlain(bundle), "text/plain");
						},
						onExportMarkdown: () => {
							const bundle = exportBundle();
							if (bundle) download(`${slug(bundle.fileName)}.md`, toMarkdown(bundle), "text/markdown");
						},
						onFavorite: () => {
							if (!session?.historyId) return;
							const id = session.historyId;
							setHistory((prev) => prev.map((item) => item.id === id ? {
								...item,
								favorite: !item.favorite
							} : item));
						},
						onRestore: restore,
						onOpenSettings: () => setSettingsOpen(true)
					})]
				})]
			}),
			session?.prompt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "dock sticky bottom-0 z-30 border-t border-line bg-bg px-4 py-3 lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "primary",
					className: "w-full",
					onClick: () => void copyText(session.prompt, "prompt"),
					children: copied === "prompt" ? "Copied" : "Copy prompt"
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				type: "file",
				accept: "image/jpeg,image/png,image/webp,image/gif",
				className: "sr-only",
				onChange: (event) => {
					takeFile(event.target.files?.[0]);
					event.target.value = "";
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsDrawer, {
				open: settingsOpen,
				onOpenChange: setSettingsOpen,
				settings,
				onChange: applySettings
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryDrawer, {
				open: historyOpen,
				onOpenChange: setHistoryOpen,
				items: history,
				favoritesOnly,
				onFavoritesOnly: setFavoritesOnly,
				onOpen: openHistory,
				onToggleFavorite: (id) => setHistory((prev) => prev.map((item) => item.id === id ? {
					...item,
					favorite: !item.favorite
				} : item)),
				onDelete: (id) => {
					setHistory((prev) => prev.filter((item) => item.id !== id));
					setSession((current) => current?.historyId === id ? {
						...current,
						historyId: null
					} : current);
				},
				onClear: () => {
					setHistory([]);
					setConfirmClear(false);
				},
				confirmClear,
				onConfirmClear: setConfirmClear
			})
		]
	});
}
var SplitComponent = Studio;
//#endregion
export { SplitComponent as component };
