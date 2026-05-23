'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import AdminShell from '@/components/admin/AdminShell';

const groups = [
  { title: 'Taux de change', fields: [
    { key: 'rate_eur_mad', label: '1 EUR = ? MAD' },
    { key: 'rate_usd_mad', label: '1 USD = ? MAD' },
  ]},
  { title: 'Coordonnées', fields: [
    { key: 'contact_phone', label: 'Téléphone' },
    { key: 'contact_whatsapp', label: 'WhatsApp' },
    { key: 'contact_email', label: 'Email' },
    { key: 'contact_address', label: 'Adresse' },
  ]},
  { title: 'Réseaux sociaux', fields: [
    { key: 'social_facebook', label: 'Facebook URL' },
    { key: 'social_instagram', label: 'Instagram URL' },
  ]},
  { title: 'SEO', fields: [
    { key: 'seo_keywords', label: 'Mots-clés' },
  ]},
];

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => { api.get('/settings').then((r) => setSettings(r.data)).catch(() => {}); }, []);

  const save = async () => {
    setSaving(true);
    try { await api.put('/settings', settings); setSaved(true); setTimeout(() => setSaved(false), 2500); }
    catch { alert('Erreur'); } finally { setSaving(false); }
  };

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-ink-900 mb-1">Paramètres</h1>
      <p className="text-sm text-ink-500 mb-6">Configuration globale du site</p>

      <div className="max-w-2xl space-y-6">
        {groups.map((g) => (
          <div key={g.title} className="bg-white rounded-2xl border border-ink-100 p-6">
            <h3 className="font-bold text-ink-900 mb-4">{g.title}</h3>
            <div className="space-y-4">
              {g.fields.map((f) => (
                <div key={f.key}>
                  <label className="text-xs font-semibold text-ink-700 mb-1.5 block">{f.label}</label>
                  <input value={settings[f.key] || ''} onChange={(e) => setSettings({ ...settings, [f.key]: e.target.value })}
                    className="w-full px-4 py-2.5 border border-ink-200 rounded-lg text-sm focus:outline-none focus:border-brand-500" />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex items-center gap-3">
          <button onClick={save} disabled={saving} className="btn-primary disabled:opacity-60">{saving ? '...' : 'Enregistrer'}</button>
          {saved && <span className="text-green-600 text-sm font-medium">✓ Enregistré</span>}
        </div>
      </div>
    </AdminShell>
  );
}
