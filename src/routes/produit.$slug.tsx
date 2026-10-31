import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { btn } from "@/components/site/Btn";
import { MockNotice } from "@/components/site/MockNotice";
import { FavoriteButton, ProductCard } from "@/components/site/ProductCard";
import { ProductGallery } from "@/components/site/ProductGallery";
import { QuantityPicker } from "@/components/site/QuantityPicker";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import {
  buildWhatsAppMessage,
  formatFCFA,
  getCategory,
  getProduct,
  PRODUCTS,
  whatsAppLink,
} from "@/lib/products";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/produit/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { slug: product.slug, name: product.name, description: product.description };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Anime Store Dakar` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: `${loaderData.name} — Anime Store Dakar` },
          { property: "og:description", content: loaderData.description },
          { property: "og:type", content: "product" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [
          { title: "Produit introuvable — Anime Store Dakar" },
          { name: "robots", content: "noindex" },
        ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const product = getProduct(slug)!;
  const { addToCart, selectedDeliveryZone } = useStore();
  const [size, setSize] = useState<string | undefined>(undefined);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const needsSize = Boolean(product.sizes?.length);
  const category = getCategory(product.category);

  const similar = [
    ...PRODUCTS.filter((p) => p.slug !== product.slug && p.category === product.category),
    ...PRODUCTS.filter((p) => p.slug !== product.slug && p.category !== product.category),
  ].slice(0, 3);

  const message = buildWhatsAppMessage(
    [{ name: product.name, variant: size, quantity: qty, unitPrice: product.price }],
    selectedDeliveryZone,
  );

  const guardSize = () => {
    if (needsSize && !size) {
      setSizeError(true);
      toast.error("Veuillez choisir une taille", {
        description: "Sélectionne une taille disponible ci-dessus.",
      });
      document
        .getElementById("size-picker")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  };

  return (
    <div className="pb-32 md:pb-0">
      <div className="container-edit pt-5 md:pt-8">
        <nav
          aria-label="Fil d'Ariane"
          className="label-caps flex flex-wrap items-center gap-1.5 text-muted-foreground"
        >
          <Link to="/boutique" className="hover:text-ink">
            Boutique
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/boutique" search={{ cat: product.category }} className="hover:text-ink">
            {category?.name}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-ink">{product.code}</span>
        </nav>

        <div className="mt-6 grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <ProductGallery product={product} />
          </div>

          <div className="md:col-span-5">
            <div className="md:sticky md:top-28 space-y-6">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <p className="label-caps font-bold text-signal">{product.series}</p>
                  <FavoriteButton product={product} className="-mt-1 border border-border" />
                </div>
                <h1 className="font-display mt-2 text-4xl sm:text-5xl md:text-6xl">
                  {product.name}
                </h1>
                <p className="font-condensed mt-3 text-3xl font-bold">
                  {formatFCFA(product.price)}
                </p>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                  <span>En stock à Dakar · Livraison express 24h</span>
                </div>
              </div>

              <p className="leading-relaxed text-muted-foreground text-sm md:text-base">
                {product.description}
              </p>

              {needsSize && (
                <fieldset id="size-picker" className="pt-2">
                  <legend className="label-caps flex w-full justify-between">
                    <span>Taille</span>
                    {sizeError && (
                      <span className="text-signal font-semibold" role="alert">
                        Choisis une taille
                      </span>
                    )}
                  </legend>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {product.sizes!.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          setSize(s);
                          setSizeError(false);
                        }}
                        aria-pressed={size === s}
                        className={cn(
                          "h-12 min-w-14 rounded-sm border px-4 font-condensed text-base font-semibold transition-colors",
                          size === s
                            ? "border-ink bg-ink text-ink-foreground shadow-xs"
                            : "border-input hover:border-ink",
                          sizeError && "border-signal",
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              <div>
                <p className="label-caps mb-2.5">Quantité</p>
                <QuantityPicker value={qty} onChange={setQty} />
              </div>

              {/* Dakar Delivery & Trust Info Box */}
              <div className="rounded-sm border border-border bg-card p-4 space-y-2.5 text-xs">
                <div className="flex items-start gap-2.5">
                  <Truck className="h-4 w-4 shrink-0 text-signal mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground">Livraison locale à Dakar</span>
                    <p className="text-muted-foreground text-[0.72rem]">
                      Plateau, Almadies, Sacré-Cœur, Guédiawaye, Pikine, Rufisque (dès 1 500 FCFA).
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground">Paiement à la livraison</span>
                    <p className="text-muted-foreground text-[0.72rem]">
                      Règlement par Wave, Orange Money ou Espèces à la remise du colis.
                    </p>
                  </div>
                </div>
              </div>

              {/* Desktop action buttons */}
              <div className="hidden flex-col gap-3 md:flex">
                <a
                  href={whatsAppLink(message)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    if (!guardSize()) e.preventDefault();
                  }}
                  className={btn({
                    variant: "whatsapp",
                    size: "lg",
                    className: "h-14 font-condensed text-base uppercase tracking-wider",
                  })}
                >
                  <WhatsAppIcon className="h-5 w-5" /> Commander sur WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => {
                    if (!guardSize()) return;
                    addToCart(product.slug, qty, size);
                    toast.success("Ajouté au panier", {
                      description: `${product.name}${size ? ` · ${size}` : ""} × ${qty}`,
                    });
                  }}
                  className={btn({ variant: "outline", size: "lg", className: "h-12" })}
                >
                  <ShoppingBag className="h-4 w-4" /> Ajouter au panier
                </button>
              </div>

              <ul className="divide-y divide-border border-y border-border text-sm pt-2">
                {product.details.map((d) => (
                  <li key={d} className="flex gap-3 py-3 text-xs md:text-sm">
                    <span className="mt-2 h-1 w-1 shrink-0 bg-signal" /> {d}
                  </li>
                ))}
              </ul>
              <MockNotice className="mt-4" />
            </div>
          </div>
        </div>
      </div>

      <section className="container-edit mt-16 md:mt-24">
        <div className="mb-6 flex items-end justify-between border-t border-ink pt-4">
          <div>
            <p className="font-jp text-xs text-muted-foreground">おすすめ</p>
            <h2 className="font-display mt-1 text-3xl md:text-5xl">Tu aimeras aussi</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-5">
          {similar.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Mobile sticky purchase bar — thumb-friendly with safe area */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-md md:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lg">
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              if (!guardSize()) return;
              addToCart(product.slug, qty, size);
              toast.success("Ajouté au panier", { description: `${product.name} × ${qty}` });
            }}
            className={btn({
              variant: "outline",
              size: "icon",
              className: "h-12 w-12 shrink-0 border-ink",
            })}
            aria-label="Ajouter au panier"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
          <a
            href={whatsAppLink(message)}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
              if (!guardSize()) e.preventDefault();
            }}
            className={btn({
              variant: "whatsapp",
              size: "lg",
              className:
                "h-12 px-3 font-condensed text-sm uppercase tracking-wide justify-center gap-2 truncate",
            })}
          >
            <WhatsAppIcon className="h-4 w-4 shrink-0" />
            <span className="truncate">Commander · {formatFCFA(product.price * qty)}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
