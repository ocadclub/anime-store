import { describe, expect, it } from "vitest";
import {
  DAKAR_DELIVERY_ZONES,
  buildWhatsAppMessage,
  filterProducts,
  formatFCFA,
  whatsAppLink,
} from "@/lib/products";

describe("WhatsApp order", () => {
  it("includes product name, quantity and displayed price", () => {
    const msg = buildWhatsAppMessage([{ name: "Carnet Death Note", quantity: 2, unitPrice: 7500 }]);
    expect(msg).toContain("Carnet Death Note");
    expect(msg).toContain("× 2");
    expect(msg).toContain("15 000 FCFA");
  });

  it("targets the shop number +221 77 595 81 79", () => {
    expect(whatsAppLink("x")).toMatch(/^https:\/\/wa\.me\/221775958179\?text=x$/);
  });

  it("formats FCFA with spaces", () => {
    expect(formatFCFA(25000)).toBe("25 000 FCFA");
  });

  it("sorts by price ascending", () => {
    const prices = filterProducts({ sort: "prix-asc" }).map((p) => p.price);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  it("includes selected delivery zone and payment method in message", () => {
    const zone = DAKAR_DELIVERY_ZONES.find((z) => z.id === "almadies")!;
    const msg = buildWhatsAppMessage(
      [{ name: "Chapeau de Paille Mugiwara — Luffy", quantity: 1, unitPrice: 8000 }],
      zone,
      "Wave",
    );
    expect(msg).toContain("Almadies");
    expect(msg).toContain("2 000 FCFA");
    expect(msg).toContain("10 000 FCFA"); // 8000 + 2000
    expect(msg).toContain("Paiement prévu : Wave");
  });

  it("filters products by anime series license", () => {
    const op = filterProducts({ series: "One Piece" });
    expect(op.length).toBeGreaterThanOrEqual(1);
    expect(op[0]?.series).toBe("One Piece");

    const ds = filterProducts({ series: "Demon Slayer" });
    expect(ds.length).toBeGreaterThanOrEqual(1);
    expect(ds[0]?.series).toBe("Demon Slayer");
  });
});
