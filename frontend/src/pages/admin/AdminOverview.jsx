import { useEffect, useState } from "react";
import { ArrowRight, CircleCheck, ClipboardList, MessageCircle, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import AdminEmptyState from "../../Components/admin/AdminEmptyState";
import AdminStatCard from "../../Components/admin/AdminStatCard";
import { fetchEnquiries } from "../../lib/adminApi";

const statsConfig = [
  { key: "total", label: "Total enquiries", icon: ClipboardList },
  { key: "new", label: "New enquiries", icon: UsersRound },
  { key: "contacted", label: "Contacted", icon: MessageCircle },
  { key: "closed", label: "Closed enquiries", icon: CircleCheck },
];

export default function AdminOverview() {
  const [stats, setStats] = useState({});
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    Promise.all([
      fetchEnquiries({ page: 1, limit: 5 }),
      fetchEnquiries({ page: 1, limit: 1, status: "new" }),
      fetchEnquiries({ page: 1, limit: 1, status: "contacted" }),
      fetchEnquiries({ page: 1, limit: 1, status: "closed" }),
    ]).then(([all, fresh, contacted, closed]) => {
      if (!active) return;
      setRecent(all.items || []);
      setStats({ total: all.pagination?.total || 0, new: fresh.pagination?.total || 0, contacted: contacted.pagination?.total || 0, closed: closed.pagination?.total || 0 });
      setError("");
    }).catch((requestError) => {
      if (active) setError(requestError.message || "Could not load dashboard data.");
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, []);

  const formatDate = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "—" : new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date);
  };

  return (
    <div className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Overview</h2>
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-600">A snapshot of incoming property enquiries and the work that needs attention.</p>
        </div>
        <Link to="/admin/enquiries" className="inline-flex w-fit items-center gap-2 rounded-md bg-blue-700 px-3.5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-blue-800">
          View enquiries <ArrowRight size={15} />
        </Link>
      </div>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Enquiry summary">
        {statsConfig.map((stat) => <AdminStatCard key={stat.label} {...stat} value={stats[stat.key]} loading={loading} />)}
      </section>

      {error && <div role="alert" className="border border-rose-200 bg-rose-50 px-4 py-3 text-xs leading-5 text-rose-800">{error}{error.toLowerCase().includes("authorization") && <> <Link to="/admin" className="font-semibold underline">Sign in again</Link></>}</div>}

      <section className="overflow-hidden rounded-md border border-slate-200 bg-white" aria-labelledby="recent-enquiries-title">
        <div className="flex flex-col gap-1 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            <h3 id="recent-enquiries-title" className="text-sm font-semibold text-slate-900">Recent enquiries</h3>
            <p className="mt-1 text-xs text-slate-500">The latest requests submitted through your website.</p>
          </div>
          <Link to="/admin/enquiries" className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 hover:text-blue-900 sm:mt-0">
            Go to enquiries <ArrowRight size={14} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-160 text-left text-xs">
            <thead className="bg-slate-50 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">
              <tr>
                <th scope="col" className="px-5 py-3">Customer</th>
                <th scope="col" className="px-4 py-3">Property</th>
                <th scope="col" className="px-4 py-3">Enquiry date</th>
                <th scope="col" className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? <tr><td colSpan="4" className="px-5 py-10 text-center text-xs text-slate-500">Loading recent enquiries…</td></tr>
                : error ? <tr><td colSpan="4" className="px-5 py-10 text-center text-xs text-slate-500">Recent enquiries are unavailable.</td></tr>
                : recent.length === 0 ? <tr><td colSpan="4" className="p-0"><AdminEmptyState compact title="No enquiries yet" description="New requests submitted through your website will appear here." /></td></tr>
                  : recent.map((item) => <tr key={item.id} className="border-t border-slate-100">
                    <td className="px-5 py-4"><p className="font-semibold text-slate-900">{item.name || "Unnamed"}</p><p className="mt-1 text-slate-500">{item.email || item.phone || "No contact details"}</p></td>
                    <td className="px-4 py-4 text-slate-700">{item.property || "Not specified"}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-slate-600">{formatDate(item.createdAt)}</td>
                    <td className="px-4 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${item.status === "new" ? "bg-blue-50 text-blue-700" : item.status === "closed" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-700"}`}>{item.status || "new"}</span></td>
                  </tr>)}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
