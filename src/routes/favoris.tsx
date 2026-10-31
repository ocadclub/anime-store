import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { btn } from "@/components/site/Btn";
import { ProductCard } from "@/components/site/ProductCard";
import { getProduct, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/favoris")({
  head: () => ({
    meta: [
      { title: "Mes favoris — Anime Store Dakar" },
      { name: "description", content: "Les pièces que tu as mises de côté sur Anime Store Dakar." },
      { property: "og:title", content: "Mes favoris — Anime Store Dakar" },
      { property: "og:description", content: "Ta sélection de pièces anime mises de côté." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Favorites,
});

function Favorites() {
  const { favorites } = useStore();
  const items = favorites.map(getProduct).filter((p): p is Product => Boolean(p));

  return (
    <div className="container-edit pt-8 md:pt-14">
      <div className="mb-8 border-b border-ink pb-6">
        <p className="font-jp text-xs text-muted-foreground">お気に入り</p>
        <h1 className="font-display mt-1 text-6xl md:text-7xl">Favoris</h1>
      </div>
      {items.length === 0 ? (
        <div className="flex flex-col items-start gap-5 py-16">
          <Heart className="h-10 w-10 text-muted-foreground" />
          <p className="font-display text-4xl">Aucun favori pour l'instant</p>
          <p className="max-w-md text-muted-foreground">
            Touche le cœur sur une pièce pour la retrouver ici et la partager plus tard.
          </p>
          <Link to="/boutique" className={btn({ variant: "ink", size: "lg" })}>
            Parcourir la boutique
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-5">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
