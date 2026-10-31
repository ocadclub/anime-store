import itachi from "@/assets/itachi.jpg.asset.json";
import minato from "@/assets/minato.jpg.asset.json";
import obito from "@/assets/obito.jpg.asset.json";
import deathnote from "@/assets/deathnote.jpg.asset.json";

/**
 * Local catalogue Anime Store Dakar with local Dakar delivery & anime licensing.
 */

export type CategorySlug =
  "vetements" | "accessoires" | "bijoux" | "goodies" | "porte-cles" | "nouveautes";

export type Category = {
  slug: CategorySlug;
  name: string;
  jp: string;
  blurb: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "vetements",
    name: "Vêtements anime",
    jp: "衣服",
    blurb: "Manteaux, capes et tenues complètes.",
  },
  { slug: "accessoires", name: "Accessoires", jp: "小物", blurb: "Bandeaux, masques, chapeaux." },
  {
    slug: "bijoux",
    name: "Bijoux & colliers",
    jp: "首飾り",
    blurb: "Pendentifs, bagues et colliers.",
  },
  { slug: "goodies", name: "Goodies", jp: "グッズ", blurb: "Objets de collection et répliques." },
  {
    slug: "porte-cles",
    name: "Porte-clés",
    jp: "キーホルダー",
    blurb: "Katanas miniatures et figurines.",
  },
  { slug: "nouveautes", name: "Nouveautés", jp: "新作", blurb: "Les derniers arrivages à Dakar." },
];

export const ANIME_LICENSES = [
  "Toutes",
  "Naruto",
  "Jujutsu Kaisen",
  "Death Note",
  "One Piece",
  "Demon Slayer",
] as const;

export type DeliveryZone = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  price: number;
  delay: string;
};

export const DAKAR_DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: "centre",
    name: "Plateau · Médina · Fann · Point E",
    shortName: "Dakar Centre",
    description: "Plateau, Médina, Fann, Point E, Colobane, Gueule Tapée",
    price: 1500,
    delay: "24h",
  },
  {
    id: "almadies",
    name: "Almadies · Ngor · Yoff · Ouakam",
    shortName: "Almadies / Yoff",
    description: "Almadies, Ngor, Yoff, Ouakam, Mamelles",
    price: 2000,
    delay: "24h",
  },
  {
    id: "mermoz",
    name: "Mermoz · Sacré-Cœur · Liberté · Baobabs",
    shortName: "Mermoz / Liberté",
    description: "Mermoz, Sacré-Cœur 1-3, Liberté 1-6, Baobabs, Amitié",
    price: 1500,
    delay: "24h",
  },
  {
    id: "parcelles",
    name: "Grand Dakar · Parcelles Assainies · HLM",
    shortName: "Parcelles / Grand Dakar",
    description: "Grand Dakar, HLM, Castors, Parcelles Assainies (Unités 1-26)",
    price: 2000,
    delay: "24h - 48h",
  },
  {
    id: "banlieue",
    name: "Guédiawaye · Pikine (Banlieue)",
    shortName: "Pikine / Guédiawaye",
    description: "Guédiawaye, Pikine, Thiaroye, Dalifort",
    price: 2500,
    delay: "24h - 48h",
  },
  {
    id: "rufisque",
    name: "Rufisque · Keur Massar · Diamniadio",
    shortName: "Rufisque / Keur Massar",
    description: "Rufisque, Keur Massar, Malika, Bargny, Diamniadio",
    price: 3500,
    delay: "48h",
  },
  {
    id: "retrait",
    name: "Retrait gratuit en boutique / point relais (Dakar)",
    shortName: "Retrait boutique",
    description: "Point de retrait partenaire à Dakar (Gratuit)",
    price: 0,
    delay: "Sous 2h",
  },
];

export const PAYMENT_METHODS = [
  { id: "wave", name: "Wave", badgeColor: "bg-[#1dc4e9]/15 text-[#0a8ea9]" },
  { id: "om", name: "Orange Money", badgeColor: "bg-[#ff7900]/15 text-[#cc6100]" },
  { id: "cash", name: "Espèces à la livraison", badgeColor: "bg-emerald-500/15 text-emerald-700" },
] as const;

export type Product = {
  slug: string;
  code: string;
  name: string;
  series: string;
  category: Exclude<CategorySlug, "nouveautes">;
  price: number;
  isNew?: boolean;
  image: string;
  /** Alternate framings of the same photo for the gallery (object-position). */
  views: { label: string; position: string; zoom: number }[];
  sizes?: string[];
  description: string;
  details: string[];
  /** Tone of the photo background, so cards blend consistently. */
  tone: "light" | "dark";
};

export const PRODUCTS: Product[] = [
  {
    slug: "manteau-akatsuki-itachi",
    code: "ASD-001",
    name: "Manteau Akatsuki — Itachi",
    series: "Naruto Shippuden",
    category: "vetements",
    price: 25000,
    isNew: true,
    image: itachi.url,
    views: [
      { label: "Vue d'ensemble", position: "50% 50%", zoom: 1 },
      { label: "Col & nuages", position: "50% 22%", zoom: 1.9 },
      { label: "Bas du manteau", position: "50% 85%", zoom: 1.7 },
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Le manteau noir à nuages rouges de l'Akatsuki, col haut doublé de rouge carmin et manches évasées. Une pièce forte pour le cosplay comme pour un look streetwear affirmé à Dakar.",
    details: [
      "Col montant doublé rouge carmin",
      "Nuages Akatsuki brodés en relief",
      "Fermeture zippée frontale discrète",
    ],
    tone: "light",
  },
  {
    slug: "cape-hokage-minato",
    code: "ASD-002",
    name: "Cape du 4e Hokage — Minato",
    series: "Naruto",
    category: "vetements",
    price: 30000,
    isNew: true,
    image: minato.url,
    views: [
      { label: "Face & dos", position: "50% 50%", zoom: 1 },
      { label: "Kanji au dos", position: "73% 25%", zoom: 2 },
      { label: "Flammes", position: "50% 85%", zoom: 1.7 },
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "La légendaire cape blanche aux flammes écarlates du Quatrième Hokage, arborant l'inscription 四代目火影 au dos. Ensemble complet de qualité avec gilet et pantalon d'intervention.",
    details: [
      "Calligraphie 四代目火影 au dos",
      "Flammes rouges sublimées haute fidélité",
      "Ensemble complet : cape, gilet et sous-vêtements",
    ],
    tone: "light",
  },
  {
    slug: "tenue-tobi-obito",
    code: "ASD-003",
    name: "Tenue Obito — Guerre ninja",
    series: "Naruto Shippuden",
    category: "vetements",
    price: 35000,
    image: obito.url,
    views: [
      { label: "Tenue portée", position: "50% 50%", zoom: 1 },
      { label: "Masque", position: "68% 15%", zoom: 2.2 },
      { label: "Ceinture", position: "68% 42%", zoom: 1.8 },
    ],
    sizes: ["M", "L", "XL"],
    description:
      "La tenue complète d'Obito Uchiha lors de la 4e Grande Guerre ninja : longue robe ample gris-bleu, large ceinture obi blanche et masque à spirale iconique.",
    details: [
      "Robe longue fluide coupe anime",
      "Ceinture obi blanche renforcée",
      "Tissu respirant idéal pour conventions et photos",
    ],
    tone: "dark",
  },
  {
    slug: "carnet-death-note",
    code: "ASD-004",
    name: "Carnet Death Note",
    series: "Death Note",
    category: "goodies",
    price: 7500,
    isNew: true,
    image: deathnote.url,
    views: [
      { label: "Carnet & plume", position: "50% 50%", zoom: 1 },
      { label: "Couverture", position: "35% 35%", zoom: 1.8 },
    ],
    description:
      "Le carnet noir de Ryuk avec couverture façon cuir texturée, titre DEATH NOTE gravé en argenté et pages intérieures avec les règles complètes d'utilisation en anglais et japonais.",
    details: [
      "Couverture noire simili-cuir haut de gamme",
      "Règles originales de Ryuk imprimées sur les premières pages",
      "Livré avec plume d'écriture noire réplique",
    ],
    tone: "dark",
  },
  {
    slug: "chapeau-de-paille-luffy",
    code: "ASD-005",
    name: "Chapeau de Paille Mugiwara — Luffy",
    series: "One Piece",
    category: "accessoires",
    price: 8000,
    isNew: true,
    image: "/assets/products/chapeau-luffy.jpg",
    views: [
      { label: "Vue d'ensemble", position: "50% 50%", zoom: 1 },
      { label: "Ruban rouge", position: "50% 55%", zoom: 1.7 },
    ],
    description:
      "L'emblématique chapeau de paille confié par le pirate Shanks le Roux à Monkey D. Luffy. Paille naturelle tressée respirante avec ruban écarlate cousu et cordon de maintien anti-vent.",
    details: [
      "Paille tressée naturelle robuste et aérée",
      "Ruban carmin cousu avec insigne de l'équipage",
      "Cordon de cou ajustable pour festivals et sorties",
    ],
    tone: "light",
  },
  {
    slug: "porte-cle-katana-nichirin-tanjiro",
    code: "ASD-006",
    name: "Porte-clés Katana Nichirin — Tanjiro",
    series: "Demon Slayer",
    category: "porte-cles",
    price: 3500,
    isNew: true,
    image: "/assets/products/porte-cle-katana.jpg",
    views: [
      { label: "Sabre & fourreau", position: "50% 50%", zoom: 1 },
      { label: "Garde & kanji", position: "50% 48%", zoom: 1.8 },
    ],
    description:
      "Miniature d'orfèvrerie en alliage de zinc reproduisant le sabre Nichirin noir de Tanjiro Kamado dans Kimetsu no Yaiba. Lame dégainable de son fourreau gravé du kanji 'Metsu' (滅 - Extermination).",
    details: [
      "Lame métallique dégainable du fourreau",
      "Garde en forme de roue de flamme fidèle à l'anime",
      "Anneau porte-clés renforcé anti-perte",
    ],
    tone: "dark",
  },
];

export const WHATSAPP_NUMBER = "221775958179";
export const WHATSAPP_DISPLAY = "+221 77 595 81 79";
export const INSTAGRAM_URL = "https://www.instagram.com/anime_store_dakar/";

export function formatFCFA(value: number) {
  return `${new Intl.NumberFormat("fr-FR").format(value).replace(/\u202f|\u00a0/g, " ")} FCFA`;
}

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function productsInCategory(slug: CategorySlug) {
  if (slug === "nouveautes") return PRODUCTS.filter((p) => p.isNew);
  return PRODUCTS.filter((p) => p.category === slug);
}

export type SortKey = "pertinence" | "prix-asc" | "prix-desc";

export function filterProducts(opts: {
  category?: CategorySlug | "tout";
  series?: string | "toutes";
  query?: string;
  sort?: SortKey;
}) {
  const q = (opts.query ?? "").trim().toLowerCase();
  const normalize = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  let list =
    !opts.category || opts.category === "tout" ? [...PRODUCTS] : productsInCategory(opts.category);

  if (opts.series && opts.series !== "toutes" && opts.series !== "Toutes") {
    const sNorm = normalize(opts.series);
    list = list.filter((p) => normalize(p.series).includes(sNorm));
  }

  if (q) {
    const nq = normalize(q);
    list = list.filter((p) =>
      normalize(`${p.name} ${p.series} ${getCategory(p.category)?.name ?? ""}`).includes(nq),
    );
  }

  if (opts.sort === "prix-asc") list.sort((a, b) => a.price - b.price);
  if (opts.sort === "prix-desc") list.sort((a, b) => b.price - a.price);

  return list;
}

export type OrderLine = {
  name: string;
  variant?: string | undefined;
  quantity: number;
  unitPrice: number;
};

/** Builds the prefilled WhatsApp message for one or more lines, with optional delivery & payment. */
export function buildWhatsAppMessage(
  lines: OrderLine[],
  deliveryZone?: DeliveryZone,
  paymentMethod?: string,
) {
  const body = lines
    .map((l) => {
      const variant = l.variant ? ` (taille ${l.variant})` : "";
      return `• ${l.name}${variant} × ${l.quantity} — ${formatFCFA(l.unitPrice * l.quantity)}`;
    })
    .join("\n");

  const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0);
  const deliveryFee = deliveryZone ? deliveryZone.price : 0;
  const grandTotal = subtotal + deliveryFee;

  let msg = `Bonjour Anime Store Dakar, je souhaite commander :\n${body}`;

  if (deliveryZone) {
    const feeStr = deliveryZone.price === 0 ? "Gratuit (0 FCFA)" : formatFCFA(deliveryZone.price);
    msg += `\n\n📍 Zone de livraison : ${deliveryZone.name}\nFrais de livraison : ${feeStr} [Délai estimé : ${deliveryZone.delay}]`;
  }

  if (paymentMethod) {
    msg += `\n💳 Paiement prévu : ${paymentMethod}`;
  }

  msg += `\n\nTotal affiché : ${formatFCFA(grandTotal)}\n\nPouvez-vous me confirmer la disponibilité et la livraison ?`;
  return msg;
}

export function whatsAppLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
