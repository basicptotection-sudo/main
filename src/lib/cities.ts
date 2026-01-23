import { citiesData, City } from "@/lib/cities-data";

export function getCitiesByDeptCode(deptCode: City["deptCode"]) {
  return citiesData.filter((c) => c.deptCode === deptCode);
}

export function getCityBySlug(slug: string) {
  return citiesData.find((c) => c.slug === slug);
}

export function getCityUrl(slug: string) {
  return `/villes/${slug}`;
}
