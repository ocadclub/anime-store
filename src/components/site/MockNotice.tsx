import { Info } from "lucide-react";

export function MockNotice({ className = "" }: { className?: string }) {
  return (
    <p
      className={`flex items-start gap-2 text-xs leading-relaxed text-muted-foreground ${className}`}
    >
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      Maquette : prix, tailles et nouveautés sont des exemples. Disponibilité et prix réels à
      confirmer sur WhatsApp.
    </p>
  );
}
