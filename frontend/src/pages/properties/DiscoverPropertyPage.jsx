import { useParams, Link } from "react-router-dom";
import { ArrowLeft, House, MapPin } from "lucide-react";

const properties = [
  {
    id: 1,
    name: "Pashupati Bungalow",
    location: "Nepal",
    bhk: "3 BHK",
    type: "Premium Living",
    image: "/Properties/model-pashupati.webp",
    imageSmall: "/Properties/model-pashupati-720.webp",
    imageMedium: "/Properties/model-pashupati-960.webp",
    floorPlan: "/Properties/pashupati_2d_floor_plan.webp",
    floorPlanWidth: 3509, floorPlanHeight: 2480,
    description: "Thoughtfully designed spaces for modern living.",
    areaDetails: [
      { label: "Builtup Area", value: "1460 Sqft" },
      { label: "Plot Area", value: "1540 Sqft" },
      { label: "Carpet Area", value: "1156 Sqft" },
      { label: "Bedrooms", value: "2" },
      { label: "Bathroom", value: "2" },
      { label: "HALL", value: "1" },
      { label: "Parking Place", value: "1" },
      { label: "Floors", value: "G+1" },
    ],
  },
  {
    id: 2,
    name: "Kanchanjunga Bungalow",
    location: "Nepal",
    bhk: "5 BHK",
    type: "Villa Collection",
    image: "/Properties/model-kanchanjunga.webp",
    imageSmall: "/Properties/model-kanchanjunga-720.webp",
    imageMedium: "/Properties/model-kanchanjunga-960.webp",
    floorPlan: "/Properties/Kanchanjunga_2d_floor_plan.webp",
    floorPlanWidth: 3509, floorPlanHeight: 2480,
    description: "A peaceful lifestyle surrounded by greenery.",
    areaDetails: [
      { label: "Builtup Area", value: "2450 Sqft" },
      { label: "Plot Area", value: "1800 Sqft" },
      { label: "Carpet Area", value: "1680 Sqft" },
      { label: "Bedrooms", value: "5" },
      { label: "Bathroom", value: "4" },
      { label: "Kitchen", value: "2" },
      { label: "Parking Place", value: "2" },
      { label: "Floors", value: "G+2" },
    ],
  },
  {
    id: 3,
    name: "Sagarmatha Bungalow",
    location: "Nepal",
    bhk: "5 BHK",
    type: "Residential Plots",
    image: "/Properties/model-sagarmatha.webp",
    imageSmall: "/Properties/model-sagarmatha-720.webp",
    imageMedium: "/Properties/model-sagarmatha-960.webp",
    floorPlan: "/Properties/sagarmatha_2d_floor_plan.webp",
    floorPlanWidth: 3509, floorPlanHeight: 2480,
    description: "Space to create a home of your own.",
    areaDetails: [
      { label: "Builtup Area", value: "2285 Sqft" },
      { label: "Plot Area", value: "1600 Sqft" },
      { label: "Carpet Area", value: "1730 Sqft" },
      { label: "Bedrooms", value: "5" },
      { label: "Bathroom", value: "5" },
      { label: "Open Kitchen", value: "3" },
      { label: "Parking Place", value: "1" },
      { label: "Floors", value: "G+2" },
    ],
  },
  {
    id: 4,
    name: "Suryodaya Bungalow",
    location: "Nepal",
    bhk: "7 BHK",
    type: "Modern Residences",
    image: "/Properties/model-suryodaya.webp",
    imageWidth: 261, imageHeight: 200,
    floorPlan: "/Properties/suryodaya_2d_floor_plan.webp",
    floorPlanWidth: 3509, floorPlanHeight: 2480,
    description: "A considered approach to contemporary living.",
    areaDetails: [
      { label: "Builtup Area", value: "3700 Sqft" },
      { label: "Plot Area", value: "2800 Sqft" },
      { label: "Carpet Area", value: "2817 Sqft" },
      { label: "Bedrooms", value: "7" },
      { label: "Bathroom", value: "4" },
      { label: "Drawing / Office", value: "1" },
      { label: "Parking Place", value: "1" },
      { label: "Floors", value: "G+1" },
    ],
  },
  {
    id: 5,
    name: "Simplex Bungalow",
    location: "Nepal",
    bhk: "2 BHK",
    type: "Community Living",
    image: "/Properties/model-simplex.webp",
    imageSmall: "/Properties/model-simplex-720.webp",
    imageMedium: "/Properties/model-simplex-960.webp",
    floorPlan: "/Properties/simplex_3d_floor_plan.webp",
    floorPlanWidth: 4962, floorPlanHeight: 3509,
    description: "A community shaped around space and nature.",
    areaDetails: [
      { label: "Builtup Area", value: "850 Sqft" },
      { label: "Plot Area", value: "1400 Sqft" },
      { label: "Bedrooms", value: "2" },
      { label: "Bathroom", value: "2" },
      { label: "Toilet", value: "1" },
      { label: "Parking Place", value: "1" },
      { label: "Floors", value: "1" },
    ],
  },
  {
    id: 6,
    number: "06",
    name: "Small Suryodaya Bungalow",
    location: "Nepal",
    bhk: "5 BHK",
    type: "Community Living",
    image: "/Properties/model-small-suryodaya.webp",
    imageSmall: "/Properties/model-small-suryodaya-720.webp",
    imageMedium: "/Properties/model-small-suryodaya-960.webp",
    floorPlan: "/Properties/small_suryodaya.webp",
    floorPlanWidth: 4967, floorPlanHeight: 3509,
    description: "A community shaped around space and nature.",
    areaDetails: [
      { label: "Builtup Area", value: "2900 Sqft" },
      { label: "Plot Area", value: "2410 Sqft" },
      { label: "Carpet Area", value: "2470 Sqft" },
      { label: "Bedrooms", value: "5" },
      { label: "Bathroom", value: "4" },
      { label: "Drawing / Office", value: "1" },
      { label: "Parking Place", value: "1" },
      { label: "Floors", value: "1" },
    ],
  },
  {
    id: 7,
    number: "07",
    name: "Bagmati Bungalow",
    location: "Nepal",
    bhk: "4 BHK",
    type: "Community Living",
    image: "/Properties/model-bagmati.webp",
    imageSmall: "/Properties/model-bagmati-720.webp",
    imageMedium: "/Properties/model-bagmati-960.webp",
    floorPlan: "/Properties/bagmati_2d_floor_plan.webp",
    floorPlanWidth: 3509, floorPlanHeight: 2480,
    description: "A community shaped around space and nature.",
    areaDetails: [
      { label: "Builtup Area", value: "2250 Sqft" },
      { label: "Plot Area", value: "1460 Sqft" },
      { label: "Carpet Area", value: "1740 Sqft" },
      { label: "Bedrooms", value: "4" },
      { label: "Bathroom", value: "4" },
      { label: "Drawing / Office", value: "1" },
      { label: "Parking Place", value: "1" },
      { label: "Floors", value: "G+1" },
    ],
  },
];

export default function DicoverProperty({ onOpenContact }) {
  const { id } = useParams();

  const property = properties.find((item) => item.id === Number(id));

  if (!property) {
    return (
        <main className="min-h-screen bg-brand p-10 text-white">
        <h1 className="text-3xl">Property not found</h1>
        <Link to="/" className="mt-4 inline-block underline">
          Back to properties
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand text-white">
      <section className="relative h-[65vh] min-h-100">
        <img
          src={property.image}
          srcSet={property.imageSmall ? `${property.imageSmall} 720w, ${property.imageMedium} 960w, ${property.image} 1400w` : undefined}
          sizes="100vw"
          alt={property.name}
          width={property.imageWidth ?? 1400}
          height={property.imageHeight ?? 788}
          fetchPriority="high"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-brand/95 via-brand/25 to-brand/20" />

        <Link
          to="/"
          className="absolute left-6 top-24 inline-flex items-center gap-2 border border-white/30 bg-brand/45 px-4 py-3 text-sm backdrop-blur-sm transition-colors hover:border-highlight hover:text-brand-light sm:left-10"
        >
          <ArrowLeft size={18} />
          Back to properties
        </Link>

        <div className="absolute bottom-10 left-6 right-6 sm:left-12">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-brand-light text-shadow-border-dark">
            {property.type}
          </p>

          <h1 className="font-display text-5xl font-medium sm:text-7xl">{property.name}</h1>

          <p className="mt-4 flex items-center gap-2 text-white/75">
            <MapPin size={16} />
            {property.location}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-20">
        <p className="text-xs mb-10 uppercase tracking-[0.3em] text-highlight">
          Floor Plan
        </p>
        <img
          src={property.floorPlan}
          alt={`${property.name} floor plan`}
          srcSet={`${property.floorPlan.replace(".webp", "-960.webp")} 960w, ${property.floorPlan.replace(".webp", "-1600.webp")} 1600w, ${property.floorPlan} ${property.floorPlanWidth}w`}
          sizes="(min-width: 1152px) 1152px, calc(100vw - 3rem)"
          width={property.floorPlanWidth}
          height={property.floorPlanHeight}
          loading="lazy"
          className="mx-auto max-h-170 w-full bg-white p-3 object-contain sm:p-6"
        />
        <div>
          <div>
            {/* About Property + Area Description */}
            <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_263px] lg:gap-8">
              {/* About section */}
              <div>
                <div className="flex items-center gap-4 border-b border-white/10 pb-5">
                  <House size={30} className="text-highlight" />

                  <div>
                    <p className="text-xs tracking-[0.25em] text-white/50">
                      ABOUT
                    </p>

                    <h2 className="text-xl font-semibold sm:text-2xl">
                      {property.name}.
                    </h2>
                  </div>
                </div>

                <div className="h-0.75 w-20 bg-highlight" />

                <div className="mt-7">
                  <div className="bg-white/5 px-5 py-4">
                    <p className="text-xs font-semibold tracking-wide sm:text-sm">
                      BENEFITS OF {property.name.toUpperCase()}
                    </p>
                  </div>

                  <div className="border border-white/10 p-5 sm:p-6">
                    <p className="text-sm leading-7 text-white/70">
                      {property.description}
                    </p>

                    <p className="mt-4 text-sm leading-7 text-white/70">
                      Property type: {property.type}
                    </p>

                    <p className="mt-2 text-sm leading-7 text-white/70">
                      Configuration: {property.bhk}
                    </p>
                  </div>
                </div>
              </div>

              {/* Area Description */}
              <aside className="h-fit border border-white/10">
                <h3 className="bg-brand px-5 py-4 text-center text-lg font-semibold text-white">
                  Area Description
                </h3>

                <div className="px-5 py-3">
                  {(property.areaDetails ?? []).map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between gap-3 border-b border-white/10 py-3 last:border-b-0"
                    >
                      <span className="text-xs text-white/50 sm:text-sm">
                        {item.label}
                      </span>

                      <span className="shrink-0 text-xs font-semibold text-white/75 sm:text-sm">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onOpenContact?.(property.name)}
          className="mt-8 bg-highlight px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-layout-dark transition-colors hover:bg-brand-light"
        >
          Enquire about this property
        </button>
      </section>
    </main>
  );
}
