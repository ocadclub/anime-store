import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import gojo from "@/assets/gojo-hero.jpg.asset.json";
import obito from "@/assets/obito.jpg.asset.json";
import { btn } from "@/components/site/Btn";
import { CollectionsGrid } from "@/components/site/CollectionsGrid";
import { NewArrivals } from "@/components/site/NewArrivals";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { INSTAGRAM_URL, PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anime Store Dakar — Ton univers. Ton style." },
      {
        name: "description",
        content:
          "Manteaux Akatsuki, capes Hokage, goodies Death Note : la boutique anime de Dakar. Commande sur WhatsApp.",
      },
      { property: "og:title", content: "Anime Store Dakar — Ton univers. Ton style." },
      {
        property: "og:description",
        content: "Vêtements anime, cosplay et goodies à Dakar. Commande sur WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Hero() {
  return (
    <section className="container-edit pb-16 pt-6 md:pb-24 md:pt-10">
      <div className="grid items-end gap-8 md:grid-cols-12 md:gap-10">
        <div className="order-2 md:order-1 md:col-span-5 md:pb-10">
          <p className="label-caps flex items-center gap-3 text-muted-foreground">
            <span className="h-px w-8 bg-signal" /> Vol. 01 — Saison des fans
          </p>
          <h1 className="font-display animate-rise mt-5 text-[3.4rem] sm:text-6xl lg:text-[5.4rem]">
            Ton univers.
            <br />
            <span className="text-signal">Ton style.</span>
          </h1>
          <p className="mt-5 max-w-sm text-[1.02rem] leading-relaxed text-muted-foreground">
            Les pièces des séries que tu suis, à porter à Dakar. Choisis, puis commande en un
            message.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/boutique" className={btn({ variant: "signal", size: "lg" })}>
              Découvrir la boutique <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/nouveautes" className={btn({ variant: "outline", size: "lg" })}>
              Voir les nouveautés
            </Link>
          </div>
        </div>

        <figure className="relative order-1 md:order-2 md:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden bg-ink md:aspect-[5/6]">
            <img
              src={gojo.url}
              alt="Satoru Gojo assis, à contre-jour devant une grande fenêtre"
              className="photo-grade h-full w-full object-cover"
              style={{ objectPosition: "50% 35%" }}
              fetchPriority="high"
            />
            <span className="font-jp vertical-text absolute left-4 top-5 text-sm tracking-[0.4em] text-paper/80 md:left-6 md:text-base">
              アニメストア・ダカール
            </span>
          </div>
          <figcaption className="mt-3 flex items-center justify-between">
            <span className="label-caps text-muted-foreground">Jujutsu Kaisen — 五条悟</span>
            <span className="label-caps text-muted-foreground">No. 01</span>
          </figcaption>
          <div
            className="absolute -bottom-5 -left-5 hidden h-24 w-24 bg-signal md:block"
            aria-hidden="true"
          />
        </figure>
      </div>
    </section>
  );
}

function Brand() {
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="container-edit grid gap-10 py-16 md:grid-cols-12 md:py-24">
        <div className="relative md:col-span-5">
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={obito.url}
              alt="Cosplay d'Obito en tenue de la guerre ninja, sur un escalier de pierre"
              loading="lazy"
              className="photo-grade h-full w-full object-cover"
            />
          </div>
          <p className="label-caps mt-3 text-ink-foreground/50">
            Photo : cosplay Obito — Naruto Shippuden
          </p>
        </div>
        <div className="flex flex-col justify-between gap-10 md:col-span-6 md:col-start-7">
          <div>
            <p className="font-jp text-sm text-ink-foreground/50">私たちについて</p>
            <h2 className="font-display mt-2 text-5xl md:text-7xl">
              Par des fans,
              <br /> pour les fans.
            </h2>
          </div>
          <div className="space-y-5 text-[1.05rem] leading-relaxed text-ink-foreground/75">
            <p>
              Ici, on parle Akatsuki, Hokage et Jujutsu Kaisen. Anime Store Dakar rassemble des
              pièces pour celles et ceux qui vivent l'anime au quotidien : en convention, au
              quartier, ou simplement pour le plaisir.
            </p>
            <p>
              Pas de paiement en ligne : tu choisis, tu envoies un message, et on échange
              directement sur WhatsApp.
            </p>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className={btn({ variant: "outlineLight", size: "lg", className: "self-start" })}
          >
            Suivre @anime_store_dakar
          </a>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />

      <section className="container-edit py-12 md:py-20">
        <SectionHeading
          index="01"
          jp="コレクション"
          title="Explorer par collection"
          aside={
            <Link
              to="/collections"
              className={btn({ variant: "ghost", size: "sm", className: "self-start px-0" })}
            >
              Toutes les collections <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <CollectionsGrid />
      </section>

      <NewArrivals />

      <section className="container-edit py-12 md:py-20">
        <SectionHeading
          index="03"
          jp="セレクション"
          title="La sélection"
          aside={
            <Link
              to="/boutique"
              className={btn({ variant: "ghost", size: "sm", className: "self-start px-0" })}
            >
              Toute la boutique <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <Brand />
    </>
  );
}
