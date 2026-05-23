'use client';

import AdminShell from '@/components/admin/AdminShell';
import AdminCRUD from '@/components/admin/AdminCRUD';

export default function AdminGallery() {
  return (
    <AdminShell>
      <AdminCRUD
        endpoint="/gallery"
        title="Galerie"
        displayFields={['image', 'title', 'category', 'ord', 'active']}
        fields={[
          { key: 'title', label: 'Titre', col: 2 },
          { key: 'image', label: 'Image', type: 'image', col: 2 },
          { key: 'category', label: 'Catégorie', type: 'select', options: ['marrakech', 'desert', 'other'] },
          { key: 'ord', label: 'Ordre', type: 'number' },
          { key: 'active', label: 'Actif', type: 'checkbox' },
        ]}
      />
    </AdminShell>
  );
}
