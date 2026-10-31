import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { formatFCFA, getCategory, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProductBadge({ product }: { product: Product }) {
  if (!product.isNew) return null;
  return (
    <span className="label-caps inline-flex h-5 items-center rounded-xs bg-signal px-2 text-[0.62rem] font-bold text-signal-foreground shadow-xs">
      Nouveau
    </span>
  );
}

export function FavoriteButton({ product, className }: { product: Product; className?: string }) {
  const { isFavorite, toggleFavorite } = useStore();
  const active = isFavorite(product.slug);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const added = toggleFavorite(product.slug);
        toast(added ? "Ajouté aux favoris" : "Retiré des favoris", { description: product.name });
      }}
      aria-pressed={active}
      aria-label={
        active ? `Retirer ${product.name} des favoris` : `Ajouter ${product.name} aux favoris`
      }
      className={cn(
        "grid h-8 w-8 place-items-center rounded-full bg-background/90 text-ink shadow-xs transition-colors hover:text-signal",
        className,
      )}
    >
      <Heart className={cn("h-3.5 w-3.5", active && "fill-signal text-signal")} />
    </button>
  );
}

export function ProductCard({
  product,
  aspect = "aspect-[4/5]",
  className,
}: {
  product: Product;
  aspect?: string;
  className?: string;
}) {
  const { addToCart } = useStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Default to first size if available, otherwise undefined
    const defaultSize = product.sizes?.[0];
    addToCart(product.slug, 1, defaultSize);
    toast.success("Ajouté au panier", {
      description: `${product.name}${defaultSize ? ` (${defaultSize})` : ""}`,
    });
  };

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <Link
        to="/produit/$slug"
        params={{ slug: product.slug }}
        className="block focus-visible:outline-offset-4 overflow-hidden rounded-xs"
        aria-label={`${product.name} — ${formatFCFA(product.price)}`}
      >
        <div className={cn("relative overflow-hidden bg-card border border-border/60", aspect)}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="photo-grade h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute left-2.5 top-2.5">
            <ProductBadge product={product} />
          </div>

          {/* Quick add button on hover / touch */}
          <button
            type="button"
            onClick={handleQuickAdd}
            className="absolute bottom-2.5 right-2.5 grid h-8 w-8 place-items-center rounded-full bg-ink text-ink-foreground opacity-90 shadow-sm transition-all hover:bg-signal hover:scale-105 active:scale-95"
            aria-label={`Ajouter ${product.name} au panier`}
            title="Ajouter au panier"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-2.5 flex flex-col justify-between gap-1 min-w-0">
          <div className="min-w-0">
            <p className="label-caps text-[0.62rem] text-muted-foreground truncate">
              {product.series} · {product.code}
            </p>
            <h3 className="mt-0.5 truncate text-[0.92rem] font-semibold leading-snug transition-colors group-hover:text-signal">
              {product.name}
            </h3>
          </div>
          <div className="flex items-center justify-between mt-0.5">
            <p className="font-condensed text-base font-bold text-foreground">
              {formatFCFA(product.price)}
            </p>
            <span className="label-caps text-[0.62rem] text-signal font-semibold">Dakar 24h</span>
          </div>
        </div>
      </Link>
      <FavoriteButton product={product} className="absolute right-2.5 top-2.5 z-10" />
    </article>
  );
}
