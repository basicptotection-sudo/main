import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Basic Protection Privée',
  description: 'Conseils, actualités et analyses sur la sécurité privée, le gardiennage et la protection des biens et des personnes.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const allTags = [...new Set(posts.flatMap(p => p.frontmatter.tags))];

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Notre Blog</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Découvrez nos analyses, conseils et actualités pour tout savoir sur le monde de la sécurité privée.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Tous les articles</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="block">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <p className="text-sm text-muted-foreground mb-2">
                    {format(new Date(post.frontmatter.date), 'dd MMMM yyyy', { locale: fr })}
                  </p>
                  <CardTitle>{post.frontmatter.title}</CardTitle>
                  <CardDescription className="mt-2">{post.frontmatter.description}</CardDescription>
                </CardHeader>
                <div className="p-6 pt-0">
                  <div className="flex flex-wrap gap-2">
                    {post.frontmatter.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
