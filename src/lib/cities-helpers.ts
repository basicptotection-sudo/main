// src/lib/cities-helpers.ts
import { citiesData, type City } from "@/lib/cities-data";

/* ----------------------------------
   Normalisation dept
----------------------------------- */

function normalizeDeptCode(input: string | null | undefined): string | null {
  const raw = (input ?? "").trim();
  if (!raw) return null;

  const digits = raw.replace(/[^\d]/g, "");
  if (!digits) return null;

  // "075" -> "75"
  const normalized = digits.replace(/^0+/, "") || digits;
  return normalized || null;
}

function deptCodeFromDepartmentLabel(department: string): string | null {
  // ex: "Yvelines (78)" -> "78"
  const m = department.match(/\((\d{2,3})\)/);
  return normalizeDeptCode(m?.[1] ?? null);
}

function postalCodeFromSlug(slug: string): string | null {
  // ex: "plaisir-78370" -> "78370"
  // ex: "paris-20-75020" -> "75020"
  const m = slug.match(/-(\d{5})$/);
  return m?.[1] ?? null;
}

/* ----------------------------------
   Public API
----------------------------------- */

/**
 * Retourne le code département ("75","92","93"...)
 * Sources par priorité :
 *  1) city.department (ex: "Paris (75)")
 *  2) code postal depuis le slug (ex: "...-75020" => "75")
 */
export function deptCodeFromCity(city: City): string | null {
  const fromDeptLabel = deptCodeFromDepartmentLabel(city.department);
  if (fromDeptLabel) return fromDeptLabel;

  const cp = postalCodeFromSlug(city.slug);
  if (cp) return cp.slice(0, 2);

  return null;
}

/* ----------------------------------
   Filtrage par département (cache)
----------------------------------- */

let _citiesByDeptCache: Map<string, City[]> | null = null;

/**
 * Retourne toutes les villes du département, avec cache en mémoire.
 */
export function getCitiesByDeptCodeCached(deptCode: string): City[] {
  const key = normalizeDeptCode(deptCode);
  if (!key) return [];

  if (!_citiesByDeptCache) {
    _citiesByDeptCache = new Map<string, City[]>();

    for (const c of citiesData) {
      const d = deptCodeFromCity(c);
      if (!d) continue;

      const dk = normalizeDeptCode(d);
      if (!dk) continue;

      const list = _citiesByDeptCache.get(dk) ?? [];
      list.push(c);
      _citiesByDeptCache.set(dk, list);
    }
  }

  return _citiesByDeptCache.get(key) ?? [];
}

/** Optionnel (tests / dev) */
export function __resetCitiesHelpersCache() {
  _citiesByDeptCache = null;
}
