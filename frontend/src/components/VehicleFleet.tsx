'use client';

import { useTranslations } from 'next-intl';

export interface Vehicle {
  id: number;
  name: string;
  type: string;
  capacity: number;
  capacityLabel?: string | null;
  pricePerDayMad: number;
  pricePerDayEur: number | null;
  image: string;
}

interface VehicleFleetProps {
  vehicles: Vehicle[];
  onSelect: (vehicle: Vehicle) => void;
  title?: string;
  showCount?: boolean;
}

export default function VehicleFleet({ vehicles, onSelect, title, showCount = true }: VehicleFleetProps) {
  const t = useTranslations('transfersPage');

  return (
    <section className="py-16 lg:py-20 bg-ink-50">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-ink-900 mb-3">{title || t('fleet')}</h2>

        {showCount && (
          <p className="text-sm text-ink-500 mb-6">{vehicles.length} véhicules disponibles</p>
        )}

        <div className="space-y-4">
          {vehicles.map((v) => (
            <div key={v.id} className="bg-white rounded-2xl shadow-sm border border-ink-100 p-5 flex items-center gap-5 hover:border-brand-300 hover:shadow-md transition-all group">
              <div className="w-28 h-20 rounded-xl overflow-hidden bg-ink-100 shrink-0">
                <img src={v.image} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80'; }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-bold text-ink-900">{v.name}</h3>
                  <span className="text-xs bg-ink-100 text-ink-500 px-2 py-0.5 rounded-full capitalize">{v.type}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-ink-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    1 à {v.capacityLabel || `${v.capacity} passagers`}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 16.5H2l4-8 4 2 2-6 2 6 4-2 4 8z"/></svg>
                    Climatisé
                  </span>
                  <span className="flex items-center gap-1 text-green-600">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20 6 9 17 4 12"/></svg>
                    60 min d'attente gratuite
                  </span>
                  <span className="flex items-center gap-1 text-green-600">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="20 6 9 17 4 12"/></svg>
                    Annulation gratuite 12h avant
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-2xl font-bold text-ink-900">{v.pricePerDayMad.toLocaleString()} MAD</div>
                <div className="text-xs text-ink-400 mb-3">Prix total TTC</div>
                <button onClick={() => onSelect(v)}
                  className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-2.5 rounded-full transition shadow-md shadow-brand-600/20 text-sm">
                  Réserver maintenant
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}