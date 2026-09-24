"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, MapPin, Search, X } from "lucide-react";

export type Zone = {
  name: string;
  href: string;
  kind: "departement" | "ville";
  code?: string;
  detail?: string;
};
const PAGE_SIZE = 18;
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[’'-]/g, " ");

export function ZonesFilterClient({ zones }: { zones: Zone[] }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<"departement" | "ville">("departement");
  const [department, setDepartment] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const departments = zones.filter(zone => zone.kind === "departement");
  const filtered = useMemo(() => {
    const search = normalize(query.trim());
    return zones.filter(zone => {
      if (department && zone.code !== department) return false;
      if (search) return normalize(`${zone.name} ${zone.code || ""} ${zone.href}`).includes(search);
      return zone.kind === kind;
    });
  }, [zones, query, kind, department]);
  const visible = filtered.slice(0, limit);
  const reset = () => { setQuery(""); setDepartment(""); setKind("departement"); setLimit(PAGE_SIZE); };

  return (
    <div>
      <div className="zones-explorer-toolbar">
        <div className="zones-search"><Search size={19} className="shrink-0 text-[#9c8056]" aria-hidden="true" /><label htmlFor="zone-search" className="sr-only">Rechercher une ville ou un département</label><input id="zone-search" type="search" value={query} onChange={event => { setQuery(event.target.value); setLimit(PAGE_SIZE); }} placeholder="Une ville, un département, un code…" className="min-w-0 flex-1 bg-transparent py-4 text-sm outline-none" />{query && <button type="button" onClick={() => { setQuery(""); setLimit(PAGE_SIZE); }} aria-label="Effacer la recherche" className="flex h-10 w-10 items-center justify-center"><X size={17} /></button>}</div>
        <div className="zones-kind-switch" role="group" aria-label="Type de territoire">{[{ value: "departement" as const, label: "Départements", count: departments.length }, { value: "ville" as const, label: "Villes", count: zones.length - departments.length }].map(option => <button key={option.value} type="button" aria-pressed={!query.trim() && kind === option.value} onClick={() => { setKind(option.value); setQuery(""); setLimit(PAGE_SIZE); }} className="zones-kind-button">{option.label}<span>{option.count}</span></button>)}</div>
      </div>
      <div className="flex flex-col justify-between gap-4 py-6 sm:flex-row sm:items-center"><p className="text-xs text-muted-foreground" role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? "territoire" : "territoires"}{query.trim() ? ` pour « ${query.trim()} »` : " à découvrir"}</p><div className="flex flex-wrap items-center gap-3"><label htmlFor="department-filter" className="sr-only">Filtrer par département</label><select id="department-filter" value={department} onChange={event => { setDepartment(event.target.value); setLimit(PAGE_SIZE); }} className="max-w-full border-b bg-background py-2 pr-5 text-xs text-foreground"><option value="">Toute l’Île-de-France</option>{departments.map(zone => <option key={zone.code} value={zone.code}>{zone.code} — {zone.name}</option>)}</select>{(query || department) && <button type="button" onClick={reset} className="min-h-10 text-xs underline underline-offset-4">Réinitialiser</button>}</div></div>
      {visible.length > 0 ? <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{visible.map(zone => <li key={zone.href}><Link href={zone.href} className="zone-territory-card group"><div className="flex items-start justify-between"><span className="zone-code">{zone.code}</span><ArrowUpRight size={19} className="mt-2 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" /></div><p className="premium-eyebrow mt-6 text-muted-foreground">{zone.kind === "departement" ? "Département" : "Présence locale"}</p><h3 className="mt-2 font-headline text-xl font-medium tracking-tight">{zone.name}</h3><p className="mt-3 text-xs leading-relaxed text-muted-foreground">{zone.detail}</p><span className="mt-auto flex items-center gap-2 pt-6 text-[11px] text-[#9c8056]"><MapPin size={12} aria-hidden="true" />{zone.code === "78" && zone.kind === "departement" ? "Notre territoire d’origine" : "Découvrir nos interventions"}</span></Link></li>)}</ul> : <div className="border border-dashed px-6 py-14 text-center"><MapPin size={28} strokeWidth={1.3} className="mx-auto text-[#9c8056]" /><h3 className="mt-5 font-headline text-xl">Votre recherche mérite un échange.</h3><p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">Aucun territoire ne correspond à ces critères. Essayez un autre nom ou contactez-nous pour étudier votre projet.</p><div className="mt-6 flex flex-wrap justify-center gap-6"><button type="button" onClick={reset} className="premium-text-link">Voir tous les départements</button><Link href="/contact" className="premium-text-link">Nous contacter <ArrowUpRight size={15} /></Link></div></div>}
      {filtered.length > limit && <div className="mt-9 text-center"><button type="button" onClick={() => setLimit(value => value + PAGE_SIZE)} className="inline-flex min-h-12 items-center gap-4 border px-7 py-3 text-sm transition-colors hover:bg-card">Afficher plus de territoires <ArrowDown size={15} /></button><p className="mt-3 text-xs text-muted-foreground">{visible.length} sur {filtered.length}</p></div>}
    </div>
  );
}
