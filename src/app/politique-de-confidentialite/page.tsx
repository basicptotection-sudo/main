
import type { Metadata } from 'next';
import Link from 'next/link';

import { siteConfig } from '@/lib/config';
import { Breadcrumbs } from '@/components/shared';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité',
  description: `Découvrez comment ${siteConfig.name} collecte, utilise et protège vos données personnelles.`,
  alternates: {
    canonical: '/politique-de-confidentialite',
  },
  robots: {
    index: false,
  }
};

export default function PolitiqueDeConfidentialitePage() {
  const breadcrumbItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Politique de Confidentialité', href: '/politique-de-confidentialite' },
  ];

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="prose prose-lg dark:prose-invert max-w-none mt-6">
          <h1 className="text-primary">Politique de Confidentialité</h1>

          <p>Dernière mise à jour : 25 Mai 2024</p>
          <p>
            La société {siteConfig.name} (ci-après "nous", "notre", "nos"), attache une grande importance à la protection de vos données personnelles. Cette politique de confidentialité a pour but de vous informer sur la manière dont nous collectons, utilisons et protégeons vos données dans le cadre de l'utilisation de notre site web {siteConfig.url}.
          </p>

          <h2>1. Responsable du traitement</h2>
          <p>Le responsable du traitement des données personnelles est :</p>
          <ul>
            <li><strong>Dénomination sociale :</strong> {siteConfig.business.name}</li>
            <li><strong>Adresse :</strong> {siteConfig.business.address.street}, {siteConfig.business.address.postalCode} {siteConfig.business.address.city}</li>
            <li><strong>Contact :</strong> <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a></li>
          </ul>

          <h2>2. Données personnelles collectées</h2>
          <p>Nous collectons les données que vous nous fournissez directement, notamment via nos formulaires de contact et de demande de devis :</p>
          <ul>
            <li><strong>Données d'identification :</strong> Nom, prénom.</li>
            <li><strong>Données de contact :</strong> Adresse e-mail, numéro de téléphone.</li>
            <li><strong>Données professionnelles (optionnel) :</strong> Nom de votre société.</li>
            <li><strong>Données relatives à votre demande :</strong> Nature du service souhaité, message, et toute autre information que vous choisissez de nous communiquer.</li>
          </ul>
          <p>Nous collectons également des données de manière automatique lorsque vous naviguez sur notre site, telles que votre adresse IP, les données de connexion et de navigation, à des fins de sécurité et d'amélioration de notre service.</p>
          
          <h2>3. Finalités du traitement</h2>
          <p>Vos données personnelles sont collectées et traitées pour les finalités suivantes :</p>
          <ul>
            <li>Répondre à vos demandes de contact, de renseignements ou de devis.</li>
            <li>Gérer la relation commerciale qui peut découler de votre demande.</li>
            <li>Assurer la sécurité de notre site web et prévenir la fraude.</li>
            <li>Réaliser des statistiques anonymes de fréquentation pour améliorer notre site.</li>
          </ul>

          <h2>4. Base légale du traitement</h2>
          <p>Le traitement de vos données est fondé sur :</p>
          <ul>
            <li>Votre <strong>consentement</strong>, que vous donnez en cochant la case prévue à cet effet avant de soumettre un formulaire.</li>
            <li>L'exécution de <strong>mesures précontractuelles</strong> prises à votre demande (ex: établissement d'un devis).</li>
            <li>Notre <strong>intérêt légitime</strong> à assurer la sécurité de notre site et à améliorer nos services.</li>
          </ul>

          <h2>5. Durée de conservation</h2>
          <p>Nous conservons vos données pour une durée n'excédant pas celle nécessaire aux finalités pour lesquelles elles sont traitées :</p>
          <ul>
            <li><strong>Pour les demandes de devis et de contact :</strong> 3 ans à compter du dernier contact avec vous si aucune suite commerciale n'est donnée.</li>
            <li><strong>En cas de relation contractuelle :</strong> pendant toute la durée de la relation commerciale, puis archivées pour la durée légale de prescription (généralement 5 ans en matière commerciale).</li>
          </ul>

          <h2>6. Destinataires des données</h2>
          <p>Vos données sont traitées en interne par notre personnel habilité. Elles peuvent être transmises à nos prestataires techniques, notamment notre hébergeur (Google Firebase), dans le strict respect de leurs missions et de la confidentialité requise.</p>
          <p>Nous ne vendons ni ne louons vos données personnelles à des tiers à des fins de marketing.</p>

          <h2>7. Vos droits</h2>
          <p>Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi "Informatique et Libertés", vous disposez des droits suivants :</p>
          <ul>
            <li>Droit d'accès, de rectification, de mise à jour et de suppression de vos données.</li>
            <li>Droit à la limitation du traitement.</li>
            <li>Droit d'opposition au traitement.</li>
            <li>Droit à la portabilité de vos données.</li>
            <li>Droit de retirer votre consentement à tout moment.</li>
          </ul>
          <p>Pour exercer ces droits, vous pouvez nous contacter par e-mail à <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> ou par courrier postal à l'adresse de notre siège social.</p>
          <p>Si vous estimez que vos droits ne sont pas respectés, vous avez la possibilité d'introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés).</p>
          
          <h2>8. Cookies</h2>
          <p>Notre site est susceptible d'utiliser des cookies pour améliorer votre expérience de navigation et mesurer l'audience. Pour plus d'informations, veuillez consulter notre future page de gestion des cookies.</p>

           <h2>9. Sécurité</h2>
          <p>Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles contre toute destruction, perte, altération, divulgation ou accès non autorisé.</p>

          <h2>10. Modification de la politique de confidentialité</h2>
          <p>Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Nous vous encourageons à la consulter régulièrement. La date de dernière mise à jour sera toujours indiquée en haut de cette page.</p>

        </div>
      </div>
    </div>
  );
}
