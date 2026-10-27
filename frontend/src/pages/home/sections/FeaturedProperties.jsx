import { ArrowUpRight, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
];

export default function FeaturedProperties() {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (
      !track ||
      paused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const cards = [...track.children];
    const cycleStart = properties.length;
    const cycleEnd = cycleStart * 2;
    if (!track.dataset.carouselReady) {
      track.scrollTo({
        left: cards[cycleStart].offsetLeft,
        behavior: "instant",
      });
      track.dataset.carouselReady = "true";
    }

    const timer = window.setInterval(() => {
      const cardIndex = cards.reduce((closestIndex, card, index) => {
        const closestDistance = Math.abs(
          cards[closestIndex].offsetLeft - track.scrollLeft,
        );
        const distance = Math.abs(card.offsetLeft - track.scrollLeft);
        return distance < closestDistance ? index : closestIndex;
      }, 0);
      const nextIndex = cardIndex + 1;

      if (nextIndex >= cycleEnd) {
        track.scrollTo({
          left: cards[cycleStart].offsetLeft,
          behavior: "instant",
        });
        return;
      }

      track.scrollTo({ left: cards[nextIndex].offsetLeft, behavior: "smooth" });
    }, 5000);

    return () => window.clearInterval(timer);
  }, [paused]);

  const moveCarousel = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    const cards = [...track.children];
    const cycleStart = properties.length;
    const cycleEnd = cycleStart * 2;
    const currentIndex = cards.reduce((closestIndex, card, index) => {
      const closestDistance = Math.abs(
        cards[closestIndex].offsetLeft - track.scrollLeft,
      );
      const distance = Math.abs(card.offsetLeft - track.scrollLeft);
      return distance < closestDistance ? index : closestIndex;
    }, 0);
    const nextIndex = currentIndex + direction;

    if (nextIndex < cycleStart) {
      track.scrollTo({
        left: cards[cycleEnd - 1].offsetLeft,
        behavior: "instant",
      });
      return;
    }
    if (nextIndex >= cycleEnd) {
      track.scrollTo({
        left: cards[cycleStart].offsetLeft,
        behavior: "instant",
      });
      return;
    }
    track.scrollTo({ left: cards[nextIndex].offsetLeft, behavior: "smooth" });
  };

  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden bg-brand-paper px-5 py-20 text-brand-ink sm:px-8 sm:py-24 lg:px-16 lg:py-28"
    >
      {/* Section heading */}
      <div className="mx-auto mb-11 grid max-w-7xl gap-5 sm:mb-14 md:grid-cols-[1fr_0.7fr] md:items-end">
        <div>
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-ochre sm:text-[11px]">
            Find your place
          </p>
          <h2 className="max-w-2xl text-4xl font-light leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="bg-brand-pine text-brand-gold">Homes</span> with
            room
            <span className="block font-serif italic text-brand-pine">
              to become <span className="bg-brand-gold/80">yours.</span>
            </span>
          </h2>
        </div>
        <p className="max-w-md text-sm leading-7 text-brand-muted md:justify-self-end md:pb-1 md:text-base">
          Explore a collection of thoughtfully planned residences, each shaped
          around a different way of living.
        </p>
      </div>

      {/* Autoplaying property carousel */}
      <div
        className="mx-auto w-full max-w-7xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setPaused(false);
        }}
      >
        <div className="flex justify-between">
            <button
              type="button"
              onClick={() => moveCarousel(-1)}
              aria-label="Previous properties"
              className="h-11 w-90 relative top-60 hidden md:grid mr-2 place-items-center border rounded-full border-brand-line text-brand-pine transition-colors hover:bg-brand-pine hover:text-brand-paper focus-visible:outline-brand-brass"
            >
              <ArrowUpRight size={18} className="rotate-225" />
            </button>
          <div
            ref={trackRef}
            className="featured-properties-track flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth"
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured properties"
          >
            {[...properties, ...properties, ...properties].map(
              (property, index) => (
                <article
                  key={`${property.id}-${index}`}
                  data-property-card
                  aria-hidden={
                    index < properties.length || index >= properties.length * 2
                  }
                  className="group w-[min(88vw,24rem)] shrink-0 snap-start overflow-hidden border border-brand-line bg-white transition-shadow duration-300 hover:shadow-[0_18px_44px_rgba(24,56,47,0.12)] sm:w-[calc((100%-1.25rem)/2)] xl:w-[calc((100%-2.5rem)/3)]"
                >
                  <div className="relative h-80 overflow-hidden sm:h-96">
                    <img
                      src={property.image}
                      srcSet={
                        property.imageSmall
                          ? `${property.imageSmall} 480w, ${property.imageMedium} 720w, ${property.imageLarge} 960w, ${property.image} 1400w`
                          : undefined
                      }
                      sizes="(min-width: 1280px) 410px, (min-width: 640px) calc((100vw - 3.5rem) / 2), calc(100vw - 2.5rem)"
                      alt={property.name}
                      draggable="false"
                      width="1400"
                      height="788"
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-black/10" />

                    <span className="absolute left-4 top-4 bg-brand-paper/95 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-brand-pine sm:left-5 sm:top-5">
                      {property.type}
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-brand-muted">
                      <MapPin size={13} className="text-brand-ochre" />
                      {property.location}
                      <span className="mx-1 h-1 w-1 rounded-full bg-brand-brass" />
                      {property.bhk}
                    </p>
                    <h3 className="font-serif text-2xl font-medium leading-tight text-brand-pine sm:text-3xl">
                      {property.name}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-6 text-brand-muted">
                      {property.description}
                    </p>
                    <Link
                      to={`/properties/${property.id}`}
                      className="mt-5 inline-flex items-center gap-3 border-b border-brand-brass pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-pine transition-colors hover:text-brand-ochre"
                    >
                      Discover property
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </article>
              ),
            )}
          </div>
          <button
            type="button"
            onClick={() => moveCarousel(1)}
            aria-label="Next properties"
            className="md:grid h-11 w-90 relative hidden top-60 ml-2 place-items-center border rounded-full border-brand-line text-brand-pine transition-colors hover:bg-brand-pine hover:text-brand-paper focus-visible:outline-brand-brass"
          >
            <ArrowUpRight size={18} className="rotate-45" />
          </button>
        </div>
        <div className="flex gap-2 mt-10 justify-center visible md:hidden">
          <button
            type="button"
            onClick={() => moveCarousel(-1)}
            aria-label="Previous properties"
            className="grid h-11 w-11 place-items-center border rounded-full border-brand-line text-brand-pine transition-colors hover:bg-brand-pine hover:text-brand-paper focus-visible:outline-brand-brass"
          >
            <ArrowUpRight size={18} className="rotate-225" />
          </button>
          <button
            type="button"
            onClick={() => moveCarousel(1)}
            aria-label="Next properties"
            className="grid h-11 w-11 place-items-center border rounded-full border-brand-line text-brand-pine transition-colors hover:bg-brand-pine hover:text-brand-paper focus-visible:outline-brand-brass"
          >
            <ArrowUpRight size={18} className="rotate-45" />
          </button>
        </div>
      </div>

      {/* Bottom label */}
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 border-t border-[#d8d5c9] pt-5 text-[10px] uppercase tracking-[0.16em] text-brand-muted sm:flex-row sm:items-center sm:justify-between">
        <span>Explore the collection</span>
        <span>{String(properties.length).padStart(2, "0")} properties</span>
      </div>
    </section>
  );
}
