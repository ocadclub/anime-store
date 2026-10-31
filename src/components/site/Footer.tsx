import { Link } from "@tanstack/react-router";
import { CheckCircle2, Instagram, MapPin, Truck, Wallet } from "lucide-react";
import logo from "@/assets/logo.jpg.asset.json";
import { INSTAGRAM_URL, WHATSAPP_DISPLAY, whatsAppLink } from "@/lib/products";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-ink bg-ink text-ink-foreground">
      <div className="container-edit grid gap-10 py-16 md:grid-cols-12 md:gap-8">
        {/* Brand identity column */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-3.5">
            <img
              src={logo.url}
              alt="Logo Anime Store Dakar"
              width={56}
              height={56}
              className="h-14 w-14 rounded-xs object-cover border border-ink-foreground/20"
            />
            <div>
              <p className="font-display text-3xl leading-none">Anime Store Dakar</p>
              <p className="font-jp text-xs text-ink-foreground/50 mt-1">アニメストア・ダカール</p>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-foreground/75">
            La boutique de référence pour les passionnés d'anime, cosplay et streetwear manga au
            Sénégal. Sélection premium et commande directe sans carte bancaire.
          </p>
          <div className="flex items-center gap-2 text-xs text-ink-foreground/60">
            <MapPin className="h-3.5 w-3.5 text-signal" />
            <span>Dakar, Sénégal · Retrait gratuit disponible</span>
          </div>
        </div>

        {/* Navigation column */}
        <div className="md:col-span-2">
          <p className="label-caps text-ink-foreground/50">Catalogue</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link to="/" className="hover:text-signal transition-colors">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/boutique" className="hover:text-signal transition-colors">
                Boutique
              </Link>
            </li>
            <li>
              <Link to="/collections" className="hover:text-signal transition-colors">
                Collections
              </Link>
            </li>
            <li>
              <Link to="/nouveautes" className="hover:text-signal transition-colors">
                Nouveautés
              </Link>
            </li>
            <li>
              <Link to="/panier" className="hover:text-signal transition-colors">
                Mon Panier
              </Link>
            </li>
          </ul>
        </div>

        {/* Reassurance & Policies column */}
        <div className="md:col-span-3">
          <p className="label-caps text-ink-foreground/50">Services & Politiques</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link
                to="/faq"
                className="hover:text-signal transition-colors flex items-center gap-1.5"
              >
                <span>FAQ & Délais de livraison</span>
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="hover:text-signal transition-colors flex items-center gap-1.5"
              >
                <span>Guide des tailles streetwear</span>
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="hover:text-signal transition-colors flex items-center gap-1.5"
              >
                <span>Politique d'échange sous 48h</span>
              </Link>
            </li>
            <li>
              <Link to="/mentions-legales" className="hover:text-signal transition-colors">
                Mentions Légales & CGV
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Dakar Logistics column */}
        <div className="md:col-span-3 space-y-4">
          <p className="label-caps text-ink-foreground/50">Livraison & Paiement</p>
          <div className="space-y-2.5 text-xs text-ink-foreground/75 leading-relaxed">
            <div className="flex items-start gap-2">
              <Truck className="h-4 w-4 shrink-0 text-signal mt-0.5" />
              <span>
                Livraison 24h à 48h à Dakar (Plateau, Almadies, Liberté, Parcelles, Pikine,
                Rufisque).
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Wallet className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
              <span>Paiement par Wave, Orange Money ou Espèces à la remise du colis.</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xs border border-ink-foreground/20 bg-ink-foreground/5 px-3 py-2 text-xs font-semibold hover:border-signal hover:text-signal transition-colors"
            >
              <Instagram className="h-4 w-4 text-pink-500" />
              <span>Instagram officiel : @anime_store_dakar</span>
              <CheckCircle2 className="h-3 w-3 text-sky-400 ml-auto" />
            </a>
            <a
              href={whatsAppLink("Bonjour Anime Store Dakar, je vous contacte depuis le site.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xs border border-ink-foreground/20 bg-ink-foreground/5 px-3 py-2 text-xs font-semibold hover:border-emerald-500 hover:text-emerald-400 transition-colors"
            >
              <WhatsAppIcon className="h-4 w-4 text-emerald-400" />
              <span>WhatsApp : {WHATSAPP_DISPLAY}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-foreground/10 bg-black/20">
        <div className="container-edit flex flex-col gap-2 py-5 text-xs text-ink-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Anime Store Dakar · Boutique anime & cosplay au Sénégal.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/mentions-legales" className="hover:underline">
              Mentions Légales
            </Link>
            <Link to="/faq" className="hover:underline">
              Guide & FAQ
            </Link>
            <span className="font-jp text-ink-foreground/30">東京 → ダカール</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
