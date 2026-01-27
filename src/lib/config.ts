export const siteConfig = {
  name: "Basic Protection Privée",
  description:
    "Société de sécurité privée à Plaisir (78) : gardiennage, surveillance, rondes, SSIAP, cynophile, protection rapprochée et sécurité événementielle en Île-de-France.",
  url: "https://www.basic-protection.fr",
  ogImage: "/brand/og.png",
  contact: {
    email: "contact@basic-protection.fr",
    phone: "06 77 93 28 31",
    phoneE164: "+33677932831",
  },
  links: {
    twitter: "https://twitter.com/basicprotection",
    facebook: "https://facebook.com/basicprotection",
    linkedin: "https://linkedin.com/company/basic-protection",
  },
  business: {
    name: "Basic Protection Privée",
    address: {
      street: "5 rue des Frères Lumière",
      city: "Plaisir",
      postalCode: "78370",
      country: "France",
    },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=5+rue+des+Frères+Lumière+78370+Plaisir",
    areaServed: ["Yvelines (78)", "Paris (75)", "Hauts-de-Seine (92)", "Seine-Saint-Denis (93)", "Val-de-Marne (94)", "Val-d'Oise (95)", "Seine-et-Marne (77)", "Essonne (91)"],
    telephone: "+33677932831",
    email: "contact@basic-protection.fr",
    openingHours: "Lundi - Vendredi : 9h00 - 18h00",
  },
};

export type SiteConfig = typeof siteConfig;
