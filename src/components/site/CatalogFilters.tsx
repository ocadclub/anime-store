import { Search, X, Sparkles } from "lucide-react";
import { ANIME_LICENSES, CATEGORIES, type CategorySlug, type SortKey } from "@/lib/products";
import { cn } from "@/lib/utils";

export function CatalogFilters({
  category,
  series,
  query,
  sort,
  onCategory,
  onSeries,
  onQuery,
  onSort,
}: {
  category: CategorySlug | "tout";
  series: string;
  query: string;
  sort: SortKey;
  onCategory: (c: CategorySlug | "tout") => void;
  onSeries: (s: string) => void;
  onQuery: (q: string) => void;
  onSort: (s: SortKey) => void;
}) {
  const categoryChips: { slug: CategorySlug | "tout"; name: string }[] = [
    { slug: "tout", name: "Toutes les catégories" },
    ...CATEGORIES.map((c) => ({ slug: c.slug, name: c.name })),
  ];

  const hasActiveFilters =
    category !== "tout" ||
    (series !== "Toutes" && series !== "toutes" && Boolean(series)) ||
    Boolean(query);

  return (
    <div className="space-y-4">
      {/* Search and Sort row */}
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_14rem]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <label htmlFor="catalog-search" className="sr-only">
            Rechercher dans la boutique
          </label>
          <input
            id="catalog-search"
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Rechercher Itachi, Luffy, Gojo, katana, bague…"
            className="h-12 w-full rounded-sm border border-input bg-card pl-11 pr-10 text-[0.95rem] outline-none transition-colors placeholder:text-muted-foreground focus:border-ink focus-visible:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => onQuery("")}
              className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center text-muted-foreground hover:text-ink"
              aria-label="Effacer la recherche"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="relative">
          <label htmlFor="catalog-sort" className="sr-only">
            Trier
          </label>
          <select
            id="catalog-sort"
            value={sort}
            onChange={(e) => onSort(e.target.value as SortKey)}
            className="h-12 w-full appearance-none rounded-sm border border-input bg-card px-4 font-condensed text-sm font-semibold uppercase tracking-[0.1em] outline-none focus:border-ink cursor-pointer"
          >
            <option value="pertinence">Trier : sélection</option>
            <option value="prix-asc">Prix croissant</option>
            <option value="prix-desc">Prix décroissant</option>
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs">
            ▼
          </span>
        </div>
      </div>

      {/* Anime Licence Quick Filter row */}
      <div className="rounded-sm border border-border/70 bg-card/60 p-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-signal" />
            <span className="label-caps font-bold text-foreground">Univers Anime & Licences</span>
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                onCategory("tout");
                onSeries("Toutes");
                onQuery("");
              }}
              className="text-[0.72rem] text-signal font-semibold hover:underline"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>

        <div
          className="-mx-3 overflow-x-auto px-3 pb-1 pt-0.5 scrollbar-none"
          role="group"
          aria-label="Filtrer par licence anime"
        >
          <div className="flex w-max gap-1.5">
            {ANIME_LICENSES.map((lic) => {
              const active =
                (lic === "Toutes" && (!series || series === "Toutes" || series === "toutes")) ||
                series === lic;
              return (
                <button
                  key={lic}
                  type="button"
                  onClick={() => onSeries(lic)}
                  aria-pressed={active}
                  className={cn(
                    "h-8 whitespace-nowrap rounded-sm px-3 font-condensed text-xs font-semibold uppercase tracking-[0.08em] transition-all",
                    active
                      ? "bg-signal text-signal-foreground shadow-xs"
                      : "bg-secondary/70 text-foreground hover:bg-secondary hover:text-signal",
                  )}
                >
                  {lic}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div
        className="-mx-5 overflow-x-auto px-5 pb-1 md:mx-0 md:px-0 scrollbar-none"
        role="group"
        aria-label="Filtrer par catégorie"
      >
        <div className="flex w-max gap-2">
          {categoryChips.map((c) => {
            const active = category === c.slug;
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => onCategory(c.slug)}
                aria-pressed={active}
                className={cn(
                  "h-9 whitespace-nowrap rounded-full border px-4 font-condensed text-xs font-semibold uppercase tracking-[0.1em] transition-colors",
                  active
                    ? "border-ink bg-ink text-ink-foreground shadow-xs"
                    : "border-input bg-card text-ink hover:border-ink",
                )}
              >
                {c.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
