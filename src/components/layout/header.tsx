"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { Menu, X, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/lib/config";

const navLinks = [
  { href: "/services", label: "Nos services" },
  { href: "/zones", label: "Zones" },
  { href: "/blog", label: "Blog" },
  { href: "/#about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

function normalizeTel(phoneE164?: string, fallback?: string) {
  if (phoneE164) return `tel:${phoneE164}`;
  const raw = (fallback ?? "").replace(/\s/g, "");
  return raw ? `tel:${raw}` : "tel:";
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const telHref = useMemo(
    () => normalizeTel(siteConfig.contact.phoneE164, siteConfig.contact.phone),
    []
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`${siteConfig.name} — Accueil`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="relative h-9 w-9 overflow-hidden rounded-md border bg-muted">
            {/* Remplace ce chemin par ton vrai logo, ex: /brand/logo.png */}
            <Image
              src="/brand/logo.png"
              alt={`Logo ${siteConfig.name}`}
              fill
              sizes="36px"
              className="object-contain p-1"
              priority
            />
          </div>
          <div className="leading-tight">
            <div className="font-headline text-sm font-semibold tracking-tight md:text-base">
              {siteConfig.name}
            </div>
            <div className="hidden text-xs text-muted-foreground md:block">
              Sécurité privée • Gardiennage • Surveillance
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = link.href === pathname;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "transition-colors",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Call (desktop) */}
          <Button asChild variant="outline" className="hidden md:flex">
            <a href={telHref}>
              <Phone className="mr-2 h-4 w-4" />
              Appeler
            </a>
          </Button>

          {/* Quote */}
          <Button asChild className="hidden md:flex">
            <Link href="/devis">Obtenir un devis</Link>
          </Button>

          {/* Mobile menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full sm:max-w-xs p-0">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between p-4 border-b">
                  <Link
                    href="/"
                    className="flex items-center gap-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="relative h-9 w-9 overflow-hidden rounded-md border bg-muted">
                      <Image
                        src="/brand/logo.png"
                        alt={`Logo ${siteConfig.name}`}
                        fill
                        sizes="36px"
                        className="object-contain p-1"
                      />
                    </div>
                    <span className="font-headline font-semibold">{siteConfig.name}</span>
                  </Link>

                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Fermer le menu</span>
                  </Button>
                </div>

                <nav className="flex flex-col gap-3 p-4 text-base">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-md px-2 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto p-4 border-t space-y-2">
                  <Button asChild variant="outline" className="w-full">
                    <a href={telHref}>
                      <Phone className="mr-2 h-4 w-4" />
                      Appeler
                    </a>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/devis" onClick={() => setIsMobileMenuOpen(false)}>
                      Obtenir un devis
                    </Link>
                  </Button>
                  <div className="pt-2 text-xs text-muted-foreground">
                    Basés à {siteConfig.business.address.city} ({siteConfig.business.address.postalCode})
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
