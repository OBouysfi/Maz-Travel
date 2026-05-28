'use client';

import AdminCRUD from '@/components/admin/AdminCRUD';

export default function AdminTestimonials() {
  return (
    <>
      <AdminCRUD
        endpoint="/testimonials"
        title="Témoignages"
        displayFields={['name', 'country', 'rating', 'language', 'featured']}
        fields={[
          { key: 'name', label: 'Nom' },
          { key: 'country', label: 'Pays' },
          { key: 'flag', label: 'Drapeau (emoji)' },
          { key: 'rating', label: 'Note (1-5)', type: 'number' },
          { key: 'language', label: 'Langue', type: 'select', options: ['fr', 'en', 'es'] },
          { key: 'comment', label: 'Commentaire', type: 'textarea', col: 2 },
          { key: 'featured', label: 'En vedette', type: 'checkbox' },
          { key: 'active', label: 'Actif', type: 'checkbox' },
        ]}
      />
    </>
  );
}
