export const siteConfig = {
  name: "Basic Protection Privée",
  description: "Solutions professionnelles de sécurité privée, surveillance et gardiennage pour entreprises et particuliers. Protégez vos biens et vos proches avec nos agents qualifiés.",
  url: "https://www.basic-protection.com",
  ogImage: "https://www.basic-protection.com/og-image.png",
  contact: {
    email: "contact@basic-protection.com",
    phone: "01 23 45 67 89",
  },
  links: {
    twitter: "https://twitter.com/basicprotection",
    facebook: "https://facebook.com/basicprotection",
    linkedin: "https://linkedin.com/company/basic-protection",
  },
  business: {
    name: "Basic Protection Privée",
    address: {
      street: "123 Rue de la Sécurité",
      city: "Paris",
      postalCode: "75008",
      country: "France",
    },
    foundingDate: "2010-01-01",
    areaServed: ["Paris", "Île-de-France"],
    telephone: "+33123456789",
    email: "contact@basic-protection.com",
    vatID: "FR00123456789",
  }
};

export type SiteConfig = typeof siteConfig;
