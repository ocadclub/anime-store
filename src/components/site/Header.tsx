import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, HelpCircle, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/logo.jpg.asset.json";
import { useStore } from "@/lib/store";
import { whatsAppLink } from "@/lib/products";
import { cn } from "@/lib/utils";
import { btn } from "./Btn";
import { CartDrawer } from "./CartDrawer";
import { WhatsAppIcon } from "./WhatsAppIcon";

const NAV = [
  { to: "/", label: "Accueil", jp: "ホーム" },
  { to: "/boutique", label: "Boutique", jp: "ショップ" },
  { to: "/collections", label: "Collections", jp: "コレクション" },
  { to: "/nouveautes", label: "Nouveautés", jp: "新作" },
  { to: "/faq", label: "FAQ & Guide", jp: "案内" },
] as const;

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      className="flex shrink-0 items-center gap-2.5 sm:gap-3"
      aria-label="Anime Store Dakar — accueil"
    >
      <img
        src={logo.url}
        alt=""
        width={40}
        height={40}
        className="h-9 w-9 shrink-0 rounded-xs object-cover md:h-11 md:w-11"
      />
      {!compact && (
        <span className="leading-none">
          <span className="block font-display text-[1.3rem] sm:text-[1.45rem] md:text-[1.6rem]">
            Anime Store
          </span>
          <span className="label-caps block text-[0.58rem] sm:text-[0.62rem] text-muted-foreground">
            Dakar · アニメストア
          </span>
        </span>
      )}
    </Link>
  );
}

export function Header() {
  const { cartCount, favorites, openCartDrawer } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    setMenuOpen(false);
    navigate({ to: "/boutique", search: { q: q.trim() || undefined } });
  };

  return (
    <>
      <div className="bg-ink text-ink-foreground">
        <div className="container-edit flex h-8 items-center justify-between gap-4">
          <p className="label-caps truncate text-[0.62rem] text-ink-foreground/80">
            Dakar : Livraison 24h · Paiement Wave, Orange Money & Espèces · Commande WhatsApp
          </p>
          <span className="font-jp hidden text-[0.65rem] text-ink-foreground/60 sm:block">
            東京 → ダカール
          </span>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container-edit grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:h-[4.5rem] lg:grid-cols-[1fr_auto_1fr]">
          <Logo />

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    activeOptions={{ exact: item.to === "/" }}
                    className="group relative block py-2 font-condensed text-[0.95rem] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-signal data-[status=active]:text-signal"
                  >
                    {item.label}
                    <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-signal transition-transform duration-300 group-hover:scale-x-100 group-data-[status=active]:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center justify-end gap-1 md:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center text-ink transition-colors hover:text-signal"
              aria-label="Rechercher"
              aria-expanded={searchOpen}
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              to="/favoris"
              className="relative hidden h-10 w-10 place-items-center text-ink transition-colors hover:text-signal sm:grid"
              aria-label={`Favoris (${favorites.length})`}
            >
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-signal" />
              )}
            </Link>
            <button
              type="button"
              onClick={openCartDrawer}
              className="relative grid h-10 w-10 place-items-center text-ink transition-colors hover:text-signal"
              aria-label={`Ouvrir le panier (${cartCount} article${cartCount > 1 ? "s" : ""})`}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 top-0.5 grid h-[1.1rem] min-w-[1.1rem] place-items-center rounded-full bg-signal px-1 font-condensed text-[0.65rem] font-bold text-signal-foreground">
                  {cartCount}
                </span>
              )}
            </button>
            <a
              href={whatsAppLink("Bonjour Anime Store Dakar, j'ai une question.")}
              target="_blank"
              rel="noreferrer"
              className={cn(btn({ variant: "ink", size: "sm" }), "ml-2 hidden md:inline-flex")}
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="grid h-10 w-10 place-items-center text-ink lg:hidden"
              aria-label="Ouvrir le menu"
              aria-expanded={menuOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-border bg-background">
            <form
              onSubmit={submitSearch}
              className="container-edit flex items-center gap-3 py-4"
              role="search"
            >
              <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
              <label htmlFor="header-search" className="sr-only">
                Rechercher un produit
              </label>
              <input
                id="header-search"
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Itachi, Hokage, One Piece, Demon Slayer…"
                className="h-11 min-w-0 flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground focus-visible:outline-none"
              />
              <button type="submit" className={btn({ variant: "signal", size: "sm" })}>
                Chercher
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!menuOpen}
      >
        <div
          className={`absolute inset-0 bg-ink/50 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenuOpen(false)}
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-ink text-ink-foreground transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex h-16 items-center justify-between px-5">
            <span className="label-caps text-ink-foreground/60">Menu · メニュー</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="grid h-10 w-10 place-items-center"
              aria-label="Fermer le menu"
              tabIndex={menuOpen ? 0 : -1}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-5" aria-label="Navigation mobile">
            <ul className="border-t border-ink-foreground/15">
              {NAV.map((item, i) => (
                <li key={item.to} className="border-b border-ink-foreground/15">
                  <Link
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    activeOptions={{ exact: item.to === "/" }}
                    tabIndex={menuOpen ? 0 : -1}
                    className="flex items-baseline justify-between py-4 data-[status=active]:text-signal"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="label-caps text-ink-foreground/40">0{i + 1}</span>
                      <span className="font-display text-3xl">{item.label}</span>
                    </span>
                    <span className="font-jp text-xs text-ink-foreground/40">{item.jp}</span>
                  </Link>
                </li>
              ))}
              <li className="border-b border-ink-foreground/15">
                <Link
                  to="/favoris"
                  onClick={() => setMenuOpen(false)}
                  tabIndex={menuOpen ? 0 : -1}
                  className="flex items-center justify-between py-4 font-condensed text-sm font-semibold uppercase tracking-[0.14em]"
                >
                  Mes favoris <span className="text-ink-foreground/50">{favorites.length}</span>
                </Link>
              </li>
              <li className="border-b border-ink-foreground/15">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    openCartDrawer();
                  }}
                  className="w-full flex items-center justify-between py-4 font-condensed text-sm font-semibold uppercase tracking-[0.14em] text-signal"
                >
                  Ouvrir le panier <span className="text-ink-foreground/70">({cartCount})</span>
                </button>
              </li>
            </ul>
          </nav>
          <div className="p-5 border-t border-ink-foreground/15 space-y-3">
            <div className="flex items-center gap-2 text-xs text-ink-foreground/70">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Boutique Dakar : Ouverte du Lun au Sam</span>
            </div>
            <a
              href={whatsAppLink("Bonjour Anime Store Dakar, j'ai une question.")}
              target="_blank"
              rel="noreferrer"
              tabIndex={menuOpen ? 0 : -1}
              className={btn({ variant: "whatsapp", size: "lg", className: "w-full" })}
            >
              <WhatsAppIcon className="h-5 w-5" />
              Écrire sur WhatsApp
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
