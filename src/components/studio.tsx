import { useEffect, useRef, useState } from "react";
import { HistoryDrawer, SettingsDrawer } from "@/components/drawers";
import { Insights } from "@/components/insights";
import { PromptDesk } from "@/components/prompt-desk";
import { Stage } from "@/components/stage";
import { Button } from "@/components/ui";
import { analyzeImage, visionStatus } from "@/lib/analyze";
import { composePrompt } from "@/lib/compose-prompt";
import { download, toMarkdown, toPlain } from "@/lib/export-note";
import { ImageReadError, prepareImage, type PreparedImage } from "@/lib/measure";
import { PRESETS, presetById } from "@/lib/presets";
import { measuredReading, visionReading } from "@/lib/reading";
import { applyTheme, loadStore, saveStore } from "@/lib/storage";
import type { HistoryItem, Measured, Reading, Settings } from "@/lib/types";
import { defaultSettings } from "@/lib/types";
import { cn } from "@/lib/cn";

type Session = {
  fileName: string;
  previewUrl: string;
  objectUrl: string | null;
  width: number;
  height: number;
  jpegBase64: string | null;
  thumb: string;
  measured: Measured;
  reading: Reading | null;
  prompt: string;
  negative: string;
  dirty: boolean;
  historyId: string | null;
};

const STEPS = [
  "Framing the image",
  "Reading light and material",
  "Separating what is seen from what is inferred",
  "Drafting language",
];

export function Studio() {
  const inputRef = useRef<HTMLInputElement>(null);
  const generation = useRef(0);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [pending, setPending] = useState(false);
  const [step, setStep] = useState(STEPS[0]);
  const [error, setError] = useState<string | null>(null);
  const [visionAvailable, setVisionAvailable] = useState(true);
  const [copied, setCopied] = useState<"prompt" | "negative" | null>(null);
  const [over, setOver] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    const store = loadStore();
    setSettings(store.settings);
    setHistory(store.history);
    applyTheme(store.settings);
    setReady(true);
    let cancel = false;
    visionStatus()
      .then((result) => {
        if (!cancel) setVisionAvailable(result.available);
      })
      .catch(() => {
        if (!cancel) setVisionAvailable(false);
      });
    return () => {
      cancel = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveStore({ settings, history });
    applyTheme(settings);
  }, [settings, history, ready]);

  useEffect(() => {
    const url = session?.objectUrl;
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [session?.objectUrl]);

  useEffect(() => {
    if (!pending) return;
    setStep(STEPS[0]);
    let index = 0;
    const timer = window.setInterval(() => {
      index = Math.min(STEPS.length - 1, index + 1);
      setStep(STEPS[index]);
    }, 900);
    return () => window.clearInterval(timer);
  }, [pending]);

  useEffect(() => {
    if (!session?.historyId) return;
    const id = session.historyId;
    const prompt = session.prompt;
    const negative = session.negative;
    const timer = window.setTimeout(() => {
      setHistory((prev) =>
        prev.map((item) => (item.id === id ? { ...item, prompt, negative, preset: settings.preset, format: settings.format } : item)),
      );
    }, 400);
    return () => window.clearTimeout(timer);
  }, [session?.historyId, session?.prompt, session?.negative, settings.preset, settings.format]);

  function openPicker() {
    inputRef.current?.click();
  }

  async function takeFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    try {
      const prepared = await prepareImage(file);
      adopt(prepared);
    } catch (err) {
      setError(err instanceof ImageReadError ? err.message : "That file could not be opened.");
    }
  }

  function adopt(prepared: PreparedImage) {
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
      historyId: null,
    });
  }

  function commit(next: Session & { reading: Reading }) {
    const id = next.historyId ?? crypto.randomUUID();
    setHistory((prev) => {
      const existing = prev.find((item) => item.id === id);
      const row: HistoryItem = {
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
        format: settings.format,
      };
      const rest = prev.filter((item) => item.id !== id);
      return [row, ...rest].slice(0, 30);
    });
    setSession({ ...next, historyId: id });
    if (settings.autoCopy && next.prompt.trim()) void copyText(next.prompt, "prompt");
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
        dirty: current.dirty,
      });
      return;
    }
    if (!current.jpegBase64) return;
    setPending(true);
    try {
      const result = await analyzeImage({
        data: {
          imageBase64: current.jpegBase64,
          width: current.width,
          height: current.height,
          palette: current.measured.palette.map((swatch) => swatch.hex),
          light: current.measured.light,
          contrastNote: current.measured.contrastNote,
        },
      });
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
        dirty: current.dirty,
      });
    } catch {
      if (token !== generation.current) return;
      setError("The reading could not be completed. You can try again, or draft from the measurement.");
    } finally {
      if (token === generation.current) setPending(false);
    }
  }

  function applySettings(next: Settings) {
    const rebuild =
      next.length !== settings.length ||
      next.detail !== settings.detail ||
      next.creativity !== settings.creativity ||
      next.format !== settings.format ||
      next.preset !== settings.preset;
    setSettings(next);
    if (!rebuild || !session?.reading) return;
    const draft = composePrompt(session.reading, next, session.measured.palette);
    setSession({ ...session, prompt: draft.prompt, negative: draft.negative, dirty: false });
  }

  function restore() {
    if (!session?.reading) return;
    const draft = composePrompt(session.reading, settings, session.measured.palette);
    setSession({ ...session, prompt: draft.prompt, negative: draft.negative, dirty: false });
  }

  async function copyText(text: string, which: "prompt" | "negative") {
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
    window.setTimeout(() => setCopied((current) => (current === which ? null : current)), 1800);
  }

  function exportBundle() {
    if (!session?.reading) return null;
    return {
      fileName: session.fileName,
      prompt: session.prompt,
      negative: settings.includeNegative ? session.negative : "",
      reading: session.reading,
      measured: session.measured,
      createdAt: Date.now(),
    };
  }

  function slug(name: string) {
    return name.replace(/\.[^.]+$/, "").replace(/[^\w-]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "aurea";
  }

  function openHistory(item: HistoryItem) {
    setSettings((current) => ({ ...current, preset: item.preset, format: item.format }));
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
      historyId: item.id,
    });
    setHistoryOpen(false);
    setError(null);
  }

  const favorite = history.some((item) => item.id === session?.historyId && item.favorite);
  const preset = presetById(settings.preset);
  const shape = `${settings.length === "brief" ? "Brief" : settings.length === "extended" ? "Extended" : "Standard"} · ${
    settings.detail === "lean" ? "Lean" : settings.detail === "exhaustive" ? "Full" : "Balanced"
  } · Creativity ${settings.creativity}`;

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg lg:h-dvh">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6">
        <div>
          <h1 className="font-display text-2xl leading-none tracking-tight">
            Aurea <span className="text-muted">Vision</span>
          </h1>
          <p className="mt-1 text-sm text-muted">Read an image. Draft a prompt.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setHistoryOpen(true)}>History</Button>
          <Button onClick={() => setSettingsOpen(true)}>Settings</Button>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)] lg:overflow-hidden">
        <section
          className={cn("flex min-h-0 min-w-0 flex-col gap-4 border-b border-line p-4 sm:p-6 lg:overflow-y-auto lg:border-r lg:border-b-0", over && "bg-subtle")}
          onDragOver={(event) => {
            event.preventDefault();
            setOver(true);
          }}
          onDragLeave={() => setOver(false)}
          onDrop={(event) => {
            event.preventDefault();
            setOver(false);
            void takeFile(event.dataTransfer.files?.[0]);
          }}
        >
          {session ? (
            <Stage
              src={session.previewUrl}
              name={session.fileName}
              width={session.width}
              height={session.height}
              fit={settings.previewFit}
              referenceOnly={!session.jpegBase64}
            />
          ) : (
            <button
              type="button"
              onClick={openPicker}
              className="press flex min-h-96 flex-1 flex-col items-start justify-end rounded-xl border border-line bg-surface p-6 text-left frame-shadow lg:min-h-0"
            >
              <span className="font-display text-4xl leading-none tracking-tight">Place an image</span>
              <span className="mt-3 max-w-sm text-sm text-muted">
                JPEG, PNG, WebP, or GIF from this device. The original stays here. A smaller copy is used for the reading.
              </span>
              <span className="mt-6 inline-flex h-11 items-center rounded-sm bg-fg px-4 text-sm font-medium text-bg">Choose image</span>
            </button>
          )}

          {session ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <p className="truncate text-sm text-muted">{session.fileName}</p>
                <Button size="sm" onClick={openPicker}>
                  Replace
                </Button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {PRESETS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => applySettings({ ...settings, preset: item.id })}
                    className={cn(
                      "press h-11 shrink-0 rounded-full border px-4 text-sm",
                      item.id === settings.preset ? "border-fg bg-fg text-bg" : "border-line bg-surface text-fg",
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              {preset.id === "fantasy" || preset.id === "concept" ? (
                <p className="text-sm text-faint">This preset adds a style direction. It does not change what the cards mark as seen.</p>
              ) : null}
              <Button variant="primary" onClick={() => void readImage()} disabled={pending || !session.jpegBase64} aria-busy={pending}>
                {pending ? "Reading" : !session.jpegBase64 ? "Original file needed" : !visionAvailable ? "Draft from measurement" : session.reading ? "Read again" : "Read image"}
              </Button>
              {!session.jpegBase64 ? (
                <p className="text-sm text-muted">This is a saved reference. Open the original file to read it again.</p>
              ) : (
                <p className="text-sm text-faint">
                  {visionAvailable
                    ? "One reading of a reduced copy. You can edit the prompt before copying."
                    : "Vision reading is unavailable. A draft can still be built from measured color, light, and frame."}
                </p>
              )}
              {error ? (
                <div role="alert" className="rounded-md border border-line bg-surface p-3">
                  <p className="text-sm text-danger">{error}</p>
                  {session.jpegBase64 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button size="sm" onClick={() => void readImage()}>
                        Try again
                      </Button>
                      {visionAvailable ? (
                        <Button
                          size="sm"
                          onClick={() => void readImage(true)}
                        >
                          Use measurement only
                        </Button>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : error ? (
            <p role="alert" className="text-sm text-danger">
              {error}
            </p>
          ) : null}
        </section>

        <section className="flex min-h-0 min-w-0 flex-col lg:overflow-hidden">
          <div className="lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
            <Insights measured={session?.measured ?? null} reading={session?.reading ?? null} pending={pending} step={step} />
          </div>
          <PromptDesk
            reading={session?.reading ?? null}
            prompt={session?.prompt ?? ""}
            negative={session?.negative ?? ""}
            format={settings.format}
            includeNegative={settings.includeNegative}
            dirty={Boolean(session?.dirty)}
            copied={copied}
            favorite={favorite}
            shape={shape}
            onFormat={(format) => applySettings({ ...settings, format })}
            onPrompt={(prompt) => session && setSession({ ...session, prompt, dirty: true })}
            onNegative={(negative) => session && setSession({ ...session, negative, dirty: true })}
            onToggleNegative={(includeNegative) => setSettings({ ...settings, includeNegative })}
            onCopy={() => session?.prompt && void copyText(session.prompt, "prompt")}
            onCopyNegative={() => session?.negative && void copyText(session.negative, "negative")}
            onExportText={() => {
              const bundle = exportBundle();
              if (bundle) download(`${slug(bundle.fileName)}.txt`, toPlain(bundle), "text/plain");
            }}
            onExportMarkdown={() => {
              const bundle = exportBundle();
              if (bundle) download(`${slug(bundle.fileName)}.md`, toMarkdown(bundle), "text/markdown");
            }}
            onFavorite={() => {
              if (!session?.historyId) return;
              const id = session.historyId;
              setHistory((prev) => prev.map((item) => (item.id === id ? { ...item, favorite: !item.favorite } : item)));
            }}
            onRestore={restore}
            onOpenSettings={() => setSettingsOpen(true)}
          />
        </section>
      </div>

      {session?.prompt ? (
        <div className="dock sticky bottom-0 z-30 border-t border-line bg-bg px-4 py-3 lg:hidden">
          <Button variant="primary" className="w-full" onClick={() => void copyText(session.prompt, "prompt")}>
            {copied === "prompt" ? "Copied" : "Copy prompt"}
          </Button>
        </div>
      ) : null}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="sr-only"
        onChange={(event) => {
          void takeFile(event.target.files?.[0]);
          event.target.value = "";
        }}
      />

      <SettingsDrawer open={settingsOpen} onOpenChange={setSettingsOpen} settings={settings} onChange={applySettings} />
      <HistoryDrawer
        open={historyOpen}
        onOpenChange={setHistoryOpen}
        items={history}
        favoritesOnly={favoritesOnly}
        onFavoritesOnly={setFavoritesOnly}
        onOpen={openHistory}
        onToggleFavorite={(id) => setHistory((prev) => prev.map((item) => (item.id === id ? { ...item, favorite: !item.favorite } : item)))}
        onDelete={(id) => {
          setHistory((prev) => prev.filter((item) => item.id !== id));
          setSession((current) => (current?.historyId === id ? { ...current, historyId: null } : current));
        }}
        onClear={() => {
          setHistory([]);
          setConfirmClear(false);
        }}
        confirmClear={confirmClear}
        onConfirmClear={setConfirmClear}
      />
    </div>
  );
}
