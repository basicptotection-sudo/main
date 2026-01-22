export const siteConfig = {
  name: "Basic Protection Privée",
  description:
    "Solutions professionnelles de sécurité privée, surveillance et gardiennage pour entreprises et particuliers à Plaisir (78) et en Île-de-France. Protégez vos biens et vos équipes avec des agents qualifiés.",
  url: "https://basic-protection.com",
  ogImage: "/brand/og.png",

  contact: {
    email: "contact@basic-protection.com",
    phone: "06 77 93 28 31",
    phoneE164: "+33677932831",
  },

  links: {
    // Mets uniquement les liens réels. Sinon, laisse vide.
    twitter: "",
    facebook: "",
    linkedin: "",
  },

  business: {
    name: "Basic Protection Privée",

    address: {
      street: "5 Rue des Frères Lumière",
      city: "Plaisir",
      postalCode: "78370",
      region: "Île-de-France",
      country: "France",
      countryCode: "FR",
    },

    // À renseigner uniquement si tu es sûr
    foundingDate: "", // ex: "2010-01-01"
    vatID: "",        // ex: "FRXXXXXXXXXXX"

    areaServed: [
      "Plaisir",
      "Yvelines (78)",
      "Île-de-France",
       "Paris",
       "Hauts-de-Seine",
       "Seine-Saint-Denis",
       "Val-de-Marne",
       "essonne",
       "Seine-et-Marne",
       "Val d'Oise",
    ],

    telephone: "+33677932831",
    email: "basic.protect@gmail.com",

    // Mets des horaires vrais (ou laisse vide)
    openingHours: "Mo-Fr 09:00-18:00"
  },
} as const;

export type SiteConfig = typeof siteConfig;
