import { useState } from "react";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { ProductBadge } from "./ProductCard";

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const view = (product.views[active] ?? product.views[0])!;

  return (
    <div className="grid gap-3 md:grid-cols-[5.5rem_minmax(0,1fr)] md:gap-4">
      <div
        className="order-2 flex gap-2 overflow-x-auto max-w-full pb-1 md:order-1 md:flex-col md:overflow-visible"
        role="tablist"
        aria-label="Vues du produit"
      >
        {product.views.map((v, i) => (
          <button
            key={v.label}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={v.label}
            onClick={() => setActive(i)}
            className={cn(
              "relative aspect-square w-20 overflow-hidden border bg-card transition md:w-full",
              i === active ? "border-ink" : "border-transparent opacity-60 hover:opacity-100",
            )}
          >
            <img
              src={product.image}
              alt=""
              className="h-full w-full object-cover"
              style={{
                objectPosition: v.position,
                transform: `scale(${v.zoom})`,
                transformOrigin: v.position,
              }}
            />
          </button>
        ))}
      </div>
      <div className="relative order-1 aspect-[4/5] overflow-hidden bg-card md:order-2">
        <img
          key={active}
          src={product.image}
          alt={`${product.name} — ${view.label}`}
          className="photo-grade animate-rise h-full w-full object-cover"
          style={{
            objectPosition: view.position,
            transform: `scale(${view.zoom})`,
            transformOrigin: view.position,
          }}
        />
        <div className="absolute left-4 top-4">
          <ProductBadge product={product} />
        </div>
        <p className="label-caps absolute bottom-4 left-4 bg-background/90 px-2 py-1 text-[0.6rem]">
          {String(active + 1).padStart(2, "0")} / {String(product.views.length).padStart(2, "0")} ·{" "}
          {view.label}
        </p>
      </div>
    </div>
  );
}
