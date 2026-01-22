import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Merci',
  description: 'Merci pour votre message. Nous vous recontacterons bientôt.',
  alternates: {
    canonical: '/merci',
  },
  robots: {
    index: false,
    follow: false,
  }
};

export default function ThankYouPage() {
  return (
    <div className="container mx-auto px-4 flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-lg w-full text-center shadow-lg">
        <CardHeader className="items-center">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <CardTitle className="text-3xl font-headline">Merci pour votre confiance !</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-lg">
            Votre message a bien été envoyé. Notre équipe reviendra vers vous dans les plus brefs délais.
          </p>
          <Button asChild className="mt-8" size="lg">
            <Link href="/">Retour à l'accueil</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
