import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

const amenities = [
  {
    id: 1,
    number: "01",
    name: "Robust Calcifying Microbe for enhanced lifespan of concrete Structure",
    category: "Nature & Wellness",
    icon: "cement-mixer.webp",
    description:
      "Bacillus pasteurii (previously known as Sporosarcina pasteurii) is a bacterium renowned for its ability to precipitate calcium and solidify sand when provided with a calcium source and urea. This process, known as microbiologically induced calcite precipitation (MICP), is a form of biological cementation. At Vastu Vihar's Research Team, we have successfully isolated and trained Bacillus pasteurii from alkaline soil found in cow farms, specifically in urine-rich areas. This strain has been adapted to thrive at a pH of 12 in tropical conditions. It secretes a cementitious material that facilitates self-healing in concrete, effectively reducing the need for external repairs. We have also induced genetic modifications to enhance calcium carbonate secretion at high pH levels. The integration of Bacillus pasteurii as an admixture in concrete has shown no negative impact on the slump or initial setting time. Its lifespan of approximately 200 years, coupled with its resilience to extreme temperature and pressure, makes it ideal for long-lasting concrete structures. Through MICP, the bacteria help repair cracks and strengthen the concrete by precipitating calcite, filling voids and reducing porosity, which enhances structural strength by up to 30%. Additionally, it shortens both the initial and final setting times of cement, reduces permeability, and lowers cement consumption, all while increasing the durability of the structure. In reinforced cement concrete (RCC), it prevents",
  },
  {
    id: 2,
    number: "02",
    name: "Welded Wire Girder",
    category: "Family Living",
    icon: "grid.webp",
    description:
      "The welded wire girder is a highly effective shear connector, ensuring proper load transfer between concrete panels. By eliminating solid concrete sections across the entire panel, this method reduces high-stress points, thermal inconsistencies, and moisture issues, resulting in a more efficient, cost-effective insulated wall panel. Most importantly, the welded wire girder accommodates the expansion and contraction of the outer width due to thermal fluctuations, ensuring the integrity of the structure.",
  },
  {
    id: 3,
    number: "03",
    name: "Insulated Walls (4 INCH & 8 INCH)",
    category: "Leisure & Recreation",
    icon: "wall.webp",
    description:
      "Our walls are constructed using the rat-trap bond technique, where bricks are placed vertically rather than horizontally, creating a cavity within the wall. This cavity, measuring 80-100 mm, reduces material use while maintaining the strength equivalent to that of a standard 230 mm thick brick wall. The staggered headers and stretchers in each layer further enhance structural strength. This method offers significant material savings—about 25% fewer bricks—and reduces overall construction costs by approximately 26% compared to traditional 230 mm walls. The air pockets formed between the brick layers also improve thermal comfort, especially in tropical climates, by acting as natural insulators.",
  },
  {
    id: 4,
    number: "04",
    name: "Insulated Roofs",
    category: "Safety & Security",
    icon: "layer.webp",
    description:
      "Our roofs are designed using filler slabs, where filler material is strategically placed in the tension zone to enhance insulation. This technique reduces heat transmission, ensuring a cooler indoor environment.",
  },
  {
    id: 5,
    number: "05",
    name: "Pre Fab Roofs",
    category: "Mind & Body",
    icon: "rain.webp",
    description:
      "We utilize pre-fabricated, leak-proof roofing panels for commercial, educational, and residential buildings. These panels are designed to withstand the elements, reduce heat transmission by 8-12 degrees, and minimize noise from rain. They are corrosion-resistant, durable, and aesthetically appealing, making them a cost-effective roofing solution requiring minimal maintenance.",
  },
  {
    id: 6,
    number: "06",
    name: "Green Energy",
    category: "Community & Events",
    icon: "save-energy.webp",
    description:
      "At Vastu Vihar, we strive to minimize our carbon footprint by incorporating environmentally friendly, non-polluting energy solutions in our projects.",
  },
  {
    id: 7,
    number: "07",
    name: "Solar Moving Roof",
    category: "Everyday Convenience",
    icon: "solar-panel.webp",
    description:
      "These roofs rotate throughout the day to capture maximum sunlight, ensuring optimal electricity generation.",
  },
  {
    id: 8,
    number: "08",
    name: "Solar Roof Light",
    category: "Community Living",
    icon: "solar-energy.webp",
    description:
      "LED bulbs powered by solar energy illuminate homes.",
  },
  {
    id: 9,
    number: "09",
    name: "Solar Ac",
    category: "Thoughtful Design",
    icon: "ac.webp",
    description:
      "Our solar-powered air conditioners regulate indoor temperatures without relying on grid power.",
  },
  {
    id: 10,
    number: "10",
    name: "Solar Water And Room Heater",
    category: "Essential Infrastructure",
    icon: "heater.webp",
    description:
      "Solar-powered systems provide hot water and heating, further reducing reliance on conventional energy sources.",
  },
  {
    id: 11,
    number: "11",
    name: "Voc Free Construction",
    category: "Essential Infrastructure",
    icon: "engineer.webp",
    description:
      "We have developed techniques to eliminate volatile organic compounds (VOCs) generated during construction, ensuring a healthier living environment.",
  },
  {
    id: 12,
    number: "12",
    name: "Micro-organisms Based sanitation System",
    category: "Essential Infrastructure",
    icon: "sanitizer.webp",
    description:
      "Our R&D team has pioneered a sanitation system that harnesses microorganisms to break down waste. This system requires no periodic emptying and remains fully functional over time, making it a sustainable and cost-effective solution.",
  },
];

export default function Technology({ onOpenContact }) {
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
    <main className="min-h-screen overflow-hidden bg-brand-paper pt-20 text-brand-ink">
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

        <div className="absolute inset-0 bg-linear-to-r from-brand-forest/85 via-brand-forest/65 to-brand-forest/35" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="mb-5 text-[10px] uppercase tracking-[0.45em] text-brand-gold md:text-xs">
            Vastu Vihar · Thoughtful Living
          </p>

          <h1 className="font-serif text-5xl font-medium leading-[0.95] tracking-[-0.03em] sm:text-6xl md:text-8xl">
            Technology for
            <span className="mt-2 block italic text-brand-gold">
              Better Living
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/75 md:text-base">
            Explore the construction methods, durable materials, and clean-energy
            systems that make Vastu Vihar homes more comfortable, efficient, and
            resilient.
          </p>

          <div className="mx-auto mt-8 h-px w-20 bg-brand-gold" />
        </div>
      </section>

      {/* TECHNOLOGY SECTION */}
      <section className="px-5 py-16 md:px-8 md:py-24 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:mb-14 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-brand-ochre">
                Building technology
              </p>

              <h2 className="font-serif text-4xl font-light sm:text-5xl md:text-6xl">
                Innovation, <span className="italic">Built In.</span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-brand-muted">
              From self-healing concrete and insulated walls to solar-powered
              systems, discover technologies that improve durability, comfort,
              and energy efficiency.
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
                        ? "border-brand-brass bg-brand-pine text-white shadow-lg"
                        : "border-[#deddd3] bg-white text-[#20251f] hover:border-[#c7a75f]"
                    }`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span
                        className={`text-[10px] tracking-widest ${
                          isActive ? "text-brand-gold" : "text-[#969589]"
                        }`}
                      >
                        {amenity.number}
                      </span>

                      <ArrowUpRight
                        size={15}
                        className={`transition-transform duration-300 ${
                          isActive
                            ? "-translate-y-0.5 translate-x-0.5 text-brand-gold"
                            : "text-[#aaa99e] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        }`}
                      />
                    </div>

                    <div className="flex lg:block w-full justify-between items-center">
                      <div className="w-full">
                        <img
                          src={`/Icons/${amenity.icon}`}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          className="p-3 my-3 mr-2 bg-white rounded-2xl object-contain size-20"
                        />
                      </div>

                      <div className="flex lg:block flex-col w-full items-end">
                        <h3 className="text-xs font-semibold leading-5 text-right">
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
                      <span className="absolute bottom-0 left-0 h-0.5 w-full bg-brand-gold" />
                    )}

                    {/* Mobile details: displayed below the selected card */}
                    {expandedId === amenity.id && (
                      <div
                        className="mt-5 border-t border-brand-gold/40 pt-4 lg:hidden"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <p className="text-[9px] uppercase tracking-widest text-brand-gold">
                          {amenity.category}
                        </p>

                        <p className="mt-2 text-xs font-semibold leading-5">
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
              className="relative hidden md:flex min-h-97.5 flex-col justify-between overflow-hidden rounded-xl bg-brand-pine p-7 text-white md:min-h-112.5 md:p-10 lg:sticky lg:top-28"
              aria-live="polite"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full border border-brand-gold/10" />

              <div className="relative">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div className="flex size-20 items-center justify-center rounded-full border border-brand-gold/40 bg-white/5">
                    <img
                      key={activeAmenity.id}
                      src={`/Icons/${activeAmenity.icon}`}
                      alt=""
                      aria-hidden="true"
                      className="size-14 rounded-full object-cover"
                    />
                  </div>

                  <span className="font-serif text-5xl text-white/15">
                    {activeAmenity.number}
                  </span>
                </div>

                <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-brand-gold">
                  {activeAmenity.category}
                </p>

                <h3 className="font-serif text-3xl font-light leading-tight sm:text-4xl md:text-5xl">
                  {activeAmenity.name}
                </h3>

                <div className="my-6 h-px w-16 bg-brand-gold" />

                <p className="max-w-lg text-sm leading-7 text-white/70 md:text-base">
                  {activeAmenity.description}
                </p>

                {expandedId === activeAmenity.id && (
                  <p className="mt-4 flex items-center gap-2 text-xs text-brand-gold">
                    <Check size={15} />
                    Selected technology
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleContact}
                className="relative mt-10 inline-flex w-fit items-center gap-3 border-b border-brand-gold/60 pb-2 text-[10px] font-medium uppercase tracking-[0.2em] transition-colors hover:text-brand-gold"
              >
                Enquire about our technology
                <ArrowUpRight size={15} />
              </button>
            </div>
          </div>

          {/* COLLECTION FOOTER */}
          <div className="mt-10 flex flex-col gap-3 border-t border-[#d9d7cb] pt-5 text-[10px] uppercase tracking-[0.2em] text-[#858579] md:flex-row md:items-center md:justify-between">
            <span>Thoughtfully engineered. Built to last.</span>
            <span>{String(amenities.length).padStart(2, "0")} technologies</span>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-brand-pine px-5 py-20 text-center text-white md:py-28">
        <div className="pointer-events-none absolute -left-20 -top-24 size-80 rounded-full border border-white/5" />
        <div className="pointer-events-none absolute -right-20 -bottom-24 size-80 rounded-full border border-white/5" />

        <div className="relative mx-auto max-w-2xl">
          <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-brand-gold">
            Your next chapter begins here
          </p>

          <h2 className="font-serif text-4xl font-light sm:text-5xl md:text-6xl">
            Find your kind of
            <span className="block italic text-brand-gold">
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
            className="mt-8 inline-flex items-center gap-4 rounded-full bg-brand-gold px-7 py-4 text-xs font-semibold uppercase tracking-widest text-[#20251f] transition-colors hover:bg-white"
          >
            Enquire Now
            <ArrowUpRight size={16} />
          </button>
        </div>
      </section>
    </main>
  );
}
