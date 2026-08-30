import PageHeader from '@/components/layout/PageHeader';

export const metadata = { title: 'Conditions Générales de Vente' };

export default function CgvPage() {
  return (
    <>
      <PageHeader title="Conditions Générales de Vente" subtitle="" badge="Légal" />
      <section className="py-16 bg-white">
        <div className="container max-w-3xl text-ink-700 space-y-6 text-sm leading-relaxed">
          <div><h2 className="text-xl font-bold text-ink-900 mb-2">1. Objet</h2>
          <p>Les présentes conditions régissent les prestations de transport touristique privé, transferts, excursions et mise à disposition de véhicule avec chauffeur proposées par Maz Travel.</p></div>
          <div><h2 className="text-xl font-bold text-ink-900 mb-2">2. Réservation</h2>
          <p>Toute réservation est confirmée après validation par Maz Travel par email ou WhatsApp. Une réservation n'est ferme qu'après cette confirmation.</p></div>
          <div><h2 className="text-xl font-bold text-ink-900 mb-2">3. Tarifs</h2>
          <p>Les prix sont indiqués en dirhams marocains (MAD). Le tarif affiché est garanti à la confirmation de la réservation.</p></div>
          <div><h2 className="text-xl font-bold text-ink-900 mb-2">4. Paiement</h2>
          <p>Le paiement s'effectue selon les modalités convenues lors de la confirmation : acompte en ligne et/ou solde sur place.</p></div>
          <div><h2 className="text-xl font-bold text-ink-900 mb-2">5. Annulation</h2>
          <p>Annulation gratuite jusqu'à 24h avant le départ.</p></div>
          <div><h2 className="text-xl font-bold text-ink-900 mb-2">6. Responsabilité</h2>
          <p>Maz Travel s'engage à fournir un service ponctuel et sécurisé. Sa responsabilité ne saurait être engagée en cas de force majeure (conditions météo, blocages routiers, etc.).</p></div>
          <div><h2 className="text-xl font-bold text-ink-900 mb-2">7. Droit applicable</h2>
          <p>Les présentes conditions sont soumises au droit marocain. Tout litige relève des tribunaux compétents de Marrakech.</p></div>
        </div>
      </section>
    </>
  );
}