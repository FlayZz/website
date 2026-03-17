import Link from 'next/link';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('@/components/LeafletMap'), { ssr: false });

// Department names
const deptNames: Record<string, string> = {
  '35': 'Ille-et-Vilaine',
  '29': 'Finistère',
  '56': 'Morbihan',
  '22': 'Côtes-d\'Armor',
  '44': 'Loire-Atlantique',
  '53': 'Mayenne',
};

// Données complètes pour le SEO - toutes les villes bretonnes
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
  'saint-avé': { name: 'Saint-Avé', dept: '56' },
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

export async function generateStaticParams() {
  const params = [];
  const depts = ['35', '29', '22', '56', '44', '53'];
  
  for (const [slug, data] of Object.entries(cityData)) {
    params.push({ departement: data.dept, ville: slug });
  }
  return params;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { departement: string; ville: string } }): Promise<Metadata> {
  const city = cityData[params.ville] || { name: params.ville, dept: params.departement };
  const deptName = deptNames[city.dept] || city.dept;
  
  const title = `Serrurier ${city.name} (${city.dept}) | Intervention rapide 24h/24 - SerruAccess`;
  const description = `Serrurier professionnel à ${city.name} et ${deptName}. Intervention d'urgence 24h/24, moins de 30 minutes. Devis gratuit. Certified A2P.`;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'fr_FR',
      siteName: 'SerruAccess',
    },
    alternates: {
      canonical: `https://serruaccess.fr/serrurier/${city.dept}/${params.ville}`,
    },
  };
}

export default function CityPage({ params }: { params: { departement: string; ville: string } }) {
  const city = cityData[params.ville] || { name: params.ville, dept: params.departement };

  return (
    <main className="min-h-screen pt-24 pb-12 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-brand-accent">Accueil</Link>
            <span>/</span>
            <Link href="/serrurier" className="hover:text-brand-accent">Serrurier</Link>
            <span>/</span>
            <span className="text-zinc-900 dark:text-white font-medium">{city.name}</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-brand-gold dark:text-white">
            Serrurier <span className="text-brand-accent">{city.name}</span> - Dépannage Urgence 24h/24
          </h1>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Besoin d&apos;un serrurier professionnel à <strong>{city.name}</strong> ({city.dept}) ? 
                SerruAccess intervient en moins de 30 minutes pour toutes vos urgences : ouverture de porte claquée, 
                remplacement de serrure après effraction ou perte de clés.
              </p>
              
              <div className="texture-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-brand-gold dark:text-brand-accent">Nos Garanties à {city.name}</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">✅ Devis gratuit et sans surprise</li>
                  <li className="flex items-center gap-2">✅ Déplacement en moins de 30 min</li>
                  <li className="flex items-center gap-2">✅ Matériel certifié assurance</li>
                  <li className="flex items-center gap-2">✅ Travail soigné et garanti</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="tel:0299000000" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-brand-accent text-white text-brand-gold font-bold rounded-full hover:scale-105 transition-transform"
                >
                  Appeler le 02 99 00 00 00
                </a>
                <Link 
                  href="/devis" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-brand-gold text-white font-bold rounded-full hover:bg-brand-gold-hover transition-colors"
                >
                  Demander un devis
                </Link>
              </div>
            </div>

            <div className="sticky top-24">
              <h3 className="text-lg font-semibold mb-4 text-center">Zone d&apos;intervention : {city.name} et environs</h3>
              <LeafletMap />
            </div>
          </div>
        </div>

        {/* Localized Footer/Links */}
        <section className="mt-24 pt-12 border-t border-gray-200 dark:border-zinc-800">
          <h2 className="text-2xl font-bold mb-8">Villes à proximité de {city.name}</h2>
          <div className="flex flex-wrap gap-3">
            {Object.entries(cityData)
              .filter(([_, d]) => d.dept === city.dept && d.name !== city.name)
              .map(([slug, d]) => (
                <Link 
                  key={slug} 
                  href={`/serrurier/${d.dept}/${slug}`}
                  className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 rounded-lg text-sm hover:bg-brand-accent text-white hover:text-brand-gold transition-colors"
                >
                  Serrurier {d.name}
                </Link>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}
