"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;

  /** Délai (ms) avant l’animation */
  delay?: number;

  /** Si true, l’animation ne se joue qu’une fois */
  triggerOnce?: boolean;

  /** IntersectionObserver options */
  rootMargin?: string;
  threshold?: number;

  /** Effet visuel */
  effect?: "fadeUp" | "fade" | "none";
}

/** Détecte la préférence utilisateur “réduire les animations” */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(media.matches);

    onChange();
    // compat vieux navigateurs
    if (media.addEventListener) media.addEventListener("change", onChange);
    else media.addListener(onChange);

    return () => {
      if (media.removeEventListener) media.removeEventListener("change", onChange);
      else media.removeListener(onChange);
    };
  }, []);

  return reduced;
}

export function AnimateOnScroll({
  children,
  className,
  delay = 0,
  triggerOnce = true,
  rootMargin = "0px 0px -60px 0px",
  threshold = 0.1,
  effect = "fadeUp",
}: AnimateOnScrollProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const baseClasses = useMemo(() => {
    if (effect === "none") return "";
    if (effect === "fade") {
      return cn(
        "transition-opacity duration-700 ease-out",
        isVisible ? "opacity-100" : "opacity-0"
      );
    }
    // fadeUp (default)
    return cn(
      "transition-all duration-700 ease-out will-change-transform will-change-opacity",
      isVisible
        ? "opacity-100 translate-y-0 blur-0"
        : "opacity-0 translate-y-6 blur-[2px]"
    );
  }, [effect, isVisible]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Si l’utilisateur préfère réduire les animations, on affiche directement
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // évite de re-set state si déjà visible
          setIsVisible((v) => (v ? v : true));
          if (triggerOnce) observer.unobserve(el);
        } else if (!triggerOnce) {
          // si on veut rejouer l’anim à chaque entrée/sortie
          setIsVisible(false);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [prefersReducedMotion, rootMargin, threshold, triggerOnce]);

  return (
    <div
      ref={ref}
      className={cn(baseClasses, className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
