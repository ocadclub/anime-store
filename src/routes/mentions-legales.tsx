import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { INSTAGRAM_URL, WHATSAPP_DISPLAY, whatsAppLink } from "@/lib/products";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions Légales & Conditions — Anime Store Dakar" },
      {
        name: "description",
        content:
          "Mentions légales, conditions d'achat et engagements de service d'Anime Store Dakar au Sénégal.",
      },
      { property: "og:title", content: "Mentions Légales — Anime Store Dakar" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: MentionsLegales,
});

function MentionsLegales() {
  return (
    <div className="container-edit pt-6 md:pt-12 pb-20 max-w-4xl">
      <div className="mb-8 border-b border-ink pb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-ink mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Retour à l'accueil
        </Link>
        <p className="font-jp text-xs text-muted-foreground">利用規約 · 法律情報</p>
        <h1 className="font-display mt-1 text-5xl md:text-6xl">Mentions Légales & CGV</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Anime Store Dakar — Boutique spécialisée en produits et culture anime au Sénégal.
        </p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section className="rounded-sm border border-border bg-card p-6 space-y-3">
          <h2 className="font-display text-2xl text-foreground">1. Présentation de la Boutique</h2>
          <p>
            <strong>Anime Store Dakar</strong> est une boutique sénégalaise spécialisée dans la
            vente de vêtements cosplay, répliques, goodies, bijoux et accessoires issus de
            l'animation japonaise et du manga.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Siège d'activité :</strong> Dakar, Sénégal
            </li>
            <li>
              <strong>Contact WhatsApp commercial :</strong>{" "}
              <a
                href={whatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="text-signal hover:underline font-semibold"
              >
                {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>
              <strong>Instagram officiel :</strong>{" "}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="text-signal hover:underline font-semibold"
              >
                @anime_store_dakar
              </a>
            </li>
          </ul>
        </section>

        <section className="rounded-sm border border-border bg-card p-6 space-y-3">
          <h2 className="font-display text-2xl text-foreground">
            2. Processus de Commande & Paiement
          </h2>
          <p>Afin d'offrir une expérience simple, sans risque et adaptée aux usages locaux :</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Aucun paiement bancaire n'est prélevé directement sur ce site web :</strong>{" "}
              le catalogue en ligne permet de constituer votre sélection et génère automatiquement
              votre récapitulatif WhatsApp.
            </li>
            <li>
              <strong>Validation de la commande :</strong> la commande est confirmée par échange
              direct sur WhatsApp entre le client et l'équipe d'Anime Store Dakar.
            </li>
            <li>
              <strong>Paiements acceptés :</strong> Wave Sénégal, Orange Money Sénégal et paiement
              en espèces en main propre au livreur lors de la livraison.
            </li>
          </ul>
        </section>

        <section className="rounded-sm border border-border bg-card p-6 space-y-3">
          <h2 className="font-display text-2xl text-foreground">
            3. Livraison à Dakar & Expéditions
          </h2>
          <p>
            Les livraisons sont assurées par des coursiers partenaires sur l'ensemble de la
            presqu'île de Dakar et sa banlieue sous 24h à 48h selon la zone sélectionnée (Plateau,
            Almadies, Sacré-Cœur, Parcelles Assainies, Pikine, Guédiawaye, Keur Massar, Rufisque).
            Le retrait en boutique ou point relais est gratuit.
          </p>
          <p>
            Pour les autres régions du Sénégal (Thiès, Mbour, Saint-Louis, Kaolack...), les envois
            sont effectués par transporteur partenaire agréé.
          </p>
        </section>

        <section className="rounded-sm border border-border bg-card p-6 space-y-3">
          <h2 className="font-display text-2xl text-foreground">4. Échanges & Garanties</h2>
          <p>
            Le client dispose d'un délai de <strong>48 heures</strong> après réception pour demander
            un échange gratuit de taille. Le produit doit être dans son emballage d'origine, neuf,
            non porté et non lavé.
          </p>
        </section>

        <section className="rounded-sm border border-border bg-card p-6 space-y-3">
          <h2 className="font-display text-2xl text-foreground">
            5. Propriété Intellectuelle & Marques
          </h2>
          <p>
            Les noms de franchises (Naruto, Jujutsu Kaisen, Death Note, One Piece, Demon Slayer,
            etc.) et les personnages associés sont la propriété de leurs créateurs, mangakas et
            ayants droit respectifs. Anime Store Dakar propose des produits dérivés de collection et
            tenues pour les passionnés.
          </p>
        </section>
      </div>
    </div>
  );
}
