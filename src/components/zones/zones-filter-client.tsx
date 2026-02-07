
'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Search, ArrowRight, MapPin } from 'lucide-react';

type Zone = {
  name: string;
  href: string;
  kind: 'departement' | 'ville';
  code?: string;
};

export function ZonesFilterClient({ zones }: { zones: Zone[] }) {
  const [q, setQ] = React.useState('');
  const [tab, setTab] = React.useState<'toutes' | 'departements' | 'villes'>(
    'toutes'
  );

  const filtered = React.useMemo(() => {
    const query = q.trim().toLowerCase();

    return zones
      .filter((z) => {
        if (tab === 'departements' && z.kind !== 'departement') return false;
        if (tab === 'villes' && z.kind !== 'ville') return false;
        return true;
      })
      .filter((z) => {
        if (!query) return true;
        return (
          z.name.toLowerCase().includes(query) ||
          z.href.toLowerCase().includes(query) ||
          (z.code ? z.code.toLowerCase().includes(query) : false)
        );
      });
  }, [zones, q, tab]);

  return (
    <div className="mt-10">
      <div className="rounded-2xl border border-border bg-background p-4 md:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher : Paris, 92, Nanterre, Yvelines…"
              className="pl-9 rounded-xl"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setTab('toutes')}
              className={`rounded-xl border px-3 py-2 text-sm transition ${
                tab === 'toutes'
                  ? 'border-primary/30 bg-primary/10 text-foreground'
                  : 'border-border bg-background hover:bg-muted/30'
              }`}
            >
              Toutes
            </button>
            <button
              type="button"
              onClick={() => setTab('departements')}
              className={`rounded-xl border px-3 py-2 text-sm transition ${
                tab === 'departements'
                  ? 'border-primary/30 bg-primary/10 text-foreground'
                  : 'border-border bg-background hover:bg-muted/30'
              }`}
            >
              Départements
            </button>
            <button
              type="button"
              onClick={() => setTab('villes')}
              className={`rounded-xl border px-3 py-2 text-sm transition ${
                tab === 'villes'
                  ? 'border-primary/30 bg-primary/10 text-foreground'
                  : 'border-border bg-background hover:bg-muted/30'
              }`}
            >
              Villes
            </button>
          </div>
        </div>

        <Separator className="my-5" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((z) => (
            <Link key={z.href} href={z.href} className="group block">
              <Card className="h-full rounded-2xl transition hover:bg-muted/30">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-3 text-base">
                    <span className="line-clamp-1">{z.name}</span>
                    <ArrowRight className="h-4 w-4 opacity-60 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">
                      {z.kind === 'departement'
                        ? 'Département — Île-de-France'
                        : 'Zone locale'}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      {z.kind === 'departement' ? 'IDF' : 'Ville'}
                    </Badge>
                    {z.code ? <Badge variant="outline">{z.code}</Badge> : null}
                    <Badge variant="outline" className="opacity-80">
                      Voir la page
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-border bg-muted/10 p-5 text-sm text-muted-foreground">
            Aucun résultat. Essayez avec un code département (ex :{' '}
            <strong>92</strong>) ou une ville (ex : <strong>Nanterre</strong>).
          </div>
        ) : null}
      </div>
    </div>
  );
}
