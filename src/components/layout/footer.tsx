
import Link from "next/link";
import { Shield, Linkedin, Twitter, Facebook } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function Footer() {
  const socialLinks = [
    { name: "Twitter", href: siteConfig.links.twitter, icon: <Twitter className="h-5 w-5" /> },
    { name: "Facebook", href: siteConfig.links.facebook, icon: <Facebook className="h-5 w-5" /> },
    { name: "LinkedIn", href: siteConfig.links.linkedin, icon: <Linkedin className="h-5 w-5" /> },
  ];

  const footerLinks = [
    { href: "/services", label: "Nos Services" },
    { href: "/zones", label: "Nos Zones" },
    { href: "/devis", label: "Demander un devis" },
    { href: "/#about", label: "À Propos" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold font-headline text-xl">
              <Shield className="h-7 w-7" />
              <span>{siteConfig.name}</span>
            </Link>
            <p className="mt-4 text-sm text-primary-foreground/80 max-w-sm">
              Votre partenaire de confiance pour des solutions de sécurité privée sur-mesure.
            </p>
          </div>
          <div>
            <h3 className="font-semibold font-headline tracking-wider">Navigation</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-primary-foreground/80 hover:text-primary-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold font-headline tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href={`mailto:${siteConfig.contact.email}`} className="text-primary-foreground/80 hover:text-primary-foreground">{siteConfig.contact.email}</a></li>
              <li><a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="text-primary-foreground/80 hover:text-primary-foreground">{siteConfig.contact.phone}</a></li>
              <li className="text-primary-foreground/80 pt-2">{siteConfig.business.address.street}<br/>{siteConfig.business.address.postalCode} {siteConfig.business.address.city}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-primary-foreground/60">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            {socialLinks.map((social) => (
              <a key={social.name} href={social.href} target="_blank" rel="noreferrer" className="text-primary-foreground/60 hover:text-primary-foreground">
                <span className="sr-only">{social.name}</span>
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
