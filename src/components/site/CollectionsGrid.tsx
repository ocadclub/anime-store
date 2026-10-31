import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, productsInCategory, type Category } from "@/lib/products";
import itachi from "@/assets/itachi.jpg.asset.json";
import deathnote from "@/assets/deathnote.jpg.asset.json";
import minato from "@/assets/minato.jpg.asset.json";
import { cn } from "@/lib/utils";

const IMAGE_FOR: Partial<Record<Category["slug"], { src: string; position: string }>> = {
  vetements: { src: itachi.url, position: "50% 30%" },
  goodies: { src: deathnote.url, position: "50% 40%" },
  nouveautes: { src: minato.url, position: "70% 30%" },
  accessoires: { src: "/assets/products/chapeau-luffy.jpg", position: "50% 50%" },
  "porte-cles": { src: "/assets/products/porte-cle-katana.jpg", position: "50% 50%" },
};

/** Editorial layout: visually balanced modular grid for Dakar's premier anime boutique. */
const LAYOUT: Record<Category["slug"], string> = {
  vetements: "md:col-span-7 md:row-span-2 aspect-[4/5] md:aspect-auto",
  nouveautes: "md:col-span-5 aspect-[4/3] md:aspect-auto",
  goodies: "md:col-span-5 aspect-[4/3] md:aspect-auto",
  accessoires: "md:col-span-4 aspect-[4/3] md:aspect-[4/3]",
  bijoux: "md:col-span-4 aspect-[4/3] md:aspect-[4/3]",
  "porte-cles": "md:col-span-4 aspect-[4/3] md:aspect-[4/3]",
};

function Tile({ cat, index }: { cat: Category; index: number }) {
  const img = IMAGE_FOR[cat.slug];
  const count = productsInCategory(cat.slug).length;
  const common = cn("group relative flex overflow-hidden rounded-xs", LAYOUT[cat.slug]);

  if (img && count > 0) {
    return (
      <Link
        to="/boutique"
        search={{ cat: cat.slug }}
        className={cn(common, "bg-ink text-ink-foreground")}
      >
        <img
          src={img.src}
          alt={cat.name}
          loading="lazy"
          style={{ objectPosition: img.position }}
          className="photo-grade absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
        <span className="font-jp vertical-text absolute right-4 top-4 text-sm text-paper/80">
          {cat.jp}
        </span>
        <div className="relative mt-auto flex w-full items-end justify-between gap-4 p-5 md:p-7">
          <div>
            <p className="label-caps text-paper/70">
              {String(index + 1).padStart(2, "0")} · {count} pièce{count > 1 ? "s" : ""}
            </p>
            <h3 className="font-display mt-2 text-3xl text-paper md:text-5xl">{cat.name}</h3>
            <p className="mt-1 hidden text-xs text-paper/70 sm:block">{cat.blurb}</p>
          </div>
          <ArrowUpRight className="h-6 w-6 shrink-0 text-paper transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </div>
      </Link>
    );
  }

  return (
    <Link
      to="/boutique"
      search={{ cat: cat.slug }}
      className={cn(
        common,
        "flex flex-col justify-between border border-border bg-card p-5 transition-colors hover:border-ink md:p-6",
      )}
    >
      <span className="screentone pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full text-ink/10" />
      <div className="relative flex items-start justify-between">
        <span className="label-caps text-signal">{String(index + 1).padStart(2, "0")}</span>
        <span className="font-jp text-xl font-bold text-muted-foreground">{cat.jp}</span>
      </div>
      <div className="relative mt-auto">
        <p className="label-caps text-[0.62rem] text-signal font-semibold">Arrivage à venir</p>
        <h3 className="font-display text-3xl md:text-4xl mt-1">{cat.name}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{cat.blurb}</p>
      </div>
    </Link>
  );
}

export function CollectionsGrid() {
  const ordered: Category["slug"][] = [
    "vetements",
    "nouveautes",
    "goodies",
    "accessoires",
    "bijoux",
    "porte-cles",
  ];
  return (
    <div className="grid gap-3 md:auto-rows-[minmax(16rem,1fr)] md:grid-cols-12 md:gap-4">
      {ordered.map((slug, i) => {
        const cat = CATEGORIES.find((c) => c.slug === slug)!;
        return <Tile key={slug} cat={cat} index={i} />;
      })}
    </div>
  );
}
