import { useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { clearAdminKey, getAdminKey } from "../../lib/adminApi";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (!getAdminKey()) return <Navigate to="/admin" replace />;

  const handleLogout = () => {
    clearAdminKey();
    navigate("/admin", { replace: true });
  };

  return (
    <div className="min-h-screen w-full min-w-0 bg-slate-50 text-slate-800">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="min-h-screen w-full min-w-0 md:pl-64.5">
        <AdminHeader
          pathname={pathname}
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={handleLogout}
        />
        <main className="mx-auto w-full min-w-0 max-w-375 px-4 py-6 sm:px-7 sm:py-8 lg:px-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
