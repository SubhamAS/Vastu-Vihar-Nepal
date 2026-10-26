import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  {
    src: "/Gallery/Social/social-event-1.webp",
    title: "Social Event: 1",
    category: "Social Event",
  },
  {
    src: "/Gallery/Social/social-event-2.webp",
    title: "Social Event: 2",
    category: "Social Event",
  },
  {
    src: "/Gallery/Social/social-event-3.webp",
    title: "Social Event: 3",
    category: "Social Event",
  },
  {
    src: "/Gallery/Social/social-event-4.webp",
    title: "Social Event: 4",
    category: "Social Event",
  },
  {
    src: "/Gallery/Social/social-event-5.webp",
    title: "Social Event: 5",
    category: "Social Event",
  },
  {
    src: "/Gallery/Social/social-event-6.webp",
    title: "Social Event: 6",
    category: "Social Event",
  },
  {
    src: "/Gallery/Social/social-event-7.webp",
    title: "Social Event: 7",
    category: "Social Event",
  },
  {
    src: "/Gallery/Social/social-event-8.webp",
    title: "Social Event: 8",
    category: "Social Event",
  },
  {
    src: "/Gallery/Social/social-event-9.webp",
    title: "Social Event: 9",
    category: "Social Event",
  },
  {
    src: "/Gallery/Social/social-event-10.webp",
    title: "Social Event: 10",
    category: "Social Event",
  },
  {
    src: "/Gallery/Expo/expo-1.webp",
    title: "Expo: 1",
    category: "Expo",
  },
  {
    src: "/Gallery/Expo/expo-2.webp",
    title: "Expo: 2",
    category: "Expo",
  },
  {
    src: "/Gallery/Expo/expo-3.webp",
    title: "Expo: 3",
    category: "Expo",
  },
  {
    src: "/Gallery/Expo/expo-4.webp",
    title: "Expo: 4",
    category: "Expo",
  },
  {
    src: "/Gallery/Expo/expo-5.webp",
    title: "Expo: 5",
    category: "Expo",
  },
  {
    src: "/Gallery/Expo/expo-6.webp",
    title: "Expo: 6",
    category: "Expo",
  },
  {
    src: "/Gallery/Expo/expo-7.webp",
    title: "Expo: 7",
    category: "Expo",
  },
  {
    src: "/Gallery/Expo/expo-8.webp",
    title: "Expo: 8",
    category: "Expo",
  },
  {
    src: "/Gallery/Expo/expo-9.webp",
    title: "Expo: 9",
    category: "Expo",
  },
  {
    src: "/Gallery/Expo/expo-10.webp",
    title: "Expo: 10",
    category: "Expo",
  },
];

const gallerySrcSet = (src) => [480, 800, 1200]
  .map((width) => `${src.replace(".webp", `-${width}.webp`)} ${width}w`)
  .join(", ");

const categories = ["All", "Social Event", "Expo"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(null);

  const filteredImages = galleryImages.filter(
    (image) => activeCategory === "All" || image.category === activeCategory,
  );

  const activeImage = activeIndex !== null ? filteredImages[activeIndex] : null;

  const showPrevious = () => {
    setActiveIndex((index) =>
      index === 0 ? filteredImages.length - 1 : index - 1,
    );
  };

  const showNext = () => {
    setActiveIndex((index) =>
      index === filteredImages.length - 1 ? 0 : index + 1,
    );
  };

  return (
    <main className="min-h-screen bg-brand-paper pb-20 pt-32 text-brand-ink">
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-ochre">
            Vastu Vihar
          </p>

          <h1 className="font-serif text-5xl font-medium text-brand-pine sm:text-6xl">
            Our Gallery
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-black/60 sm:text-base">
            Explore our residential projects, thoughtfully designed spaces, and
            community amenities.
          </p>
        </div>

        {/* Category filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setActiveCategory(category);
                setActiveIndex(null);
              }}
              className={`rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition ${
                activeCategory === category
                  ? "border-brand-pine bg-brand-pine text-white"
                  : "border-[#d7d4c8] bg-white text-[#34423a] hover:border-brand-brass"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative aspect-4/3 cursor-zoom-in overflow-hidden rounded-sm bg-black/5 text-left"
              aria-label={`View ${image.title}`}
            >
              <img
                src={image.src}
                srcSet={gallerySrcSet(image.src)}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                alt={image.title}
                loading="lazy"
                width={1600}
                height={1000}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/70 via-transparent to-transparent p-5 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
                <div className="text-white">
                  <p className="text-xs uppercase tracking-widest text-white/70">
                    {image.category}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold">{image.title}</h2>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <p className="py-16 text-center text-black/60">
            No images available in this category yet.
          </p>
        )}
      </section>

      {/* Image lightbox */}
      {activeImage && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.title}
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="Close gallery"
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
          >
            <X size={24} />
          </button>

          {filteredImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrevious();
                }}
                aria-label="Previous image"
                className="absolute left-3 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:left-6"
              >
                <ChevronLeft size={26} />
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
                }}
                aria-label="Next image"
                className="absolute right-3 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:right-6"
              >
                <ChevronRight size={26} />
              </button>
            </>
          )}

          <div
            className="flex max-h-[85vh] max-w-6xl flex-col items-center gap-3"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activeImage.src}
              alt={activeImage.title}
              className="max-h-[75vh] max-w-full rounded-lg object-contain"
            />

            <p className="text-center text-sm text-white">
              {activeImage.title}
              <span className="ml-3 text-white/50">
                {activeIndex + 1} / {filteredImages.length}
              </span>
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
