import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";

const fallbackBranches = [
  {
    id: "birgunj",
    name: "Birgunj",
    address: "Lukahi Mai, Laxmanwa, Birgunj, Nepal",
    imageUrl: "/Price/birgunj.webp",
    contentType: "image/webp",
    fileName: "Birgunj-Price-List.webp",
  },
  {
    id: "birtamode",
    name: "Birtamode",
    address: "Charpani, near Heaven’s Water Park, Birtamode",
    imageUrl: "/Price/birtamode.webp",
    contentType: "image/webp",
    fileName: "Birtamode-Price-List.webp",
  },
];

const schedules = {
  "Simplex": ["Booking amount: 15% of unit cost.", "Agreement: 25% within 30 days of booking.", "19% at plinth level.", "19% at ground floor roof level.", "19% at start of finishing.", "3% before 30 days handover."],
  "G+1": ["Booking amount: 10% of unit cost.", "Agreement: 20% within 30 days of booking.", "16% at plinth level.", "16% at ground floor roof level.", "16% at first floor roof level.", "16% at floor finishing start.", "6% 30 days before handover."],
  "G+2": ["Booking amount: 10% of unit cost.", "Agreement: 20% of unit cost.", "13% at plinth level.", "13% at ground floor roof level.", "13% at first floor roof level.", "13% at second floor roof level.", "13% at floor finishing start.", "5% before 30 days handover."],
};
const notes = ["Agreement will be signed after payment of allotment amount, after 30 days of payment.", "Tax/GST will be applicable as per government norms.", "Electricity connection and registry cost will be paid by the customer at actuals.", "Corner plots incur an additional 5% of unit cost.", "Swimming pool cost is charged separately at NPR 10 lakhs.", "Legal claims are subject to Birgunj, Nepal jurisdiction only.", "Other operating expenses (OOE) are extra."];

function branchSlug(branch) {
  return branch.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function BranchPriceDetails({ branch }) {
  return <div className="border-t border-stone-200 bg-[#fffdf5] p-5 sm:p-7">
    {branch.properties?.length ? <div className="overflow-x-auto"><table className="w-full min-w-[760px] border-collapse text-left text-sm"><thead className="bg-brand text-white"><tr>{["Property", "Land area (sq.ft.)", "Carpet area (sq.ft.)", "B.U.A. (sq.ft.)", "Price (NPR)", "O.O.E. (NPR)"].map((label) => <th key={label} className="px-3 py-3 font-medium">{label}</th>)}</tr></thead><tbody>{branch.properties.map((property, index) => <tr key={`${property.name}-${index}`} className="border-b border-amber-200"><th scope="row" className="px-3 py-3 text-brand">{property.name}</th><td className="px-3 py-3">{property.landArea || "—"}</td><td className="px-3 py-3">{property.carpetArea || "—"}</td><td className="px-3 py-3">{property.bua || "—"}</td><td className="px-3 py-3 font-semibold">{property.price || "—"}</td><td className="px-3 py-3">{property.otherExpenses || "—"}</td></tr>)}</tbody></table></div> : <p className="py-5 text-sm text-slate-500">Property details will be published soon.</p>}
    {branch.specifications?.length > 0 && <section className="mt-8"><h3 className="mb-3 font-display text-2xl text-brand">Specifications</h3><dl className="grid gap-px border border-amber-200 bg-amber-200 sm:grid-cols-2">{branch.specifications.map((spec, index) => <div key={`${spec.name}-${index}`} className="grid grid-cols-[1fr_1.3fr] gap-3 bg-[#fffdf5] px-4 py-3 text-sm"><dt className="font-medium text-slate-700">{spec.name}</dt><dd className="text-slate-600">{spec.detail}</dd></div>)}</dl></section>}
    <section className="mt-8 grid gap-7 lg:grid-cols-[1fr_0.8fr]"><div><h3 className="mb-4 font-display text-2xl text-brand">Payment schedules</h3><div className="grid gap-4 sm:grid-cols-3">{Object.entries(schedules).map(([type, entries]) => <div key={type}><h4 className="border-b-2 border-highlight-hover pb-2 text-sm font-semibold text-brand">{type}</h4><ol className="mt-2 list-decimal space-y-2 pl-4 text-xs leading-5 text-slate-600">{entries.map((entry) => <li key={entry}>{entry}</li>)}</ol></div>)}</div></div><div><h3 className="mb-4 font-display text-2xl text-brand">Notes</h3><ol className="list-decimal space-y-2 pl-4 text-xs leading-5 text-slate-600">{notes.map((note) => <li key={note}>{note}</li>)}</ol></div></section>
  </div>;
}

function BranchPriceCard({ branch }) {
  const slug = branchSlug(branch);
  return (
    <article className="overflow-hidden rounded-sm border border-border-light bg-white shadow-[0_12px_36px_rgba(16,41,32,0.07)]">
      <div className="grid md:grid-cols-[minmax(0,0.85fr)_1.15fr]">
        <div className="flex min-h-64 items-center justify-center bg-[#f5f2e8] p-5 md:min-h-80">
          {branch.imageUrl ? <img src={branch.imageUrl} alt={`${branch.name} price list preview`} loading="lazy" className="max-h-80 w-full object-contain" /> : <span className="font-display text-5xl text-brand/20">{branch.name?.slice(0, 1)}</span>}
        </div>
        <div className="flex flex-col p-6 sm:p-8">
          <div className="mb-6 h-1 w-12 bg-highlight-hover" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-highlight-hover">Nepal branch</p>
          <h2 className="mt-2 font-display text-3xl text-brand sm:text-4xl">{branch.name}</h2>
          <p className="mt-4 flex items-start gap-2 text-sm leading-6 text-slate-600"><MapPin size={16} className="mt-1 shrink-0 text-highlight-hover" />{branch.address}</p>
          <p className="mt-5 text-sm leading-6 text-slate-500">{branch.properties?.length || 0} property models with pricing and specifications</p>
          <Link to={`/price-list/${encodeURIComponent(slug)}`} className="mt-auto inline-flex w-fit items-center gap-2 bg-brand px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white hover:bg-layout-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight-hover">View price details</Link>
        </div>
      </div>
    </article>
  );
}

export default function PriceList() {
  const { branchSlug: selectedSlug } = useParams();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const selectedBranch = branches.find((branch) => branchSlug(branch) === selectedSlug);

  useEffect(() => {
    let active = true;
    fetch("/api/price-lists")
      .then(async (response) => {
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.error || "Could not load price lists.");
        if (active) setBranches(result.items || []);
      })
      .catch(() => {
        if (active) {
          setBranches(fallbackBranches);
          setUsingFallback(true);
        }
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <main className="min-h-screen bg-white pt-20">
      <section className="relative isolate overflow-hidden bg-brand px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-16">
        <picture className="pointer-events-none absolute inset-0 -z-10 size-full opacity-20">
          <source
            media="(max-width: 640px)"
            srcSet="/Properties/community-bg-mobile-720.webp 720w, /Properties/community-bg-mobile-1120.webp 1120w, /Properties/community-bg-mobile.webp 1333w"
            sizes="100vw"
          />
          <img
            src="/Properties/community-bg-optimized.webp"
            srcSet="/Properties/community-bg-optimized-720.webp 720w, /Properties/community-bg-optimized-1120.webp 1120w, /Properties/community-bg-optimized.webp 1333w"
            sizes="100vw"
            width={1333}
            height={2000}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="size-full object-cover object-center"
          />
        </picture>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[#11140f]/75" />
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-light sm:text-[11px]">
            Clear details for your next step
          </p>
          <h1 className="font-display text-5xl font-medium tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            {selectedSlug ? `${selectedBranch?.name || "Branch"} price details` : "Price lists"}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
            {selectedSlug ? `${selectedBranch?.name || "Branch"} property prices, specifications, and payment details.` : "Browse property prices and specifications by branch. Select a branch to see its full price details."}
          </p>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          {usingFallback && <p role="status" className="mb-6 rounded-sm border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">Showing saved branch details because live price list data could not be reached.</p>}
          {loading ? <p className="py-10 text-center text-sm text-slate-500">Loading price lists…</p>
            : branches.length === 0 ? <p className="py-10 text-center text-sm text-slate-500">No published price lists are available right now.</p>
              : selectedSlug ? selectedBranch ? <div className="mx-auto max-w-7xl"><Link to="/price-list" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-highlight-hover"><ArrowLeft size={16} />All price lists</Link><article className="overflow-hidden rounded-sm border border-border-light bg-white shadow-[0_12px_36px_rgba(16,41,32,0.07)]"><div className="grid md:grid-cols-[minmax(0,0.85fr)_1.15fr]"><div className="flex min-h-64 items-center justify-center bg-[#f5f2e8] p-5 md:min-h-80">{selectedBranch.imageUrl ? <img src={selectedBranch.imageUrl} alt={`${selectedBranch.name} price list preview`} className="max-h-80 w-full object-contain" /> : null}</div><div className="flex flex-col justify-center p-6 sm:p-8"><p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-highlight-hover">Price details</p><h2 className="mt-2 font-display text-3xl text-brand sm:text-4xl">{selectedBranch.name}</h2><p className="mt-4 flex items-start gap-2 text-sm leading-6 text-slate-600"><MapPin size={16} className="mt-1 shrink-0 text-highlight-hover" />{selectedBranch.address}</p></div></div><BranchPriceDetails branch={selectedBranch} /></article></div> : <div className="py-10 text-center"><p className="text-slate-600">That branch price list could not be found.</p><Link to="/price-list" className="mt-4 inline-block text-sm font-semibold text-brand underline">Back to all price lists</Link></div>
                : <div className="grid gap-7 lg:grid-cols-2">{branches.map((branch) => <BranchPriceCard key={branch.id || branch.name} branch={branch} />)}</div>}
        </div>
      </section>
    </main>
  );
}
