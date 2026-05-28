'use client';

import AdminCRUD from '@/components/admin/AdminCRUD';

export default function AdminTransfers() {
  return (
    <>
      <AdminCRUD
        endpoint="/transfers"
        title="Trajets transfert"
        displayFields={['fromLoc', 'toLoc', 'duration', 'priceMad', 'active']}
        fields={[
          { key: 'fromLoc', label: 'Départ', col: 2 },
          { key: 'toLoc', label: 'Arrivée', col: 2 },
          { key: 'duration', label: 'Durée' },
          { key: 'priceMad', label: 'Prix MAD', type: 'number' },
          { key: 'priceEur', label: 'Prix EUR', type: 'number' },
          { key: 'priceUsd', label: 'Prix USD', type: 'number' },
          { key: 'active', label: 'Actif', type: 'checkbox' },
        ]}
      />
    </>
  );
}
