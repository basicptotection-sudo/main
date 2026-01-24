import { citiesData, City } from "@/lib/cities-data";

/**
 * Extrait le code département depuis "Paris (75)" → "75"
 */
function extractDeptCode(department: string): string | null {
  const match = department.match(/\((\d+)\)/);
  return match ? match[1] : null;
}

/**
 * Récupère toutes les villes d’un département (ex: "75", "92", "78")
 */
export function getCitiesByDeptCode(deptCode: string): City[] {
  return citiesData.filter(
    (city) => extractDeptCode(city.department) === deptCode
  );
}

/**
 * Récupère une ville par son slug
 */
export function getCityBySlug(slug: string): City | undefined {
  return citiesData.find((city) => city.slug === slug);
}

/**
 * Génère l’URL canonique d’une page ville
 */
export function getCityUrl(slug: City["slug"]): string {
  return `/villes/${slug}`;
}
