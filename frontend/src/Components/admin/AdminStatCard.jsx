export default function AdminStatCard({ label, icon: Icon, value, loading }) {
  return (
    <article className="min-w-0 border border-slate-200 bg-white rounded-2xl transition duration-300 hover:-translate-y-1 hover:shadow-xl p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[13px] font-medium text-slate-600">{label}</h2>
        <span className="flex size-8 items-center justify-center rounded-md bg-slate-100 text-slate-600">
          <Icon size={16} strokeWidth={1.8} />
        </span>
      </div>
      <p className={`mt-4 text-2xl font-semibold leading-none ${loading || value === undefined ? "text-slate-400" : "text-slate-900"}`} aria-label={loading ? `${label} loading` : value === undefined ? `${label} unavailable` : `${label}: ${value}`}>
        {loading || value === undefined ? "—" : new Intl.NumberFormat("en").format(value)}
      </p>
    </article>
  );
}
