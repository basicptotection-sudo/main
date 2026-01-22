import { notFound } from 'next/navigation';
import { getPostBySlug, getPostFilePaths, PostFrontmatter } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ArticleJsonLd from '@/components/seo/article-json-ld';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { Tag } from '@/components/blog/tag';
import { Breadcrumbs } from '@/components/shared';
import { useMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';

type BlogPageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return getPostFilePaths().map((path) => ({
    slug: path.replace(/\.mdx$/, ''),
  }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  try {
    const { data } = getPostBySlug(params.slug);
    return {
      title: data.title,
      description: data.description,
      alternates: {
        canonical: `/blog/${params.slug}`,
      },
    };
  } catch (error) {
    return {};
  }
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = params;
  try {
    const { data, content } = getPostBySlug(slug);
    
    const postImage = PlaceHolderImages.find(p => p.id === data.image);

    const breadcrumbItems = [
      { label: 'Accueil', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: data.title, href: `/blog/${slug}` },
    ];

    return (
      <>
        <ArticleJsonLd post={data} slug={slug} />
        <div className="container mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-4 gap-12 mt-6">
                <div className="lg:col-span-3">
                    <article className="prose prose-lg dark:prose-invert max-w-none">
                        <header>
                            <Breadcrumbs items={breadcrumbItems} className="not-prose p-0 mb-4" />
                            <div className="flex flex-wrap gap-2 mb-2">
                                {data.tags.map(tag => <Tag key={tag} tag={tag} />)}
                            </div>
                            <h1 className="text-primary !mb-2">{data.title}</h1>
                            <p className="text-muted-foreground !mt-0">
                                Par {data.author} le {format(new Date(data.date), 'dd MMMM yyyy', { locale: fr })}
                            </p>
                            
                            {postImage && (
                                <div className="relative w-full aspect-video my-8 rounded-lg overflow-hidden">
                                <Image
                                    src={postImage.imageUrl}
                                    alt={data.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                </div>
                            )}
                        </header>
                        <MDXRemote source={content} components={useMDXComponents({})} />
                    </article>
                </div>
                <aside className="lg:col-span-1">
                    <TableOfContents />
                </aside>
            </div>
        </div>
      </>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
