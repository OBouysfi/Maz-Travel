import PageHeader from '@/components/layout/PageHeader';

export const metadata = { title: 'Politique de confidentialité' };

export default function ConfidentialitePage() {
  return (
    <>
      <PageHeader title="Politique de confidentialité" subtitle="" badge="Légal" />
      <section className="py-16 bg-white">
        <div className="container max-w-3xl text-ink-700 space-y-6 text-sm leading-relaxed">
          <div><h2 className="text-xl font-bold text-ink-900 mb-2">1. Données collectées</h2>
          <p>Via notre formulaire de contact, nous collectons : nom, téléphone, email, date souhaitée, nombre de personnes et message. Ces données sont nécessaires au traitement de votre demande de devis.</p></div>
          <div><h2 className="text-xl font-bold text-ink-900 mb-2">2. Utilisation</h2>
          <p>Vos données sont utilisées uniquement pour répondre à votre demande, établir un devis et organiser votre prestation. Elles ne sont jamais vendues à des tiers.</p></div>
          <div><h2 className="text-xl font-bold text-ink-900 mb-2">3. Conservation</h2>
          <p>Vos données sont conservées le temps nécessaire au traitement de votre demande et à nos obligations légales.</p></div>
          <div><h2 className="text-xl font-bold text-ink-900 mb-2">4. Cookies et mesure d'audience</h2>
          <p>Ce site utilise Google Tag Manager et des outils de mesure d'audience pour améliorer nos services. Vous pouvez configurer votre navigateur pour refuser les cookies.</p></div>
          <div><h2 className="text-xl font-bold text-ink-900 mb-2">5. Vos droits</h2>
          <p>Conformément à la loi 09-08 relative à la protection des données personnelles au Maroc, vous disposez d'un droit d'accès, de rectification et de suppression de vos données en écrivant à contact@maztravel.ma</p></div>
        </div>
      </section>
    </>
  );
}