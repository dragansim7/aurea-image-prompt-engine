import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { type PointerEvent, useEffect, useRef, useState } from "react";
import { Button, Chip } from "@/components/ui";
import type { PreviewFit } from "@/lib/types";

type Props = {
  src: string;
  name: string;
  width: number;
  height: number;
  fit: PreviewFit;
  referenceOnly: boolean;
};

export function Stage({ src, name, width, height, fit, referenceOnly }: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number; scale: number } | null>(null);
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  }, [src, fit]);

  useEffect(() => {
    const node = frame.current;
    if (!node) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      setScale((current) => clamp(current * (event.deltaY < 0 ? 1.08 : 0.92), 1, 6));
    };
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, []);

  function reset() {
    setScale(1);
    setPos({ x: 0, y: 0 });
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), scale };
      drag.current = null;
      return;
    }
    drag.current = { x: event.clientX, y: event.clientY, px: pos.x, py: pos.y };
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.current.size >= 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      setScale(clamp((pinch.current.scale * dist) / Math.max(1, pinch.current.dist), 1, 6));
      return;
    }
    if (!drag.current || scale <= 1) return;
    setPos({
      x: drag.current.px + event.clientX - drag.current.x,
      y: drag.current.py + event.clientY - drag.current.y,
    });
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    pointers.current.delete(event.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    if (pointers.current.size === 0) drag.current = null;
  }

  const ratio = width / height;
  const shape = Math.abs(ratio - 1) < 0.06 ? "Square" : ratio > 1.7 ? "Wide" : ratio < 0.62 ? "Tall" : ratio > 1 ? "Horizontal" : "Vertical";

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <div
        ref={frame}
        className="relative min-h-96 w-full flex-1 overflow-hidden rounded-xl border border-line bg-subtle frame-shadow touch-none lg:min-h-0"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={reset}
      >
        <img
          src={src}
          alt={name}
          draggable={false}
          className={fit === "cover" && scale === 1 ? "absolute inset-0 h-full w-full object-cover" : "absolute inset-0 h-full w-full object-contain"}
          style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})` }}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Chip>{shape}</Chip>
        <Chip>
          <span className="tabular-nums">
            {width} × {height}
          </span>
        </Chip>
        {referenceOnly ? <Chip>Saved reference</Chip> : null}
        <div className="ml-auto flex items-center gap-1">
          <Button size="sm" aria-label="Zoom out" onClick={() => setScale((current) => clamp(current / 1.2, 1, 6))}>
            <ZoomOut className="size-4" />
          </Button>
          <span className="w-12 text-center text-xs tabular-nums text-muted">{Math.round(scale * 100)}%</span>
          <Button size="sm" aria-label="Zoom in" onClick={() => setScale((current) => clamp(current * 1.2, 1, 6))}>
            <ZoomIn className="size-4" />
          </Button>
          <Button size="sm" aria-label="Reset view" onClick={reset}>
            <RotateCcw className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
