// src/lib/cities-helpers.ts
import { citiesData, type City } from "@/lib/cities-data";

/**
 * Extrait le code département depuis des formats courants :
 * - "Paris (75)" -> "75"
 * - "Hauts-de-Seine (92)" -> "92"
 * - "Seine-Saint-Denis (93)" -> "93"
 * - "75" -> "75"
 * - "Dept 92" / "Département 92" -> "92"
 * - "Paris 75" -> "75"
 */
export function extractDeptCode(department: string): string | null {
  if (!department) return null;

  // cas direct: "75"
  const direct = department.trim().match(/^\d{2,3}$/);
  if (direct) return direct[0];

  // cas parenthèses: "(75)"
  const parens = department.match(/\((\d{2,3})\)/);
  if (parens) return parens[1];

  // cas "département 92", "dept 92", "Paris 75"
  const loose = department.match(/\b(\d{2,3})\b/);
  return loose ? loose[1] : null;
}

/**
 * Normalise un code département :
 * - "075" -> "75"
 * - "7 5" -> "75"
 */
export function normalizeDeptCode(input: string): string {
  const raw = (input ?? "").toString().replace(/\s+/g, "").trim();
  // garde uniquement chiffres
  const digits = raw.replace(/[^\d]/g, "");
  // enlève zéros initiaux (075 -> 75) en gardant "0" si jamais
  const normalized = digits.replace(/^0+/, "") || digits;
  return normalized;
}

/**
 * Récupère toutes les villes d’un département (ex: "75", "92", "78")
 */
export function getCitiesByDeptCode(deptCode: string): City[] {
  const target = normalizeDeptCode(deptCode);
  return citiesData.filter((city) => {
    const code = extractDeptCode(city.department);
    return code ? normalizeDeptCode(code) === target : false;
  });
}

/**
 * Variante: index en mémoire (utile si tu appelles souvent la fonction)
 */
let _citiesByDeptCache: Map<string, City[]> | null = null;

export function getCitiesByDeptCodeCached(deptCode: string): City[] {
  const target = normalizeDeptCode(deptCode);

  if (!_citiesByDeptCache) {
    _citiesByDeptCache = new Map<string, City[]>();
    for (const city of citiesData) {
      const code = extractDeptCode(city.department);
      if (!code) continue;

      const key = normalizeDeptCode(code);
      const arr = _citiesByDeptCache.get(key) ?? [];
      arr.push(city);
      _citiesByDeptCache.set(key, arr);
    }
  }

  return _citiesByDeptCache.get(target) ?? [];
}

/**
 * Récupère une ville par son slug (case-insensitive + trim safe)
 */
export function getCityBySlug(slug: string): City | undefined {
  const needle = (slug ?? "").trim().toLowerCase();
  if (!needle) return undefined;
  return citiesData.find((c) => c.slug.trim().toLowerCase() === needle);
}

/**
 * Génère l’URL canonique d’une page ville
 */
export function getCityUrl(slug: City["slug"]): string {
  return `/villes/${slug}`;
}

/**
 * Petit helper SEO optionnel : canonical absolue (si tu as siteConfig.url)
 * (laisse-le ici si tu veux l’utiliser dans generateMetadata)
 */
// import { siteConfig } from "@/lib/config";
// export function getCityCanonicalUrl(slug: City["slug"]): string {
//   return `${siteConfig.url}${getCityUrl(slug)}`;
// }
