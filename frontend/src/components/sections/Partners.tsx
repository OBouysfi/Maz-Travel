'use client';

const partners = ['TripAdvisor', 'Booking.com', 'GetYourGuide', 'Viator', 'Expedia', 'Airbnb', 'Hostelworld'];

export default function Partners() {
  return (
    <section className="py-12 bg-ink-50 overflow-hidden">
      <div className="container mb-8 reveal">
        <p className="text-center text-xs text-ink-500 tracking-[3px] font-semibold">— ILS NOUS FONT CONFIANCE —</p>
      </div>
      <div className="flex animate-marquee whitespace-nowrap">
        <div className="flex items-center gap-16 px-8">
          {partners.map((p) => <div key={p} className="text-2xl font-bold text-ink-400 hover:text-ink-600 transition">{p}</div>)}
        </div>
        <div className="flex items-center gap-16 px-8">
          {partners.map((p) => <div key={p + '2'} className="text-2xl font-bold text-ink-400 hover:text-ink-600 transition">{p}</div>)}
        </div>
      </div>
    </section>
  );
}
