'use client';

import AdminCRUD from '@/components/admin/AdminCRUD';

export default function AdminActivities() {
  return (
    <>
      <AdminCRUD
        endpoint="/activities"
        title="Activités"
        displayFields={['image', 'titleFr', 'category', 'duration', 'priceMad', 'featured']}
        fields={[
          { key: 'slug', label: 'Slug (URL)', col: 2 },
          { key: 'titleFr', label: 'Titre FR', col: 2 },
          { key: 'titleEn', label: 'Titre EN' },
          { key: 'titleEs', label: 'Titre ES' },
          { key: 'descriptionFr', label: 'Description FR', type: 'textarea', col: 2 },
          { key: 'descriptionEn', label: 'Description EN', type: 'textarea', col: 2 },
          { key: 'descriptionEs', label: 'Description ES', type: 'textarea', col: 2 },
          { key: 'category', label: 'Catégorie', type: 'select', options: ['marrakech', 'agafay', 'other'] },
          { key: 'duration', label: 'Durée' },
          { key: 'priceMad', label: 'Prix MAD', type: 'number' },
          { key: 'priceEur', label: 'Prix EUR', type: 'number' },
          { key: 'priceUsd', label: 'Prix USD', type: 'number' },
          { key: 'image', label: 'Image', type: 'image', col: 2 },
          { key: 'featured', label: 'En vedette', type: 'checkbox' },
          { key: 'active', label: 'Actif', type: 'checkbox' },
        ]}
      />
    </>
  );
}
