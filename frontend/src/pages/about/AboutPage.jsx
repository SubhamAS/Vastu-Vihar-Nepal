import {
  ArrowUpRight,
  Building2,
  Handshake,
  Leaf,
  MapPin,
  ShieldCheck,
  Sparkles,
  Trees,
} from "lucide-react";

const milestones = [
  { value: "20,000+", label: "homes built" },
  { value: "65+", label: "cities reached" },
  { value: "1,700", label: "team members" },
  { value: "1994", label: "founded in Patna" },
];

const reasons = [
  {
    number: "01",
    title: "Affordable luxury",
    detail: "Premium living designed to stay within reach.",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "Smart eco-design",
    detail: "Green spaces and energy-conscious design for a more sustainable future.",
    icon: Leaf,
  },
  {
    number: "03",
    title: "32 years of trust",
    detail: "A legacy built on keeping promises and creating vibrant communities.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "Thoughtful amenities",
    detail: "Parks, clubhouses and everyday facilities close to home.",
    icon: Trees,
  },
  {
    number: "05",
    title: "Connected locations",
    detail: "Homes close to urban hubs, with room for a calmer pace of life.",
    icon: MapPin,
  },
];

export default function About() {
  return (
    <main className="bg-white text-text">
      <section className="relative isolate flex min-h-170 items-end overflow-hidden bg-brand px-6 pb-16 pt-36 text-white sm:min-h-190 sm:px-10 sm:pb-20 lg:px-16">
        <img
          src="/Properties/About.webp"
          alt="A row of modern homes in a landscaped residential community"
          width={1901}
          height={1107}
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-layout-dark/85 via-layout-dark/45 to-layout-dark/10" />

        <div className="mx-auto mb-2 grid w-full max-w-7xl items-end gap-12">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-brand-light">
              From India, since 1994
            </p>
            <h1 className="max-w-3xl font-display text-5xl font-medium leading-[0.98] tracking-[-0.045em] sm:text-7xl lg:text-8xl">
              A home can change everything.
            </h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-white/80 sm:text-lg">
              We build homes and communities that bring quality living within
              reach for more families.
            </p>
          </div>
          <div className="border-l border-white/45 pl-6 sm:pl-8 md:mb-2">
            <p className="text-sm leading-7 text-white/80 sm:text-base w-200">
              Technoculture (Vastu Vihar) began in India in 1994, co-sponsored
              by HUDCO and BMTPC of India. Today, the construction group works
              across Eastern India, building low-cost homes while upholding
              high standards of quality, authenticity and engineering.
            </p>
          </div>
        </div>
        <div className="absolute bottom-6 right-6 hidden items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/65 sm:flex lg:right-16">
          <span className="h-px w-8 bg-highlight" />
          Our story
        </div>
      </section>

      <section className="px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-2 border-l border-t border-border-light sm:grid-cols-4">
          {milestones.map(({ value, label }) => (
            <div
              key={label}
              className="border-b border-r border-border-light px-5 py-7 sm:px-7 sm:py-8"
            >
              <p className="font-display text-3xl font-medium tracking-tight text-brand sm:text-4xl">
                {value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.12em] text-muted sm:text-sm">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div className="relative min-h-90 overflow-hidden bg-gray-light sm:min-h-120">
            <img
              src="/Properties/ab-hero.webp"
              alt="A modern home in a green residential neighborhood"
              width={960}
              height={640}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-highlight px-6 py-5 flex flex-col items-center text-white sm:p-6 rounded-r-2xl">
              <p className="font-display text-3xl font-medium">1994</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.16em]">
                Founded in Patna, India
              </p>
            </div>
          </div>
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-highlight-hover sm:text-xs">
              A wider footprint
            </p>
            <h2 className="max-w-2xl font-display text-4xl font-medium leading-tight tracking-[-0.035em] text-brand sm:text-5xl">
              Growing with the communities we serve.
            </h2>
            <p className="mt-6 text-sm leading-7 text-muted sm:text-base sm:leading-8">
              What started in India has grown into a construction group active
              in more than 65+ cities across Bihar, Jharkhand, Odisha, West
              Bengal and Uttar Pradesh. With 20,000+ homes built and a team of
              1,700 people, Vastu Vihar works to make home ownership more
              accessible and the housing experience better.
            </p>
            <div className="mt-8 flex items-start gap-4 border-t border-border-light pt-6">
              <MapPin className="mt-1 shrink-0 text-highlight" size={20} />
              <div>
                <p className="text-sm font-semibold text-brand">Across 2 Countries</p>
                <p className="mt-1 text-sm leading-6 text-muted">
                  India · Nepal
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-light px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl sm:mb-14">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-highlight-hover sm:text-xs">
              What guides us
            </p>
            <h2 className="font-display text-4xl font-medium leading-tight tracking-[-0.035em] text-brand sm:text-5xl">
              Better living, built on purpose.
            </h2>
          </div>
          <div className="space-y-5">
            <article className="grid overflow-hidden bg-brand text-white md:grid-cols-[0.9fr_1.1fr]">
              <div className="relative aspect-square overflow-hidden bg-white/5 md:aspect-auto md:min-h-105">
                <img
                  src="/Properties/vision.png"
                  alt="A home surrounded by green space"
                  width={540}
                  height={540}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                <p className="text-xs uppercase tracking-[0.18em] text-brand-light">
                  Our vision
                </p>
                <p className="mt-5 font-display text-2xl leading-snug sm:text-3xl">
                  Improve quality of life and living standards through affordable
                  housing and business centres.
                </p>
              </div>
            </article>
            <article className="grid overflow-hidden border border-border-light bg-white md:grid-cols-[1.1fr_0.9fr]">
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                <p className="text-xs uppercase tracking-[0.18em] text-highlight-hover">
                  Our mission
                </p>
                <p className="mt-5 font-display text-2xl leading-snug text-brand sm:text-3xl">
                  Lead in quality construction and engineering, delivering a
                  consistently high standard of excellence.
                </p>
              </div>
              <div className="relative aspect-square overflow-hidden bg-gray-light md:aspect-auto md:min-h-105">
                <img
                  src="/Properties/mission.webp"
                  alt="A team joining hands around a shared goal"
                  width={540}
                  height={540}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </article>
            <article className="border border-border-light bg-white p-7 sm:p-10 md:col-span-2 md:grid md:grid-cols-[0.65fr_1.35fr] md:items-start md:gap-10">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-highlight-hover">
                  Our core
                </p>
                <h3 className="mt-4 font-display text-2xl font-medium text-brand sm:text-3xl">
                  Raise standards. Build for the long term.
                </h3>
              </div>
              <p className="mt-5 text-sm leading-7 text-muted md:mt-0 sm:text-base sm:leading-8">
                We pursue innovative structural engineering and streamline our
                operations to benefit clients. We also aim to empower our
                workforce to keep learning, evolve and act as individuals.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-14 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-highlight-hover sm:text-xs">
                Why Vastu Vihar
              </p>
              <h2 className="font-display text-4xl font-medium leading-tight tracking-[-0.035em] text-brand sm:text-5xl">
                More than a place to live.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-muted sm:text-base">
              For more than three decades, we have brought together attainable
              homes, thoughtful design and community life.
            </p>
          </div>
          <div className="grid gap-px bg-border-light sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map(({ number, title, detail, icon: Icon }) => (
              <article key={number} className="bg-white p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-[0.16em] text-muted">{number}</span>
                  <Icon size={20} className="text-highlight" strokeWidth={1.6} />
                </div>
                <h3 className="mt-8 font-display text-xl font-medium text-brand sm:text-2xl">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-10 sm:pb-24 lg:px-16">
        <div className="mx-auto grid max-w-7xl items-center gap-8 border-y border-border-light py-9 md:grid-cols-[1fr_auto] md:gap-12 md:py-12">
          <div className="flex items-start gap-5">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand text-white">
              <Handshake size={21} />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-highlight-hover">
                Home finance support
              </p>
              <h2 className="mt-2 font-display text-2xl font-medium text-brand sm:text-3xl">
                Backed by trusted banking partners.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                Partnerships with more than 15 nationalised and private
                financial institutions across Eastern India help make home
                loan approvals more accessible.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 md:border-l md:border-border-light md:py-3 md:pl-10">
            <Building2 className="shrink-0 text-highlight" size={22} />
            <span className="text-sm font-semibold text-brand">15+ partners</span>
            <ArrowUpRight className="text-muted" size={16} />
          </div>
        </div>
      </section>
    </main>
  );
}
