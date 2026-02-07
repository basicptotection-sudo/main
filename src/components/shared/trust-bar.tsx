import type React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Logo = {
  src: string;
  alt: string;
  /** optionnel : lien vers le client/partenaire */
  href?: string;
};

type TrustBarProps = {
  logos: Logo[];
  className?: string;

  /** Optionnels */
  title?: string;
  variant?: "wrap" | "row";
  priority?: boolean;
};

function makeKey(logo: Logo, index: number) {
  return `${logo.alt}-${logo.src}-${logo.href ?? "nohref"}-${index}`;
}

export function TrustBar({
  logos,
  className,
  title = "Ils nous font confiance",
  variant = "wrap",
  priority = false,
}: TrustBarProps) {
  if (!logos?.length) return null;

  return (
    <section
      className={cn(
        "py-10",
        // fond neutre compatible light/dark
        "bg-background",
        className
      )}
      aria-label="Partenaires"
    >
      <div className="container mx-auto px-4">
        <h3 className="mb-6 text-center text-sm font-semibold tracking-[0.22em] text-muted-foreground uppercase">
          {title}
        </h3>

        <ul
          className={cn(
            "mx-auto flex items-center justify-center gap-x-12 gap-y-6",
            variant === "wrap" ? "flex-wrap" : "flex-nowrap overflow-x-auto",
            "max-w-6xl"
          )}
        >
          {logos.map((logo, index) => {
            const key = makeKey(logo, index);

            const LogoImage = (
              <div
                className={cn(
                  "relative h-10 w-28",
                  "opacity-70 grayscale transition-all duration-300",
                  "hover:opacity-100 hover:grayscale-0"
                )}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                  sizes="112px"
                  priority={priority && index < 6}
                />
              </div>
            );

            return (
              <li key={key} className="shrink-0">
                {logo.href ? (
                  <a
                    href={logo.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F8FD8]/60"
                    aria-label={logo.alt}
                  >
                    {LogoImage}
                  </a>
                ) : (
                  LogoImage
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
