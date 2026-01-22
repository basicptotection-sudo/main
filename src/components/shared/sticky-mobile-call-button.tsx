"use client";

import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

type StickyMobileCallButtonProps = {
  phoneNumber: string;
};

export function StickyMobileCallButton({ phoneNumber }: StickyMobileCallButtonProps) {
  const telLink = `tel:${phoneNumber.replace(/\s/g, '')}`;

  return (
    <div className="fixed bottom-4 right-4 z-50 md:hidden">
      <Button asChild size="icon" className="w-14 h-14 rounded-full shadow-lg">
        <a href={telLink}>
          <Phone className="h-6 w-6" />
          <span className="sr-only">Appeler maintenant</span>
        </a>
      </Button>
    </div>
  );
}
