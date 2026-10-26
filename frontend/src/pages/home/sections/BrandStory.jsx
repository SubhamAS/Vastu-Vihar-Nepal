import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { value: "01", label: "BUILDER" },
  { value: "02", label: "COUNTRIES" },
  { value: "02", label: "STATES" },
  { value: "03", label: "CITIES" },
  { value: "20,000", label: "PROJECTS" },
];

export default function BrandStory() {
  return (
    <section
      id="brand-story"
      className="relative isolate min-h-162.5 w-full overflow-hidden bg-brand-pine text-white sm:min-h-175"
    >
      {/* Background image */}
      <img
        src="/Properties/About.webp"
        alt="Aerial view of a residential township"
        loading="lazy"
        width={1901}
        height={1107}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />

      {/* Background overlay */}
      <div className="absolute inset-0 -z-10 bg-brand-forest/55" />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-brand-forest/90 via-brand-forest/60 to-brand-forest/35" />

      {/* Main content */}
      <div className="mx-auto grid min-h-162.5 max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 sm:px-10 sm:py-24 md:min-h-175 md:grid-cols-[1.4fr_1fr] md:gap-5 lg:px-16">
        {/* Brand story */}
        <div className="max-w-xl">
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-champagne sm:text-xs">
            Welcome to
          </p>

          <h2 className="font-serif text-6xl font-medium tracking-[-0.03em] sm:text-7xl lg:text-8xl">
            VAS<span className="bg-brand-gold/80">TU</span>
            <br />
            <span className="bg-brand-gold/80">VIH</span>AR
          </h2>

          <p className="mt-5 text-xl font-light text-white/90 sm:text-2xl lg:text-3xl">
            Building more than homes.
          </p>

          <p className="mt-6 max-w-md text-sm leading-7 text-white/75 sm:text-base">
            Building more than homes. We create thoughtfully planned communities
            where aspirations take shape and families find a place to belong.
          </p>

          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-3 border-b border-brand-gold/70 pb-3 text-[10px] uppercase tracking-[0.25em] hover:text-brand-gold sm:mt-10"
          >
            Discover our story
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-l border-brand-champagne/60 pl-4 sm:pl-5"
            >
              <p className="font-serif text-3xl font-light tracking-tight sm:text-5xl lg:text-6xl">
                {stat.value}
              </p>

              <p className="mt-3 text-[9px] font-medium uppercase tracking-[0.16em] text-brand-champagne sm:text-[10px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-5 left-6 flex items-center gap-3 sm:bottom-8 sm:left-10 lg:left-16">
        <span className="h-px w-8 bg-brand-gold" />
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/65">
          Our legacy
        </span>
      </div>
    </section>
  );
}
