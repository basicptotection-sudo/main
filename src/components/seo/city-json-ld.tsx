import type { City } from '@/lib/cities-data';
import { siteConfig } from '@/lib/config';

type Props = {
  city: City;
  description?: string;
  breadcrumbs?: { label: string; href: string }[];
};

export default function CityJsonLd({ city, breadcrumbs, description }: Props) {
  const cityName = city.title.replace('Sécurité Privée ', '');
  const url = `${siteConfig.url}/villes/${city.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: `Sécurité privée à ${cityName}`,
        url,
        ...(description ? { description } : {}),
        areaServed: { '@type': 'Place', name: cityName },
        provider: {
          '@type': 'Organization',
          name: siteConfig.business.name,
          url: siteConfig.url,
          telephone: siteConfig.business.telephone,
          address: {
            '@type': 'PostalAddress',
            streetAddress: siteConfig.business.address.street,
            addressLocality: siteConfig.business.address.city,
            postalCode: siteConfig.business.address.postalCode,
            addressCountry: 'FR',
          },
        },
      },
      ...(breadcrumbs ? [{
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem', position: index + 1, name: item.label,
          item: `${siteConfig.url}${item.href}`,
        })),
      }] : []),
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />;
}
