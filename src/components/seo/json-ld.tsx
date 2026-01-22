import { siteConfig } from '@/lib/config';

const JsonLd = () => {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.business.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.business.telephone,
      contactType: 'Customer Service',
      email: siteConfig.business.email,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.business.address.street,
      addressLocality: siteConfig.business.address.city,
      postalCode: siteConfig.business.address.postalCode,
      addressCountry: siteConfig.business.address.country,
    },
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.facebook,
      siteConfig.links.linkedin,
    ],
    foundingDate: siteConfig.business.foundingDate,
    vatID: siteConfig.business.vatID,
    areaServed: siteConfig.business.areaServed.map(area => ({
        "@type": "City",
        "name": area
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
};

export default JsonLd;
