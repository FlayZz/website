'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function MentionsLegalesPage() {
  return (
    <>
      <Header onUrgenceClick={() => {}} />
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8" style={{ color: '#1e3a5f', fontFamily: 'Space Grotesk, sans-serif' }}>
            Mentions légales
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#1e3a5f' }}>1. Éditeur du site</h2>
              <p className="text-gray-600">
                Le site SerruAccess est édité par :<br />
                <strong>SerruAccess</strong><br />
                Siège social : 15 Rue de la Motte, 35000 Rennes<br />
                Téléphone : 02 99 12 34 56<br />
                Email : contact@serruaccess.fr<br />
                SIRET : [Numéro SIRET]<br />
                RC Pro : [Numéro d assurance]
              </p>
            </section>

            <section id="confidentialite">
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#1e3a5f' }}>2. Politique de confidentialité</h2>
              <p className="text-gray-600">
                Conformément au Règlement Général sur la Protection des Données (RGPD), nous collectons uniquement les données nécessaires pour traiter vos demandes de devis et interventions. Ces données ne sont jamais revendues à des tiers. Vous pouvez exercer vos droits d accès, de rectification et de suppression en nous contactant à l adresse email ci-dessus.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#1e3a5f' }}>3. Propriété intellectuelle</h2>
              <p className="text-gray-600">
                L ensemble du contenu de ce site (textes, images, vidéos, logo) est protégé par les droits de propriété intellectuelle. Toute reproduction ou représentation sans autorisation préalable est interdite.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#1e3a5f' }}>4. Responsabilité</h2>
              <p className="text-gray-600">
                Les informations fournies sur ce site sont données à titre purement informatif. SerruAccess s efforce de mantener ces informations à jour mais ne peut garantir l exactitude des données. Les interventions et tarifs sont donnés à titre indicatif et peuvent varier selon le diagnostic sur place.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#1e3a5f' }}>5. Liens hypertextes</h2>
              <p className="text-gray-600">
                Le site peut contenir des liens vers d autres sites. SerruAccess n exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#1e3a5f' }}>6. Droit applicable</h2>
              <p className="text-gray-600">
                Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux de Rennes seront seuls compétents.
              </p>
            </section>

            <p className="text-sm text-gray-500 mt-12">
              Dernière mise à jour : Mars 2026
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
