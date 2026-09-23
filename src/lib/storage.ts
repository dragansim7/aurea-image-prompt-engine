import { defaultSettings, type HistoryItem, type Settings } from "@/lib/types";
import { PRESETS } from "@/lib/presets";

const KEY = "aurea-vision-v1";
const presetIds = new Set(PRESETS.map((preset) => preset.id));

export type Store = {
  settings: Settings;
  history: HistoryItem[];
};

function isSettings(value: unknown): Partial<Settings> {
  if (!value || typeof value !== "object") return {};
  return value as Partial<Settings>;
}

export function sanitizeSettings(value: unknown): Settings {
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
    preset: raw.preset && presetIds.has(raw.preset) ? raw.preset : defaultSettings.preset,
  };
}

function isHistoryItem(value: unknown): value is HistoryItem {
  if (!value || typeof value !== "object") return false;
  const item = value as HistoryItem;
  return (
    typeof item.id === "string" &&
    typeof item.prompt === "string" &&
    typeof item.thumb === "string" &&
    item.thumb.startsWith("data:image") &&
    Boolean(item.reading?.subject) &&
    Boolean(item.measured?.palette)
  );
}

export function loadStore(): Store {
  if (typeof localStorage === "undefined") return { settings: defaultSettings, history: [] };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { settings: defaultSettings, history: [] };
    const parsed = JSON.parse(raw) as { settings?: unknown; history?: unknown };
    const history = Array.isArray(parsed.history) ? parsed.history.filter(isHistoryItem).slice(0, 30) : [];
    return { settings: sanitizeSettings(parsed.settings), history };
  } catch {
    return { settings: defaultSettings, history: [] };
  }
}

export function saveStore(store: Store) {
  const history = store.history.slice(0, 30);
  const payload = JSON.stringify({ settings: store.settings, history });
  try {
    localStorage.setItem(KEY, payload);
  } catch {
    const smaller = history.slice(0, Math.max(1, Math.floor(history.length / 2)));
    localStorage.setItem(KEY, JSON.stringify({ settings: store.settings, history: smaller }));
  }
}

export function applyTheme(settings: Settings) {
  const root = document.documentElement;
  root.dataset.theme = settings.theme;
  root.dataset.text = settings.textSize;
  root.dataset.a11y = settings.accessibility ? "on" : "off";
}
