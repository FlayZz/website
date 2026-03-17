import { MetadataRoute } from 'next';

// Toutes les villes avec leurs départements
const cityData: Record<string, { name: string; dept: string }> = {
  // Ille-et-Vilaine (35)
  'rennes': { name: 'Rennes', dept: '35' },
  'cesson-sevigne': { name: 'Cesson-Sévigné', dept: '35' },
  'saint-malo': { name: 'Saint-Malo', dept: '35' },
  'pace': { name: 'Pacé', dept: '35' },
  'bruz': { name: 'Bruz', dept: '35' },
  'saint-gregoire': { name: 'Saint-Grégoire', dept: '35' },
  'fougeres': { name: 'Fougères', dept: '35' },
  'vitre': { name: 'Vitré', dept: '35' },
  'chantepie': { name: 'Chantepie', dept: '35' },
  'bethune': { name: 'Béthune', dept: '35' },
  'vern-sur-seiche': { name: 'Vern-sur-Seiche', dept: '35' },
  'le-rheu': { name: 'Le Rheu', dept: '35' },
  'miniac-morvan': { name: 'Miniac-Morvan', dept: '35' },
  
  // Finistère (29)
  'brest': { name: 'Brest', dept: '29' },
  'quimper': { name: 'Quimper', dept: '29' },
  'concarneau': { name: 'Concarneau', dept: '29' },
  'morlaix': { name: 'Morlaix', dept: '29' },
  'douarnenez': { name: 'Douarnenez', dept: '29' },
  'guimiliau': { name: 'Guimiliau', dept: '29' },
  'landerneau': { name: 'Landerneau', dept: '29' },
  'fouesnant': { name: 'Fouesnant', dept: '29' },
  'plougonvelin': { name: 'Plougonvelin', dept: '29' },
  'crozon': { name: 'Crozon', dept: '29' },
  'pont-l-abbe': { name: 'Pont-l\'Abbé', dept: '29' },
  'guipavas': { name: 'Guipavas', dept: '29' },
  
  // Morbihan (56)
  'vannes': { name: 'Vannes', dept: '56' },
  'lorient': { name: 'Lorient', dept: '56' },
  'lanester': { name: 'Lanester', dept: '56' },
  'ploemeur': { name: 'Ploemeur', dept: '56' },
  'hennebont': { name: 'Hennebont', dept: '56' },
  'auray': { name: 'Auray', dept: '56' },
  'saint-ave': { name: 'Saint-Avé', dept: '56' },
  'guidel': { name: 'Guidel', dept: '56' },
  'questembert': { name: 'Questembert', dept: '56' },
  'pontivy': { name: 'Pontivy', dept: '56' },
  
  // Côtes-d'Armor (22)
  'saint-brieuc': { name: 'Saint-Brieuc', dept: '22' },
  'lannion': { name: 'Lannion', dept: '22' },
  'guingamp': { name: 'Guingamp', dept: '22' },
  'dinan': { name: 'Dinan', dept: '22' },
  'ploufragan': { name: 'Ploufragan', dept: '22' },
  'lamballe': { name: 'Lamballe', dept: '22' },
  'plouguenast': { name: 'Plouguenast', dept: '22' },
  'perros-guirec': { name: 'Perros-Guirec', dept: '22' },
  'tregastel': { name: 'Trégastel', dept: '22' },
  'begard': { name: 'Bégard', dept: '22' },
  
  // Loire-Atlantique (44)
  'nantes': { name: 'Nantes', dept: '44' },
  'saint-nazaire': { name: 'Saint-Nazaire', dept: '44' },
  'reze': { name: 'Rezé', dept: '44' },
  'saint-herblain': { name: 'Saint-Herblain', dept: '44' },
  'vertou': { name: 'Vertou', dept: '44' },
  'coueron': { name: 'Couëron', dept: '44' },
  'orvault': { name: 'Orvault', dept: '44' },
  'carquefou': { name: 'Carquefou', dept: '44' },
  'bouguenais': { name: 'Bouguenais', dept: '44' },
  'la-chapelle-sur-erdre': { name: 'La Chapelle-sur-Erdre', dept: '44' },
  'pontchateau': { name: 'Pont-Château', dept: '44' },
  
  // Mayenne (53)
  'laval': { name: 'Laval', dept: '53' },
  'chateau-gontier': { name: 'Château-Gontier', dept: '53' },
  'mayenne': { name: 'Mayenne', dept: '53' },
  'evron': { name: 'Évron', dept: '53' },
  'coulaines': { name: 'Coulaines', dept: '53' },
  'change': { name: 'Changé', dept: '53' },
};

const BASE_URL = 'https://serruaccess.fr';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${BASE_URL}/devis`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/zones-intervention`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/mentions-legales`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  const cityPages = Object.entries(cityData).map(([slug, data]) => ({
    url: `${BASE_URL}/serrurier/${data.dept}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...cityPages];
}
