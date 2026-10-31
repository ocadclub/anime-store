import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import {
  DAKAR_DELIVERY_ZONES,
  PAYMENT_METHODS,
  buildWhatsAppMessage,
  formatFCFA,
  whatsAppLink,
} from "@/lib/products";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { btn } from "./Btn";
import { QuantityPicker } from "./QuantityPicker";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function CartDrawer() {
  const {
    cartLines,
    cartDrawerOpen,
    closeCartDrawer,
    setQuantity,
    removeFromCart,
    selectedDeliveryZone,
    selectedDeliveryZoneId,
    setSelectedDeliveryZoneId,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
  } = useStore();

  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && cartDrawerOpen) {
        closeCartDrawer();
      }
    };
    if (cartDrawerOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [cartDrawerOpen, closeCartDrawer]);

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

  if (!cartDrawerOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Tiroir Panier"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCartDrawer}
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        className={cn(
          "relative flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300 ease-out",
          "md:w-[28rem]",
        )}
      >
        {/* Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-signal" />
            <span className="font-display text-2xl tracking-wide">Ton Panier</span>
            <span className="label-caps rounded-full bg-secondary px-2 py-0.5 text-[0.68rem] text-muted-foreground">
              {cartLines.reduce((sum, l) => sum + l.item.quantity, 0)} articles
            </span>
          </div>
          <button
            type="button"
            onClick={closeCartDrawer}
            className="grid h-10 w-10 place-items-center rounded-sm text-muted-foreground hover:bg-secondary hover:text-ink"
            aria-label="Fermer le panier"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {cartLines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/40" />
            <p className="font-display mt-4 text-3xl">Panier vide</p>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Parcours les collections d'anime pour ajouter tes pièces favorites.
            </p>
            <Link
              to="/boutique"
              onClick={closeCartDrawer}
              className={btn({ variant: "signal", size: "md", className: "mt-6" })}
            >
              Explorer la boutique <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <>
            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
              {/* Product list */}
              <ul className="divide-y divide-border border-b border-border">
                {cartLines.map(({ item, product }) => (
                  <li
                    key={`${item.slug}-${item.size ?? ""}`}
                    className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-3 py-3.5"
                  >
                    <Link
                      to="/produit/$slug"
                      params={{ slug: product.slug }}
                      onClick={closeCartDrawer}
                      className="aspect-[4/5] overflow-hidden rounded-xs bg-card border border-border/60"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </Link>
                    <div className="flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            to="/produit/$slug"
                            params={{ slug: product.slug }}
                            onClick={closeCartDrawer}
                            className="font-medium text-sm leading-snug line-clamp-1 hover:text-signal"
                          >
                            {product.name}
                          </Link>
                          <span className="font-condensed text-base font-bold shrink-0">
                            {formatFCFA(product.price * item.quantity)}
                          </span>
                        </div>
                        {item.size && (
                          <p className="label-caps mt-0.5 text-[0.65rem] text-muted-foreground">
                            Taille: {item.size}
                          </p>
                        )}
                      </div>

                      <div className="mt-2 flex items-center justify-between">
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
                          className="text-muted-foreground hover:text-signal p-1 text-xs inline-flex items-center gap-1"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Delivery Zone Selector */}
              <div className="rounded-sm border border-border bg-card p-3.5">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-signal" />
                  <span className="label-caps text-[0.7rem] font-bold">
                    Zone de livraison Dakar
                  </span>
                </div>
                <select
                  value={selectedDeliveryZoneId}
                  onChange={(e) => setSelectedDeliveryZoneId(e.target.value)}
                  className="w-full rounded-sm border border-input bg-background px-3 py-2 text-xs font-medium focus:border-ink focus:outline-none"
                >
                  {DAKAR_DELIVERY_ZONES.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                      {zone.name} — {zone.price === 0 ? "Gratuit" : formatFCFA(zone.price)} (
                      {zone.delay})
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-[0.72rem] text-muted-foreground leading-snug">
                  {selectedDeliveryZone.description}
                </p>
              </div>

              {/* Payment Methods */}
              <div className="rounded-sm border border-border bg-card p-3.5">
                <span className="label-caps text-[0.7rem] font-bold block mb-2">
                  Paiements acceptés à Dakar
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {PAYMENT_METHODS.map((pm) => {
                    const active = selectedPaymentMethod === pm.name;
                    return (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setSelectedPaymentMethod(pm.name)}
                        className={cn(
                          "rounded-xs border px-2 py-1.5 text-center text-[0.72rem] font-semibold transition-all",
                          active
                            ? "border-ink bg-ink text-ink-foreground shadow-xs"
                            : "border-input bg-secondary/50 text-foreground hover:border-ink/60",
                        )}
                      >
                        {pm.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer / Sticky CTA */}
            <div className="border-t border-border bg-card p-4 space-y-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Sous-total articles</span>
                  <span className="font-condensed text-sm font-semibold text-foreground">
                    {formatFCFA(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Frais de livraison ({selectedDeliveryZone.shortName})</span>
                  <span className="font-condensed text-sm font-semibold text-foreground">
                    {deliveryFee === 0 ? "Gratuit" : formatFCFA(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-border/80 pt-2 text-sm font-bold">
                  <span className="font-display text-lg tracking-wide">Total affiché</span>
                  <span className="font-condensed text-xl font-bold text-signal">
                    {formatFCFA(grandTotal)}
                  </span>
                </div>
              </div>

              <a
                href={whatsAppLink(message)}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  toast.success("Redirection vers WhatsApp", {
                    description: "Ton panier avec ta zone de livraison est pré-rempli.",
                  });
                }}
                className={btn({
                  variant: "whatsapp",
                  size: "lg",
                  className:
                    "w-full justify-center gap-2 h-12 text-sm uppercase tracking-wider font-condensed",
                })}
              >
                <WhatsAppIcon className="h-5 w-5" />
                Commander sur WhatsApp ({formatFCFA(grandTotal)})
              </a>

              <div className="flex items-center justify-between pt-1">
                <Link
                  to="/panier"
                  onClick={closeCartDrawer}
                  className="text-[0.75rem] font-medium text-muted-foreground underline-offset-4 hover:underline hover:text-ink"
                >
                  Voir la page panier complète
                </Link>
                <span className="label-caps text-[0.62rem] text-muted-foreground">
                  Confirmation par échange direct
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
