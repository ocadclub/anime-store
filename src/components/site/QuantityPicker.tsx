import { Minus, Plus } from "lucide-react";

export function QuantityPicker({
  value,
  onChange,
  size = "md",
}: {
  value: number;
  onChange: (v: number) => void;
  size?: "sm" | "md";
}) {
  const h = size === "sm" ? "h-9" : "h-12";
  const w = size === "sm" ? "w-9" : "w-12";
  return (
    <div
      className={`inline-flex ${h} items-stretch rounded-sm border border-ink`}
      role="group"
      aria-label="Quantité"
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
        className={`grid ${w} place-items-center transition-colors hover:bg-ink hover:text-ink-foreground disabled:opacity-30`}
        aria-label="Diminuer la quantité"
      >
        <Minus className="h-4 w-4" />
      </button>
      <output
        className="grid min-w-10 place-items-center font-condensed text-base font-bold"
        aria-live="polite"
      >
        {value}
      </output>
      <button
        type="button"
        onClick={() => onChange(Math.min(20, value + 1))}
        disabled={value >= 20}
        className={`grid ${w} place-items-center transition-colors hover:bg-ink hover:text-ink-foreground disabled:opacity-30`}
        aria-label="Augmenter la quantité"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
