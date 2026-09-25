import fs from 'node:fs';

const pages = JSON.parse(fs.readFileSync(new URL('../src/content/local/territories.json', import.meta.url), 'utf8'));
const normalize = text => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const strings = page => [page.title, page.description, page.heading, page.intro, page.contextTitle, page.context, ...page.sections.flatMap(x => [x.title, x.text]), page.briefTitle, ...page.brief, ...page.services.map(x => x.text), ...page.faq.flatMap(x => [x.question, x.answer]), page.cta];
const shingles = text => { const words = normalize(text).split(' '); return new Set(words.slice(0, -4).map((_, index) => words.slice(index, index + 5).join(' '))); };
const errors = [];
const pairs = [];
for (const page of pages) {
  if (!page.sources.length || page.sources.some(source => !source.url.startsWith('https://'))) errors.push(`${page.slug}: source manquante`);
  if (!page.updatedAt || !page.angle) errors.push(`${page.slug}: suivi éditorial incomplet`);
  if (normalize(strings(page).join(' ')).split(' ').length < 300) errors.push(`${page.slug}: contenu insuffisant à relire`);
}
for (let i = 0; i < pages.length; i++) for (let j = i + 1; j < pages.length; j++) {
  const a = pages[i], b = pages[j];
  for (const key of ['slug', 'title', 'description', 'heading', 'angle']) if (a[key] === b[key]) errors.push(`${a.slug}/${b.slug}: ${key} identique`);
  const blocks = new Set(strings(a).map(normalize));
  const duplicateBlocks = strings(b).filter(x => normalize(x).split(' ').length >= 10 && blocks.has(normalize(x)));
  if (duplicateBlocks.length) errors.push(`${a.slug}/${b.slug}: passage éditorial recopié`);
  const left = shingles(strings(a).join(' ')), right = shingles(strings(b).join(' '));
  const shared = [...left].filter(x => right.has(x));
  const overlap = shared.length / Math.min(left.size, right.size);
  pairs.push({ left: a.slug, right: b.slug, sharedFiveWordSequences: shared.length, overlapPercent: Number((overlap * 100).toFixed(2)) });
  // A review threshold for our own drafts, not a search-engine ranking rule.
  if (overlap > .08) errors.push(`${a.slug}/${b.slug}: proximité lexicale à examiner (${(overlap * 100).toFixed(2)} %)`);
}
const report = { scope: 'Pages locales réécrites : textes éditoriaux uniquement, hors navigation et coordonnées. Ce contrôle lexical ne prouve pas une absence de proximité sémantique ni de similitude avec le Web.', pages: pages.length, comparisons: pairs.length, errors, closestPairs: pairs.sort((a,b) => b.overlapPercent - a.overlapPercent).slice(0, 5) };
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;
