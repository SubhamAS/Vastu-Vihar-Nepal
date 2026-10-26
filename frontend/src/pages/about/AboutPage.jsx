export default function About() {
  return (
    <section
      id="brand-story"
      className="relative flex flex-wrap justify-center items-center isolate min-h-162.5 w-full overflow-hidden bg-brand-pine text-white sm:min-h-screen"
    >
      {/* Background image */}
      <img
        src="/Properties/ab-hero.webp"
        alt="Aerial view of a residential township"
        width={1901}
        height={1107}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        loading="eager"
        fetchPriority="high"
      />

      {/* Background overlay */}
      <div className="absolute inset-0 -z-10 bg-brand-forest/60" />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-brand-forest/90 via-brand-forest/65 to-brand-forest/40" />

      {/* About content */}
      <div className="mx-auto grid min-h-162.5 max-w-7xl items-center gap-10 px-6 py-24 sm:min-h-175 sm:px-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16 lg:px-16">
        <div className="max-w-xl">
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-champagne sm:text-xs">
            Welcome to
          </p>

          <h1 className="font-serif text-6xl font-normal tracking-[-0.03em] sm:text-7xl lg:text-8xl">
            VAS<span className="bg-brand-gold/80">TU</span>
            <br />
            <span className="bg-brand-gold/80">VIH</span>AR
          </h1>

          <p className="mt-5 max-w-sm text-xl font-light leading-relaxed text-white/70 sm:text-2xl">
            Building more than homes.
          </p>
        </div>
        <div className="max-w-2xl border-l border-brand-champagne/50 pl-6 sm:pl-8">
          <p className="text-sm leading-8 text-white/80 sm:text-base">
            Vastu Vihar is not just a name—it is the gateway to countless
            dreams. As Eastern India’s and Nepal's leading real estate company,
            we are driven by a single mission: making the joy of home ownership
            a reality for everyone. Technoculture (Vastu Vihar) was established
            in the year 1994, co-sponsored by HUDCO and BMTPC of India. In the
            span of 30 years, we extended our presence in over 65+ cities in
            India.
            <br />
            <br />
            With Vastu Vihar, one can elevate their lifestyle and experience
            luxury without breaking the bank balance. Whether you are looking
            for a cozy apartment, a spacious townhouse, or a grand bungalow, we
            offer a variety of housing options tailored to your needs. Discover
            the perfect home that blends comfort, style, and affordability—only
            at Vastu Vihar.
          </p>
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
