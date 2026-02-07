// src/app/contact/page.tsx
import type { Metadata } from "next";
import ContactPageClient from "@/components/contact/page-client";
import { siteConfig } from "@/lib/config";

function toCanonical(path: string) {
  const base = siteConfig?.url?.replace(/\/$/, "") || "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export const metadata: Metadata = {
  title: "Contact | Basic Protection Privée (Plaisir 78370) — Devis & Conseil",
  description:
    "Contactez Basic Protection Privée (Plaisir 78370) pour un devis de sécurité privée en Île-de-France : gardiennage, rondes, contrôle d’accès, événementiel. Téléphone, email, formulaire — réponse rapide.",
  alternates: {
    canonical: toCanonical("/contact"),
  },
  openGraph: {
    title: "Contact | Basic Protection Privée — Devis & Conseil",
    description:
      "Devis sécurité privée en Île-de-France : gardiennage, rondes, contrôle d’accès, événementiel. Téléphone, email ou formulaire.",
    url: toCanonical("/contact"),
    siteName: siteConfig?.name || "Basic Protection Privée",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Basic Protection Privée",
    description:
      "Demandez un devis sécurité privée : réponse rapide par téléphone, email ou formulaire.",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
