import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { btn } from "@/components/site/Btn";
import { MockNotice } from "@/components/site/MockNotice";
import { NewArrivals } from "@/components/site/NewArrivals";

export const Route = createFileRoute("/nouveautes")({
  head: () => ({
    meta: [
      { title: "Nouveautés — Anime Store Dakar" },
      {
        name: "description",
        content: "Les derniers arrivages : manteau Akatsuki, cape du 4e Hokage et plus.",
      },
      { property: "og:title", content: "Nouveautés — Anime Store Dakar" },
      {
        property: "og:description",
        content: "Les derniers arrivages de la boutique anime de Dakar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: News,
});

function News() {
  return (
    <div className="pt-8 md:pt-14">
      <div className="container-edit mb-10 grid gap-4 border-b border-ink pb-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className="font-jp text-xs text-muted-foreground">新作入荷</p>
          <h1 className="font-display mt-1 text-6xl md:text-7xl">Nouveautés</h1>
        </div>
        <p className="text-muted-foreground md:col-span-5">
          Les pièces arrivées récemment, présentées une par une.
        </p>
      </div>
      <NewArrivals showHeading={false} />
      <div className="container-edit mt-12 flex flex-col items-start gap-6">
        <Link to="/boutique" className={btn({ variant: "ink", size: "lg" })}>
          Tout le catalogue <ArrowRight className="h-4 w-4" />
        </Link>
        <MockNotice />
      </div>
    </div>
  );
}
