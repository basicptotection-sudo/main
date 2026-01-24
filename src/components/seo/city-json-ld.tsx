import { City } from "@/lib/cities-data";
import { siteConfig } from "@/lib/config";

type Props = {
  city: City;
  breadcrumbs?: { label: string; href: string }[];
};

export default function CityJsonLd({ city, breadcrumbs }: Props) {
  const cityName = city.title.replace("Sécurité Privée ", "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${siteConfig.business.name} – ${cityName}`,
    url: `${siteConfig.url}/villes/${city.slug}`,
    image: `${siteConfig.url}/brand/logo.png`,
    telephone: siteConfig.business.telephone,
    email: siteConfig.business.email,

    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.business.address.street,
      addressLocality: cityName,
      postalCode: siteConfig.business.address.postalCode,
      addressCountry: siteConfig.business.address.country,
    },

    areaServed: {
      "@type": "AdministrativeArea",
      name: cityName,
    },

    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.facebook,
      siteConfig.links.linkedin,
    ].filter(Boolean),

    ...(breadcrumbs && {
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.label,
          item: `${siteConfig.url}${b.href}`,
        })),
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
