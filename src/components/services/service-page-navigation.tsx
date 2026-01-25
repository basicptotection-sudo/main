'use client';

import Link from "next/link";

type MiniNavItem = {
    id: string;
    label: string;
};

type ServicePageNavigationProps = {
    items: MiniNavItem[];
};

export function ServicePageNavigation({ items }: ServicePageNavigationProps) {
    if (!items || items.length === 0) {
        return null;
    }

    return (
        <section className="sticky top-24 z-20 border-b bg-background/80 backdrop-blur-lg">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="no-scrollbar flex gap-2 overflow-x-auto">
                    {items.map((it) => (
                        <Link
                            key={it.id}
                            href={`#${it.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                const element = document.getElementById(it.id);
                                if (element) {
                                    const headerOffset = 96; // h-24 -> 6rem -> 96px
                                    const elementPosition = element.getBoundingClientRect().top;
                                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                                    window.scrollTo({
                                        top: offsetPosition,
                                        behavior: "smooth"
                                    });
                                }
                            }}
                            className="shrink-0 border-b-2 border-transparent px-1 py-4 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary"
                        >
                            {it.label}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
