import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, MapPin, ClipboardCheck } from "lucide-react";
import HomeHeroPremium from "@/components/home/home-hero-premium";
import HomeJsonLd from "@/components/seo/home-json-ld";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { siteConfig } from "@/lib/config";
import { locationsData } from "@/lib/locations-data";
import { faqItems } from "@/lib/homepage-data";
import { getAllPosts } from "@/lib/blog";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const title = "Sécurité privée en Île-de-France | Basic Protection Privée";
const description = "Gardiennage, sécurité événementielle, SSIAP, rondes et audit de sûreté. Une protection sur mesure, depuis Plaisir et dans toute l’Île-de-France.";
export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: siteConfig.url, type: "website", locale: "fr_FR", images: [{ url: "/images/securite-privee-gardiennage.webp", alt: "Basic Protection Privée — sécurité en Île-de-France" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/images/securite-privee-gardiennage.webp"] },
};

const expertise = [
  { title: "Gardiennage & surveillance", text: "Une présence attentive pour protéger vos sites, vos biens et vos collaborateurs.", slug: "agent-securite-qualifie", image: "/images/securite-privee-gardiennage.webp", tag: "Protection des sites" },
  { title: "Sécurité événementielle", text: "Des accès maîtrisés. Des équipes discrètes. Un événement qui se déroule sereinement.", slug: "securite-evenementielle", image: "/images/service-securite-evenementielle.webp", tag: "Événements & réceptions" },
  { title: "Audit & conseil en sûreté", text: "Comprendre vos risques pour concevoir un dispositif adapté à votre réalité.", slug: "audit-conseil-surete", image: "/images/service-audit-conseil.webp", tag: "Analyse & stratégie" },
];
const complementary = [
  { title: "Sécurité incendie · SSIAP", slug: "agent-incendie-ssiap" },
  { title: "Agents cynophiles", slug: "agent-cynophile" },
  { title: "Rondes & surveillance mobile", slug: "agent-rondier" },
];
const steps = [
  { title: "Comprendre", text: "Nous écoutons vos besoins et analysons les contraintes de votre site, de vos équipes ou de votre événement." },
  { title: "Concevoir", text: "Nous définissons les moyens humains, les horaires et les consignes dans une proposition claire." },
  { title: "Protéger", text: "Nos équipes assurent la mission avec un encadrement de proximité et un suivi régulier." },
];

export default function Home() {
  const allPosts = getAllPosts();
  const posts = allPosts.filter((post, index) => allPosts.findIndex(item => item.frontmatter.title === post.frontmatter.title) === index).slice(0, 3);
  return (
    <>
      <HomeJsonLd brandName={siteConfig.name} phone={siteConfig.business.telephone} email={siteConfig.business.email} streetAddress={siteConfig.business.address.street} postalCode={siteConfig.business.address.postalCode} addressLocality={siteConfig.business.address.city} addressRegion="Île-de-France" addressCountry="FR" />
      <HomeHeroPremium />
      <div className="border-b bg-card">
        <div className="premium-shell grid gap-6 py-7 md:grid-cols-3 md:gap-10">
          {[{ icon: ShieldCheck, title: "Des agents qualifiés", text: "Des compétences adaptées à chaque mission" }, { icon: ClipboardCheck, title: "Un dispositif sur mesure", text: "Des consignes claires, un suivi structuré" }, { icon: MapPin, title: "Un partenaire de proximité", text: "Basés à Plaisir, présents en Île-de-France" }].map(({ icon: Icon, title: label, text }) => <div key={label} className="flex items-center gap-4"><Icon className="h-7 w-7 shrink-0 text-[#9c8056]" strokeWidth={1.3} /><div><p className="text-sm font-semibold">{label}</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{text}</p></div></div>)}
        </div>
      </div>

      <section className="premium-shell premium-section" aria-labelledby="approach-title">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div><p className="premium-eyebrow text-muted-foreground">01 — Notre conviction</p><h2 id="approach-title" className="premium-title mt-6">La confiance se construit.<br /><span className="premium-serif">Sur le terrain.</span></h2></div>
          <div className="lg:pt-10"><p className="text-xl leading-relaxed tracking-tight md:text-2xl">La meilleure protection est celle qui vous permet d’avancer l’esprit libre.</p><p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">Chez Basic Protection Privée, chaque mission commence par une compréhension précise de vos enjeux. Nous associons présence humaine, préparation et suivi pour vous apporter une sécurité discrète, cohérente et adaptée.</p><Link href="/a-propos" className="premium-text-link mt-8">Découvrir notre engagement <ArrowUpRight size={18} /></Link></div>
        </div>
      </section>

      <section id="expertises" className="premium-section border-y bg-card" aria-labelledby="expertise-title">
        <div className="premium-shell">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="premium-eyebrow text-muted-foreground">02 — Nos expertises</p><h2 id="expertise-title" className="premium-title mt-5">À chaque enjeu,<br />une protection adaptée.</h2></div><Link href="/services" className="premium-text-link">Toutes nos expertises <ArrowUpRight size={18} /></Link></div>
          <div className="grid gap-8 md:grid-cols-3">
            {expertise.map((service, i) => <Link key={service.slug} href={`/services/${service.slug}`} className="expertise-card group"><div className="relative aspect-[4/5] overflow-hidden bg-muted"><Image src={service.image} alt={service.title} fill sizes="(max-width: 767px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#101c2d]/80 via-transparent to-transparent" /><span className="absolute left-6 top-6 text-xs tracking-[0.2em] text-white/80">0{i + 1}</span><span className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.14em] text-white">{service.tag}</span><span className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition-colors group-hover:bg-white group-hover:text-[#101c2d]"><ArrowUpRight size={20} /></span></div><h3 className="mt-6 font-headline text-xl font-medium tracking-tight">{service.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.text}</p></Link>)}
          </div>
          <div className="mt-12 grid border-t md:grid-cols-3">{complementary.map(service => <Link href={`/services/${service.slug}`} key={service.slug} className="group flex items-center justify-between gap-3 border-b py-6 text-sm font-medium md:pr-7">{service.title}<ArrowUpRight size={17} className="text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></Link>)}</div>
        </div>
      </section>

      <section className="premium-dark premium-section" aria-labelledby="method-title">
        <div className="premium-shell grid gap-14 lg:grid-cols-2 lg:gap-24">
          <div className="relative min-h-[360px] lg:min-h-[550px]"><Image src="/images/a-propos-basic-protection.webp" alt="L’expertise humaine au service de votre sécurité" fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#101c2d]/80 to-transparent" /><p className="absolute bottom-8 left-8 right-8 font-headline text-2xl leading-snug text-white">Une présence humaine.<br />Une exigence quotidienne.</p></div>
          <div className="py-2"><p className="premium-eyebrow text-[#d9c6a3]">03 — Notre méthode</p><h2 id="method-title" className="premium-title mt-6 text-white">La rigueur à chaque étape.</h2><div className="mt-10">{steps.map((step, i) => <div key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-5 border-t border-white/15 py-7"><span className="pt-1 text-xs text-[#d9c6a3]">0{i + 1}</span><div><h3 className="font-headline text-xl text-white">{step.title}</h3><p className="mt-3 text-sm leading-relaxed text-white/60">{step.text}</p></div></div>)}</div><Link href="/devis" className="premium-text-link mt-3 text-[#d9c6a3]">Construisons votre dispositif <ArrowUpRight size={18} /></Link></div>
        </div>
      </section>

      <section className="premium-shell premium-section" aria-labelledby="coverage-title">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24"><div><p className="premium-eyebrow text-muted-foreground">04 — Notre présence</p><h2 id="coverage-title" className="premium-title mt-6">Proches de vous.<br /><span className="premium-serif">Partout en Île-de-France.</span></h2><p className="mt-6 max-w-md leading-relaxed text-muted-foreground">Depuis Plaisir, dans les Yvelines, nous accompagnons les entreprises, les organisateurs d’événements et les gestionnaires de sites dans les huit départements franciliens.</p><Link className="premium-text-link mt-8" href="/villes">Retrouver votre ville <ArrowUpRight size={18} /></Link></div><div className="grid content-start sm:grid-cols-2 sm:gap-x-8">{locationsData.map(location => <Link key={location.slug} href={`/zones/${location.slug}`} className="group flex items-center justify-between gap-4 border-b py-6 text-sm"><span>{location.name}</span><ArrowUpRight size={16} className="shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></Link>)}</div></div>
      </section>

      <section className="border-y bg-card premium-section" aria-labelledby="journal-title"><div className="premium-shell"><div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="premium-eyebrow text-muted-foreground">Le journal</p><h2 id="journal-title" className="premium-title mt-5">Anticiper, c’est protéger.</h2></div><Link className="premium-text-link" href="/blog">Tous nos conseils <ArrowUpRight size={18} /></Link></div><div className="grid gap-10 md:grid-cols-3">{posts.map(post => {
        const image = PlaceHolderImages.find(item => item.id === post.frontmatter.image);
        return <Link href={`/blog/${post.slug}`} key={post.slug} className="group"><div className="relative aspect-[16/10] overflow-hidden bg-muted"><Image src={image?.imageUrl || "/images/service-audit-conseil.webp"} alt={post.frontmatter.title} fill sizes="(max-width: 767px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /></div><p className="premium-eyebrow mt-6 text-muted-foreground">{post.frontmatter.tags[0] || "Conseils"}</p><h3 className="mt-3 font-headline text-xl leading-snug tracking-tight">{post.frontmatter.title}</h3><span className="premium-text-link mt-5 text-xs">Lire l’article <ArrowUpRight size={16} /></span></Link>;
      })}</div></div></section>
      <FAQAccordion title="Parlons de vos questions." description="Les premiers repères pour préparer votre projet de sécurité." items={faqItems.slice(0, 5)} className="premium-faq" />
      <section className="premium-dark border-b border-white/10 py-20 md:py-28"><div className="premium-shell flex flex-col justify-between gap-10 lg:flex-row lg:items-center"><div><p className="premium-eyebrow text-[#d9c6a3]">Votre prochain projet</p><h2 className="premium-title mt-6 text-white">Votre sérénité<br />commence par un échange.</h2><p className="mt-5 text-white/60">Un lieu, un événement, un besoin. Prenons le temps d’en parler.</p></div><div className="flex flex-col items-start gap-6"><Link href="/devis" className="premium-button premium-button-gold">Échanger sur votre projet <ArrowUpRight size={18} /></Link><a href={`tel:${siteConfig.contact.phoneE164}`} className="text-lg tracking-wide text-white hover:text-[#d9c6a3]">{siteConfig.contact.phone}</a></div></div></section>
    </>
  );
}
