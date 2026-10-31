import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SearchX } from "lucide-react";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { btn } from "@/components/site/Btn";
import { CatalogFilters } from "@/components/site/CatalogFilters";
import { MockNotice } from "@/components/site/MockNotice";
import { ProductCard } from "@/components/site/ProductCard";
import {
  CATEGORIES,
  filterProducts,
  getCategory,
  type CategorySlug,
  type SortKey,
} from "@/lib/products";

type BoutiqueSearch = {
  cat?: CategorySlug | undefined;
  series?: string | undefined;
  q?: string | undefined;
  sort?: SortKey | undefined;
};

const SORTS: SortKey[] = ["pertinence", "prix-asc", "prix-desc"];
const PAGE_SIZE = 12;

export const Route = createFileRoute("/boutique")({
  validateSearch: (s: Record<string, unknown>): BoutiqueSearch => ({
    cat: CATEGORIES.some((c) => c.slug === s["cat"]) ? (s["cat"] as CategorySlug) : undefined,
    series: typeof s["series"] === "string" && s["series"].trim() ? s["series"] : undefined,
    q: typeof s["q"] === "string" && s["q"].trim() ? s["q"] : undefined,
    sort:
      SORTS.includes(s["sort"] as SortKey) && s["sort"] !== "pertinence"
        ? (s["sort"] as SortKey)
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Boutique — Anime Store Dakar" },
      {
        name: "description",
        content:
          "Tout le catalogue : vêtements anime, cosplay, bijoux, goodies, katanas. Filtrer, chercher et commander sur WhatsApp.",
      },
      { property: "og:title", content: "Boutique — Anime Store Dakar" },
      {
        property: "og:description",
        content: "Vêtements anime, cosplay et goodies disponibles à Dakar avec livraison 24h.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Boutique,
});

function Boutique() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/boutique" });
  const [query, setQuery] = useState(search.q ?? "");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const deferredQuery = useDeferredValue(query);
  const category = search.cat ?? "tout";
  const series = search.series ?? "Toutes";
  const sort = search.sort ?? "pertinence";

  useEffect(() => setQuery(search.q ?? ""), [search.q]);

  // Keep the URL in sync with the typed query (shareable search).
  useEffect(() => {
    const t = setTimeout(() => {
      const q = query.trim() || undefined;
      if (q !== search.q) navigate({ search: (prev) => ({ ...prev, q }), replace: true });
    }, 300);
    return () => clearTimeout(t);
  }, [query, search.q, navigate]);

  const results = useMemo(
    () => filterProducts({ category, series, query: deferredQuery, sort }),
    [category, series, deferredQuery, sort],
  );
  const stale = deferredQuery !== query;
  const title = category === "tout" ? "Boutique" : getCategory(category)?.name;

  const reset = () => {
    setQuery("");
    navigate({ search: {} });
  };

  return (
    <div className="container-edit pb-10 pt-6 md:pt-12">
      <div className="mb-6 grid gap-4 border-b border-ink pb-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div>
          <p className="font-jp text-xs text-muted-foreground">ショップ</p>
          <div className="flex flex-wrap items-baseline gap-3">
            <h1 className="font-display mt-1 text-5xl md:text-7xl">{title}</h1>
            {series && series !== "Toutes" && (
              <span className="label-caps rounded-full bg-signal/10 px-3 py-1 text-signal text-xs">
                {series}
              </span>
            )}
          </div>
        </div>
        <p className="label-caps text-muted-foreground" aria-live="polite">
          {results.length} produit{results.length > 1 ? "s" : ""}
        </p>
      </div>

      <CatalogFilters
        category={category}
        series={series}
        query={query}
        sort={sort}
        onCategory={(c) => {
          setVisible(PAGE_SIZE);
          navigate({ search: (prev) => ({ ...prev, cat: c === "tout" ? undefined : c }) });
        }}
        onSeries={(s) => {
          setVisible(PAGE_SIZE);
          navigate({ search: (prev) => ({ ...prev, series: s === "Toutes" ? undefined : s }) });
        }}
        onQuery={(q) => {
          setVisible(PAGE_SIZE);
          setQuery(q);
        }}
        onSort={(s) =>
          navigate({ search: (prev) => ({ ...prev, sort: s === "pertinence" ? undefined : s }) })
        }
      />

      <div
        className={`mt-8 transition-opacity ${stale ? "opacity-50" : "opacity-100"}`}
        aria-busy={stale}
      >
        {results.length === 0 ? (
          <div className="flex flex-col items-start gap-4 border border-dashed border-input px-6 py-16 md:items-center md:text-center">
            <SearchX className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="font-display text-4xl">Aucun résultat</p>
              <p className="mt-2 max-w-md text-muted-foreground">
                Essaie un autre personnage ou une autre série anime, ou retire les filtres. Tu peux
                aussi nous demander un article spécifique sur WhatsApp !
              </p>
            </div>
            <button
              type="button"
              onClick={reset}
              className={btn({ variant: "signal", size: "sm" })}
            >
              Réinitialiser et voir tout le catalogue
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4">
              {results.slice(0, visible).map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
            {visible < results.length && (
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className={btn({ variant: "outline", size: "lg" })}
                >
                  Voir plus de produits
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <MockNotice className="mt-14" />
    </div>
  );
}
