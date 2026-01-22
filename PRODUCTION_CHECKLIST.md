# Checklist de Mise en Production

Avant de déployer votre application en production, parcourez cette liste pour vous assurer que tout est en ordre.

## ✅ SEO (Référencement Naturel)

- [ ] **Titres & Méta-descriptions** : Chaque page a une balise `<title>` unique et une `meta description` pertinente.
- [ ] **Structure des titres (H1, H2...)** : Chaque page a un seul `<h1>`. La hiérarchie des `<h2>`, `<h3>`, etc., est logique.
- [ ] **Données Structurées (JSON-LD)** : Les schémas (`Article`, `Service`, `LocalBusiness`, etc.) sont valides et déployés. Utilisez le [Rich Results Test](https://search.google.com/test/rich-results) de Google pour vérifier.
- [ ] **`robots.txt`** : Le fichier est configuré pour autoriser l'exploration des pages importantes et bloquer les zones non pertinentes (`/merci`, admin, etc.).
- [ ] **`sitemap.xml`** : Le sitemap est généré, à jour, et soumis dans la Google Search Console.
- [ ] **URL Canoniques** : La balise `<link rel="canonical">` est présente sur toutes les pages pour éviter le contenu dupliqué.
- [ ] **Alt-text des images** : Toutes les images importantes pour le contenu ont un texte alternatif descriptif.

## ⚡️ Performance

- [ ] **Optimisation des images** : `next/image` est utilisé pour toutes les images. Les formats modernes (WebP) sont servis automatiquement.
- [ ] **Lazy Loading** : Les images et composants "sous la ligne de flottaison" sont chargés en différé. `next/image` le fait par défaut.
- [ ] **Minification CSS/JS** : Le build de production de Next.js s'en charge automatiquement.
- [ ] **Mise en cache** : La stratégie de mise en cache (ISR, SSG, SSR) est adaptée à chaque type de page.
- [ ] **Taille du bundle** : Analysez le bundle (`@next/bundle-analyzer`) pour identifier les dépendances lourdes qui pourraient être optimisées.

## ♿️ Accessibilité (a11y)

- [ ] **Contraste des couleurs** : Les textes ont un contraste suffisant avec leur arrière-plan.
- [ ] **Navigation au clavier** : Le site est entièrement utilisable avec le clavier uniquement. L'ordre de focus est logique.
- [ ] **Labels et ARIA** : Les éléments de formulaire ont des `<label>`. Les attributs ARIA sont utilisés lorsque la sémantique HTML n'est pas suffisante.
- [ ] **Sémantique HTML** : Utilisation correcte des balises sémantiques (`<nav>`, `<main>`, `<aside>`, `<footer>`, etc.).

## 🔒 Sécurité

- [ ] **Règles de Sécurité Firestore** : Les règles sont restrictives (`allow read, write: if false;` par défaut) et n'autorisent que les opérations nécessaires. **Ne jamais faire confiance au client.**
- [ ] **Validation des données** : Toutes les entrées utilisateur (formulaires) sont validées côté client et **côté serveur**.
- [ ] **Variables d'environnement** : Les clés d'API, secrets et autres informations sensibles sont stockées dans des variables d'environnement (`.env.local`) et ne sont pas exposées côté client.
- [ ] **Protection contre le spam** : Des mesures comme un champ "honeypot" ou un service comme reCAPTCHA sont en place sur les formulaires publics.

## ⚙️ Déploiement & Maintenance

- [ ] **Variables d'environnement de production** : Les variables (`.env.production.local` ou via l'interface d'hébergement) sont correctement configurées pour l'environnement de production.
- [ ] **Logs** : Un système de journalisation est en place pour surveiller les erreurs en production.
- [ ] **Analytics** : Le suivi analytique (ex: Vercel Analytics, Google Analytics) est configuré pour suivre le trafic et les conversions.
- [ ] **Tests** : Des tests de base (navigation, soumission de formulaire) ont été effectués manuellement sur l'environnement de production après déploiement.

---
En suivant cette checklist, vous réduisez les risques de problèmes post-lancement et vous vous assurez d'offrir une expérience utilisateur de haute qualité.
