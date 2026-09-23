import type { PresetId } from "@/lib/types";

export type Preset = {
  id: PresetId;
  label: string;
  blurb: string;
  lead: string;
  voice: string[];
  negative: string[];
  stylistic: boolean;
};

export const PRESETS: Preset[] = [
  {
    id: "photorealistic",
    label: "Photoreal",
    blurb: "Lens-true, little garnish",
    lead: "Photorealistic photograph",
    voice: ["natural color", "believable materials", "optically plausible depth"],
    negative: ["illustration look", "plastic skin", "waxy surfaces", "CGI sheen"],
    stylistic: false,
  },
  {
    id: "cinematic",
    label: "Cinematic",
    blurb: "Motivated light, film still",
    lead: "Cinematic film still",
    voice: ["motivated lighting", "gentle falloff", "restrained grain", "widescreen framing"],
    negative: ["flat sitcom lighting", "harsh on-camera flash", "oversaturated grade"],
    stylistic: true,
  },
  {
    id: "editorial",
    label: "Editorial",
    blurb: "Controlled, magazine-quiet",
    lead: "Editorial photograph",
    voice: ["controlled styling", "precise crop", "print-like color"],
    negative: ["snapshot clutter", "crooked horizon", "busy background"],
    stylistic: true,
  },
  {
    id: "product",
    label: "Product",
    blurb: "Clean surface, clear form",
    lead: "Studio product photograph",
    voice: ["clean sweep", "controlled highlight", "true material color", "sharp product edges"],
    negative: ["cluttered set", "warped geometry", "muddy reflections"],
    stylistic: true,
  },
  {
    id: "concept",
    label: "Concept",
    blurb: "Design-forward, still specific",
    lead: "Concept art",
    voice: ["designed shapes", "clear silhouette", "painterly finish held in check"],
    negative: ["muddy values", "illegible silhouette", "random detail noise"],
    stylistic: true,
  },
  {
    id: "minimalist",
    label: "Minimal",
    blurb: "Few forms, open space",
    lead: "Minimalist photograph",
    voice: ["generous negative space", "few objects", "quiet palette"],
    negative: ["clutter", "competing focal points", "decorative excess"],
    stylistic: true,
  },
  {
    id: "fantasy",
    label: "Fantasy",
    blurb: "A style layer, not a fact",
    lead: "Fantasy illustration",
    voice: ["mythic atmosphere", "tactile costume materials", "storybook light"],
    negative: ["modern logos", "photographic snapshot", "flat vector shapes"],
    stylistic: true,
  },
  {
    id: "luxury",
    label: "Luxury",
    blurb: "Quiet materials, brand still",
    lead: "Luxury brand photograph",
    voice: ["quiet luxury", "refined material", "uncluttered set", "soft specular highlights"],
    negative: ["cheap plastic", "loud graphics", "cluttered props", "harsh flash"],
    stylistic: true,
  },
];

export function presetById(id: PresetId): Preset {
  return PRESETS.find((preset) => preset.id === id) ?? PRESETS[0];
}
