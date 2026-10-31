import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { formatFCFA, PRODUCTS } from "@/lib/products";
import { btn } from "./Btn";
import { SectionHeading } from "./SectionHeading";

/** Editorial "new arrivals" spread: one large feature + numbered list, like a magazine page. */
export function NewArrivals({ showHeading = true }: { showHeading?: boolean }) {
  const items = PRODUCTS.filter((p) => p.isNew);
  const [feature, ...rest] = items;
  if (!feature) return null;

  return (
    <section className="border-y border-border bg-card py-12 md:py-20">
      <div className="container-edit">
        {showHeading && <SectionHeading index="02" jp="新作入荷" title="Nouveaux arrivages" />}
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <Link
            to="/produit/$slug"
            params={{ slug: feature.slug }}
            className="group relative md:col-span-7"
          >
            <div className="relative aspect-square overflow-hidden bg-background">
              <img
                src={feature.image}
                alt={feature.name}
                loading="lazy"
                className="photo-grade h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="font-display absolute -bottom-2 right-4 text-[7rem] leading-none text-signal md:text-[10rem]">
                01
              </span>
            </div>
          </Link>

          <div className="flex flex-col md:col-span-5">
            <p className="label-caps text-signal">À la une · {feature.series}</p>
            <h3 className="font-display mt-3 text-5xl md:text-6xl">{feature.name}</h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">{feature.description}</p>
            <p className="font-condensed mt-5 text-2xl font-bold">{formatFCFA(feature.price)}</p>
            <Link
              to="/produit/$slug"
              params={{ slug: feature.slug }}
              className={btn({ variant: "ink", size: "lg", className: "mt-6 self-start" })}
            >
              Voir la pièce <ArrowRight className="h-4 w-4" />
            </Link>

            {rest.length > 0 && (
              <ol className="mt-10 border-t border-ink">
                {rest.map((p, i) => (
                  <li key={p.slug} className="border-b border-border">
                    <Link
                      to="/produit/$slug"
                      params={{ slug: p.slug }}
                      className="group grid grid-cols-[auto_4.5rem_minmax(0,1fr)_auto] items-center gap-4 py-4"
                    >
                      <span className="font-display text-3xl text-muted-foreground group-hover:text-signal">
                        {String(i + 2).padStart(2, "0")}
                      </span>
                      <img
                        src={p.image}
                        alt=""
                        loading="lazy"
                        className="aspect-square w-[4.5rem] object-cover"
                      />
                      <span className="min-w-0">
                        <span className="label-caps block text-[0.6rem] text-muted-foreground">
                          {p.series}
                        </span>
                        <span className="block truncate font-semibold group-hover:text-signal">
                          {p.name}
                        </span>
                      </span>
                      <span className="font-condensed whitespace-nowrap font-bold">
                        {formatFCFA(p.price)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
