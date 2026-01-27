
import type { Metadata } from 'next';
import Link from 'next/link';

import { siteConfig } from '@/lib/config';
import { Breadcrumbs } from '@/components/shared';

export const metadata: Metadata = {
  title: 'Mentions Légales',
  description: `Informations légales concernant le site de ${siteConfig.name}.`,
  alternates: {
    canonical: '/mentions-legales',
  },
  robots: {
    index: false,
  }
};

export default function MentionsLegalesPage() {
  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Mentions Légales', href: '/mentions-legales' },
  ];

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="prose prose-lg dark:prose-invert max-w-none mt-6">
          <h1 className="text-primary">Mentions Légales</h1>

          <p>Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique, il est précisé aux utilisateurs du site {siteConfig.url} l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.</p>

          <h2>Éditeur du site</h2>
          <p>Le présent site, accessible à l’URL {siteConfig.url}, est édité par :</p>
          <ul>
            <li><strong>Dénomination sociale :</strong> BASIC PROTECTION PRIVEE</li>
            <li><strong>Forme juridique :</strong> SASU, société par actions simplifiée unipersonnelle</li>
            <li><strong>Capital social :</strong> 1 000,00 €</li>
            <li><strong>Siège social :</strong> ZI DES EBISOIRES, 5 RUE DES FRERES LUMIERE, 78370 PLAISIR</li>
            <li><strong>Numéro SIRET :</strong> 849 659 727 00010</li>
            <li><strong>RCS :</strong> 849 659 727 R.C.S. Versailles</li>
            <li><strong>Numéro de TVA intracommunautaire :</strong> FR01849659727</li>
            <li><strong>Code APE :</strong> 80.10Z - Activités de sécurité privée</li>
            <li><strong>Directeur de la publication :</strong> Khalfouni Abdennour</li>
            <li><strong>Contact :</strong> <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> - <a href={`tel:${siteConfig.contact.phoneE164}`}>{siteConfig.contact.phone}</a></li>
          </ul>

          <h2>Hébergement</h2>
          <p>Le site est hébergé par Google Firebase (App Hosting), service de Google Ireland Limited, dont le siège social est situé à Gordon House, Barrow Street, Dublin 4, Irlande.</p>

          <h2>Création du site</h2>
          <p>Le site a été créé par Amar Hachour.</p>

          <h2>Propriété intellectuelle</h2>
          <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>
          <p>Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de la société BASIC PROTECTION PRIVEE.</p>

          <h2>Données personnelles</h2>
          <p>Le traitement de vos données à caractère personnel est régi par notre <Link href="/politique-de-confidentialite">Politique de Confidentialité</Link> conformément au Règlement Général sur la Protection des Données (RGPD) 2016/679 du 27 avril 2016.</p>
          
          <h2>Responsabilité</h2>
          <p>BASIC PROTECTION PRIVEE décline toute responsabilité quant à l’éventuelle inexactitude ou non-exhaustivité des informations présentes sur ce site. La société se réserve le droit de corriger, à tout moment et sans préavis, le contenu de ce site.</p>
        </div>
      </div>
    </div>
  );
}
