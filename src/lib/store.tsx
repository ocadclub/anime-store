import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DAKAR_DELIVERY_ZONES, getProduct, type DeliveryZone, type Product } from "./products";

export type CartItem = { slug: string; size?: string | undefined; quantity: number };

type StoreValue = {
  cart: CartItem[];
  favorites: string[];
  cartCount: number;
  addToCart: (slug: string, quantity: number, size?: string) => void;
  setQuantity: (slug: string, size: string | undefined, quantity: number) => void;
  removeFromCart: (slug: string, size: string | undefined) => void;
  clearCart: () => void;
  toggleFavorite: (slug: string) => boolean;
  isFavorite: (slug: string) => boolean;
  cartLines: { item: CartItem; product: Product }[];
  cartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;
  selectedDeliveryZoneId: string;
  setSelectedDeliveryZoneId: (id: string) => void;
  selectedDeliveryZone: DeliveryZone;
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: (method: string) => void;
};

const StoreContext = createContext<StoreValue | null>(null);
const CART_KEY = "asd-cart";
const FAV_KEY = "asd-favorites";
const ZONE_KEY = "asd-zone";
const PAYMENT_KEY = "asd-payment";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [selectedDeliveryZoneId, setSelectedDeliveryZoneId] = useState("centre");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Wave");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      const f = localStorage.getItem(FAV_KEY);
      const z = localStorage.getItem(ZONE_KEY);
      const p = localStorage.getItem(PAYMENT_KEY);
      if (c) setCart(JSON.parse(c));
      if (f) setFavorites(JSON.parse(f));
      if (z) setSelectedDeliveryZoneId(z);
      if (p) setSelectedPaymentMethod(p);
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      localStorage.setItem(ZONE_KEY, selectedDeliveryZoneId);
      localStorage.setItem(PAYMENT_KEY, selectedPaymentMethod);
    }
  }, [cart, selectedDeliveryZoneId, selectedPaymentMethod, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
  }, [favorites, hydrated]);

  const addToCart = useCallback((slug: string, quantity: number, size?: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.slug === slug && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: Math.min(20, i.quantity + quantity) } : i,
        );
      }
      return [...prev, { slug, size, quantity }];
    });
    setCartDrawerOpen(true);
  }, []);

  const setQuantity = useCallback((slug: string, size: string | undefined, quantity: number) => {
    setCart((prev) =>
      prev.map((i) =>
        i.slug === slug && i.size === size
          ? { ...i, quantity: Math.max(1, Math.min(20, quantity)) }
          : i,
      ),
    );
  }, []);

  const removeFromCart = useCallback((slug: string, size: string | undefined) => {
    setCart((prev) => prev.filter((i) => !(i.slug === slug && i.size === size)));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const openCartDrawer = useCallback(() => setCartDrawerOpen(true), []);
  const closeCartDrawer = useCallback(() => setCartDrawerOpen(false), []);
  const toggleCartDrawer = useCallback(() => setCartDrawerOpen((prev) => !prev), []);

  const toggleFavorite = useCallback(
    (slug: string) => {
      const willAdd = !favorites.includes(slug);
      setFavorites((prev) =>
        prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
      );
      return willAdd;
    },
    [favorites],
  );

  const selectedDeliveryZone = useMemo(() => {
    return (
      DAKAR_DELIVERY_ZONES.find((z) => z.id === selectedDeliveryZoneId) ?? DAKAR_DELIVERY_ZONES[0]!
    );
  }, [selectedDeliveryZoneId]);

  const value = useMemo<StoreValue>(() => {
    const cartLines = cart
      .map((item) => ({ item, product: getProduct(item.slug) }))
      .filter((l): l is { item: CartItem; product: Product } => Boolean(l.product));
    return {
      cart,
      favorites,
      cartCount: cart.reduce((s, i) => s + i.quantity, 0),
      addToCart,
      setQuantity,
      removeFromCart,
      clearCart,
      toggleFavorite,
      isFavorite: (slug) => favorites.includes(slug),
      cartLines,
      cartDrawerOpen,
      openCartDrawer,
      closeCartDrawer,
      toggleCartDrawer,
      selectedDeliveryZoneId,
      setSelectedDeliveryZoneId,
      selectedDeliveryZone,
      selectedPaymentMethod,
      setSelectedPaymentMethod,
    };
  }, [
    cart,
    favorites,
    addToCart,
    setQuantity,
    removeFromCart,
    clearCart,
    toggleFavorite,
    cartDrawerOpen,
    openCartDrawer,
    closeCartDrawer,
    toggleCartDrawer,
    selectedDeliveryZoneId,
    selectedDeliveryZone,
    selectedPaymentMethod,
  ]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
