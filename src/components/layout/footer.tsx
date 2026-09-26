

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Facebook, Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/config";

function telHref() {
  if ((siteConfig.contact as any).phoneE164) return `tel:${(siteConfig.contact as any).phoneE164}`;
  return `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`;
}

export function Footer() {
  const socialLinks = [
    { name: "Twitter", href: siteConfig.links.twitter, icon: <Twitter className="h-5 w-5" /> },
    { name: "Facebook", href: siteConfig.links.facebook, icon: <Facebook className="h-5 w-5" /> },
    { name: "LinkedIn", href: siteConfig.links.linkedin, icon: <Linkedin className="h-5 w-5" /> },
  ].filter((s) => !!s.href);

  const footerLinks = [
    { href: "/services", label: "Services" },
    { href: "/zones", label: "Zones" },
    { href: "/a-propos", label: "À propos" },
    { href: "/blog", label: "Blog" },
    { href: "/devis", label: "Devis" },
    { href: "/contact", label: "Contact" },
  ];

  const legalLinks = [
    { href: "/mentions-legales", label: "Mentions légales" },
    { href: "/politique-de-confidentialite", label: "Confidentialité" },
  ];

  const addressLine = `${siteConfig.business.address.street}, ${siteConfig.business.address.postalCode} ${siteConfig.business.address.city}`;

  return (
    <footer className="premium-footer">
      <div className="premium-shell py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-5">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex" aria-label="Basic Protection Privée — Accueil">
              <div className="relative h-24 w-24">
                <Image
                  src="/images/logo-sombre.png"
                  alt={`Logo ${siteConfig.name}`}
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="premium-serif mt-5 text-2xl text-[#d9c6a3]">L’exigence de la sérénité.</p>

            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Basés à <strong className="font-semibold text-foreground">{siteConfig.business.address.city}</strong>, nous
              intervenons sur les Yvelines (78) et en Île-de-France selon la mission, avec des dispositifs cadrés,
              discrets et rigoureux.
            </p>

            {socialLinks.length > 0 && (
              <div className="mt-6 flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-headline text-sm font-semibold tracking-wide text-foreground">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Clés */}
          <div>
            <h3 className="font-headline text-sm font-semibold tracking-wide text-foreground">
              Nos Services
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/services/agent-securite-qualifie" className="text-muted-foreground hover:text-foreground">
                  Agent de Sécurité Qualifié
                </Link>
              </li>
              <li>
                <Link href="/services/agent-cynophile" className="text-muted-foreground hover:text-foreground">
                  Agent Cynophile (Maître-Chien)
                </Link>
              </li>
              <li>
                <Link href="/services/agent-incendie-ssiap" className="text-muted-foreground hover:text-foreground">
                  Agent Incendie SSIAP
                </Link>
              </li>
              <li>
                <Link href="/services/agent-rondier" className="text-muted-foreground hover:text-foreground">
                  Agent Rondier & Intervenant
                </Link>
              </li>
              <li>
                <Link href="/services/securite-evenementielle" className="text-muted-foreground hover:text-foreground">
                  Sécurité Événementielle
                </Link>
              </li>
              <li>
                <Link href="/services/audit-conseil-surete" className="text-muted-foreground hover:text-foreground">
                  Audit & Conseil Sûreté
                </Link>
              </li>
            </ul>
          </div>

          {/* Zones et Villes */}
          <div>
            <h3 className="font-headline text-sm font-semibold tracking-wide text-foreground">
              Villes & Zones Clés
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/villes/securite-privee-plaisir-78370" className="text-muted-foreground hover:text-foreground">
                  Sécurité Privée Plaisir (78)
                </Link>
              </li>
              <li>
                <Link href="/villes/securite-privee-versailles-78000" className="text-muted-foreground hover:text-foreground">
                  Gardiennage Versailles (78)
                </Link>
              </li>
              <li>
                <Link href="/villes/securite-privee-paris-75000" className="text-muted-foreground hover:text-foreground">
                  Sécurité Privée Paris (75)
                </Link>
              </li>
              <li>
                <Link href="/zones/securite-privee-yvelines-78" className="text-muted-foreground hover:text-foreground">
                  Sécurité Yvelines (78)
                </Link>
              </li>
              <li>
                <Link href="/zones/securite-privee-hauts-de-seine-92" className="text-muted-foreground hover:text-foreground">
                  Sécurité Hauts-de-Seine (92)
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-headline text-sm font-semibold tracking-wide text-foreground">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <Mail className="h-4 w-4" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={telHref()}
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <Phone className="h-4 w-4" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="text-muted-foreground">
                <div className="inline-flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{addressLine}</span>
                </div>
              </li>
            </ul>

            <div className="mt-6">
              <Link
                href="/devis"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-95"
              >
                Demander un devis
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
