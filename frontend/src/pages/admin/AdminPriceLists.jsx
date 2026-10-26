import { useEffect, useState } from "react";
import { FileText, Pencil, Plus, RotateCw, Save, Trash2, Upload, X } from "lucide-react";
import AdminEmptyState from "../../Components/admin/AdminEmptyState";
import { createPriceList, deletePriceList, fetchPriceLists, updatePriceList, uploadPriceListFile } from "../../lib/adminApi";

const emptyForm = { name: "", address: "", sortOrder: 0, isPublished: false };

export default function AdminPriceLists() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchPriceLists()
      .then((result) => { if (active) setItems(result.items || []); })
      .catch((requestError) => { if (active) setError(requestError.message || "Could not load price lists."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [refreshKey]);

  const openNew = () => {
    setFormOpen(true);
    setEditingId(null);
    setForm({ ...emptyForm, sortOrder: items.length });
    setFile(null);
    setError("");
    setNotice("");
  };

  const openEdit = (item) => {
    setFormOpen(true);
    setEditingId(item.id);
    setForm({ name: item.name, address: item.address, sortOrder: item.sortOrder, isPublished: item.isPublished });
    setFile(null);
    setError("");
    setNotice("");
  };

  const closeEditor = () => {
    if (saving) return;
    setFormOpen(false);
    setEditingId(null);
    setFile(null);
    setError("");
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");
    if (!editingId && !file) {
      setError("Choose a price list file before adding this branch.");
      return;
    }
    if (file && file.size > 10 * 1024 * 1024) {
      setError("The price list file must be 10 MB or smaller.");
      return;
    }
    if (file && !["image/webp", "image/png", "image/jpeg", "application/pdf"].includes(file.type)) {
      setError("Upload a WebP, PNG, JPEG, or PDF file.");
      return;
    }
    const current = items.find((item) => item.id === editingId);
    if (form.isPublished && !file && !current?.imageUrl) {
      setError("Upload a price list file before publishing this branch.");
      return;
    }

    setSaving(true);
    try {
      let id = editingId;
      if (!id) {
        const created = await createPriceList({ name: form.name, address: form.address, sortOrder: Number(form.sortOrder) });
        id = created.item.id;
        setEditingId(id);
      }
      if (file) await uploadPriceListFile(id, file);
      await updatePriceList(id, {
        name: form.name,
        address: form.address,
        sortOrder: Number(form.sortOrder),
        isPublished: Boolean(form.isPublished),
      });
      setEditingId(null);
      setFormOpen(false);
      setFile(null);
      setNotice("Price list saved. Published changes are now live on the website.");
      setRefreshKey((key) => key + 1);
    } catch (requestError) {
      setError(requestError.message || "Could not save this price list.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete the ${item.name} price list? This also deletes its uploaded file.`)) return;
    setDeletingId(item.id);
    setError("");
    setNotice("");
    try {
      await deletePriceList(item.id);
      setNotice(`${item.name} price list deleted.`);
      setRefreshKey((key) => key + 1);
      if (editingId === item.id) setEditingId(null);
    } catch (requestError) {
      setError(requestError.message || "Could not delete this price list.");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="w-full min-w-0 space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Price lists</h2>
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-600">Manage branch details and publish the price list files shown on your website.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => setRefreshKey((key) => key + 1)} disabled={loading || saving} className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50">
            <RotateCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
          <button type="button" onClick={openNew} disabled={saving} className="inline-flex h-10 items-center gap-2 rounded-md bg-blue-700 px-3.5 text-xs font-semibold text-white hover:bg-blue-800 disabled:opacity-50">
            <Plus size={15} /> Add branch
          </button>
        </div>
      </div>

      {error && <p role="alert" className="border border-rose-200 bg-rose-50 px-4 py-3 text-xs leading-5 text-rose-800">{error}</p>}
      {notice && <p role="status" className="border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs leading-5 text-emerald-800">{notice}</p>}

      {formOpen ? (
        <section className="rounded-md border border-slate-200 bg-white p-4 sm:p-6" aria-labelledby="price-list-form-heading">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h3 id="price-list-form-heading" className="text-sm font-semibold text-slate-900">{editingId ? "Edit branch price list" : "Add a branch price list"}</h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">Upload a WebP, PNG, JPEG, or PDF file up to 10 MB.</p>
            </div>
            <button type="button" onClick={closeEditor} disabled={saving} className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100" aria-label="Close form"><X size={17} /></button>
          </div>
          <form onSubmit={handleSave} className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="price-list-branch" className="mb-1.5 block text-xs font-medium text-slate-700">Branch name</label>
              <input id="price-list-branch" required maxLength={80} value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15" />
            </div>
            <div>
              <label htmlFor="price-list-order" className="mb-1.5 block text-xs font-medium text-slate-700">Display order</label>
              <input id="price-list-order" type="number" min="0" max="9999" step="1" value={form.sortOrder} onChange={(event) => setForm((current) => ({ ...current, sortOrder: event.target.value }))} className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="price-list-address" className="mb-1.5 block text-xs font-medium text-slate-700">Branch address</label>
              <input id="price-list-address" required maxLength={240} value={form.address} onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))} className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="price-list-file" className="mb-1.5 block text-xs font-medium text-slate-700">Price list file</label>
              <input id="price-list-file" type="file" accept="image/webp,image/png,image/jpeg,application/pdf" onChange={(event) => setFile(event.target.files?.[0] || null)} className="block w-full rounded-md border border-slate-300 bg-white text-xs text-slate-600 file:mr-3 file:border-0 file:bg-slate-100 file:px-3 file:py-2.5 file:text-xs file:font-medium file:text-slate-700 hover:file:bg-slate-200" />
              {file && <p className="mt-2 flex items-center gap-2 text-xs text-slate-600"><FileText size={14} /> {file.name} <span className="text-slate-400">({(file.size / 1024 / 1024).toFixed(2)} MB)</span></p>}
            </div>
            <label className="flex items-start gap-2.5 text-xs text-slate-700 md:col-span-2">
              <input type="checkbox" checked={form.isPublished} onChange={(event) => setForm((current) => ({ ...current, isPublished: event.target.checked }))} className="mt-0.5 size-4 accent-blue-700" />
              <span><span className="block font-medium">Publish on the website</span><span className="mt-0.5 block text-slate-500">Unpublished branches are visible only in this admin panel.</span></span>
            </label>
            <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 md:col-span-2">
              <button type="button" onClick={closeEditor} disabled={saving} className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-300 px-3 text-xs font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
              <button type="submit" disabled={saving} className="inline-flex h-9 items-center gap-2 rounded-md bg-blue-700 px-3 text-xs font-semibold text-white hover:bg-blue-800 disabled:cursor-wait disabled:opacity-60">
                {saving ? <><RotateCw size={14} className="animate-spin" /> Saving…</> : <><Save size={14} /> Save price list</>}
              </button>
            </div>
          </form>
        </section>
      ) : null}

      <section className="overflow-hidden rounded-md border border-slate-200 bg-white" aria-label="Managed price lists">
        <div className="border-b border-slate-200 px-4 py-4 sm:px-5">
          <h3 className="text-sm font-semibold text-slate-900">Branch price lists</h3>
          <p className="mt-1 text-xs text-slate-500">Published files appear on the public price lists page.</p>
        </div>
        {loading ? <p className="px-5 py-10 text-center text-xs text-slate-500">Loading price lists…</p>
          : items.length === 0 ? <AdminEmptyState title="No branch price lists" description="Add a branch and upload its current price list to get started." />
            : <div className="divide-y divide-slate-200">{items.map((item) => (
              <article key={item.id} className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-500"><FileText size={18} /></span>
                  <div className="min-w-0">
                    <h4 className="truncate text-sm font-semibold text-slate-900">{item.name}</h4>
                    <p className="mt-1 break-words text-xs text-slate-500">{item.address}</p>
                    <p className="mt-1 truncate text-[11px] text-slate-400">{item.fileName || "No price file uploaded"}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${item.isPublished ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{item.isPublished ? "Published" : "Draft"}</span>
                  <button type="button" onClick={() => openEdit(item)} className="inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-300 px-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50"><Pencil size={13} /> Edit</button>
                  <button type="button" onClick={() => handleDelete(item)} disabled={deletingId === item.id} className="inline-flex h-8 items-center gap-1.5 rounded-md border border-rose-200 px-2.5 text-xs font-medium text-rose-700 hover:bg-rose-50 disabled:opacity-50"><Trash2 size={13} /> {deletingId === item.id ? "Deleting…" : "Delete"}</button>
                </div>
              </article>
            ))}</div>}
      </section>
    </div>
  );
}
