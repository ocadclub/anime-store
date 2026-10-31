import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { StoreProvider } from "@/lib/store";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";
import { btn } from "@/components/site/Btn";

function NotFoundComponent() {
  return (
    <div className="container-edit flex min-h-[60vh] items-center py-20">
      <div className="max-w-md">
        <p className="font-jp text-sm text-muted-foreground">見つかりません</p>
        <h1 className="font-display mt-2 text-7xl">404</h1>
        <p className="mt-3 text-muted-foreground">Cette page n'existe pas ou a été déplacée.</p>
        <Link to="/boutique" className={btn({ variant: "ink", className: "mt-8" })}>
          Retour à la boutique
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl text-foreground">Cette page n'a pas pu s'afficher</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Un problème est survenu. Réessayez ou revenez à l'accueil.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className={btn({ variant: "ink" })}
          >
            Réessayer
          </button>
          <a href="/" className={btn({ variant: "outline" })}>
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Anime Store Dakar — Vêtements & goodies anime" },
      {
        name: "description",
        content: "Vêtements anime, cosplay et goodies à Dakar. Commande directe sur WhatsApp.",
      },
      { name: "author", content: "Anime Store Dakar" },
      { property: "og:title", content: "Anime Store Dakar" },
      { property: "og:description", content: "Vêtements anime, cosplay et goodies à Dakar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#111111" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Barlow:wght@400;500;600;700&family=Bebas+Neue&family=Noto+Sans+JP:wght@500;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-ink-foreground"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">
          <Outlet />
        </main>
        <Footer />
        <Toaster position="bottom-center" />
      </StoreProvider>
    </QueryClientProvider>
  );
}
