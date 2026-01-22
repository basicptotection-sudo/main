
import { siteConfig } from '@/lib/config';
import type { Location } from '@/lib/locations-data';
import type { BreadcrumbItem } from '@/components/shared/breadcrumbs';

type LocationJsonLdProps = {
  location: Location;
  breadcrumbs: BreadcrumbItem[];
};

const LocationJsonLd = ({ location, breadcrumbs }: LocationJsonLdProps) => {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: `Sécurité privée à ${location.name}`,
    provider: {
      '@type': 'Organization',
      name: siteConfig.business.name,
      url: siteConfig.url,
    },
    areaServed: {
      '@type': 'Place',
      name: location.name,
    },
    description: location.description,
    name: `Sécurité privée à ${location.name}`,
    url: `${siteConfig.url}/zones/${location.slug}`,
  };
  
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${siteConfig.url}${item.href}`,
    })),
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
};
export default LocationJsonLd;
