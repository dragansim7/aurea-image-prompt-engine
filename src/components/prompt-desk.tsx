import { Check, Copy, Star } from "lucide-react";
import { Button, Chip, Segmented, ToggleRow } from "@/components/ui";
import { wordCount } from "@/lib/compose-prompt";
import type { OutputFormat, Reading } from "@/lib/types";

export function PromptDesk({
  reading,
  prompt,
  negative,
  format,
  includeNegative,
  dirty,
  copied,
  favorite,
  onFormat,
  onPrompt,
  onNegative,
  onToggleNegative,
  onCopy,
  onCopyNegative,
  onExportText,
  onExportMarkdown,
  onFavorite,
  onRestore,
  onOpenSettings,
  shape,
}: {
  reading: Reading | null;
  prompt: string;
  negative: string;
  format: OutputFormat;
  includeNegative: boolean;
  dirty: boolean;
  copied: "prompt" | "negative" | null;
  favorite: boolean;
  onFormat: (format: OutputFormat) => void;
  onPrompt: (value: string) => void;
  onNegative: (value: string) => void;
  onToggleNegative: (value: boolean) => void;
  onCopy: () => void;
  onCopyNegative: () => void;
  onExportText: () => void;
  onExportMarkdown: () => void;
  onFavorite: () => void;
  onRestore: () => void;
  onOpenSettings: () => void;
  shape: string;
}) {
  return (
    <section className="border-t border-line bg-bg p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl leading-none tracking-tight">Prompt</h2>
          <p className="mt-2 text-sm text-muted">
            {reading?.mode === "vision"
              ? "Edit freely. Cards keep seen details separate from inferred style."
              : reading?.mode === "measured"
                ? "Measured draft only. Subject, scene, and materials were not identified."
                : "A prompt appears after you read the image."}
          </p>
        </div>
        <Button variant="primary" onClick={onCopy} disabled={!prompt.trim()} aria-live="polite">
          {copied === "prompt" ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied === "prompt" ? "Copied" : "Copy"}
        </Button>
      </div>

      <div className="mt-4">
        <Segmented
          label="Prompt format"
          value={format}
          onChange={onFormat}
          options={[
            { value: "paragraph", label: "Paragraph" },
            { value: "comma", label: "Tags" },
            { value: "template", label: "Template" },
          ]}
        />
      </div>

      <label className="mt-3 block">
        <span className="sr-only">Generated prompt</span>
        <textarea
          value={prompt}
          onChange={(event) => onPrompt(event.target.value)}
          rows={8}
          placeholder="The draft will land here."
          className="w-full resize-y rounded-md border border-line bg-surface p-3 text-sm leading-relaxed text-fg placeholder:text-faint"
        />
      </label>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <Chip>
          <span className="tabular-nums">{wordCount(prompt)} words</span>
        </Chip>
        {dirty && reading ? <Chip>Custom wording</Chip> : null}
        <button type="button" onClick={onOpenSettings} className="text-sm text-muted underline-offset-4 hover:text-fg hover:underline">
          {shape}
        </button>
        {dirty && reading ? (
          <button type="button" onClick={onRestore} className="text-sm text-muted underline-offset-4 hover:text-fg hover:underline">
            Rebuild
          </button>
        ) : null}
      </div>

      <div className="mt-2 border-t border-line">
        <ToggleRow
          id="negative-prompt"
          label="Negative prompt"
          hint="A filter list for generators. It is not a description of this image."
          checked={includeNegative}
          onCheckedChange={onToggleNegative}
        />
      </div>
      {includeNegative ? (
        <div>
          <textarea
            value={negative}
            onChange={(event) => onNegative(event.target.value)}
            rows={3}
            aria-label="Negative prompt"
            className="w-full resize-y rounded-md border border-line bg-surface p-3 text-sm leading-relaxed text-fg"
          />
          <Button size="sm" className="mt-2" onClick={onCopyNegative} disabled={!negative.trim()}>
            {copied === "negative" ? "Copied" : "Copy negative"}
          </Button>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" onClick={onExportText} disabled={!prompt.trim()}>
          Export text
        </Button>
        <Button size="sm" onClick={onExportMarkdown} disabled={!reading}>
          Export markdown
        </Button>
        <Button size="sm" onClick={onFavorite} disabled={!reading} aria-pressed={favorite}>
          <Star className={favorite ? "size-4 fill-current" : "size-4"} />
          {favorite ? "Favorited" : "Favorite"}
        </Button>
      </div>
      <p className="sr-only" role="status">
        {copied === "prompt" ? "Prompt copied." : copied === "negative" ? "Negative prompt copied." : ""}
      </p>
    </section>
  );
}
