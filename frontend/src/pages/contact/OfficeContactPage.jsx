import { Mail, MapPin, Phone } from "lucide-react";

const contactCards = [
  {
    eyebrow: "Birgunj office",
    title: "Birgunj",
    address: "Shop No-8, 2nd Floor, Rungta Mall, Adarsh Nagar, Birgunj - 44300",
    phones: ["+977 - 98025-91815"],
    email: "info@vastuvihar.org",
    coordinates: "27.010567,84.875074",
  },
  {
    eyebrow: "Birtamode office",
    title: "Birtamode",
    address: "211, 2nd Floor, Hanuman Center, Mukti Chowk, Birtamode, Jhapa",
    phones: ["+977 - 9705191815", "+977 - 9708091332"],
    email: "info@vastuvihar.org",
    coordinates: "26.645816643704492,87.9900848872459",
  },
];

function ContactCard({ eyebrow, title, address, phones, email, coordinates }) {
  const mapUrl = `https://www.google.com/maps?q=${coordinates}`;

  return (
    <article className="flex h-full flex-col rounded-sm border border-brand-line bg-brand-forest p-7 shadow-[0_12px_36px_rgba(16,41,32,0.07)] sm:p-9">
      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-ochre">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-serif text-3xl font-light text-brand-gold sm:text-4xl">
        {title}
      </h2>

      <div className="mt-8 space-y-5 border-t border-stone-200 pt-7">
        <p className="flex items-start gap-3 text-sm leading-7 text-white">
          <MapPin size={18} className="mt-1 shrink-0 text-brand-ochre" />
          <span>{address}</span>
        </p>
        {phones.map((phone) => (
          <a
            key={phone}
            href={`tel:${phone.replace(/[^\d+]/g, "")}`}
            className="flex items-center gap-3 text-sm text-white transition-colors hover:text-brand-ochre"
          >
            <Phone size={18} className="shrink-0 text-brand-ochre" />
            {phone}
          </a>
        ))}
        {email && (
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-3 text-sm text-white transition-colors hover:text-brand-ochre"
          >
            <Mail size={18} className="shrink-0 text-brand-ochre" />
            {email}
          </a>
        )}
      </div>

      <div className="mt-7 overflow-hidden rounded-lg border border-stone-200 bg-stone-100">
        <iframe
          title={`${title} map`}
          src={`https://www.google.com/maps?q=${coordinates}&z=16&output=embed`}
          className="h-56 w-full border-0 sm:h-64"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#80612d] transition-colors hover:text-brand-ochre"
      >
        View on Google Maps
        <MapPin size={14} />
      </a>
    </article>
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-brand-paper px-5 pb-16 pt-20 sm:px-8 lg:px-16">
      <section className="mx-auto max-w-7xl py-12 sm:py-16 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-brand-ochre">
            Vastu Vihar Nepal
          </p>
          <h1 className="mt-4 font-serif text-5xl font-light leading-tight text-brand-pine sm:text-6xl">
            Contact our team
          </h1>
          <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
            Visit either of our offices in Birgunj or Birtamode.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 md:gap-7">
          {contactCards.map((card) => (
            <ContactCard key={card.eyebrow} {...card} />
          ))}
        </div>
      </section>
    </main>
  );
}
