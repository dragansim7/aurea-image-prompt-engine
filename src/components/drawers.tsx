import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { Button, FieldLabel, RangeField, Segmented, ToggleRow } from "@/components/ui";
import { PRESETS } from "@/lib/presets";
import { defaultSettings, type HistoryItem, type Settings } from "@/lib/types";

export function Drawer({
  open,
  onOpenChange,
  title,
  description,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="veil fixed inset-0 z-40 bg-bg/70" />
        <Dialog.Content className="drawer fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-line bg-surface outline-none">
          <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
            <div>
              <Dialog.Title className="font-display text-2xl tracking-tight">{title}</Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted">{description}</Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <Button size="sm" aria-label="Close">
                <X className="size-4" />
              </Button>
            </Dialog.Close>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function SettingsDrawer({
  open,
  onOpenChange,
  settings,
  onChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: Settings;
  onChange: (settings: Settings) => void;
}) {
  const set = <K extends keyof Settings>(key: K, value: Settings[K]) => onChange({ ...settings, [key]: value });
  return (
    <Drawer open={open} onOpenChange={onOpenChange} title="Settings" description="How drafts are shaped, and how the studio looks.">
      <FieldLabel>Theme</FieldLabel>
      <Segmented
        label="Theme"
        value={settings.theme}
        onChange={(theme) => set("theme", theme)}
        options={[
          { value: "dark", label: "Dark" },
          { value: "light", label: "Light" },
          { value: "system", label: "System" },
        ]}
      />
      <div className="mt-5">
        <FieldLabel>Prompt length</FieldLabel>
        <Segmented
          label="Prompt length"
          value={settings.length}
          onChange={(length) => set("length", length)}
          options={[
            { value: "brief", label: "Brief" },
            { value: "standard", label: "Standard" },
            { value: "extended", label: "Extended" },
          ]}
        />
      </div>
      <div className="mt-5">
        <FieldLabel>Detail</FieldLabel>
        <Segmented
          label="Detail level"
          value={settings.detail}
          onChange={(detail) => set("detail", detail)}
          options={[
            { value: "lean", label: "Lean" },
            { value: "balanced", label: "Balanced" },
            { value: "exhaustive", label: "Full" },
          ]}
        />
      </div>
      <div className="mt-5">
        <RangeField label="Creativity" value={settings.creativity} onChange={(creativity) => set("creativity", creativity)} />
        <p className="text-sm text-muted">Low stays with what was seen. High adds the preset’s style language.</p>
      </div>
      <div className="mt-5">
        <FieldLabel>Output format</FieldLabel>
        <Segmented
          label="Output format"
          value={settings.format}
          onChange={(format) => set("format", format)}
          options={[
            { value: "paragraph", label: "Paragraph" },
            { value: "comma", label: "Tags" },
            { value: "template", label: "Template" },
          ]}
        />
      </div>
      <div className="mt-5">
        <FieldLabel>Preset</FieldLabel>
        <div className="grid grid-cols-2 gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => set("preset", preset.id)}
              className={
                preset.id === settings.preset
                  ? "press rounded-md border border-fg bg-fg px-3 py-2 text-left text-bg"
                  : "press rounded-md border border-line bg-bg px-3 py-2 text-left"
              }
            >
              <span className="block text-sm font-medium">{preset.label}</span>
              <span className={preset.id === settings.preset ? "block text-xs opacity-80" : "block text-xs text-muted"}>{preset.blurb}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 border-t border-line">
        <ToggleRow id="auto-copy" label="Copy after reading" hint="Places the new prompt on the clipboard." checked={settings.autoCopy} onCheckedChange={(autoCopy) => set("autoCopy", autoCopy)} />
        <ToggleRow id="negative-default" label="Show negative prompt" checked={settings.includeNegative} onCheckedChange={(includeNegative) => set("includeNegative", includeNegative)} />
        <ToggleRow id="a11y" label="Stronger contrast" hint="Darkens secondary text and borders." checked={settings.accessibility} onCheckedChange={(accessibility) => set("accessibility", accessibility)} />
      </div>
      <div className="mt-5">
        <FieldLabel>Text size</FieldLabel>
        <Segmented
          label="Text size"
          value={settings.textSize}
          onChange={(textSize) => set("textSize", textSize)}
          options={[
            { value: "sm", label: "Small" },
            { value: "md", label: "Default" },
            { value: "lg", label: "Large" },
          ]}
        />
      </div>
      <div className="mt-5">
        <FieldLabel>Image preview</FieldLabel>
        <Segmented
          label="Image preview"
          value={settings.previewFit}
          onChange={(previewFit) => set("previewFit", previewFit)}
          options={[
            { value: "contain", label: "Fit" },
            { value: "cover", label: "Fill" },
          ]}
        />
      </div>
      <Button className="mt-6" onClick={() => onChange({ ...defaultSettings, theme: settings.theme })}>
        Reset preferences
      </Button>
    </Drawer>
  );
}

export function HistoryDrawer({
  open,
  onOpenChange,
  items,
  favoritesOnly,
  onFavoritesOnly,
  onOpen,
  onToggleFavorite,
  onDelete,
  onClear,
  confirmClear,
  onConfirmClear,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: HistoryItem[];
  favoritesOnly: boolean;
  onFavoritesOnly: (value: boolean) => void;
  onOpen: (item: HistoryItem) => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
  confirmClear: boolean;
  onConfirmClear: (value: boolean) => void;
}) {
  const visible = favoritesOnly ? items.filter((item) => item.favorite) : items;
  return (
    <Drawer open={open} onOpenChange={onOpenChange} title="History" description="Readings stay on this device. Full images are not kept.">
      <ToggleRow id="favorites-only" label="Favorites only" checked={favoritesOnly} onCheckedChange={onFavoritesOnly} />
      {visible.length === 0 ? (
        <p className="py-8 text-sm text-muted">{items.length === 0 ? "No readings yet." : "No favorites yet."}</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {visible.map((item) => (
            <li key={item.id} className="rounded-lg border border-line bg-bg p-3">
              <button type="button" onClick={() => onOpen(item)} className="flex w-full gap-3 text-left">
                <img src={item.thumb} alt="" className="h-16 w-16 shrink-0 rounded-sm object-cover" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{item.fileName}</span>
                  <span className="mt-1 block text-xs text-muted">
                    {new Date(item.createdAt).toLocaleString()} · {item.reading.mode === "vision" ? "Vision" : "Measured"}
                  </span>
                </span>
              </button>
              <div className="mt-3 flex gap-2">
                <Button size="sm" onClick={() => onToggleFavorite(item.id)}>
                  {item.favorite ? "Unfavorite" : "Favorite"}
                </Button>
                <Button size="sm" onClick={() => onDelete(item.id)}>
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {items.length > 0 ? (
        <div className="mt-6 border-t border-line pt-4">
          {confirmClear ? (
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" onClick={onClear}>
                Clear all readings
              </Button>
              <Button onClick={() => onConfirmClear(false)}>Cancel</Button>
            </div>
          ) : (
            <Button onClick={() => onConfirmClear(true)}>Clear history</Button>
          )}
        </div>
      ) : null}
    </Drawer>
  );
}
