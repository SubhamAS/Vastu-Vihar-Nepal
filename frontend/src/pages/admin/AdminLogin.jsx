import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Building2, LockKeyhole } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { setAdminKey } from "../../lib/adminApi";

export default function AdminLogin() {
  const [message, setMessage] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsChecking(true);
    try {
      const response = await fetch("/api/admin/enquiries?page=1&limit=1", {
        headers: { Authorization: `Bearer ${apiKey.trim()}` },
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Could not verify admin access.");
      setAdminKey(apiKey.trim());
      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      setMessage(error.message || "Could not connect to the admin API.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <main className="admin-login grid min-h-screen bg-slate-100 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.8fr)]">
      <section className="relative hidden flex-col justify-between overflow-hidden bg-slate-900 p-10 text-white lg:flex xl:p-14">
        <Link to="/" className="relative z-10 inline-flex w-fit items-center gap-3 text-white">
          <span className="flex size-10 items-center justify-center rounded-md bg-blue-500"><Building2 size={20} /></span>
          <span className="text-sm font-semibold tracking-tight">Vastu Vihar</span>
        </Link>
        <div className="relative z-10 max-w-lg pb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">Nepal sales workspace</p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">A better way to keep every enquiry moving.</h1>
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-300">A focused workspace for reviewing customer requests and keeping property conversations organized.</p>
        </div>
        <p className="relative z-10 text-xs text-slate-500">Administration · Vastu Vihar Nepal</p>
        <div className="pointer-events-none absolute -bottom-36 -right-20 size-110 rounded-full border border-slate-700/70" />
        <div className="pointer-events-none absolute -bottom-20 -right-4 size-75 rounded-full border border-blue-500/20" />
      </section>

      <section className="flex min-h-screen flex-col justify-between px-5 py-6 sm:px-10 sm:py-8 lg:px-14 xl:px-20">
        <div className="flex items-center justify-between lg:justify-end">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-slate-950 lg:hidden">
            <ArrowLeft size={15} /> Back to website
          </Link>
        </div>

        <div className="mx-auto w-full max-w-97.5 py-12">
          <div className="flex size-11 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700">
            <LockKeyhole size={19} strokeWidth={1.8} />
          </div>
          <p className="mt-7 text-xs font-medium text-blue-700">Admin access</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Sign in to your account</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Enter the admin API key configured in your backend environment to open this workspace.</p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label htmlFor="admin-api-key" className="text-xs font-medium text-slate-700">Admin API key</label>
              </div>
              <input id="admin-api-key" type="password" autoComplete="current-password" required value={apiKey} onChange={(event) => setApiKey(event.target.value)} placeholder="Enter the key configured on your backend" className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15" />
            </div>
            {message && <p role="alert" className="border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs leading-5 text-amber-900">{message}</p>}
            <button type="submit" disabled={isChecking || !apiKey.trim()} className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-blue-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-800 disabled:cursor-wait disabled:opacity-60 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-700">
              {isChecking ? "Checking access…" : "Continue to dashboard"} {!isChecking && <ArrowRight size={16} />}
            </button>
          </form>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 text-[11px] text-slate-500">
          <span>© {new Date().getFullYear()} Vastu Vihar</span>
          <Link to="/" className="hidden items-center gap-1 hover:text-slate-800 lg:inline-flex">Back to website <ArrowUpRight size={13} /></Link>
        </div>
      </section>
    </main>
  );
}
