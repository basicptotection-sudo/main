import { siteConfig } from '@/lib/config';
import type { Service } from '@/lib/services-data';
import type { BreadcrumbItem } from '@/components/shared/breadcrumbs';

type ServiceJsonLdProps = {
  service: Service;
  breadcrumbs: BreadcrumbItem[];
};

const ServiceJsonLd = ({ service, breadcrumbs }: ServiceJsonLdProps) => {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    provider: {
      '@type': 'Organization',
      name: siteConfig.business.name,
      url: siteConfig.url,
    },
    areaServed: siteConfig.business.areaServed.map(area => ({
        "@type": "City",
        "name": area
    })),
    description: service.description,
    name: service.title,
    url: `${siteConfig.url}/services/${service.slug}`,
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
export default ServiceJsonLd;
