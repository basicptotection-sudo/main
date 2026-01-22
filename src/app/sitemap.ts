import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';
import { servicesData } from '@/lib/services-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/merci', '/services'];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const dynamicEntries = servicesData.map(service => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    lastModified: new Date().toISOString(),
  }));

  return [...staticEntries, ...dynamicEntries];
}
