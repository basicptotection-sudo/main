import { notFound } from "next/navigation";
import { cache } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock3 } from "lucide-react";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { siteConfig } from "@/lib/config";
import { getPostBySlug, getPostFilePaths, getSimilarPosts } from "@/lib/blog";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import ArticleJsonLd from "@/components/seo/article-json-ld";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { useMDXComponents } from "@/mdx-components";
import { EventChecklist } from "@/components/blog/event-checklist";
import { ArticleOverview, ArticlePhoto, ArticleWorkflow, ArticleTip } from "@/components/blog/article-blocks";
import styles from "./article.module.css";

type PageProps = { params: Promise<{ slug: string }> };
type HeadingNode = { type: string; tagName?: string; value?: string; properties?: { id?: string }; children?: HeadingNode[] };
const loadPost = cache((slug: string) => {
  if (!getPostFilePaths().includes(`${slug}.mdx`)) notFound();
  return getPostBySlug(slug);
});
function imageFor(image: string) {
  return PlaceHolderImages.find(item => item.id === image)?.imageUrl ?? (image.startsWith("/images/") ? image : "/images/blog/choir-agence-securite.webp");
}
function dateLabel(date: string) {
  return Number.isNaN(Date.parse(date)) ? null : format(new Date(date), "d MMMM yyyy", { locale: fr });
}
export function generateStaticParams() { return getPostFilePaths().map(file => ({ slug: file.replace(/\.mdx$/, "") })); }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data } = loadPost(slug);
  const image = new URL(imageFor(data.image), siteConfig.url).href;
  return {
    title: data.title, description: data.description, alternates: { canonical: `/blog/${slug}` }, authors: [{ name: data.author }],
    openGraph: { type: "article", title: data.title, description: data.description, url: `/blog/${slug}`, locale: "fr_FR", siteName: siteConfig.name, publishedTime: data.date, modifiedTime: data.updatedAt ?? data.date, authors: [data.author], tags: data.tags, images: [{ url: image, alt: data.title }] },
    twitter: { card: "summary_large_image", title: data.title, description: data.description, images: [image] },
  };
}
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const { data, content } = loadPost(slug);
  const headings: { id: string; text: string; level: number }[] = [];
  function collectHeadings() {
    return (tree: HeadingNode) => {
      const text = (node: HeadingNode): string => node.type === "text" ? node.value ?? "" : (node.children ?? []).map(text).join("");
      const walk = (node: HeadingNode) => {
        if ((node.tagName === "h2" || node.tagName === "h3") && node.properties?.id) headings.push({ id: node.properties.id, text: text(node), level: node.tagName === "h2" ? 2 : 3 });
        node.children?.forEach(walk);
      };
      walk(tree);
    };
  }
  const { content: article } = await compileMDX({ source: content, components: useMDXComponents({ ArticleOverview, ArticlePhoto, ArticleWorkflow, EventChecklist, blockquote: ArticleTip }), options: { mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug, collectHeadings] } } });
  const navigationHeadings = headings.length > 14 ? headings.filter(heading => heading.level === 2) : headings;
  const plain = content.replace(/```[\s\S]*?```/g, "").replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/<[^>]*>/g, "").replace(/[#*_>`~|]/g, " ");
  const minutes = Math.max(1, Math.ceil(plain.trim().split(/\s+/).filter(Boolean).length / 200));
  const similar = getSimilarPosts(slug, data.tags, 30).filter((post, index, all) => post.frontmatter.title !== data.title && all.findIndex(item => item.frontmatter.title === post.frontmatter.title) === index).slice(0, 3);
  const published = dateLabel(data.date);
  const updated = data.updatedAt && data.updatedAt !== data.date ? dateLabel(data.updatedAt) : null;
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ name: "Accueil", url: "/" }, { name: "Le journal", url: "/blog" }, { name: data.title, url: `/blog/${slug}` }].map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: new URL(item.url, siteConfig.url).href })) };
  return <div className={styles.page}>
    <ArticleJsonLd post={data} slug={slug} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g,"\\u003c") }} />
    <header className={styles.hero}><div className="premium-shell"><Breadcrumbs items={[{label:"Accueil",href:"/"},{label:"Le journal",href:"/blog"},{label:"L’article"}]} variant="onDark" /><div className={styles.heroLayout}><div><p className="premium-eyebrow text-[#d9c6a3]">Le journal · Conseils & analyses</p><div className={styles.tags}>{data.tags.map(tag=><Link key={tag} href={`/blog/tags/${tag.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`}>{tag}</Link>)}</div><h1>{data.title}</h1><p className={styles.description}>{data.description}</p><div className={styles.byline}><span>Par <strong>{data.author}</strong></span>{published && <time dateTime={data.date}>{published}</time>}<span className="inline-flex items-center gap-2"><Clock3 size={14} aria-hidden="true" />{minutes} min de lecture</span>{updated && <span>Mis à jour le <time dateTime={data.updatedAt}>{updated}</time></span>}</div></div><div className={styles.heroImage}><Image src={imageFor(data.image)} alt={data.title} fill priority sizes="(max-width: 767px) 100vw, 45vw" className="object-cover" /><span>Le regard Basic Protection</span></div></div></div></header>
    <div className="premium-shell"><div className={styles.readingLayout}>
      <aside className={styles.sidebar}>{headings.length > 0 && <details open className={styles.contents}><summary>Dans cet article <span aria-hidden="true">↕</span></summary><nav aria-label="Sommaire de l’article"><ol>{navigationHeadings.map((heading,index)=><li key={heading.id} className={heading.level===3 ? styles.subheading : undefined}><a href={`#${heading.id}`}><span>{String(index+1).padStart(2,"0")}</span>{heading.text}</a></li>)}</ol></nav></details>}<div className={styles.advice}><p className="premium-eyebrow text-[#d9c6a3]">Du conseil au terrain</p><h2>Et pour<br /><span className="premium-serif">votre projet ?</span></h2><p>Échangeons sur vos lieux, vos contraintes et les moyens de protection adaptés.</p><Link href="/devis" className="premium-text-link text-[#d9c6a3]">Parlons de votre besoin <ArrowUpRight size={16} aria-hidden="true" /></Link></div></aside>
      <div className={styles.articleColumn}><article aria-label={data.title} className={styles.article}>{article}</article><div className={styles.articleEnd}><span>Un éclairage de {data.author}</span><Link href="/blog" className="premium-text-link"><ArrowLeft size={16} aria-hidden="true" />Retour au journal</Link><a href="#" className="premium-text-link">Haut de page ↑</a></div></div>
    </div></div>
    <section className={styles.cta} aria-labelledby="article-project"><div className="premium-shell"><div><p className="premium-eyebrow text-[#d9c6a3]">Passons de la réflexion à l’action</p><h2 id="article-project" className="premium-title mt-5">Votre contexte est unique.<br /><span className="premium-serif text-[#d9c6a3]">Sa protection aussi.</span></h2></div><div><p>Définissons ensemble une réponse adaptée à votre site, vos horaires et vos priorités.</p><Link href="/devis" className="premium-button premium-button-gold mt-6">Étudier mon projet <ArrowUpRight size={18} aria-hidden="true" /></Link></div></div></section>
    {similar.length>0 && <section className="premium-shell premium-section" aria-labelledby="related-posts"><div className={styles.relatedHeading}><div><p className="premium-eyebrow text-muted-foreground">Pour prolonger la réflexion</p><h2 id="related-posts" className="premium-title mt-5">D’autres regards.<br /><span className="premium-serif">Les mêmes exigences.</span></h2></div><Link href="/blog" className="premium-text-link">Tout le journal <ArrowUpRight size={17} aria-hidden="true" /></Link></div><div className={styles.related}>{similar.map(post=><Link href={`/blog/${post.slug}`} key={post.slug} className={styles.relatedCard}><div className={styles.relatedImage}><Image src={imageFor(post.frontmatter.image)} alt={post.frontmatter.title} fill sizes="(max-width: 639px) 100vw, 33vw" className="object-cover" /><ArrowUpRight size={36} aria-hidden="true" /></div><p className={styles.relatedTag}>{post.frontmatter.tags[0] ?? "Le journal"}</p><h3>{post.frontmatter.title}</h3><p>{post.frontmatter.description}</p></Link>)}</div></section>}
  </div>;
}
