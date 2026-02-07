"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Consent = {
  necessary: true; // toujours true (cookies techniques)
  analytics: boolean;
  marketing: boolean;
  timestamp: number; // Date.now()
  version: string; // pour invalider si tu changes de politique
};

const CONSENT_KEY = "cookie_consent_v1";
const CONSENT_VERSION = "2026-02-03"; // change si ta politique change

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;

    // validation minimale
    if (
      parsed?.necessary !== true ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.marketing !== "boolean" ||
      typeof parsed.timestamp !== "number" ||
      typeof parsed.version !== "string"
    ) {
      return null;
    }

    // si version a changé, on redemande
    if (parsed.version !== CONSENT_VERSION) return null;

    return parsed;
  } catch {
    return null;
  }
}

function writeConsent(consent: Omit<Consent, "timestamp" | "version">) {
  const payload: Consent = {
    ...consent,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(payload));
  return payload;
}

type CookieConsentProps = {
  /** délai avant affichage (ms) */
  delayMs?: number;

  /** callback optionnel : pour activer GA4/Ads après consentement */
  onConsentChange?: (consent: Consent) => void;

  /** position */
  position?: "left" | "right";
};

export function CookieConsent({
  delayMs = 1200,
  onConsentChange,
  position = "left",
}: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);

  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Pour éviter hydration issues + être moins intrusif
  useEffect(() => {
    const t = setTimeout(() => {
      const existing = readConsent();
      if (!existing) setShowBanner(true);
      else onConsentChange?.(existing);
    }, delayMs);

    return () => clearTimeout(t);
  }, [delayMs, onConsentChange]);

  // Accessibilité : ESC pour fermer (sans consentir) quand on est en mode personnalisation
  useEffect(() => {
    if (!showBanner) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCustomizing(false);
        setShowBanner(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showBanner]);

  const containerClass = useMemo(() => {
    const side = position === "right" ? "right-4" : "left-4";
    return cn(
      "fixed z-[100] w-[calc(100%-2rem)] max-w-sm",
      "bottom-[calc(env(safe-area-inset-bottom,0px)+16px)]",
      side,
      "transition-all duration-500 ease-out",
      showBanner ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"
    );
  }, [position, showBanner]);

  const acceptAll = () => {
    const saved = writeConsent({ necessary: true, analytics: true, marketing: true });
    onConsentChange?.(saved);
    setShowBanner(false);
  };

  const refuseAll = () => {
    // Refus = uniquement cookies nécessaires
    const saved = writeConsent({ necessary: true, analytics: false, marketing: false });
    onConsentChange?.(saved);
    setShowBanner(false);
  };

  const saveChoices = () => {
    const saved = writeConsent({ necessary: true, analytics, marketing });
    onConsentChange?.(saved);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className={containerClass} role="dialog" aria-modal="true" aria-label="Consentement cookies">
      <Card className="shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cookie className="h-5 w-5" />
            <span>Votre vie privée</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Nous utilisons des cookies nécessaires au fonctionnement du site. Avec votre accord, nous pouvons aussi
            utiliser des cookies de mesure d’audience et, éventuellement, marketing.
            Consultez notre{" "}
            <Link
              href="/politique-de-confidentialite"
              className="underline underline-offset-4 hover:text-primary"
            >
              politique de confidentialité
            </Link>
            .
          </p>

          {/* Mode Personnaliser */}
          {isCustomizing ? (
            <div className="mt-4 space-y-3">
              <div className="rounded-xl border bg-background/60 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-primary">Cookies nécessaires</p>
                    <p className="text-xs text-muted-foreground">
                      Indispensables au fonctionnement (sécurité, formulaire, préférences).
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground">Toujours actifs</span>
                </div>
              </div>

              <div className="rounded-xl border bg-background/60 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-primary">Mesure d’audience</p>
                    <p className="text-xs text-muted-foreground">
                      Nous aide à améliorer le site (pages vues, performance), de façon statistique.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAnalytics((v) => !v)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
                      analytics ? "bg-[#2F8FD8] text-white border-[#2F8FD8]" : "bg-background hover:bg-muted/30"
                    )}
                    aria-pressed={analytics}
                  >
                    {analytics ? "Activé" : "Désactivé"}
                  </button>
                </div>
              </div>

              <div className="rounded-xl border bg-background/60 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-primary">Marketing</p>
                    <p className="text-xs text-muted-foreground">
                      Personnalisation publicitaire / remarketing (si utilisé sur le site).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMarketing((v) => !v)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
                      marketing ? "bg-[#2F8FD8] text-white border-[#2F8FD8]" : "bg-background hover:bg-muted/30"
                    )}
                    aria-pressed={marketing}
                  >
                    {marketing ? "Activé" : "Désactivé"}
                  </button>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <Button onClick={saveChoices} className="w-full">
                  Enregistrer
                </Button>
                <Button onClick={refuseAll} variant="outline" className="w-full">
                  Tout refuser
                </Button>
              </div>
            </div>
          ) : (
            // Mode simple
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Button onClick={acceptAll} className="w-full">
                Accepter
              </Button>
              <Button onClick={refuseAll} variant="outline" className="w-full">
                Refuser
              </Button>
              <Button
                onClick={() => setIsCustomizing(true)}
                variant="ghost"
                className="w-full"
              >
                Personnaliser
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
