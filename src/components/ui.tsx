import * as Slider from "@radix-ui/react-slider";
import * as Switch from "@radix-ui/react-switch";
import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "quiet" | "ghost";
  size?: "md" | "sm";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "quiet", size = "md", className, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "press inline-flex items-center justify-center gap-2 rounded-sm font-medium disabled:cursor-not-allowed disabled:opacity-40",
        size === "md" ? "h-11 px-4 text-sm" : "h-9 px-3 text-xs",
        variant === "primary" && "bg-fg text-bg hover:opacity-90",
        variant === "quiet" && "border border-line bg-subtle text-fg hover:bg-surface",
        variant === "ghost" && "text-muted hover:text-fg",
        className,
      )}
      {...props}
    />
  );
});

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex h-6 items-center rounded-full border border-line px-2 text-xs text-muted", className)}>
      {children}
    </span>
  );
}

export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn("grid gap-1 rounded-md bg-subtle p-1", options.length === 2 ? "grid-cols-2" : "grid-cols-3")}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "press h-9 rounded-sm px-2 text-sm",
              active ? "bg-surface text-fg" : "text-muted hover:text-fg",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function FieldLabel({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <div className="mb-2 flex items-baseline justify-between gap-3">
      <span className="text-sm font-medium">{children}</span>
      {hint ? <span className="text-xs text-faint">{hint}</span> : null}
    </div>
  );
}

export function ToggleRow({
  id,
  label,
  hint,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  hint?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        {hint ? <p className="text-sm text-muted">{hint}</p> : null}
      </div>
      <Switch.Root
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="relative h-7 w-12 shrink-0 rounded-full border border-line bg-subtle data-[state=checked]:bg-fg"
      >
        <Switch.Thumb className="block size-5 translate-x-1 rounded-full bg-fg transition-transform duration-150 data-[state=checked]:translate-x-6 data-[state=checked]:bg-bg" />
      </Switch.Root>
    </div>
  );
}

export function RangeField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <FieldLabel hint={String(value)}>{label}</FieldLabel>
      <Slider.Root
        className="relative flex h-11 w-full touch-none items-center"
        min={0}
        max={100}
        step={1}
        value={[value]}
        onValueChange={(next) => onChange(next[0] ?? 0)}
        aria-label={label}
      >
        <Slider.Track className="relative h-px grow bg-line-strong">
          <Slider.Range className="absolute h-px bg-fg" />
        </Slider.Track>
        <Slider.Thumb className="block size-4 rounded-full border border-line-strong bg-fg" />
      </Slider.Root>
    </div>
  );
}
