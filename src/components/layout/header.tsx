"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, ClipboardCheck, Flame, Footprints, MapPin, Menu, Phone, ScanLine, ShieldCheck, Sparkles, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

const serviceGroups = [
  {
    label: "Protection au quotidien",
    description: "La maîtrise de votre environnement.",
    items: [
      { slug: "agent-securite-qualifie", title: "Gardiennage & surveillance", description: "Protéger vos sites et vos équipes.", icon: ShieldCheck },
      { slug: "agent-cynophile", title: "Sécurité cynophile", description: "Une présence dissuasive renforcée.", icon: Footprints },
      { slug: "agent-incendie-ssiap", title: "Sécurité incendie · SSIAP", description: "Prévenir les risques, veiller sur les lieux.", icon: Flame },
      { slug: "agent-rondier", title: "Rondes & interventions", description: "Une vigilance mobile sur vos sites.", icon: ScanLine },
    ],
  },
  {
    label: "Missions sur mesure",
    description: "L’exigence des contextes singuliers.",
    items: [
      { slug: "securite-evenementielle", title: "Sécurité événementielle", description: "La sérénité de vos temps forts.", icon: Sparkles },
      { slug: "audit-conseil-surete", title: "Audit & conseil", description: "Anticiper pour mieux protéger.", icon: ClipboardCheck },
    ],
  },
];
const navLinks = [
  { href: "/zones", label: "Notre présence" },
  { href: "/a-propos", label: "La maison" },
  { href: "/blog", label: "Le journal" },
  { href: "/contact", label: "Contact" },
];
const isActive = (path: string, href: string) => path === href || path.startsWith(`${href}/`);

function Brand({ inverse = false, onClick }: { inverse?: boolean; onClick?: () => void }) {
  return (
    <Link href="/" className="header-brand" onClick={onClick} aria-label="Basic Protection Privée — Accueil">
      <span className="header-symbol relative block shrink-0">
        <Image src="/images/logo-clair.png" alt="" fill sizes="(max-width: 639px) 68px, 80px" priority className={cn("object-contain dark:hidden", inverse && "hidden")} />
        <Image src="/images/logo-sombre.png" alt="" fill sizes="(max-width: 639px) 68px, 80px" className={cn("object-contain", inverse ? "block" : "hidden dark:block")} />
      </span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMenus = () => { setMegaOpen(false); setMobileOpen(false); };

  useEffect(() => { setMegaOpen(false); setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 1280px)");
    const onChange = () => { setMegaOpen(false); setMobileOpen(false); };
    breakpoint.addEventListener("change", onChange);
    return () => breakpoint.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="premium-header luxury-header sticky top-0 z-50 w-full backdrop-blur-xl">
      <div className="header-ribbon">
        <div className="premium-shell flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2"><span className="header-ribbon-dot" />Sécurité privée · Île-de-France</span>
          <span className="hidden md:block font-serif italic tracking-wide text-[#d9c6a3]">L’exigence de la sérénité</span>
          <a href={`tel:${siteConfig.contact.phoneE164}`} className="inline-flex items-center gap-2 transition-colors hover:text-white"><Phone size={12} aria-hidden="true" /><span>{siteConfig.contact.phone}</span></a>
        </div>
      </div>
      <div className="premium-shell header-main">
        <Brand onClick={closeMenus} />
        <nav className="hidden h-full items-center gap-7 xl:flex" aria-label="Navigation principale">
          <Popover open={megaOpen} onOpenChange={setMegaOpen}>
            <PopoverTrigger asChild>
              <button type="button" className={cn("header-nav-link group", (megaOpen || isActive(pathname, "/services")) && "is-active")} aria-label="Nos expertises" aria-current={isActive(pathname, "/services") ? "true" : undefined}>
                Nos expertises <ChevronDown size={13} className="transition-transform duration-200 group-data-[state=open]:rotate-180" aria-hidden="true" />
              </button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="center" sideOffset={25} collisionPadding={24} className="luxury-mega w-[min(1120px,calc(100vw-48px))] rounded-t-none rounded-b-lg border-t-2 border-t-[#b79c73] bg-card p-0 shadow-[0_30px_70px_-15px_#07111f45]" aria-label="Nos expertises en sécurité privée">
              <div className="mega-grid">
                {serviceGroups.map(group => (
                  <div key={group.label} className="mega-column">
                    <p className="mega-overline">{group.label}</p>
                    <p className="mega-intro">{group.description}</p>
                    <div className="mt-5 space-y-1">
                      {group.items.map(({ slug, title, description, icon: Icon }) => (
                        <Link key={slug} href={`/services/${slug}`} onClick={closeMenus} className="mega-service group" aria-current={isActive(pathname, `/services/${slug}`) ? "page" : undefined}>
                          <span className="mega-icon"><Icon size={20} strokeWidth={1.4} aria-hidden="true" /></span>
                          <span className="min-w-0 flex-1"><span className="block text-[13px] font-semibold leading-snug">{title}</span><span className="mt-1.5 block text-xs leading-relaxed text-muted-foreground">{description}</span></span>
                          <ArrowUpRight size={14} className="mega-link-arrow" aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                    {group.label === "Missions sur mesure" && (
                      <Link href="/secteurs" onClick={closeMenus} className="mega-sector group"><span className="mega-overline">Votre univers</span><span className="mt-3 flex items-center justify-between gap-3 text-sm">Bureaux, hôtellerie, événements… <ArrowUpRight size={16} aria-hidden="true" /></span><span className="mt-2 block text-xs text-muted-foreground">Découvrir nos secteurs d’intervention</span></Link>
                    )}
                  </div>
                ))}
                <aside className="mega-editorial">
                  <Image src="/images/service-securite-evenementielle.webp" alt="" fill sizes="340px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101c2d] via-[#101c2d]/70 to-[#101c2d]/15" />
                  <div className="relative z-10 flex h-full flex-col justify-end p-7">
                    <p className="mega-overline text-[#d9c6a3]">Une mission. Votre confiance.</p>
                    <p className="mt-4 font-headline text-[29px] font-medium leading-tight tracking-[-0.04em] text-white">Une protection<br />à votre mesure.</p>
                    <p className="mt-4 text-xs leading-relaxed text-white/70">Parlons de vos enjeux. Nous construirons le dispositif adapté.</p>
                    <Link href="/devis" onClick={closeMenus} className="mt-6 flex items-center justify-between border-t border-white/25 pt-5 text-xs font-medium text-[#e6d3b2]">Confiez-nous votre projet <ArrowUpRight size={18} aria-hidden="true" /></Link>
                  </div>
                </aside>
              </div>
              <div className="mega-bottom"><Link href="/services" onClick={closeMenus} className="flex items-center gap-3 font-medium">Explorer toutes nos expertises <ArrowRight size={16} aria-hidden="true" /></Link><span className="flex items-center gap-2 text-muted-foreground"><MapPin size={14} aria-hidden="true" />Plaisir · Les 8 départements franciliens</span></div>
            </PopoverContent>
          </Popover>
          {navLinks.map(link => <Link key={link.href} href={link.href} onClick={closeMenus} className={cn("header-nav-link", isActive(pathname, link.href) && "is-active")} aria-current={isActive(pathname, link.href) ? "page" : undefined}>{link.label}</Link>)}
        </nav>
        <div className="flex items-center gap-3">
          <div className="header-theme hidden sm:block"><ThemeToggle /></div>
          <Link href="/devis" onClick={closeMenus} className="header-quote hidden sm:inline-flex">Votre projet <ArrowUpRight size={17} aria-hidden="true" /></Link>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild><button type="button" className="header-menu-button xl:hidden" aria-label="Ouvrir le menu"><Menu size={21} strokeWidth={1.5} /></button></SheetTrigger>
            <SheetContent className="luxury-mobile h-[100dvh] w-full max-w-full gap-0 border-0 bg-[#101c2d] p-0 text-white sm:max-w-lg [&>button]:hidden">
              <SheetTitle className="sr-only">Navigation Basic Protection Privée</SheetTitle>
              <SheetDescription className="sr-only">Découvrez nos expertises, notre présence et contactez notre équipe.</SheetDescription>
              <div className="mobile-menu-top"><Brand inverse onClick={closeMenus} /><SheetClose asChild><button type="button" className="mobile-close" aria-label="Fermer le menu"><X size={21} strokeWidth={1.5} /></button></SheetClose></div>
              <div className="mobile-menu-scroll">
                <p className="mega-overline mb-6 text-[#d9c6a3]">Votre sérénité commence ici</p>
                <nav aria-label="Navigation mobile">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="expertises" className="border-white/15"><AccordionTrigger className="mobile-nav-link hover:no-underline"><span><span className="mobile-index">01</span>Nos expertises</span></AccordionTrigger><AccordionContent className="pb-5">
                      {serviceGroups.map(group => <div key={group.label} className="mb-5"><p className="mega-overline mb-3 mt-3 text-[#d9c6a3]">{group.label}</p>{group.items.map(({ slug, title, icon: Icon }) => <Link href={`/services/${slug}`} key={slug} onClick={closeMenus} aria-current={isActive(pathname, `/services/${slug}`) ? "page" : undefined} className="mobile-service"><Icon size={18} strokeWidth={1.4} aria-hidden="true" /><span>{title}</span><ArrowUpRight size={14} className="ml-auto shrink-0" aria-hidden="true" /></Link>)}</div>)}
                      <Link href="/services" onClick={closeMenus} className="inline-flex items-center gap-3 border-b border-[#d9c6a3]/40 pb-2 text-xs text-[#d9c6a3]">Toutes nos expertises <ArrowRight size={15} /></Link>
                    </AccordionContent></AccordionItem>
                  </Accordion>
                  {[{ href: "/secteurs", label: "Vos secteurs" }, ...navLinks].map((link, index) => <Link key={link.href} href={link.href} onClick={closeMenus} aria-current={isActive(pathname, link.href) ? "page" : undefined} className="mobile-nav-link flex items-center justify-between border-b border-white/15"><span><span className="mobile-index">0{index + 2}</span>{link.label}</span><ArrowUpRight size={17} className="text-white/40" aria-hidden="true" /></Link>)}
                </nav>
                <div className="mt-9 flex items-center justify-between"><span className="text-xs text-white/50">Votre confort de lecture</span><ThemeToggle /></div>
              </div>
              <div className="mobile-menu-bottom"><Link href="/devis" onClick={closeMenus} className="premium-button premium-button-gold w-full justify-between">Parlons de votre projet <ArrowUpRight size={18} /></Link><a href={`tel:${siteConfig.contact.phoneE164}`} className="mt-5 flex items-center justify-center gap-3 text-sm text-white/80"><Phone size={15} />{siteConfig.contact.phone}</a></div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
