import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

const amenities = [
  {
    id: 1,
    number: "01",
    name: "Garden",
    category: "Nature & Wellness",
    icon: "city-park.webp",
    description:
      "Reconnect with nature in beautifully planned green spaces. Enjoy peaceful surroundings, morning walks, and relaxing moments in a greener environment.",
  },
  {
    id: 2,
    number: "02",
    name: "Kids Play Area",
    category: "Family Living",
    icon: "daycare.webp",
    description:
      "A dedicated space for children to play, explore, and enjoy outdoor activities in a community designed with family living in mind.",
  },
  {
    id: 3,
    number: "03",
    name: "Swimming Pool",
    category: "Leisure & Recreation",
    icon: "swimming.webp",
    description:
      "Enjoy a refreshing escape from your daily routine with a swimming facility designed for relaxation and leisure.",
  },
  {
    id: 4,
    number: "04",
    name: "24×7 Security",
    category: "Safety & Security",
    icon: "security-guard.webp",
    description:
      "Security arrangements designed to support peace of mind and a safer residential environment for residents.",
  },
  {
    id: 5,
    number: "05",
    name: "Meditation Center",
    category: "Mind & Body",
    icon: "meditation.webp",
    description:
      "Find a moment of calm in a dedicated space for meditation, reflection, and mindful living.",
  },
  {
    id: 6,
    number: "06",
    name: "Multi-Purpose Hall",
    category: "Community & Events",
    icon: "museum.webp",
    description:
      "A versatile community space for celebrations, social gatherings, and special occasions.",
  },
  {
    id: 7,
    number: "07",
    name: "Shopping Complex",
    category: "Everyday Convenience",
    icon: "store.webp",
    description:
      "Enjoy convenient access to shopping facilities intended to make everyday essentials easier to reach.",
  },
  {
    id: 8,
    number: "08",
    name: "Gated Community",
    category: "Community Living",
    icon: "barbed-wire.webp",
    description:
      "Experience a thoughtfully planned residential environment with defined entry points and a community-oriented lifestyle.",
  },
  {
    id: 9,
    number: "09",
    name: "Vastu Shastra",
    category: "Thoughtful Design",
    icon: "kumbh-kalash.webp",
    description:
      "Explore design principles inspired by Vastu Shastra, with attention to spatial planning and a harmonious living environment.",
  },
  {
    id: 10,
    number: "10",
    name: "Water Supply",
    category: "Essential Infrastructure",
    icon: "water.webp",
    description:
      "Water infrastructure is an essential part of everyday comfort. Contact our team to learn about the provisions available in your selected project.",
  },
  {
    id: 11,
    number: "11",
    name: "Generator Supply",
    category: "Essential Infrastructure",
    icon: "generator.webp",
    description:
      "Backup power provisions can help support essential services during power interruptions. Confirm the available backup arrangements with our team.",
  },
];

export default function ProjectAmenities({ onOpenContact }) {
  const [activeId, setActiveId] = useState(1);
  const [expandedId, setExpandedId] = useState(null);

  const activeAmenity =
    amenities.find((amenity) => amenity.id === activeId) || amenities[0];

  const handleContact = () => {
    if (onOpenContact) {
      onOpenContact();
    } else {
      window.location.href = "/contact";
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-white pt-20 text-text">
      {/* HERO SECTION */}
      <section className="relative flex min-h-97.5 items-center justify-center overflow-hidden px-5 py-15 text-center text-white md:min-h-117.5">
        <img
          src="/Properties/property-4-optimized.webp"
          srcSet="/Properties/property-4-optimized-720.webp 720w, /Properties/property-4-optimized-1120.webp 1120w, /Properties/property-4-optimized.webp 1400w"
          sizes="100vw"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-r from-layout-dark/85 via-layout-dark/65 to-layout-dark/35" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="mb-5 text-[10px] uppercase tracking-[0.45em] text-highlight md:text-xs">
            Vastu Vihar · Thoughtful Living
          </p>

          <h1 className="font-display text-5xl font-medium leading-[0.95] tracking-[-0.03em] sm:text-6xl md:text-8xl">
            The Art of
            <span className="mt-2 block italic text-highlight">
              Living Well
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/75 md:text-base">
            More than a home, a complete lifestyle. Discover thoughtfully
            planned amenities designed to enrich everyday living.
          </p>

          <div className="mx-auto mt-8 h-px w-20 bg-highlight" />
        </div>
      </section>

      {/* AMENITIES SECTION */}
      <section className="px-5 py-16 md:px-8 md:py-24 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:mb-14 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-highlight-hover">
                Designed around you
              </p>

              <h2 className="font-display text-4xl font-light sm:text-5xl md:text-6xl">
                Everyday, <span className="italic">Elevated.</span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-muted">
              From peaceful green spaces to everyday conveniences, explore the
              amenities that shape your lifestyle.
            </p>
          </div>

          <div className="grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            {/* AMENITY CARDS */}
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 md:gap-4">
              {amenities.map((amenity) => {
                const isActive = activeId === amenity.id;

                return (
                  <button
                    key={amenity.id}
                    type="button"
                    onMouseEnter={() => setActiveId(amenity.id)}
                    onFocus={() => setActiveId(amenity.id)}
                    onClick={() => {
                      setActiveId(amenity.id);
                      setExpandedId((prev) =>
                        prev === amenity.id ? null : amenity.id,
                      );
                    }}
                    aria-pressed={expandedId === amenity.id}
                    className={`group relative flex min-w-0 flex-col items-start justify-between overflow-hidden rounded-sm border p-4 text-left transition-all duration-300 lg:min-h-48 md:p-5 ${
              isActive
                        ? "border-border-dark bg-brand text-white shadow-lg"
                        : "border-[#deddd3] bg-white text-[#20251f] hover:border-[#c7a75f]"
                    }`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span
                        className={`text-[10px] tracking-widest ${
                          isActive ? "text-highlight" : "text-[#969589]"
                        }`}
                      >
                        {amenity.number}
                      </span>

                      <ArrowUpRight
                        size={15}
                        className={`transition-transform duration-300 ${
                          isActive
                            ? "-translate-y-0.5 translate-x-0.5 text-highlight"
                            : "text-[#aaa99e] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        }`}
                      />
                    </div>

                    <div className="flex lg:block w-full justify-between items-center">
                      <div>
                        <img
                          src={`/Icons/${amenity.icon}`}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          className="my-3 rounded-e-full object-contain size-20 md:size-14"
                        />
                      </div>

                      <div className="flex lg:block flex-col items-end">
                        <h3 className="text-sm font-medium leading-5 md:text-base">
                          {amenity.name}
                        </h3>

                        <p
                          className={`mt-1 text-[9px] uppercase tracking-wider ${
                            isActive ? "text-white/50" : "text-[#969589]"
                          }`}
                        >
                          {amenity.category}
                        </p>
                      </div>
                    </div>

                    {isActive && (
                      <span className="absolute bottom-0 left-0 h-0.5 w-full bg-highlight" />
                    )}

                    {/* Mobile details: displayed below the selected card */}
                    {expandedId === amenity.id && (
                      <div
                        className="mt-5 border-t border-highlight/40 pt-4 lg:hidden"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <p className="text-[9px] uppercase tracking-widest text-highlight">
                          {amenity.category}
                        </p>

                        <p className="mt-2 text-xs font-medium leading-5">
                          {amenity.name}
                        </p>

                        <p className="mt-2 text-xs leading-6 opacity-75">
                          {amenity.description}
                        </p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* ACTIVE AMENITY DETAILS */}
            <div
              className="relative hidden md:flex min-h-97.5 flex-col justify-between overflow-hidden rounded-xl bg-brand p-7 text-white md:min-h-112.5 md:p-10 lg:sticky lg:top-28"
              aria-live="polite"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full border border-highlight/10" />

              <div className="relative">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div className="flex size-20 items-center justify-center rounded-full border border-highlight/40 bg-white/5">
                    <img
                      key={activeAmenity.id}
                      src={`/Icons/${activeAmenity.icon}`}
                      alt=""
                      aria-hidden="true"
                      className="size-14 rounded-full object-cover"
                    />
                  </div>

                  <span className="font-display text-5xl text-white/15">
                    {activeAmenity.number}
                  </span>
                </div>

                <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-highlight">
                  {activeAmenity.category}
                </p>

                <h3 className="font-display text-3xl font-light leading-tight sm:text-4xl md:text-5xl">
                  {activeAmenity.name}
                </h3>

                <div className="my-6 h-px w-16 bg-highlight" />

                <p className="max-w-lg text-sm leading-7 text-white/70 md:text-base">
                  {activeAmenity.description}
                </p>

                {expandedId === activeAmenity.id && (
                  <p className="mt-4 flex items-center gap-2 text-xs text-highlight">
                    <Check size={15} />
                    Selected amenity
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleContact}
                className="relative mt-10 inline-flex w-fit items-center gap-3 border-b border-highlight/60 pb-2 text-[10px] font-medium uppercase tracking-[0.2em] transition-colors hover:text-highlight"
              >
                Enquire about our amenities
                <ArrowUpRight size={15} />
              </button>
            </div>
          </div>

          {/* COLLECTION FOOTER */}
          <div className="mt-10 flex flex-col gap-3 border-t border-[#d9d7cb] pt-5 text-[10px] uppercase tracking-[0.2em] text-[#858579] md:flex-row md:items-center md:justify-between">
            <span>Thoughtfully planned. Beautifully lived.</span>
            <span>{String(amenities.length).padStart(2, "0")} amenities</span>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-brand px-5 py-20 text-center text-white md:py-28">
        <div className="pointer-events-none absolute -left-20 -top-24 size-80 rounded-full border border-white/5" />
        <div className="pointer-events-none absolute -right-20 -bottom-24 size-80 rounded-full border border-white/5" />

        <div className="relative mx-auto max-w-2xl">
          <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-highlight">
            Your next chapter begins here
          </p>

          <h2 className="font-display text-4xl font-light sm:text-5xl md:text-6xl">
            Find your kind of
            <span className="block italic text-highlight">
              everyday luxury.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/65">
            Discover a community designed to bring comfort, convenience, and
            meaningful experiences closer to home.
          </p>

          <button
            type="button"
            onClick={handleContact}
            className="mt-8 inline-flex items-center gap-4 rounded-full bg-highlight px-7 py-4 text-xs font-semibold uppercase tracking-widest text-[#20251f] transition-colors hover:bg-white"
          >
            Enquire Now
            <ArrowUpRight size={16} />
          </button>
        </div>
      </section>
    </main>
  );
}
