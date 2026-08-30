import PageHeader from '@/components/layout/PageHeader';

export const metadata = { title: 'Mentions légales' };

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHeader title="Mentions légales" subtitle="" badge="Légal" />
      <section className="py-16 bg-white">
        <div className="container max-w-3xl text-ink-700 space-y-6 text-sm leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-ink-900 mb-2">Éditeur du site</h2>
            <p>
              Le site maztravel.ma est édité par Maz Travel, agence de transport touristique privé basée à Marrakech.<br />
              Adresse : Avenue Mohamed VI, Marrakech 40000, Maroc<br />
              Téléphone : +212 679 067 586<br />
              Email : contact@maztravel.ma
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-ink-900 mb-2">Propriété intellectuelle</h2>
            <p>L'ensemble des contenus présents sur ce site (textes, images, logo) sont la propriété de Maz Travel, sauf mention contraire. Toute reproduction sans autorisation préalable est interdite.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-ink-900 mb-2">Contact</h2>
            <p>Pour toute question concernant le site : contact@maztravel.ma</p>
          </div>
        </div>
      </section>
    </>
  );
}