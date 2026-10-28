import { MapPin, Phone } from "lucide-react";

const site = {
  name: "Birtamode PH-01",
  address: "Charpani, near Heavens Water Park, Birtamode, Jhapa",
  phones: ["+977 - 9705191815", "+977 - 9708091332"],
  coordinates: "26.629905676816904,87.96650717542973",
};

export default function SiteContact() {
  const mapUrl = `https://www.google.com/maps?q=${site.coordinates}`;

  return (
    <main className="min-h-screen bg-white px-5 pb-16 pt-20 sm:px-8 lg:px-16">
      <section className="mx-auto max-w-7xl py-12 sm:py-16 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-highlight-hover">
            Vastu Vihar Nepal
          </p>
          <h1 className="mt-4 font-display text-5xl font-light leading-tight text-brand sm:text-6xl">
            Site Contact
          </h1>
          <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
            Reach our team at the Birtamode project site.
          </p>
        </div>

        <article className="mt-10 grid overflow-hidden rounded-sm border border-border-light bg-layout-dark shadow-[0_12px_36px_rgba(16,41,32,0.07)] lg:grid-cols-[0.85fr_1.15fr]">
          <div className="p-7 sm:p-9 lg:p-11">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-highlight-hover">
              Project site
            </p>
            <h2 className="mt-3 font-display text-3xl font-light text-highlight sm:text-4xl">
              {site.name}
            </h2>

            <div className="mt-8 space-y-5 border-t border-stone-200 pt-7">
              <p className="flex items-start gap-3 text-sm leading-7 text-white">
                <MapPin size={18} className="mt-1 shrink-0 text-highlight-hover" />
                <span>{site.address}</span>
              </p>
              {site.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                  className="flex items-center gap-3 text-sm text-white transition-colors hover:text-highlight-hover"
                >
                  <Phone size={18} className="shrink-0 text-highlight-hover" />
                  {phone}
                </a>
              ))}
            </div>

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-highlight-hover px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-highlight-hover"
            >
              View on Google Maps
              <MapPin size={15} />
            </a>
          </div>

          <div className="min-h-72 border-t border-stone-200 bg-stone-100 lg:min-h-112.5 lg:border-l lg:border-t-0">
            <iframe
              title={`${site.name} map`}
              src={`https://www.google.com/maps?q=${site.coordinates}&z=16&output=embed`}
              className="h-full min-h-72 w-full border-0 lg:min-h-112.5"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </article>
      </section>
    </main>
  );
}
