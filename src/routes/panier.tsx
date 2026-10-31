import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, MapPin, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { btn } from "@/components/site/Btn";
import { MockNotice } from "@/components/site/MockNotice";
import { QuantityPicker } from "@/components/site/QuantityPicker";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import {
  DAKAR_DELIVERY_ZONES,
  PAYMENT_METHODS,
  buildWhatsAppMessage,
  formatFCFA,
  whatsAppLink,
} from "@/lib/products";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/panier")({
  head: () => ({
    meta: [
      { title: "Panier & Livraison — Anime Store Dakar" },
      {
        name: "description",
        content:
          "Ton panier Anime Store Dakar avec calcul de livraison à Dakar et commande WhatsApp instantanée.",
      },
      { property: "og:title", content: "Panier & Livraison — Anime Store Dakar" },
      {
        property: "og:description",
        content: "Valide ta sélection anime et tes frais de livraison à Dakar sur WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Cart,
});

function Cart() {
  const {
    cartLines,
    setQuantity,
    removeFromCart,
    clearCart,
    selectedDeliveryZone,
    selectedDeliveryZoneId,
    setSelectedDeliveryZoneId,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
  } = useStore();

  const subtotal = cartLines.reduce((s, l) => s + l.product.price * l.item.quantity, 0);
  const deliveryFee = selectedDeliveryZone.price;
  const grandTotal = subtotal + deliveryFee;

  const message = buildWhatsAppMessage(
    cartLines.map((l) => ({
      name: l.product.name,
      variant: l.item.size,
      quantity: l.item.quantity,
      unitPrice: l.product.price,
    })),
    selectedDeliveryZone,
    selectedPaymentMethod,
  );

  return (
    <div className="container-edit pt-6 md:pt-12 pb-16">
      <div className="mb-6 flex flex-wrap items-end justify-between border-b border-ink pb-5">
        <div>
          <p className="font-jp text-xs text-muted-foreground">カート</p>
          <h1 className="font-display mt-1 text-5xl md:text-7xl">Panier & Livraison</h1>
        </div>
        {cartLines.length > 0 && (
          <button
            type="button"
            onClick={() => {
              clearCart();
              toast("Panier vidé");
            }}
            className="text-xs text-muted-foreground hover:text-signal underline-offset-4 hover:underline py-1"
          >
            Vider tout le panier
          </button>
        )}
      </div>

      {cartLines.length === 0 ? (
        <div className="flex flex-col items-start gap-4 py-16">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          <p className="font-display text-4xl">Ton panier est vide</p>
          <p className="max-w-md text-muted-foreground">
            Ajoute des pièces depuis la boutique, puis choisis ta zone de livraison à Dakar pour
            envoyer ta sélection en un seul message WhatsApp.
          </p>
          <Link to="/boutique" className={btn({ variant: "signal", size: "lg" })}>
            Découvrir la boutique
          </Link>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Main Items Section */}
          <div className="space-y-8 lg:col-span-7">
            <div>
              <p className="label-caps mb-3 text-muted-foreground">
                Articles sélectionnés ({cartLines.reduce((s, i) => s + i.item.quantity, 0)})
              </p>
              <ul className="divide-y divide-border border-y border-border">
                {cartLines.map(({ item, product }) => (
                  <li
                    key={`${item.slug}-${item.size ?? ""}`}
                    className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 py-4 sm:grid-cols-[7rem_minmax(0,1fr)]"
                  >
                    <Link
                      to="/produit/$slug"
                      params={{ slug: product.slug }}
                      className="block aspect-[4/5] overflow-hidden rounded-xs bg-card border border-border"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-col justify-between gap-2">
                      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                        <div className="min-w-0">
                          <p className="label-caps text-[0.62rem] text-signal">{product.series}</p>
                          <Link
                            to="/produit/$slug"
                            params={{ slug: product.slug }}
                            className="mt-0.5 block font-semibold leading-snug hover:text-signal"
                          >
                            {product.name}
                          </Link>
                          {item.size && (
                            <p className="mt-1 text-xs text-muted-foreground">
                              Taille : {item.size}
                            </p>
                          )}
                        </div>
                        <p className="font-condensed whitespace-nowrap text-lg font-bold">
                          {formatFCFA(product.price * item.quantity)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <QuantityPicker
                          size="sm"
                          value={item.quantity}
                          onChange={(q) => setQuantity(item.slug, item.size, q)}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            removeFromCart(item.slug, item.size);
                            toast("Article retiré", { description: product.name });
                          }}
                          className="inline-flex h-9 items-center gap-1.5 text-xs text-muted-foreground hover:text-signal"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Retirer
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Delivery Zone Selection on Dakar */}
            <div className="rounded-sm border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-5 w-5 text-signal" />
                <h2 className="font-display text-2xl">Zone de livraison à Dakar</h2>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Sélectionne ton quartier pour calculer précisément tes frais de livraison.
              </p>

              <div className="grid gap-2.5 sm:grid-cols-2">
                {DAKAR_DELIVERY_ZONES.map((zone) => {
                  const isSelected = selectedDeliveryZoneId === zone.id;
                  return (
                    <label
                      key={zone.id}
                      className={cn(
                        "relative flex cursor-pointer flex-col justify-between rounded-sm border p-3.5 transition-all",
                        isSelected
                          ? "border-ink bg-secondary/80 ring-1 ring-ink"
                          : "border-input bg-card hover:border-ink/60",
                      )}
                    >
                      <input
                        type="radio"
                        name="delivery_zone"
                        value={zone.id}
                        checked={isSelected}
                        onChange={() => setSelectedDeliveryZoneId(zone.id)}
                        className="sr-only"
                      />
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-sm leading-tight text-foreground">
                          {zone.name}
                        </span>
                        {isSelected && <CheckCircle2 className="h-4 w-4 shrink-0 text-signal" />}
                      </div>
                      <p className="mt-1 text-[0.72rem] text-muted-foreground leading-snug">
                        {zone.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2 text-xs">
                        <span className="text-muted-foreground">Délai : {zone.delay}</span>
                        <span className="font-condensed font-bold text-foreground text-sm">
                          {zone.price === 0 ? "Gratuit" : formatFCFA(zone.price)}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Payment Methods Notice */}
            <div className="rounded-sm border border-border bg-card p-5">
              <h2 className="font-display text-2xl mb-1">Moyens de paiement acceptés</h2>
              <p className="text-xs text-muted-foreground mb-4">
                Pas besoin de carte bancaire. Choisis ton mode de règlement favori pour ton échange
                WhatsApp :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PAYMENT_METHODS.map((pm) => {
                  const isSelected = selectedPaymentMethod === pm.name;
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setSelectedPaymentMethod(pm.name)}
                      className={cn(
                        "flex flex-col items-start rounded-sm border p-3 text-left transition-all",
                        isSelected
                          ? "border-ink bg-ink text-ink-foreground shadow-sm"
                          : "border-input bg-secondary/40 text-foreground hover:border-ink/60",
                      )}
                    >
                      <span className="font-condensed text-base font-bold">{pm.name}</span>
                      <span
                        className={cn(
                          "text-[0.68rem] mt-1",
                          isSelected ? "text-ink-foreground/80" : "text-muted-foreground",
                        )}
                      >
                        {pm.id === "cash"
                          ? "Au livreur lors de la remise"
                          : "Paiement sécurisé mobile"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sticky Summary Aside */}
          <aside className="lg:col-span-5">
            <div className="rounded-sm border border-border bg-card p-6 lg:sticky lg:top-28 space-y-5">
              <div className="border-b border-border pb-3">
                <p className="label-caps text-muted-foreground">Détail de la commande</p>
                <h2 className="font-display mt-1 text-3xl">Récapitulatif</h2>
              </div>

              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Articles ({cartLines.length})</dt>
                  <dd className="font-condensed text-base font-bold">{formatFCFA(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">
                    Livraison ({selectedDeliveryZone.shortName})
                  </dt>
                  <dd className="font-condensed text-base font-bold">
                    {deliveryFee === 0 ? "Gratuit" : formatFCFA(deliveryFee)}
                  </dd>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <dt>Mode de règlement</dt>
                  <dd className="font-semibold text-foreground">{selectedPaymentMethod}</dd>
                </div>
              </dl>

              <div className="flex items-baseline justify-between border-t border-ink pt-4">
                <div>
                  <span className="label-caps block">Total affiché</span>
                  <span className="text-[0.7rem] text-muted-foreground">Articles + Livraison</span>
                </div>
                <span className="font-condensed text-3xl font-bold text-signal">
                  {formatFCFA(grandTotal)}
                </span>
              </div>

              <a
                href={whatsAppLink(message)}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  toast.success("WhatsApp s'ouvre avec ton message prêt", {
                    description:
                      "La commande et l'adresse de livraison seront finalisées directement avec l'équipe.",
                  })
                }
                className={btn({
                  variant: "whatsapp",
                  size: "lg",
                  className:
                    "w-full justify-center gap-2 text-sm uppercase tracking-wider font-condensed h-14",
                })}
              >
                <WhatsAppIcon className="h-5 w-5" />
                Commander sur WhatsApp ({formatFCFA(grandTotal)})
              </a>

              <div className="rounded-xs bg-secondary/60 p-3 text-[0.72rem] leading-relaxed text-muted-foreground space-y-1">
                <p className="font-semibold text-foreground">💡 Comment se passe la suite ?</p>
                <p>
                  En cliquant, un message WhatsApp avec tes articles, ta zone de livraison (
                  {selectedDeliveryZone.shortName}) et ton choix de paiement (
                  {selectedPaymentMethod}) est préparé. Nous te confirmons l'horaire précis de
                  passage du coursier.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/boutique"
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-ink"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Continuer mes achats
                </Link>
              </div>

              <MockNotice className="mt-4" />
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
