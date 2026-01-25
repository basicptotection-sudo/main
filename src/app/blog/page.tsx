
import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import BlogPageClient from './blog-page-client';

export const metadata: Metadata = {
  title: 'Blog - Basic Protection Privée',
  description:
    'Conseils, actualités et analyses sur la sécurité privée, le gardiennage et la protection des biens et des personnes.',
  alternates: { canonical: '/blog' },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return <BlogPageClient posts={posts} />;
}
