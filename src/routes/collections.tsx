import { createFileRoute } from "@tanstack/react-router";
import { CollectionsGrid } from "@/components/site/CollectionsGrid";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — Anime Store Dakar" },
      {
        name: "description",
        content: "Vêtements anime, accessoires, bijoux, goodies, porte-clés et nouveautés.",
      },
      { property: "og:title", content: "Collections — Anime Store Dakar" },
      {
        property: "og:description",
        content: "Explore les collections de la boutique anime de Dakar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Collections,
});

function Collections() {
  return (
    <div className="container-edit pt-8 md:pt-14">
      <div className="mb-10 grid gap-4 border-b border-ink pb-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className="font-jp text-xs text-muted-foreground">コレクション</p>
          <h1 className="font-display mt-1 text-6xl md:text-7xl">Collections</h1>
        </div>
        <p className="text-muted-foreground md:col-span-5">
          Six rayons, de la tenue complète au petit porte-clés. Certaines collections sont encore en
          préparation.
        </p>
      </div>
      <CollectionsGrid />
    </div>
  );
}
