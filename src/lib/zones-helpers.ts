// src/lib/zones-helpers.ts
import { locationsData } from "@/lib/locations-data";

/* ----------------------------------
   Normalisation
----------------------------------- */

function normalizeDeptCode(input: unknown): string | null {
  if (input == null) return null;
  const raw = String(input).replace(/\s+/g, "").trim();
  if (!raw) return null;

  const digits = raw.replace(/[^\d]/g, "");
  if (!digits) return null;

  // "075" -> "75"
  const normalized = digits.replace(/^0+/, "") || digits;
  return normalized || null;
}

/**
 * Extrait le code département depuis un slug de zone :
 * ex: "hauts-de-seine-92" -> "92"
 */
export function deptCodeFromZoneSlug(zoneSlug: string): string | null {
  const m = (zoneSlug ?? "").match(/-(\d{2,3})$/);
  return m?.[1] ? normalizeDeptCode(m[1]) : null;
}

/* ----------------------------------
   Cache dept -> zoneSlug
----------------------------------- */

let _deptToZoneSlug: Map<string, string> | null = null;

function ensureCache() {
  if (_deptToZoneSlug) return;

  _deptToZoneSlug = new Map<string, string>();

  for (const loc of locationsData) {
    const dept = deptCodeFromZoneSlug(loc.slug);
    if (!dept) continue;
    _deptToZoneSlug.set(dept, loc.slug);
  }
}

/**
 * Retourne le slug zone correspondant à un code dept ("75","92"...).
 */
export function getZoneSlugByDeptCode(deptCode: string): string | null {
  const key = normalizeDeptCode(deptCode);
  if (!key) return null;

  ensureCache();
  return _deptToZoneSlug!.get(key) ?? null;
}

/**
 * Retourne le href zone correspondant à un code dept.
 */
export function getZoneHrefByDeptCode(deptCode: string): string | null {
  const slug = getZoneSlugByDeptCode(deptCode);
  return slug ? `/zones/${slug}` : null;
}

/* ----------------------------------
   Alias de compat (si tu l'as utilisé dans des pages)
----------------------------------- */

/**
 * Alias compat: évite les erreurs si du code appelle encore zoneSlugFromDeptCode().
 */
export function zoneSlugFromDeptCode(deptCode: string): string | null {
  return getZoneSlugByDeptCode(deptCode);
}

/** Optionnel (tests / dev) */
export function __resetZonesHelpersCache() {
  _deptToZoneSlug = null;
}
