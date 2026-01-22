import type { Metadata } from 'next';
import DevisPageClient from '@/components/devis/page-client';

export const metadata: Metadata = {
  title: 'Demande de Devis - Sécurité Privée',
  description: 'Obtenez une proposition sur-mesure pour nos services de sécurité privée. Remplissez notre formulaire pour une analyse confidentielle de vos besoins.',
  alternates: {
    canonical: '/devis',
  },
};

export default function DevisPage() {
  return <DevisPageClient />;
}
