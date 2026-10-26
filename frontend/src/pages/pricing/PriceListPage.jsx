import { useEffect, useState } from "react";
import { Download, Eye, FileText, MapPin } from "lucide-react";

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

function BranchPriceCard({ branch }) {
  const isPdf = branch.contentType === "application/pdf";
  const sourceSet = branch.imageUrl.startsWith("/Price/")
    ? `${branch.imageUrl.replace(".webp", "-480.webp")} 480w, ${branch.imageUrl.replace(".webp", "-800.webp")} 800w, ${branch.imageUrl} 1132w`
    : undefined;
  return (
    <article className="grid overflow-hidden rounded-sm border border-brand-line bg-white shadow-[0_12px_36px_rgba(16,41,32,0.07)] md:grid-cols-[minmax(0,1fr)_230px]">
      <div className="flex flex-col p-6 sm:p-8">
        <div className="mb-8 h-1 w-12 bg-brand-ochre" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-ochre">
          Nepal branch
        </p>
        <h2 className="mt-2 font-serif text-3xl text-brand-pine sm:text-4xl">
          {branch.name}
        </h2>
        <p className="mt-4 flex items-start gap-2 text-sm leading-6 text-slate-600">
          <MapPin size={16} className="mt-1 shrink-0 text-brand-ochre" />
          {branch.address}
        </p>
        <p className="mt-6 max-w-sm text-sm leading-6 text-slate-500">
          View the published bungalow and duplex pricing, specifications, and
          payment schedules for this branch.
        </p>

        <div className="mt-auto flex flex-wrap gap-3 pt-8">
          <a
            href={branch.imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-brand-pine px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-brand-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ochre"
          >
            <Eye size={16} />
            View price list
          </a>
          <a
            href={branch.imageUrl}
            download={branch.fileName}
            className="inline-flex items-center gap-2 rounded-sm border border-brand-line px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#3f4c44] transition-colors hover:border-brand-ochre hover:text-brand-ochre focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ochre"
          >
            <Download size={16} />
            Download
          </a>
        </div>
      </div>

      <a
        href={branch.imageUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${branch.name} price list`}
        className="group flex min-h-80 items-center justify-center border-t border-stone-200 bg-stone-100 p-5 md:min-h-full md:border-l md:border-t-0"
      >
        {isPdf ? (
          <span className="flex flex-col items-center gap-3 text-brand-pine">
            <FileText size={42} strokeWidth={1.4} />
            <span className="text-xs font-semibold">PDF price list</span>
          </span>
        ) : (
          <img
            src={branch.imageUrl}
            srcSet={sourceSet}
            sizes="(min-width: 768px) 230px, (min-width: 640px) 50vw, calc(100vw - 2.5rem)"
            alt={`${branch.name} branch price list preview`}
            loading="lazy"
            width={1132}
            height={1600}
            className="max-h-97.5 w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
        )}
      </a>
    </article>
  );
}

export default function PriceList() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

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
    <main className="min-h-screen bg-brand-paper pt-20">
      <section className="relative isolate overflow-hidden bg-brand-pine px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-16">
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
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-champagne sm:text-[11px]">
            Clear details for your next step
          </p>
          <h1 className="font-serif text-5xl font-medium tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Price lists
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
            Choose a branch to view or download its published property pricing
            and specifications.
          </p>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-2 xl:gap-8">
          {usingFallback && <p role="status" className="xl:col-span-2 rounded-sm border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">Showing the saved price list files because live price list data could not be reached.</p>}
          {loading ? <p className="py-10 text-center text-sm text-slate-500 xl:col-span-2">Loading price lists…</p>
            : branches.length === 0 ? <p className="py-10 text-center text-sm text-slate-500 xl:col-span-2">No published price lists are available right now.</p>
              : branches.map((branch) => (
            <BranchPriceCard key={branch.name} branch={branch} />
          ))}
        </div>
      </section>
    </main>
  );
}
