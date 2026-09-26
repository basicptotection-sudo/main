

import { getLocalEditorial } from '@/lib/local-editorials';
import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';
import { servicesData } from '@/lib/services-data';
import { locationsData } from '@/lib/locations-data';
import { getAllPosts } from '@/lib/blog';
import { sectorsData } from '@/lib/secteurs-data';
import { citiesData } from '@/lib/cities-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/a-propos', '/devis', '/services', '/secteurs', '/zones', '/villes', '/contact', '/blog'];

  // Date de référence stable pour éviter les lastmod artificiels dynamiques à chaque build
  const lastContentUpdate = '2026-09-24T00:00:00.000Z';

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: lastContentUpdate,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  const servicesEntries: MetadataRoute.Sitemap = servicesData.map(service => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    lastModified: lastContentUpdate,
    changeFrequency: 'weekly',
    priority: 0.9
  }));

  const sectorsEntries: MetadataRoute.Sitemap = sectorsData.map(sector => ({
    url: `${siteConfig.url}/secteurs/${sector.slug}`,
    lastModified: lastContentUpdate,
    changeFrequency: 'weekly',
    priority: 0.9
  }));

  const locationsEntries: MetadataRoute.Sitemap = locationsData.map(location => ({
    url: `${siteConfig.url}/zones/${location.slug}`,
    lastModified: lastContentUpdate,
    changeFrequency: 'weekly',
    priority: 0.9
  }));

  const citiesEntries: MetadataRoute.Sitemap = citiesData.map(city => ({
    url: `${siteConfig.url}/villes/${city.slug}`,
    lastModified: getLocalEditorial(city.slug)?.updatedAt || lastContentUpdate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map(post => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.frontmatter.updatedAt || post.frontmatter.date).toISOString(),
      changeFrequency: 'yearly',
      priority: 0.7,
  }));

  const slugifyTag = (input: string) =>
    input
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const tagSlugs = Array.from(
    new Set(
      getAllPosts()
        .flatMap(p => (Array.isArray(p.frontmatter.tags) ? p.frontmatter.tags : []))
        .map(slugifyTag)
    )
  ).filter(Boolean);

  const tagEntries: MetadataRoute.Sitemap = tagSlugs.map(tagSlug => ({
    url: `${siteConfig.url}/blog/tags/${tagSlug}`,
    lastModified: lastContentUpdate,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const filteredStaticEntries = staticEntries.filter(e => !e.url.endsWith('/merci'));

  return [...filteredStaticEntries, ...servicesEntries, ...sectorsEntries, ...locationsEntries, ...citiesEntries, ...blogEntries, ...tagEntries];
}
