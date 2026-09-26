import React from "react";
import { siteConfig } from "@/lib/config";
import { faqItems } from "@/lib/homepage-data";

type Props = {
  // optionnel si tu veux surcharger sans toucher le code
  brandName?: string;
  phone?: string;
  email?: string;
  streetAddress?: string;
  postalCode?: string;
  addressLocality?: string; // ville
  addressRegion?: string; // région
  addressCountry?: string;
};

function safeText(s: string) {
  return String(s ?? "").replace(/\s+/g, " ").trim();
}

export default function HomeJsonLd(props: Props) {
  const brandName = props.brandName ?? (siteConfig.name || "Basic Protection");
  const url = siteConfig.url;

  const phone = props.phone ?? "+33 0 00 00 00 00";
  const email = props.email ?? "contact@exemple.fr";

  const streetAddress = props.streetAddress ?? "Plaisir (Yvelines)";
  const postalCode = props.postalCode ?? "78370";
  const addressLocality = props.addressLocality ?? "Plaisir";
  const addressRegion = props.addressRegion ?? "Île-de-France";
  const addressCountry = props.addressCountry ?? "FR";

  const sameAs: string[] = [
    // "https://www.linkedin.com/company/xxx",
    // "https://www.instagram.com/xxx",
    // "https://g.page/xxx",
  ].filter(Boolean);

  const areasServed = [
    { "@type": "AdministrativeArea", name: "Yvelines", identifier: "78" },
    { "@type": "AdministrativeArea", name: "Hauts-de-Seine", identifier: "92" },
    { "@type": "AdministrativeArea", name: "Seine-Saint-Denis", identifier: "93" },
    { "@type": "AdministrativeArea", name: "Val-de-Marne", identifier: "94" },
    { "@type": "AdministrativeArea", name: "Essonne", identifier: "91" },
    { "@type": "AdministrativeArea", name: "Val-d'Oise", identifier: "95" },
    { "@type": "AdministrativeArea", name: "Seine-et-Marne", identifier: "77" },
    { "@type": "City", name: "Paris", identifier: "75" },
    { "@type": "City", name: "Plaisir", postalCode: "78370" },
    { "@type": "City", name: "Versailles", postalCode: "78000" },
    { "@type": "City", name: "Saint-Quentin-en-Yvelines" },
  ];

  const services = [
    "Contrôle d’accès",
    "Gardiennage",
    "Rondes de sécurité",
    "Sécurité événementielle",
    "Sécurité incendie (SSIAP)",
    "Audit & conseil sûreté",
    "Agent cynophile (selon site)",
  ];

  const jsonLd = [
    // 1) Organization
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${url}/#organization`,
      name: brandName,
      url,
      email,
      telephone: phone,
      sameAs,
      logo: `${url}/logo.png`,
    },

    // 2) LocalBusiness & SecurityService (plus fort en local et SEO métier)
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "SecurityService"],
      "@id": `${url}/#localbusiness`,
      name: brandName,
      description: "Société de sécurité privée, gardiennage et surveillance humaine en Île-de-France (Yvelines, Plaisir, Paris).",
      url,
      email,
      telephone: phone,
      image: [`${url}/og/home.jpg`],
      address: {
        "@type": "PostalAddress",
        streetAddress,
        postalCode,
        addressLocality,
        addressRegion,
        addressCountry,
      },
      areaServed: areasServed,
      knowsAbout: services,
      priceRange: "Sur devis",
      parentOrganization: { "@id": `${url}/#organization` },
    },

    // 3) WebSite (sitelinks + search box si un jour tu veux)
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${url}/#website`,
      url,
      name: brandName,
      publisher: { "@id": `${url}/#organization` },
      inLanguage: "fr-FR",
    },

    // 4) Breadcrumb home
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${url}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: `${url}/`,
        },
      ],
    },

    // 5) FAQPage (depuis faqItems)
    ...(Array.isArray(faqItems) && faqItems.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": `${url}/#faq`,
            mainEntity: faqItems.map((f: any) => ({
              "@type": "Question",
              name: safeText(f.question),
              acceptedAnswer: {
                "@type": "Answer",
                text: safeText(f.answer),
              },
            })),
          },
        ]
      : []),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
