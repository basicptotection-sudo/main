import territories from '@/content/local/territories.json';

export type LocalEditorial = (typeof territories)[number];
export const localEditorials: LocalEditorial[] = territories;
export function getLocalEditorial(slug: string) {
  return localEditorials.find(territory => territory.slug === slug);
}
