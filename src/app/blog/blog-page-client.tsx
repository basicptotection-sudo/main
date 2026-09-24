"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Search, X } from "lucide-react";
import type { Post, PostFrontmatter } from "@/lib/blog";
import { PlaceHolderImages } from "@/lib/placeholder-images";

type SortKey = "recent" | "oldest" | "title";
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const dateLabel = (value: string) => new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(value));
function cover(post: Post<PostFrontmatter>) {
  return PlaceHolderImages.find(image => image.id === post.frontmatter.image)?.imageUrl || (post.frontmatter.image.startsWith("/") ? post.frontmatter.image : null);
}

export default function BlogPageClient({ posts }: { posts: Post<PostFrontmatter>[] }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [tag, setTag] = useState("");
  const [sort, setSort] = useState<SortKey>("recent");
  const tags = useMemo(() => [...new Set(posts.flatMap(post => post.frontmatter.tags))].sort((a, b) => a.localeCompare(b, "fr")), [posts]);
  const featured = posts.find(post => post.frontmatter.tags.some(tag => normalize(tag) === "a la une")) || posts[0];
  const filtered = useMemo(() => posts.filter(post => {
    const data = post.frontmatter;
    return (!tag || data.tags.includes(tag)) && normalize(`${data.title} ${data.description} ${data.tags.join(" ")}`).includes(normalize(deferredQuery.trim()));
  }).sort((a, b) => sort === "title" ? a.frontmatter.title.localeCompare(b.frontmatter.title, "fr") : (new Date(a.frontmatter.date).getTime() - new Date(b.frontmatter.date).getTime()) * (sort === "recent" ? -1 : 1)), [posts, tag, deferredQuery, sort]);
  const reset = () => { setQuery(""); setTag(""); setSort("recent"); };
  const featuredCover = featured && cover(featured);

  return <>
    <section className="premium-shell pb-12 pt-8 md:pb-16">
      <nav aria-label="Fil d’Ariane" className="flex gap-3 text-[11px] text-muted-foreground"><Link href="/" className="hover:text-foreground">Accueil</Link><span aria-hidden="true">/</span><span aria-current="page">Le journal</span></nav>
      <div className="mt-12 flex flex-col justify-between gap-7 border-b pb-10 md:mt-16 lg:flex-row lg:items-end">
        <div><p className="premium-eyebrow text-[#9c8056]">Le journal · Basic Protection Privée</p><h1 className="mt-5 font-headline text-[clamp(2.8rem,5.6vw,5.4rem)] font-medium leading-[1.04] tracking-[-0.055em]">Un regard éclairé.<br /><span className="premium-serif">Une sécurité maîtrisée.</span></h1></div>
        <div className="max-w-sm lg:pb-2"><p className="text-sm leading-relaxed text-muted-foreground">Conseils, méthodes et décryptages pour comprendre vos enjeux de sécurité et prendre des décisions éclairées.</p><a href="#articles" className="premium-text-link mt-6">Parcourir le journal <ArrowDown size={16} /></a></div>
      </div>
      {featured && <article className="mt-10 md:mt-12"><Link href={`/blog/${featured.slug}`} className="journal-feature group grid overflow-hidden bg-[#101c2d] text-white lg:grid-cols-[1.1fr_1fr]">
        <div className="relative min-h-64 overflow-hidden bg-[#203149] lg:min-h-[460px]">{featuredCover && <Image src={featuredCover} alt="" fill priority sizes="(max-width: 1023px) 100vw, 55vw" className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.03]" />}<span className="absolute left-6 top-6 bg-[#f5f1e9] px-4 py-2 text-[10px] uppercase tracking-[0.15em] text-[#101c2d]">À la une</span></div>
        <div className="flex flex-col items-start p-7 sm:p-10 lg:p-12"><p className="premium-eyebrow text-[#d9c6a3]">{featured.frontmatter.tags.slice(0, 2).join(" · ")}</p><h2 className="mt-6 font-headline text-[clamp(1.7rem,2.5vw,2.5rem)] font-medium leading-[1.15] tracking-[-0.035em]">{featured.frontmatter.title}</h2><p className="mt-5 text-sm leading-relaxed text-white/65">{featured.frontmatter.description}</p><time dateTime={featured.frontmatter.date} className="mt-6 text-xs text-white/50">{dateLabel(featured.frontmatter.date)}</time><span className="mt-auto inline-flex items-center gap-6 border-b border-[#d9c6a3]/50 pb-3 pt-8 text-xs text-[#d9c6a3]">Lire l’article <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1" /></span></div>
      </Link></article>}
    </section>

    <section id="articles" className="premium-shell pb-20 pt-8 md:pb-28" aria-labelledby="articles-title">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="premium-eyebrow text-[#9c8056]">Comprendre · Anticiper · Protéger</p><h2 id="articles-title" className="premium-title mt-4">Toutes nos <span className="premium-serif">lectures.</span></h2></div><div className="journal-search"><Search size={17} className="shrink-0 text-muted-foreground" aria-hidden="true" /><input aria-label="Rechercher un article" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Un sujet, un mot-clé…" className="min-w-0 flex-1 bg-transparent py-4 text-sm outline-none" />{query && <button type="button" onClick={() => setQuery("")} aria-label="Effacer la recherche" className="p-2"><X size={16} /></button>}</div></div>
      <div className="mt-8 flex flex-wrap gap-2 border-y py-5" aria-label="Filtrer par sujet"><button type="button" className="journal-tag" aria-pressed={!tag} onClick={() => setTag("")}>Tout le journal</button>{tags.map(item => <button key={item} type="button" className="journal-tag" aria-pressed={tag === item} onClick={() => setTag(item)}>{item}</button>)}</div>
      <div className="flex flex-wrap items-center justify-between gap-4 py-6"><p role="status" aria-live="polite" className="text-xs text-muted-foreground">{filtered.length} article{filtered.length > 1 ? "s" : ""}{tag ? ` · ${tag}` : ""}</p><label className="flex items-center gap-3 text-xs text-muted-foreground">Trier par<select aria-label="Trier les articles" value={sort} onChange={event => setSort(event.target.value as SortKey)} className="max-w-full border bg-background px-3 py-2 text-foreground"><option value="recent">Les plus récents</option><option value="oldest">Les plus anciens</option><option value="title">Titre : A à Z</option></select></label></div>
      <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">{filtered.map(post => { const image = cover(post); return <article key={post.slug}><Link href={`/blog/${post.slug}`} className="journal-card group flex h-full flex-col"><div className="relative aspect-[3/2] overflow-hidden bg-muted">{image && <Image src={image} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.04]" />}<span className="absolute bottom-0 left-0 bg-background px-4 py-2 text-[10px] uppercase tracking-[0.1em]">{post.frontmatter.tags[0] || "Analyse"}</span></div><div className="flex flex-1 flex-col border-b pb-6 pt-6"><time dateTime={post.frontmatter.date} className="text-[11px] text-muted-foreground">{dateLabel(post.frontmatter.date)}</time><h3 className="mt-3 font-headline text-2xl font-medium leading-tight tracking-[-0.025em] transition-colors group-hover:text-[#9c8056]">{post.frontmatter.title}</h3><p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.frontmatter.description}</p><span className="mt-auto flex items-center justify-between pt-6 text-xs">Lire l’article <ArrowUpRight size={18} className="text-[#9c8056]" /></span></div></Link></article>; })}</div>
      {!filtered.length && <div className="border-b py-16 text-center"><Search size={28} className="mx-auto text-[#9c8056]" /><h3 className="mt-5 font-headline text-2xl">Aucune lecture pour cette recherche.</h3><p className="mt-3 text-sm text-muted-foreground">Essayez un autre mot-clé ou explorez tous nos sujets.</p><button type="button" onClick={reset} className="premium-button mt-7">Réinitialiser les filtres <ArrowUpRight size={16} /></button></div>}
    </section>
    <section className="premium-dark border-b border-white/10 py-16 md:py-24"><div className="premium-shell flex flex-col justify-between gap-9 lg:flex-row lg:items-center"><div><p className="premium-eyebrow text-[#d9c6a3]">Du conseil à l’action</p><h2 className="premium-title mt-5 text-white">Chaque situation mérite<br /><span className="premium-serif text-[#d9c6a3]">une réponse sur mesure.</span></h2><p className="mt-6 max-w-lg text-sm leading-relaxed text-white/60">Un article a soulevé une question ? Échangeons sur votre site, votre événement et les enjeux de votre activité.</p></div><Link href="/contact" className="premium-button premium-button-gold self-start lg:self-center">Parlons de votre projet <ArrowUpRight size={18} /></Link></div></section>
  </>;
}
