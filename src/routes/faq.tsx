import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronDown,
  HelpCircle,
  MapPin,
  RefreshCw,
  Ruler,
  ShieldCheck,
  Truck,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { btn } from "@/components/site/Btn";
import { MockNotice } from "@/components/site/MockNotice";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { DAKAR_DELIVERY_ZONES, formatFCFA, whatsAppLink } from "@/lib/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ & Guide des Tailles — Anime Store Dakar" },
      {
        name: "description",
        content:
          "Toutes les réponses sur la livraison à Dakar (24-48h), le guide des tailles cosplay & streetwear, la politique d'échange et les paiements Wave & Orange Money.",
      },
      { property: "og:title", content: "FAQ & Guide des Tailles — Anime Store Dakar" },
      {
        property: "og:description",
        content:
          "Délais de livraison à Dakar, retours, tailles et fonctionnement de la commande WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FaqPage,
});

type FaqItem = {
  question: string;
  answer: string | React.ReactNode;
  icon?: React.ReactNode;
};

function FaqSection({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: FaqItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      <div className="border-b border-border pb-2">
        <p className="label-caps text-signal">{subtitle}</p>
        <h2 className="font-display text-2xl md:text-3xl">{title}</h2>
      </div>
      <div className="space-y-2">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-sm border border-border bg-card transition-colors overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full items-center justify-between gap-4 p-4 text-left font-semibold text-sm md:text-base hover:bg-secondary/40 transition-colors"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.question}</span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                    isOpen && "rotate-180 text-signal",
                  )}
                />
              </button>
              {isOpen && (
                <div className="border-t border-border/60 p-4 pt-3 text-xs md:text-sm text-muted-foreground leading-relaxed bg-background/50">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FaqPage() {
  const deliveryFaq: FaqItem[] = [
    {
      question: "Quels sont les délais de livraison à Dakar ?",
      icon: <Truck className="h-4 w-4 text-signal shrink-0" />,
      answer: (
        <div className="space-y-2">
          <p>
            Nous assurons des livraisons rapides sous <strong>24h à 48h ouvrées</strong> selon votre
            quartier à Dakar :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>24h</strong> pour Dakar Centre (Plateau, Fann, Médina, Point E), Mermoz,
              Sacré-Cœur, Liberté, Almadies, Ngor, Yoff et Ouakam.
            </li>
            <li>
              <strong>24h à 48h</strong> pour Parcelles Assainies, Grand Dakar, HLM, Guédiawaye et
              Pikine.
            </li>
            <li>
              <strong>48h</strong> pour Rufisque, Keur Massar, Bargny et Diamniadio.
            </li>
          </ul>
          <p>Un coursier vous appelle avant son passage pour convenir de l'heure exacte.</p>
        </div>
      ),
    },
    {
      question: "Quels sont les tarifs de livraison par quartier ?",
      icon: <MapPin className="h-4 w-4 text-signal shrink-0" />,
      answer: (
        <div className="space-y-3">
          <div className="grid gap-2 sm:grid-cols-2">
            {DAKAR_DELIVERY_ZONES.map((zone) => (
              <div key={zone.id} className="rounded-xs border border-border p-2.5 bg-card">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span>{zone.shortName}</span>
                  <span className="text-signal font-condensed text-sm">
                    {zone.price === 0 ? "Gratuit" : formatFCFA(zone.price)}
                  </span>
                </div>
                <p className="text-[0.68rem] text-muted-foreground mt-0.5">{zone.description}</p>
              </div>
            ))}
          </div>
          <p className="text-xs">
            Le <strong>retrait en boutique / point relais à Dakar</strong> est 100% gratuit !
          </p>
        </div>
      ),
    },
    {
      question: "Livrez-vous dans les autres régions du Sénégal ?",
      icon: <Truck className="h-4 w-4 text-signal shrink-0" />,
      answer: (
        <p>
          Oui ! Pour les villes comme Thiès, Saint-Louis, Mbour, Kaolack ou Ziguinchor, nous
          expédions via nos transporteurs partenaires agréés (GP ou La Poste) sous 48h à 72h.
          Contactez-nous directement sur WhatsApp pour convenir du mode d'envoi.
        </p>
      ),
    },
  ];

  const sizeFaq: FaqItem[] = [
    {
      question: "Comment choisir la taille de ma cape ou de mon manteau cosplay ?",
      icon: <Ruler className="h-4 w-4 text-signal shrink-0" />,
      answer: (
        <div className="space-y-2">
          <p>
            Nos capes (Akatsuki Itachi, 4e Hokage Minato) ont une coupe volontairement ample et
            fidèle aux proportions des animes :
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse border border-border mt-2">
              <thead>
                <tr className="bg-secondary/60">
                  <th className="p-2 border border-border">Taille</th>
                  <th className="p-2 border border-border">Stature recommandée</th>
                  <th className="p-2 border border-border">Tour de poitrine</th>
                  <th className="p-2 border border-border">Longueur cape</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-border font-bold">S</td>
                  <td className="p-2 border border-border">1m55 – 1m65</td>
                  <td className="p-2 border border-border">84 – 90 cm</td>
                  <td className="p-2 border border-border">100 cm</td>
                </tr>
                <tr>
                  <td className="p-2 border border-border font-bold">M</td>
                  <td className="p-2 border border-border">1m65 – 1m75</td>
                  <td className="p-2 border border-border">90 – 98 cm</td>
                  <td className="p-2 border border-border">108 cm</td>
                </tr>
                <tr>
                  <td className="p-2 border border-border font-bold">L</td>
                  <td className="p-2 border border-border">1m75 – 1m85</td>
                  <td className="p-2 border border-border">98 – 106 cm</td>
                  <td className="p-2 border border-border">114 cm</td>
                </tr>
                <tr>
                  <td className="p-2 border border-border font-bold">XL</td>
                  <td className="p-2 border border-border">1m85 – 1m95+</td>
                  <td className="p-2 border border-border">106 – 118 cm</td>
                  <td className="p-2 border border-border">120 cm</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[0.72rem] text-muted-foreground mt-2">
            💡 En cas de doute entre deux tailles, nous vous conseillons de prendre la taille
            supérieure pour un tombé streetwear plus stylé.
          </p>
        </div>
      ),
    },
    {
      question: "Les accessoires et goodies sont-ils fidèles aux animes ?",
      icon: <Ruler className="h-4 w-4 text-signal shrink-0" />,
      answer: (
        <p>
          Absolument. Nos accessoires (chapeau de paille Luffy Mugiwara, katanas Demon Slayer
          miniatures avec fourreau gravé, carnet Death Note avec règles de Ryuk) sont des répliques
          soignées et fidèles aux animes originaux.
        </p>
      ),
    },
  ];

  const paymentAndReturnsFaq: FaqItem[] = [
    {
      question: "Quels modes de paiement sont acceptés ?",
      icon: <Wallet className="h-4 w-4 text-signal shrink-0" />,
      answer: (
        <div className="space-y-2">
          <p>
            Pour vous éviter toute contrainte bancaire, nous acceptons les moyens les plus simples
            au Sénégal :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Wave Sénégal</strong> : transfert direct rapide sans frais additionnels.
            </li>
            <li>
              <strong>Orange Money Sénégal</strong> : paiement marchand ou transfert direct.
            </li>
            <li>
              <strong>Espèces (Cash) à la livraison</strong> : payez directement au livreur une fois
              le colis reçu et vérifié en main propre.
            </li>
          </ul>
        </div>
      ),
    },
    {
      question: "Quelle est votre politique d'échange ?",
      icon: <RefreshCw className="h-4 w-4 text-signal shrink-0" />,
      answer: (
        <div className="space-y-2">
          <p>
            Vous disposez de <strong>48 heures après réception</strong> pour demander un échange
            gratuit de taille si l'article ne convient pas.
          </p>
          <p className="text-xs">
            Conditions : l'article doit être strictement neuf, non porté en dehors d'un essayage,
            non lavé, et avec tous ses accessoires ou étiquettes d'origine. Écrivez-nous simplement
            sur WhatsApp avec une photo du produit pour planifier le passage du livreur.
          </p>
        </div>
      ),
    },
    {
      question: "Comment fonctionne la commande sur WhatsApp ?",
      icon: <ShieldCheck className="h-4 w-4 text-signal shrink-0" />,
      answer: (
        <p>
          Vous composez votre panier sur le site ou cliquez sur <em>Commander sur WhatsApp</em> sur
          la fiche d'un article. Un message structuré s'ouvre avec votre sélection, vos tailles et
          votre quartier à Dakar. Notre équipe vous répond immédiatement pour confirmer la
          disponibilité, votre adresse de livraison exacte et déclencher la livraison.
        </p>
      ),
    },
  ];

  return (
    <div className="container-edit pt-6 md:pt-12 pb-20">
      <div className="mb-10 border-b border-ink pb-6">
        <p className="font-jp text-xs text-muted-foreground">よくある質問 · 案内</p>
        <h1 className="font-display mt-1 text-5xl md:text-7xl">FAQ & Guide Pratique</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground text-sm md:text-base">
          Tout ce que tu dois savoir sur la livraison à Dakar, les tailles de nos tenues anime, les
          paiements Wave & Orange Money et notre politique d'échange.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-12">
        <div className="space-y-12 lg:col-span-8">
          <FaqSection
            title="Livraison & Délais à Dakar"
            subtitle="01 · Expédition & Quartiers"
            items={deliveryFaq}
          />
          <FaqSection
            title="Guide des Tailles Anime"
            subtitle="02 · Mensurations & Cosplay"
            items={sizeFaq}
          />
          <FaqSection
            title="Paiements & Échanges sous 48h"
            subtitle="03 · Confiance & Sérénité"
            items={paymentAndReturnsFaq}
          />
        </div>

        {/* Support sidebar */}
        <aside className="lg:col-span-4">
          <div className="rounded-sm border border-border bg-card p-6 lg:sticky lg:top-28 space-y-6">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-6 w-6 text-signal" />
              <div>
                <h3 className="font-display text-2xl">Une question spécifique ?</h3>
                <p className="text-xs text-muted-foreground">On répond en quelques minutes</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Tu cherches une figurine particulière, un t-shirt introuvable ou tu veux vérifier une
              mesure avant de commander ? L'équipe est disponible en direct.
            </p>

            <a
              href={whatsAppLink(
                "Bonjour Anime Store Dakar, j'ai une question sur vos produits et livraisons.",
              )}
              target="_blank"
              rel="noreferrer"
              className={btn({
                variant: "whatsapp",
                size: "lg",
                className:
                  "w-full justify-center gap-2 font-condensed uppercase tracking-wider h-12 text-sm",
              })}
            >
              <WhatsAppIcon className="h-5 w-5" />
              Poser une question sur WhatsApp
            </a>

            <div className="border-t border-border pt-4 space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Horaires WhatsApp :</span>
                <span className="font-semibold text-foreground">Lun - Sam : 9h - 20h</span>
              </div>
              <div className="flex justify-between">
                <span>Localisation :</span>
                <span className="font-semibold text-foreground">Dakar, Sénégal</span>
              </div>
              <div className="flex justify-between">
                <span>Instagram officiel :</span>
                <a
                  href="https://www.instagram.com/anime_store_dakar/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-signal hover:underline font-semibold"
                >
                  @anime_store_dakar
                </a>
              </div>
            </div>

            <MockNotice />
          </div>
        </aside>
      </div>
    </div>
  );
}
