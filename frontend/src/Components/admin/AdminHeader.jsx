import { CalendarDays, LogOut, Menu } from "lucide-react";

const pageTitles = {
  "/admin/dashboard": "Overview",
  "/admin/enquiries": "Enquiries",
  "/admin/price-lists": "Price lists",
};

export default function AdminHeader({ pathname, onMenuClick, onLogout }) {
  const title = pageTitles[pathname] || "Administration";
  const today = new Intl.DateTimeFormat("en", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="admin-header sticky top-0 z-30 flex h-18 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-7 lg:px-9">
      <div className="flex items-center gap-3">
        <button type="button" onClick={onMenuClick} className="rounded-md p-2 text-slate-600 hover:bg-slate-100 md:hidden" aria-label="Open admin navigation">
          <Menu size={20} />
        </button>
        <div>
          <p className="hidden text-[11px] text-slate-500 sm:block">Administration <span className="px-1 text-slate-300">/</span> Vastu Vihar Nepal</p>
          <h1 className="text-sm font-semibold text-slate-900 sm:mt-0.5 sm:text-base">{title}</h1>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-5">
        <span className="admin-date hidden items-center gap-2 text-xs text-slate-500 lg:inline-flex">
          <CalendarDays size={15} /> {today}
        </span>
        <button type="button" onClick={onLogout} className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900" aria-label="Sign out">
          <LogOut size={14} /> <span className="hidden sm:inline">Sign out</span>
        </button>
      </div>
    </header>
  );
}
