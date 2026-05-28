'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

const UPLOADS_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') ?? '';

type Field = { key: string; label: string; type?: 'text' | 'number' | 'textarea' | 'select' | 'checkbox' | 'image'; options?: string[]; col?: 1 | 2 };

export default function AdminCRUD({ endpoint, title, fields, displayFields }: {
  endpoint: string; title: string; fields: Field[]; displayFields: string[];
}) {
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);


  const load = () => { api.get(endpoint).then((r) => setItems(r.data)).catch(() => {}); };
  useEffect(load, [endpoint]);

  const save = async () => {
    setLoading(true);
    try {
      const data = { ...editing };
      delete data.id; delete data.createdAt; delete data.updatedAt;
      Object.keys(data).forEach(k => {
        if (data[k] === null || data[k] === undefined || data[k] === '') delete data[k];
      });
      
      fields.forEach((f) => {
        if (f.type === 'number' && data[f.key] !== undefined) data[f.key] = +data[f.key];
      });
      
      if (editing.id) await api.put(`${endpoint}/${editing.id}`, data);
      else await api.post(endpoint, data);
      setEditing(null); load();
    } catch (e: any) { alert('Erreur : ' + (e.response?.data?.error || e.message)); }
    finally { setLoading(false); }
  };

  const remove = async (id: number) => {
    if (!confirm('Supprimer ?')) return;
    await api.delete(`${endpoint}/${id}`); load();
  };

  const upload = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (!e.target.files?.[0]) return;
    setUploadProgress(key);
    const fd = new FormData(); fd.append('file', e.target.files[0]);
    try {
      const { data } = await api.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setEditing({ ...editing, [key]: data.url });
    } catch { alert('Upload échoué'); }
    finally { setUploadProgress(null); }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">{title}</h1>
          <p className="text-sm text-ink-500">{items.length} élément(s)</p>
        </div>
        <button onClick={() => setEditing({})} className="btn-primary text-sm">+ Nouveau</button>
      </div>

      <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-ink-50">
              <tr className="text-left text-xs text-ink-500 uppercase">
                {displayFields.map((f) => <th key={f} className="px-4 py-3">{f}</th>)}
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && <tr><td colSpan={displayFields.length + 1} className="px-4 py-10 text-center text-ink-400">Aucun élément</td></tr>}
              {items.map((row) => (
                <tr key={row.id} className="border-t border-ink-100 hover:bg-ink-50/50">
                  {displayFields.map((f) => (
                    <td key={f} className="px-4 py-3 text-ink-700 max-w-[250px] truncate">
                      {f === 'image' && row[f] ? <img src={row[f].startsWith('http') ? row[f] : `${UPLOADS_URL}${row[f]}`} className="w-12 h-8 object-cover rounded" /> :
                       typeof row[f] === 'boolean' ? (row[f] ? '✓' : '—') :
                       typeof row[f] === 'string' && row[f].length > 60 ? row[f].slice(0, 60) + '…' :
                       row[f]?.toString() || '—'}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button onClick={() => setEditing(row)} className="text-brand-600 hover:text-brand-700 text-xs font-semibold mr-3">Modifier</button>
                    <button onClick={() => remove(row.id)} className="text-red-600 hover:text-red-700 text-xs font-medium">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-ink-900">{editing.id ? 'Modifier' : 'Nouveau'}</h2>
              <button onClick={() => setEditing(null)} className="text-ink-400 hover:text-ink-900 text-2xl">×</button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {fields.map((f) => (
                <div key={f.key} className={f.col === 2 ? 'col-span-2' : ''}>
                  <label className="text-xs font-semibold text-ink-700 mb-1.5 block">{f.label}</label>
                  {f.type === 'textarea' ? (
                    <textarea rows={4} value={editing[f.key] || ''} onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                      className="w-full px-3 py-2 border border-ink-200 rounded-lg text-sm focus:outline-none focus:border-brand-500 resize-none" />
                  ) : f.type === 'select' ? (
                    <select value={editing[f.key] || ''} onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                      className="w-full px-3 py-2 border border-ink-200 rounded-lg text-sm focus:outline-none focus:border-brand-500 bg-white">
                      <option value="">—</option>
                      {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : f.type === 'checkbox' ? (
                    <input type="checkbox" checked={!!editing[f.key]} onChange={(e) => setEditing({ ...editing, [f.key]: e.target.checked })}
                      className="w-5 h-5" />
                  ) : f.type === 'image' ? (
                    <div className="flex items-center gap-3">
                      {editing[f.key] && <img src={editing[f.key].startsWith('http') ? editing[f.key] : `${UPLOADS_URL}${editing[f.key]}`} className="w-16 h-12 object-cover rounded border border-ink-200" />}
                      <input value={editing[f.key] || ''} onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })} placeholder="URL ou uploader"
                        className="flex-1 px-3 py-2 border border-ink-200 rounded-lg text-sm focus:outline-none focus:border-brand-500" />
                      <label className="cursor-pointer bg-ink-100 hover:bg-ink-200 px-3 py-2 rounded-lg text-xs font-semibold">
                        {uploadProgress === f.key ? '...' : '📤 Upload'}
                        <input type="file" accept="image/*" onChange={(e) => upload(e, f.key)} className="hidden" />
                      </label>
                    </div>
                  ) : (
                    <input type={f.type || 'text'} value={editing[f.key] ?? ''} onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                      className="w-full px-3 py-2 border border-ink-200 rounded-lg text-sm focus:outline-none focus:border-brand-500" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setEditing(null)} className="btn-outline flex-1">Annuler</button>
              <button onClick={save} disabled={loading} className="btn-primary flex-1 disabled:opacity-60">{loading ? '...' : 'Sauvegarder'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
