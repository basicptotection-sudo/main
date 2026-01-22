import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Tag } from '@/components/blog/tag';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/shared';

export async function generateStaticParams() {
  const posts = getAllPosts();
  const allTags = [...new Set(posts.flatMap(p => p.frontmatter.tags))];
  return allTags.map(tag => ({ tag: tag.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag);
  const capitalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1);
  return {
    title: `Articles sur "${capitalizedTag}"`,
    description: `Retrouvez tous nos articles, conseils et analyses sur le thème de ${tag}.`,
    alternates: {
        canonical: `/blog/tags/${tag}`,
    }
  };
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const currentTag = decodeURIComponent(params.tag);
  const posts = getAllPosts().filter(p => 
    p.frontmatter.tags.some(t => t.toLowerCase() === currentTag)
  );

  if (posts.length === 0) {
    notFound();
  }

  const allTags = [...new Set(getAllPosts().flatMap(p => p.frontmatter.tags))];
  const capitalizedTag = currentTag.charAt(0).toUpperCase() + currentTag.slice(1);

  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: capitalizedTag, href: `/blog/tags/${currentTag}` },
  ];

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto">
        <Breadcrumbs items={breadcrumbItems} centered />
        <p className="text-primary font-semibold mt-2">Catégorie</p>
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">{capitalizedTag}</h1>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">{posts.length} article{posts.length > 1 ? 's' : ''} trouvé{posts.length > 1 ? 's' : ''}</h2>
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
                      <Badge key={tag} variant={tag.toLowerCase() === currentTag ? "default" : "secondary"}>{tag}</Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-xl font-bold text-center mb-4">Explorer d'autres catégories</h3>
        <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
            {allTags.map(tag => <Tag key={tag} tag={tag} current={tag.toLowerCase() === currentTag} />)}
        </div>
      </div>
    </div>
  );
}
