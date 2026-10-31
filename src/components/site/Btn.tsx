import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const btn = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-condensed text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-200 disabled:pointer-events-none disabled:opacity-40 rounded-sm",
  {
    variants: {
      variant: {
        signal: "bg-signal text-signal-foreground hover:bg-ink",
        ink: "bg-ink text-ink-foreground hover:bg-signal",
        outline: "border border-ink text-ink hover:bg-ink hover:text-ink-foreground",
        outlineLight: "border border-paper/70 text-paper hover:bg-paper hover:text-ink",
        whatsapp: "bg-whatsapp text-signal-foreground hover:bg-ink",
        ghost: "text-ink hover:text-signal",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6",
        lg: "h-14 px-8 text-[0.95rem]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "ink", size: "md" },
  },
);

export type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof btn>;

export function Btn({ className, variant, size, ...props }: BtnProps) {
  return <button className={cn(btn({ variant, size }), className)} {...props} />;
}
