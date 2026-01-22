
import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';
import { servicesData } from '@/lib/services-data';
import { locationsData } from '@/lib/locations-data';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/devis', '/merci', '/services', '/zones', '/contact', '/blog'];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const servicesEntries = servicesData.map(service => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    lastModified: new Date().toISOString(),
  }));

  const locationsEntries = locationsData.map(location => ({
    url: `${siteConfig.url}/zones/${location.slug}`,
    lastModified: new Date().toISOString(),
  }));

  const blogEntries = getAllPosts().map(post => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.frontmatter.date).toISOString(),
  }));

  return [...staticEntries, ...servicesEntries, ...locationsEntries, ...blogEntries];
}
