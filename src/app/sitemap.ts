
import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';
import { servicesData } from '@/lib/services-data';
import { locationsData } from '@/lib/locations-data';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/devis', '/merci', '/services', '/zones', '/contact', '/blog'];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  const servicesEntries: MetadataRoute.Sitemap = servicesData.map(service => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.9
  }));

  const locationsEntries: MetadataRoute.Sitemap = locationsData.map(location => ({
    url: `${siteConfig.url}/zones/${location.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.9
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map(post => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.frontmatter.date).toISOString(),
      changeFrequency: 'yearly',
      priority: 0.7,
  }));

  const tagPages = [...new Set(getAllPosts().flatMap(p => p.frontmatter.tags))];
  const tagEntries: MetadataRoute.Sitemap = tagPages.map(tag => ({
    url: `${siteConfig.url}/blog/tags/${tag.toLowerCase()}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticEntries, ...servicesEntries, ...locationsEntries, ...blogEntries, ...tagEntries];
}
