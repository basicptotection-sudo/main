import { siteConfig } from "@/lib/config";

const JsonLd = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  };

  // On garde TS strict, mais on lit en "optionnel"
  const business = siteConfig.business as typeof siteConfig.business & {
    foundingDate?: string;
    vatID?: string;
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: business.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: business.telephone,
      contactType: "Customer Service",
      email: business.email,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    sameAs: [siteConfig.links.twitter, siteConfig.links.facebook, siteConfig.links.linkedin].filter(Boolean),

    // ✅ ajout conditionnel (plus d'erreur TS)
    ...(business.foundingDate ? { foundingDate: business.foundingDate } : {}),
    ...(business.vatID ? { vatID: business.vatID } : {}),

    areaServed: (business.areaServed ?? []).map((area) => ({
      "@type": "City",
      name: area,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
    </>
  );
};

export default JsonLd;
