"use client";

import Link from "next/link";
import { Phone, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type StickyMobileCallButtonProps = {
  phoneNumber: string;

  /** Optionnel : afficher aussi un bouton Devis */
  showQuoteButton?: boolean;

  /** Optionnel : lien devis */
  quoteHref?: string;

  /** Optionnel : position */
  position?: "right" | "left";

  /** Optionnel : callback tracking (GA4, etc.) */
  onCallClick?: () => void;
  onQuoteClick?: () => void;
};

function toTelHref(phoneNumber: string) {
  // Nettoyage simple : garde + et chiffres
  const cleaned = phoneNumber.trim().replace(/[^\d+]/g, "");
  return `tel:${cleaned}`;
}

export function StickyMobileCallButton({
  phoneNumber,
  showQuoteButton = true,
  quoteHref = "/devis",
  position = "right",
  onCallClick,
  onQuoteClick,
}: StickyMobileCallButtonProps) {
  const telLink = toTelHref(phoneNumber);

  return (
    <div
      className={cn(
        "fixed z-50 md:hidden",
        // safe area + marges
        "bottom-[calc(env(safe-area-inset-bottom,0px)+16px)]",
        position === "right" ? "right-4" : "left-4"
      )}
    >
      <div className="flex items-center gap-3 rounded-full border bg-background/95 p-2 shadow-lg backdrop-blur">
        {showQuoteButton ? (
          <Button
            asChild
            variant="outline"
            className="rounded-full px-4 font-bold"
            onClick={onQuoteClick}
          >
            <Link href={quoteHref} aria-label="Demander un devis">
              <FileText className="mr-2 h-4 w-4" />
              Devis
            </Link>
          </Button>
        ) : null}

        <Button
          asChild
          className="rounded-full px-4 font-bold bg-[#2F8FD8] hover:bg-[#2F8FD8]/90"
          onClick={onCallClick}
        >
          <a href={telLink} aria-label="Appeler maintenant">
            <Phone className="mr-2 h-4 w-4" />
            Appeler
          </a>
        </Button>
      </div>
    </div>
  );
}
