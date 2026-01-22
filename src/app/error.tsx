'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center min-h-[60vh]">
       <AlertTriangle className="w-24 h-24 text-destructive opacity-50 mb-4" />
      <h1 className="text-3xl font-bold font-headline text-primary">
        Une erreur est survenue
      </h1>
      <p className="mt-2 text-muted-foreground max-w-sm">
        Quelque chose s'est mal passé. Veuillez réessayer.
      </p>
      <Button onClick={() => reset()} className="mt-8" size="lg">
        Réessayer
      </Button>
    </div>
  );
}
