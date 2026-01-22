
export type City = {
    slug: string;
    title: string;
    department: string;
    focus: ('luxe' | 'bureaux' | 'chantiers' | 'logistique' | 'événementiel' | 'résidentiel' | 'tech')[];
    keywords: string[];
};

export const citiesData: City[] = [
    // Yvelines (78)
    { slug: 'plaisir-78370', title: 'Sécurité Privée Plaisir', department: 'Yvelines (78)', focus: ['bureaux', 'résidentiel'], keywords: ['sécurité plaisir', 'gardiennage plaisir'] },
    { slug: 'versailles-78000', title: 'Sécurité Privée Versailles', department: 'Yvelines (78)', focus: ['résidentiel', 'événementiel'], keywords: ['sécurité versailles', 'gardiennage versailles'] },
    { slug: 'saint-germain-en-laye-78100', title: 'Sécurité Privée Saint-Germain-en-Laye', department: 'Yvelines (78)', focus: ['résidentiel', 'luxe'], keywords: ['sécurité saint-germain-en-laye'] },
    { slug: 'montigny-le-bretonneux-78180', title: 'Sécurité Privée Montigny-le-Bretonneux', department: 'Yvelines (78)', focus: ['bureaux', 'tech'], keywords: ['sécurité montigny', 'gardiennage SQY'] },

    // Paris (75)
    { slug: 'paris-8-75008', title: 'Sécurité Privée Paris 8ème', department: 'Paris (75)', focus: ['luxe', 'bureaux', 'événementiel'], keywords: ['sécurité paris 8', 'gardiennage champs-élysées'] },
    { slug: 'paris-16-75016', title: 'Sécurité Privée Paris 16ème', department: 'Paris (75)', focus: ['résidentiel', 'luxe'], keywords: ['sécurité paris 16', 'gardiennage passy'] },

    // Hauts-de-Seine (92)
    { slug: 'la-defense-92400', title: 'Sécurité Privée La Défense', department: 'Hauts-de-Seine (92)', focus: ['bureaux', 'tech'], keywords: ['sécurité la défense', 'sûreté IGH'] },
    { slug: 'neuilly-sur-seine-92200', title: 'Sécurité Privée Neuilly-sur-Seine', department: 'Hauts-de-Seine (92)', focus: ['résidentiel', 'bureaux', 'luxe'], keywords: ['sécurité neuilly', 'gardiennage neuilly'] },
    { slug: 'boulogne-billancourt-92100', title: 'Sécurité Privée Boulogne-Billancourt', department: 'Hauts-de-Seine (92)', focus: ['bureaux', 'résidentiel'], keywords: ['sécurité boulogne', 'gardiennage 92100'] },

    // Seine-Saint-Denis (93)
    { slug: 'saint-denis-93200', title: 'Sécurité Privée Saint-Denis', department: 'Seine-Saint-Denis (93)', focus: ['chantiers', 'événementiel'], keywords: ['sécurité saint-denis', 'gardiennage 93'] },
    { slug: 'aubervilliers-93300', title: 'Sécurité Privée Aubervilliers', department: 'Seine-Saint-Denis (93)', focus: ['logistique', 'chantiers'], keywords: ['sécurité aubervilliers', 'gardiennage entrepôt 93'] },
    
    // Val-de-Marne (94)
    { slug: 'rungis-94150', title: 'Sécurité Privée Rungis', department: 'Val-de-Marne (94)', focus: ['logistique'], keywords: ['sécurité rungis', 'gardiennage MIN rungis'] },
    { slug: 'creteil-94000', title: 'Sécurité Privée Créteil', department: 'Val-de-Marne (94)', focus: ['bureaux', 'résidentiel'], keywords: ['sécurité créteil', 'gardiennage 94'] },

    // Essonne (91)
    { slug: 'saclay-91400', title: 'Sécurité Privée Saclay', department: 'Essonne (91)', focus: ['tech', 'bureaux'], keywords: ['sécurité saclay', 'gardiennage campus'] },
    { slug: 'massy-91300', title: 'Sécurité Privée Massy', department: 'Essonne (91)', focus: ['bureaux', 'tech', 'logistique'], keywords: ['sécurité massy', 'gardiennage 91'] },
];
