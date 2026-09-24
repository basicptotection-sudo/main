
import type { Metadata } from 'next';
import Link from 'next/link';

import { siteConfig } from '@/lib/config';
import { LegalPage } from '@/components/legal/legal-page';

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
  const sections = [
    { id: "privacy-1", title: "Responsable du traitement", content: <>
<p>Le responsable du traitement des données personnelles est :</p>
          <ul>
            <li><strong>Dénomination sociale :</strong> {siteConfig.business.name}</li>
            <li><strong>Adresse :</strong> {siteConfig.business.address.street}, {siteConfig.business.address.postalCode} {siteConfig.business.address.city}</li>
            <li><strong>Contact :</strong> <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a></li>
          </ul>
    </> },
    { id: "privacy-2", title: "Données personnelles collectées", content: <>
<p>Nous collectons les données que vous nous fournissez directement, notamment via nos formulaires de contact et de demande de devis :</p>
          <ul>
            <li><strong>Données d'identification :</strong> Nom, prénom.</li>
            <li><strong>Données de contact :</strong> Adresse e-mail, numéro de téléphone.</li>
            <li><strong>Données professionnelles (optionnel) :</strong> Nom de votre société.</li>
            <li><strong>Données relatives à votre demande :</strong> Nature du service souhaité, message, et toute autre information que vous choisissez de nous communiquer.</li>
          </ul>
          <p>Nous collectons également des données de manière automatique lorsque vous naviguez sur notre site, telles que votre adresse IP, les données de connexion et de navigation, à des fins de sécurité et d'amélioration de notre service.</p>
    </> },
    { id: "privacy-3", title: "Finalités du traitement", content: <>
<p>Vos données personnelles sont collectées et traitées pour les finalités suivantes :</p>
          <ul>
            <li>Répondre à vos demandes de contact, de renseignements ou de devis.</li>
            <li>Gérer la relation commerciale qui peut découler de votre demande.</li>
            <li>Assurer la sécurité de notre site web et prévenir la fraude.</li>
            <li>Réaliser des statistiques anonymes de fréquentation pour améliorer notre site.</li>
          </ul>
    </> },
    { id: "privacy-4", title: "Base légale du traitement", content: <>
<p>Le traitement de vos données est fondé sur :</p>
          <ul>
            <li>Votre <strong>consentement</strong>, que vous donnez en cochant la case prévue à cet effet avant de soumettre un formulaire.</li>
            <li>L'exécution de <strong>mesures précontractuelles</strong> prises à votre demande (ex: établissement d'un devis).</li>
            <li>Notre <strong>intérêt légitime</strong> à assurer la sécurité de notre site et à améliorer nos services.</li>
          </ul>
    </> },
    { id: "privacy-5", title: "Durée de conservation", content: <>
<p>Nous conservons vos données pour une durée n'excédant pas celle nécessaire aux finalités pour lesquelles elles sont traitées :</p>
          <ul>
            <li><strong>Pour les demandes de devis et de contact :</strong> 3 ans à compter du dernier contact avec vous si aucune suite commerciale n'est donnée.</li>
            <li><strong>En cas de relation contractuelle :</strong> pendant toute la durée de la relation commerciale, puis archivées pour la durée légale de prescription (généralement 5 ans en matière commerciale).</li>
          </ul>
    </> },
    { id: "privacy-6", title: "Destinataires des données", content: <>
<p>Vos données sont traitées en interne par notre personnel habilité. Elles peuvent être transmises à nos prestataires techniques, notamment notre hébergeur (Google Firebase), dans le strict respect de leurs missions et de la confidentialité requise.</p>
          <p>Nous ne vendons ni ne louons vos données personnelles à des tiers à des fins de marketing.</p>
    </> },
    { id: "privacy-7", title: "Vos droits", content: <>
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
    </> },
    { id: "privacy-8", title: "Cookies", content: <>
<p>Notre site est susceptible d'utiliser des cookies pour améliorer votre expérience de navigation et mesurer l'audience. Pour plus d'informations, veuillez consulter notre future page de gestion des cookies.</p>
    </> },
    { id: "privacy-9", title: "Sécurité", content: <>
<p>Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles contre toute destruction, perte, altération, divulgation ou accès non autorisé.</p>
    </> },
    { id: "privacy-10", title: "Modification de la politique de confidentialité", content: <>
<p>Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Nous vous encourageons à la consulter régulièrement. La date de dernière mise à jour sera toujours indiquée en haut de cette page.</p>
    </> },
  ];
  return <LegalPage kind="privacy" introduction={<>
<p>
            La société {siteConfig.name} (ci-après "nous", "notre", "nos"), attache une grande importance à la protection de vos données personnelles. Cette politique de confidentialité a pour but de vous informer sur la manière dont nous collectons, utilisons et protégeons vos données dans le cadre de l'utilisation de notre site web {siteConfig.url}.
          </p>
  </>} sections={sections} />;
}
