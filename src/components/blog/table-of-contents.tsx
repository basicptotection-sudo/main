'use client';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Heading {
  id: string;
  level: number;
  text: string;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;

    const headingElements = Array.from(article.querySelectorAll('h2, h3'));
    const allHeadings = headingElements.map(el => ({
      id: el.id,
      level: parseInt(el.tagName.substring(1), 10),
      text: el.textContent || ''
    }));
    setHeadings(allHeadings);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    headingElements.forEach(el => observer.observe(el));
    return () => headingElements.forEach(el => observer.unobserve(el));
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24">
      <h3 className="text-lg font-semibold mb-4 text-primary">Table des matières</h3>
      <ul className="space-y-2">
        {headings.map(heading => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(`#${heading.id}`)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
              }}
              className={cn(
                'text-sm transition-colors hover:text-primary',
                heading.level === 3 && 'pl-4',
                activeId === heading.id ? 'text-primary font-medium' : 'text-muted-foreground'
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
