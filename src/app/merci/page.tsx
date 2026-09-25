import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, ClipboardCheck, Mail, MessageSquare, Phone, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import styles from './merci.module.css';

export const metadata: Metadata = {
  title: 'Merci pour votre confiance',
  description: 'Votre demande a bien été transmise à Basic Protection Privée. Découvrez les prochaines étapes de notre échange.',
  alternates: { canonical: '/merci' },
  robots: { index: false, follow: false },
};

const steps = [
  { icon: ClipboardCheck, title: 'Nous prenons connaissance de votre demande.', text: 'Notre équipe étudie votre besoin et les précisions que vous nous avez confiées.' },
  { icon: MessageSquare, title: 'Nous revenons vers vous.', text: 'Nous vous contactons par e-mail ou par téléphone pour répondre à vos questions et préciser votre projet.' },
  { icon: ShieldCheck, title: 'Nous définissons la suite, ensemble.', text: 'Si votre projet nécessite un dispositif de sécurité, nous vous orientons vers une solution adaptée.' },
];

export default function ThankYouPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <nav aria-label="Fil d’Ariane" className={styles.breadcrumb}>
          <Link href="/">Accueil</Link><span aria-hidden="true">/</span><span>Confirmation</span>
        </nav>
        <section className={styles.confirmation} aria-labelledby="confirmation-title">
          <div className={styles.hero}>
            <div className={styles.status}><span className={styles.check}><Check size={17} aria-hidden="true" /></span> Demande transmise</div>
            <div className={styles.heroBody}>
              <p className={styles.eyebrow}>Le début de notre échange</p>
              <h1 id="confirmation-title">Merci pour<br />votre <em>confiance.</em></h1>
              <p className={styles.intro}>Votre demande a bien été enregistrée et transmise à notre équipe.</p>
              <p className={styles.description}>Vous avez fait le premier pas. Prenons maintenant le temps de construire la réponse qui vous correspond.</p>
              <Link href="/" className={styles.primary}>Retour à l’accueil <ArrowRight size={19} aria-hidden="true" /></Link>
              <Link href="/services" className={styles.secondary}>Découvrir nos expertises <ArrowUpRight size={17} aria-hidden="true" /></Link>
            </div>
            <div className={styles.signature}><span aria-hidden="true" />L’exigence de la sérénité.</div>
          </div>
          <div className={styles.next}>
            <p className={styles.eyebrow}>Et maintenant ?</p>
            <h2>Une attention particulière.<br /><em>À chaque étape.</em></h2>
            <ol className={styles.steps}>
              {steps.map(({ icon: Icon, title, text }, index) => (
                <li key={title}>
                  <div className={styles.stepIcon}><Icon size={22} strokeWidth={1.5} aria-hidden="true" /></div>
                  <div><span className={styles.stepNumber}>0{index + 1}</span><h3>{title}</h3><p>{text}</p></div>
                </li>
              ))}
            </ol>
            <p className={styles.note}><Check size={16} aria-hidden="true" />Votre demande est enregistrée : inutile de la renvoyer.</p>
          </div>
        </section>
        <aside className={styles.contact} aria-labelledby="contact-title">
          <div><p className={styles.eyebrow}>Gardons le contact</p><h2 id="contact-title">Une précision à nous apporter ?</h2><p>{siteConfig.business.openingHours}</p></div>
          <div className={styles.contactLinks}>
            <a href={`tel:${siteConfig.contact.phoneE164}`}><Phone size={18} aria-hidden="true" /><span>{siteConfig.contact.phone}</span><ArrowUpRight size={16} aria-hidden="true" /></a>
            <a href={`mailto:${siteConfig.contact.email}`}><Mail size={18} aria-hidden="true" /><span>{siteConfig.contact.email}</span><ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </aside>
      </div>
    </div>
  );
}
