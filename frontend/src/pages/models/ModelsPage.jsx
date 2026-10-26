import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const properties = [
  {
    id: 1,
    number: "01",
    name: "Pashupati Bungalow",
    location: "Nepal",
    bhk: "3 BHK",
    type: "Premium Living",
    image: "/Properties/model-pashupati.webp",
    imageSmall: "/Properties/model-pashupati-480.webp",
    imageMedium: "/Properties/model-pashupati-720.webp",
    imageLarge: "/Properties/model-pashupati-960.webp",
    description: "Thoughtfully designed spaces for modern living.",
  },
  {
    id: 2,
    number: "02",
    name: "Kanchanjunga Bungalow",
    location: "Nepal",
    bhk: "5 BHK",
    type: "Villa Collection",
    image: "/Properties/model-kanchanjunga.webp",
    imageSmall: "/Properties/model-kanchanjunga-480.webp",
    imageMedium: "/Properties/model-kanchanjunga-720.webp",
    imageLarge: "/Properties/model-kanchanjunga-960.webp",
    description: "A peaceful lifestyle surrounded by greenery.",
  },
  {
    id: 3,
    number: "03",
    name: "Sagarmatha Bungalow",
    location: "Nepal",
    bhk: "5 BHK",
    type: "Residential Plots",
    image: "/Properties/model-sagarmatha.webp",
    imageSmall: "/Properties/model-sagarmatha-480.webp",
    imageMedium: "/Properties/model-sagarmatha-720.webp",
    imageLarge: "/Properties/model-sagarmatha-960.webp",
    description: "Space to create a home of your own.",
  },
  {
    id: 4,
    number: "04",
    name: "Suryodaya Bungalow",
    location: "Nepal",
    bhk: "7 BHK",
    type: "Modern Residences",
    image: "/Properties/model-suryodaya.webp",
    width: 261,
    height: 200,
    description: "A considered approach to contemporary living.",
  },
  {
    id: 5,
    number: "05",
    name: "Simplex Bungalow",
    location: "Nepal",
    bhk: "2 BHK",
    type: "Community Living",
    image: "/Properties/model-simplex.webp",
    imageSmall: "/Properties/model-simplex-480.webp",
    imageMedium: "/Properties/model-simplex-720.webp",
    imageLarge: "/Properties/model-simplex-960.webp",
    description: "A community shaped around space and nature.",
  },
  {
    id: 6,
    number: "06",
    name: "Small Suryodaya Bungalow",
    location: "Nepal",
    bhk: "5 BHK",
    type: "Community Living",
    image: "/Properties/model-small-suryodaya.webp",
    imageSmall: "/Properties/model-small-suryodaya-480.webp",
    imageMedium: "/Properties/model-small-suryodaya-720.webp",
    imageLarge: "/Properties/model-small-suryodaya-960.webp",
    description: "A community shaped around space and nature.",
  },
  {
    id: 7,
    number: "07",
    name: "Bagmati Bungalow",
    location: "Nepal",
    bhk: "4 BHK",
    type: "Community Living",
    image: "/Properties/model-bagmati.webp",
    imageSmall: "/Properties/model-bagmati-480.webp",
    imageMedium: "/Properties/model-bagmati-720.webp",
    imageLarge: "/Properties/model-bagmati-960.webp",
    description: "A community shaped around space and nature.",
  },
];

export default function Models() {
  return (
    <section
      id="projects"
      className="relative mt-5 w-full overflow-hidden bg-brand-paper px-5 py-20 text-brand-ink sm:px-8 sm:py-24 lg:px-16 lg:py-28"
    >
      {/* Section heading */}
      <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-ochre sm:text-[11px]">
          Designed for living
        </p>
        <h2 className="font-serif text-5xl font-medium tracking-[-0.04em] text-brand-pine sm:text-6xl md:text-7xl">
          Find a home that fits.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-brand-muted">
          Explore a range of homes, each with a considered layout and its own
          character.
        </p>
      </div>

      {/* Responsive property grid */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
        {properties.map((property, index) => (
          <article
            key={property.id}
            className="group relative min-w-0 overflow-hidden border rounded border-brand-line bg-brand-pine shadow-sm transition-shadow duration-300 hover:shadow-[0_18px_44px_rgba(24,56,47,0.16)]"
          >
            <div className="relative h-97.5 overflow-hidden sm:h-115 lg:h-130">
              <div className="overflow-hidden h-70">
                <img
                  src={property.image}
                  srcSet={
                    property.imageSmall
                      ? `${property.imageSmall} 480w, ${property.imageMedium} 720w, ${property.imageLarge} 960w, ${property.image} 1400w`
                      : undefined
                  }
                  sizes="(min-width: 1280px) 410px, (min-width: 640px) calc((100vw - 3.5rem) / 2), calc(100vw - 2.5rem)"
                  alt={property.name}
                  width={property.width ?? 1400}
                  height={property.height ?? 788}
                  fetchPriority={index === 0 ? "high" : undefined}
                  loading={index === 0 ? "eager" : "lazy"}
                  draggable="false"
                  className="h-full w-full object-cover border-b border-brand-gold transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/25 via-transparent to-black/90" />

                <span className="absolute left-4 top-4 bg-brand-paper/95 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-brand-pine sm:left-5 sm:top-5">
                  {property.type}
                </span>
                <span className="absolute right-4 top-4 font-serif text-xl text-white/75 sm:right-5 sm:top-5">
                  {property.number}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/75">
                  <MapPin size={13} />
                  {property.location}
                </p>
                <h3 className="font-serif text-2xl leading-tight text-white uppercase sm:text-2xl">
                  {property.name}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
                  {property.bhk}
                </p>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
                  {property.description}
                </p>
                <Link
                  to={`/properties/${property.id}`}
                  className="mt-5 inline-flex items-center gap-3 border-b border-white/60 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:border-brand-champagne hover:text-brand-champagne"
                >
                  Discover property
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom label */}
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 border-t border-[#d8d5c9] pt-5 text-[10px] uppercase tracking-[0.16em] text-brand-muted sm:flex-row sm:items-center sm:justify-between">
        <span>Explore the collection</span>
        <span>{String(properties.length).padStart(2, "0")} models</span>
      </div>
    </section>
  );
}
