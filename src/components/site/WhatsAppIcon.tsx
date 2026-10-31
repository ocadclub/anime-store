import { MessageCircle } from "lucide-react";

/** Lucide has no WhatsApp glyph; MessageCircle is the closest neutral icon. */
export function WhatsAppIcon({ className }: { className?: string }) {
  return <MessageCircle className={className} aria-hidden="true" />;
}
