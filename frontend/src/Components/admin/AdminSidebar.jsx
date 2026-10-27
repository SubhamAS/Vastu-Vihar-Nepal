import { NavLink, Link } from "react-router-dom";
import { ArrowUpRight, Building2, ChevronRight, ClipboardList, FileText, LayoutDashboard, X, Settings2 } from "lucide-react";

const navigation = [
  { label: "Overview", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Enquiries", to: "/admin/enquiries", icon: ClipboardList },
  { label: "Price lists", to: "/admin/price-lists", icon: FileText },
];

export default function AdminSidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close admin navigation"
          className="fixed inset-0 z-40 bg-slate-950/45 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`admin-sidebar fixed inset-y-0 left-0 z-50 flex w-64.5 flex-col border-r border-slate-700 bg-slate-900 text-slate-200 transition-transform duration-200 md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
        aria-label="Admin sidebar"
      >
        <div className="flex h-18 items-center justify-between border-b border-slate-700 px-5">
          <Link to="/admin/dashboard" className="flex items-center gap-3" onClick={onClose}>
            <span className="flex size-9 items-center justify-center rounded-xl bg-white/15 text-white">
              <Building2 size={19} strokeWidth={1.8} />
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-tight text-white">Vastu Vihar</span>
              <span className="mt-0.5 block text-[10px] font-medium tracking-[0.12em] text-blue-100/75">NEPAL · ADMIN</span>
            </span>
          </Link>
          <button type="button" onClick={onClose} className="rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-white md:hidden" aria-label="Close navigation">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-6" aria-label="Admin navigation">
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-100/60">Workspace</p>
          <ul className="space-y-1">
            {navigation.map(({ label, to, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={onClose}
                  className={({ isActive }) => `flex min-h-10 w-60 overflow-x-visible items-center gap-3 rounded-md px-3 text-[13px] font-medium transition-colors ${isActive ? "bg-blue-500/15 text-blue-300" : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"}`}
                >
                  {({ isActive }) => (
                    <>
                      <Icon size={17} strokeWidth={1.8} className={isActive ? "text-blue-300" : "text-slate-500"} />
                      {label}
                      {isActive && <ChevronRight size={14} className="ml-auto text-blue-300" />}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="admin-sidebar-bottom border-t border-slate-700 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/10 px-3 py-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-white/20 text-xs font-semibold text-white">VV</span>
            <span className="min-w-0"><span className="block truncate text-xs font-semibold text-white">Administrator</span><span className="mt-0.5 block text-[10px] text-blue-100/70">Vastu Vihar Nepal</span></span>
            <Settings2 size={15} className="ml-auto text-blue-100/70" />
          </div>
          <Link to="/" className="flex items-center justify-between rounded-md px-3 py-2.5 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white">
            Back to website <ArrowUpRight size={15} />
          </Link>
        </div>
      </aside>
    </>
  );
}
