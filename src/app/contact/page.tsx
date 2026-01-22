import type { Metadata } from 'next';
import ContactPageClient from '@/components/contact/page-client';

export const metadata: Metadata = {
  title: 'Contactez-Nous - Basic Protection Privée',
  description: 'Prenez contact avec nos experts en sécurité. Nous sommes disponibles pour répondre à vos questions et analyser vos besoins. Joignez-nous par téléphone, email ou via notre formulaire.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
