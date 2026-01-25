'use client';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Heading {
  id: string;
  level: number;
  text: string;
}

const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;

    const headingElements = Array.from(article.querySelectorAll('h2, h3')) as HTMLElement[];
    const usedIds = new Set<string>();

    const allHeadings = headingElements
      .map((el, index) => {
        const text = el.textContent || '';
        if (!text.trim()) {
          return null; // Skip empty headings
        }
        
        let id = el.id;
        
        // If ID is missing or already used, generate a new unique one
        if (!id || usedIds.has(id)) {
            const baseSlug = slugify(text) || `section-${index}`;
            let newId = baseSlug;
            let count = 1;
            // Ensure new ID is unique
            while (usedIds.has(newId)) {
                newId = `${baseSlug}-${count++}`;
            }
            id = newId;
            el.id = id; // Mutate the DOM to set the new unique ID
        }

        usedIds.add(id);
        
        return {
          id: id,
          level: parseInt(el.tagName.substring(1), 10),
          text: text
        };
      })
      .filter((h): h is Heading => h !== null);

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
    
    const elementsToObserve = headingElements.filter(el => el.id);
    elementsToObserve.forEach(el => observer.observe(el));
    
    return () => {
        elementsToObserve.forEach(el => {
            observer.unobserve(el)
        });
    }
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
                document.getElementById(heading.id)?.scrollIntoView({
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
