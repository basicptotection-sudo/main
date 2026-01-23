"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/lib/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { servicesData, Service } from "@/lib/services-data";
import { cn } from "@/lib/utils";
import { getLucideIcon } from "@/lib/icons";

const navLinks = [
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

function isActiveLink(pathname: string, href: string) {
  // usePathname() ne contient pas le hash (#about)
  if (href.startsWith("/#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // (Option future) => remplace ces filtres par un champ tier: "terrain"|"premium" dans servicesData
  const terrainServices = useMemo(
    () =>
      servicesData.filter((s) =>
        [
          "agent-securite-qualifie",
          "agent-cynophile",
          "agent-incendie-ssiap",
          "agent-rondier",
        ].includes(s.slug)
      ),
    []
  );

  const premiumServices = useMemo(
    () =>
      servicesData.filter((s) =>
        ["protection-rapprochee", "securite-evenementielle", "audit-conseil-surete"].includes(
          s.slug
        )
      ),
    []
  );

  const telHref = useMemo(
    () => normalizeTel((siteConfig.contact as any).phoneE164, siteConfig.contact.phone),
    []
  );

  const ServiceMenuItem = ({ service }: { service: Service }) => {
    const Icon = getLucideIcon(service.icon);
    return (
      <Link
        href={`/services/${service.slug}`}
        className="flex w-full items-start gap-3 rounded-md p-2 text-sm transition-colors hover:bg-muted"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <Icon className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
        <div className="flex-1">
          <p className="font-semibold text-foreground">{service.title}</p>
          <p className="text-xs text-muted-foreground">{service.shortDescription}</p>
        </div>
      </Link>
    );
  };

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
              Plaisir (78) • Île-de-France • Sécurité privée
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="Ouvrir le menu des services"
                className="flex items-center gap-1 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                Nos services
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-[44rem] max-w-[calc(100vw-2rem)]"
              align="start"
            >
              <div className="grid grid-cols-2 gap-x-6 p-4">
                <div>
                  <DropdownMenuLabel className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Services de terrain
                  </DropdownMenuLabel>
                  <DropdownMenuGroup className="flex flex-col gap-1">
                    {terrainServices.map((service) => {
                      const Icon = getLucideIcon(service.icon);
                      return (
                        <DropdownMenuItem key={service.slug} asChild>
                          <Link
                            href={`/services/${service.slug}`}
                            className="items-start gap-3"
                          >
                            <Icon className="mt-1 text-primary" />
                            <div>
                              <p className="font-semibold">{service.title}</p>
                              <p className="text-xs text-muted-foreground whitespace-normal">
                                {service.shortDescription}
                              </p>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuGroup>
                </div>

                <div>
                  <DropdownMenuLabel className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Services premium
                  </DropdownMenuLabel>
                  <DropdownMenuGroup className="flex flex-col gap-1">
                    {premiumServices.map((service) => {
                      const Icon = getLucideIcon(service.icon);
                      return (
                        <DropdownMenuItem key={service.slug} asChild>
                          <Link
                            href={`/services/${service.slug}`}
                            className="items-start gap-3"
                          >
                            <Icon className="mt-1 text-primary" />
                            <div>
                              <p className="font-semibold">{service.title}</p>
                              <p className="text-xs text-muted-foreground whitespace-normal">
                                {service.shortDescription}
                              </p>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuGroup>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {navLinks.map((link) => {
            const isActive = isActiveLink(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "transition-colors",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
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

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Fermer le menu</span>
                  </Button>
                </div>

                <nav className="flex flex-col p-4 text-base">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="services" className="border-b-0">
                      <AccordionTrigger className="rounded-md px-2 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors hover:no-underline font-normal">
                        Nos services
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pl-4">
                        <div className="flex flex-col gap-1">
                          <p className="px-2 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Services de terrain
                          </p>
                          {terrainServices.map((service) => (
                            <ServiceMenuItem key={service.slug} service={service} />
                          ))}
                          <p className="px-2 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Services premium
                          </p>
                          {premiumServices.map((service) => (
                            <ServiceMenuItem key={service.slug} service={service} />
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

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
                    Basés à {siteConfig.business.address.city} (
                    {siteConfig.business.address.postalCode})
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
