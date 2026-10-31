import type { ReactNode } from "react";

export function SectionHeading({
  index,
  jp,
  title,
  aside,
}: {
  index: string;
  jp: string;
  title: string;
  aside?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 border-t border-ink pt-4 md:mb-12 md:flex-row md:items-end md:justify-between">
      <div className="flex items-start gap-4 md:gap-6">
        <span className="label-caps pt-1.5 text-signal">{index}</span>
        <div>
          <p className="font-jp text-xs text-muted-foreground">{jp}</p>
          <h2 className="font-display mt-1 text-[2.6rem] md:text-6xl">{title}</h2>
        </div>
      </div>
      {aside}
    </div>
  );
}
