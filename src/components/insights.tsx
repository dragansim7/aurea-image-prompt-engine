import { Chip } from "@/components/ui";
import { isUseful } from "@/lib/compose-prompt";
import type { Finding, Measured, Reading } from "@/lib/types";

export function Insights({
  measured,
  reading,
  pending,
  step,
}: {
  measured: Measured | null;
  reading: Reading | null;
  pending: boolean;
  step: string;
}) {
  if (!measured) {
    return (
      <div className="p-5 sm:p-8 lg:pt-10">
        <p className="font-display text-3xl leading-tight tracking-tight">Nothing on the desk yet.</p>
        <p className="mt-3 max-w-sm text-sm text-muted">
          Choose an image. Color, light, and frame are measured here. A vision reading adds subject, materials, and a prompt.
        </p>
      </div>
    );
  }

  const vision = reading?.mode === "vision" ? reading : null;
  const uncertain = vision
    ? [vision.subject, vision.scene, vision.lighting, vision.materials, vision.composition].some((item) => item.confidence === "low") ||
      vision.uncertainties.length > 0
    : false;

  return (
    <div className="flex flex-col gap-3 p-4 sm:p-5">
      {pending ? (
        <div className="rise rounded-lg border border-line bg-surface p-4">
          <p className="text-sm font-medium">{step}</p>
          <div className="rail mt-3" aria-hidden="true">
            <span />
          </div>
        </div>
      ) : null}

      {uncertain ? (
        <p className="text-sm text-muted">Uncertain findings are labeled. They are not stated as fact.</p>
      ) : null}

      {vision ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <FindingCard title="Subject" finding={vision.subject} />
          <FindingCard title="Scene" finding={vision.scene} />
          <FindingCard title="Lighting" finding={vision.lighting} />
          <FindingCard title="Composition" finding={vision.composition} />
          <FindingCard title="Materials" finding={vision.materials} />
          <FindingCard title="Texture" finding={vision.texture} />
          <FindingCard title="Mood" finding={vision.mood} />
          <FindingCard title="Style cues" finding={vision.style} />
          {isUseful(vision.camera) ? <FindingCard title="Camera feel" finding={vision.camera} /> : null}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          <PlainCard title="Light" body={`${measured.light} ${measured.contrastNote}`} meta="Seen · Clear" />
          <PlainCard title="Frame" body={measured.frame} meta="Seen · Likely" />
          <PlainCard title="Surface" body={measured.detail} meta="Seen · Likely" />
        </div>
      )}

      {vision && vision.objects.length ? (
        <section className="rise rounded-lg border border-line bg-surface p-4">
          <h3 className="text-sm font-medium">Objects</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {vision.objects.map((object) => (
              <Chip key={object.name}>
                {object.name}
                {object.confidence === "low" ? " · uncertain" : ""}
              </Chip>
            ))}
          </div>
        </section>
      ) : null}

      <section className="rise rounded-lg border border-line bg-surface p-4 sm:col-span-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-medium">Palette</h3>
          <Chip>Measured</Chip>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {measured.palette.map((swatch) => (
            <div key={swatch.hex}>
              <div className="h-10 rounded-sm border border-line" style={{ backgroundColor: swatch.hex }} />
              <p className="mt-2 text-xs text-muted">{swatch.name}</p>
              <p className="font-mono text-xs text-faint">{swatch.hex}</p>
            </div>
          ))}
        </div>
      </section>

      {vision?.visibleText ? (
        <section className="rise rounded-lg border border-line bg-surface p-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-medium">Visible text</h3>
            <Chip>Read from image</Chip>
          </div>
          <p className="mt-2 whitespace-pre-wrap text-sm text-muted">{vision.visibleText}</p>
        </section>
      ) : vision ? (
        <p className="text-sm text-faint">No readable text was found in the image.</p>
      ) : null}

      {(vision?.qualityNotes.length || !vision) ? (
        <section className="rise rounded-lg border border-line bg-surface p-4">
          <h3 className="text-sm font-medium">Quality notes</h3>
          <ul className="mt-2 flex flex-col gap-2 text-sm text-muted">
            {(vision?.qualityNotes ?? []).map((note) => (
              <li key={note.text}>{note.text}</li>
            ))}
            {!vision ? <li>{measured.detail}</li> : null}
          </ul>
        </section>
      ) : null}

      {vision && vision.uncertainties.length ? (
        <section className="rise rounded-lg border border-line bg-surface p-4">
          <h3 className="text-sm font-medium">Uncertainties</h3>
          <ul className="mt-2 flex flex-col gap-2 text-sm text-muted">
            {vision.uncertainties.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function FindingCard({ title, finding }: { title: string; finding: Finding }) {
  return (
    <article className="rise rounded-lg border border-line bg-surface p-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium">{title}</h3>
        <div className="flex shrink-0 gap-1">
          <Chip>{finding.source === "observed" ? "Seen" : "Inferred"}</Chip>
          <Chip>{finding.confidence === "low" ? "Uncertain" : finding.confidence === "medium" ? "Likely" : "Clear"}</Chip>
        </div>
      </div>
      <p className="mt-2 text-sm text-muted">{finding.text || "Not available."}</p>
    </article>
  );
}

function PlainCard({ title, body, meta }: { title: string; body: string; meta: string }) {
  return (
    <article className="rise rounded-lg border border-line bg-surface p-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium">{title}</h3>
        <Chip>{meta}</Chip>
      </div>
      <p className="mt-2 text-sm text-muted">{body}</p>
    </article>
  );
}
