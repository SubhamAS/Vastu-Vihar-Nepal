import { useLayoutEffect, useRef } from "react";
import { Building2, Globe2, MapPin, Landmark, Home } from "lucide-react";

const milestones = [
  { value: "01", label: "BUILDER", description: "One vision, grounded in thoughtful planning and lasting quality.", Icon: Building2 },
  { value: "02", label: "COUNTRIES", description: "Bringing the Vastu Vihar approach to communities across borders.", Icon: Globe2 },
  { value: "02", label: "STATES", description: "Growing with local insight across two vibrant states.", Icon: Landmark },
  { value: "03", label: "CITIES", description: "Shaping well-connected places in three thriving cities.", Icon: MapPin },
  { value: "20,000", label: "PROJECTS", description: "A legacy measured in homes, neighborhoods, and new beginnings.", Icon: Home },
];

const cardThemes = ["blue", "light", "red", "light", "blue"];

export default function BrandStory() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let context;
    let cancelled = false;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        const intro = section.querySelector(".vv-story-intro");
        const storyCopy = section.querySelector(".vv-story-copy");
        const cards = gsap.utils.toArray(".vv-story-card", section);
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${cards.length * 760}`,
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline.fromTo(intro,
          { scale: 0.72, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.55, ease: "power2.out" },
        );
        timeline.to(intro, { scale: 1.25, opacity: 0.72, duration: 0.4, ease: "power1.in" });
        timeline.fromTo(storyCopy, { opacity: 0, y: 18 }, { opacity: 1, y: -2, duration: 0.35, ease: "power2.out" }, "<");

        let cardStart = timeline.duration();
        cards.forEach((card) => {
          const fadeStart = cardStart + 0.68;
          timeline.fromTo(card,
            { y: "115vh", opacity: 0, scale: 0.92 },
            { y: "0vh", opacity: 1, scale: 1, duration: 0.58, ease: "power2.out" },
            cardStart,
          );
          timeline.to(card,
            { y: "-115vh", opacity: 0, scale: 0.92, duration: 0.58, ease: "power1.in" },
            fadeStart,
          );
          // The next card starts entering at the exact moment this one begins to leave.
          cardStart = fadeStart;
        });
      }, section);
      ScrollTrigger.refresh();
    }).catch(() => {});

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="brand-story"
      className="relative isolate h-screen min-h-160 w-full overflow-hidden bg-brand text-white"
    >
      <div className="absolute inset-3 -z-20 overflow-hidden rounded-3xl sm:inset-5 lg:inset-7">
        <img
          src="/Properties/About.webp"
          alt="Aerial view of a residential township"
          loading="lazy"
          width={1901}
          height={1107}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-3 -z-10 rounded-3xl bg-layout-dark/45 sm:inset-5 lg:inset-7" />
      <div className="absolute inset-3 -z-10 rounded-3xl bg-linear-to-b from-layout-dark/35 via-layout-dark/20 to-layout-dark/70 sm:inset-5 lg:inset-7" />

      <div className="vv-story-intro pointer-events-none absolute inset-0 grid place-items-center overflow-hidden">
        <span className="select-none whitespace-nowrap font-display text-[25vw] font-semibold uppercase leading-none tracking-[-0.08em] text-white/20">
          Legacy
        </span>
      </div>

      <div className="vv-story-copy pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-end px-6 pb-10 text-center sm:pb-16">
        <span className="rounded-full border border-white/20 bg-sky-600/90 px-4 py-2 text-[10px] font-semibold tracking-wide text-white shadow-lg sm:text-xs">
          VASTU VIHAR · OUR LEGACY
        </span>
        <p className="max-w-3xl font-display text-3xl font-medium leading-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
          Building more than homes.
        </p>
        <p className="mt-3 max-w-lg text-xs leading-6 text-white/80 sm:text-sm">
          Thoughtfully planned communities, made for generations.
        </p>
      </div>

      {milestones.map(({ value, label, description, Icon }, index) => {
        const theme = cardThemes[index];
        const isLeft = index % 2 === 0;
        const cardTheme = theme === "blue"
          ? "bg-sky-600 text-white"
          : theme === "red"
            ? "bg-red-600 text-white"
            : "bg-white text-layout-dark";
        const iconTheme = theme === "light" ? "text-sky-600" : "text-white";

        return (
          <article
            key={label}
            className={`vv-story-card absolute top-1/2 z-30 flex w-[min(84vw,390px)] -translate-y-1/2 flex-col justify-between rounded-3xl px-6 py-7 shadow-2xl sm:w-[min(42vw,420px)] sm:min-h-85 sm:px-8 sm:py-8 ${isLeft ? "left-0 sm:left-[1%]" : "right-0 sm:right-[1%]"} ${cardTheme}`}
            aria-label={`${value} ${label}: ${description}`}
          >
            <div className="flex items-center justify-between">
              <span className={`rounded-full px-3 py-3 text-6xl h-auto w-auto font-semibold ${theme === "light" ? "bg-sky-100 text-sky-700" : "bg-black/15 text-white"}`}>
                {value}
              </span>
              <Icon size={40} strokeWidth={1.7} className={iconTheme} aria-hidden="true" />
            </div>
            <div className="mt-10 sm:mt-14">
              <h3 className="text-lg font-semibold leading-tight sm:text-2xl">{label}</h3>
              <p className={`mt-3 text-sm leading-6 ${theme === "light" ? "text-layout-dark/75" : "text-white/85"}`}>
                {description}
              </p>
            </div>
          </article>
        );
      })}

      <div className="absolute bottom-6 left-6 z-40 flex items-center gap-3 sm:bottom-8 sm:left-10 lg:left-16">
        <span className="h-px w-8 bg-highlight" />
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/65">Our legacy</span>
      </div>
    </section>
  );
}






