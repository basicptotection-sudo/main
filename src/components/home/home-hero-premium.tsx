import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Phone } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

type HomeHeroPremiumProps = {
  className?: string;
  backgroundImageUrl?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

export default function HomeHeroPremium({
  className,
  backgroundImageUrl = "/images/securite-privee-gardiennage.webp",
  eyebrow = "Sécurité privée · Île-de-France",
  title,
  subtitle = "Vos lieux, vos équipes, vos événements. Nous concevons une protection à la hauteur de ce qui compte pour vous.",
}: HomeHeroPremiumProps) {
  return (
    <section className={cn("premium-hero", className)} aria-labelledby="hero-title">
      <div className="premium-hero-image">
        <Image src={backgroundImageUrl} alt="Professionnel de la sécurité en mission" fill priority sizes="100vw" className="object-cover object-[65%_center]" />
      </div>
      <div className="premium-hero-shade" />
      <div className="premium-shell relative z-10">
        <div className="hero-copy">
          <p className="premium-eyebrow text-[#d9c6a3]"><span className="h-px w-8 bg-current" />{eyebrow}</p>
          <h1 id="hero-title" className="mt-8 max-w-3xl font-headline text-[clamp(2.8rem,6.5vw,6.5rem)] font-medium leading-[1.02] tracking-[-0.055em] text-white">
            {title || <>La sérénité.<br />Sans compromis<span className="text-[#d9c6a3]">.</span></>}
          </h1>
          <p className="mt-7 max-w-md text-base leading-relaxed text-white/75 md:text-lg">{subtitle}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link className="premium-button premium-button-gold" href="/devis">Parlons de votre protection <ArrowUpRight size={18} /></Link>
            <a className="inline-flex min-h-12 items-center justify-center gap-3 px-3 text-sm text-white transition-colors hover:text-[#d9c6a3]" href={`tel:${siteConfig.contact.phoneE164}`}><Phone size={16} />{siteConfig.contact.phone}</a>
          </div>
        </div>
        <div className="hero-baseline">
          <div><span className="premium-eyebrow text-white/50">Notre engagement</span><p className="mt-2 text-sm text-white/90">Discrétion. Rigueur. Présence.</p></div>
          <div className="hidden sm:block"><span className="premium-eyebrow text-white/50">Notre territoire</span><p className="mt-2 text-sm text-white/90">Plaisir · Yvelines · Île-de-France</p></div>
          <a href="#expertises" aria-label="Découvrir nos expertises" className="inline-flex items-center gap-4 text-sm text-white/80 hover:text-white"><span className="hidden md:inline">Découvrir nos expertises</span><span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25"><ArrowDown size={18} /></span></a>
        </div>
      </div>
    </section>
  );
}
