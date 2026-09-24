
import { siteConfig } from '@/lib/config';
import { getAllPosts } from '@/lib/blog';
import RSS from 'rss';

export async function GET() {
  const feed = new RSS({
    title: `${siteConfig.name} | Blog`,
    description: siteConfig.description,
    feed_url: `${siteConfig.url}/feed.xml`,
    site_url: siteConfig.url,
    language: 'fr',
    pubDate: new Date(),
    ttl: 60,
  });

  const posts = getAllPosts();

  posts.forEach(post => {
    feed.item({
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      guid: post.slug,
      date: post.frontmatter.date,
      author: post.frontmatter.author,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
