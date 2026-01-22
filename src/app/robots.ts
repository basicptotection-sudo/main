import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/merci'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
