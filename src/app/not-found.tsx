import { Button } from '@/components/ui/button';
import { Frown } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center min-h-[60vh]">
      <Frown className="w-24 h-24 text-primary opacity-50 mb-4" />
      <h1 className="text-6xl font-bold font-headline text-primary">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page non trouvée</h2>
      <p className="mt-2 text-muted-foreground max-w-sm">
        Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Button asChild className="mt-8" size="lg">
        <Link href="/">Retour à l'accueil</Link>
      </Button>
    </div>
  );
}
