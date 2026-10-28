import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateViewport = () => setIsDesktop(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!isDesktop || !section || !video) return;

    let context;
    let cancelled = false;
    let initializing = false;

    const setupAnimation = async () => {
      if (
        cancelled ||
        context ||
        initializing ||
        !Number.isFinite(video.duration) ||
        video.duration <= 0
      ) {
        return;
      }

      initializing = true;

      try {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        if (cancelled) return;

        gsap.registerPlugin(ScrollTrigger);
        video.pause();

        context = gsap.context(() => {
        const playhead = { time: 0 };

        const heading = section.querySelector(".vv-hero-heading");
        const details = section.querySelector(".vv-hero-details");

        // One master timeline controls the entire pinned hero.
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=2000",
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1,

            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`;
              }
              video.style.opacity = self.progress > 0.005 ? "1" : "0";
            },
          },
        });

        // Video progresses with the master timeline.
        let lastRequestedTime = -1;

        timeline.to(
          playhead,
          {
            time: video.duration,
            duration: 1,
            ease: "none",

            onUpdate: () => {
              if (cancelled || video.readyState < 2) return;

              const targetTime = Math.min(
                video.duration,
                Math.max(0, playhead.time),
              );

              // Ignore tiny changes that are unlikely to be visible.
              if (Math.abs(targetTime - lastRequestedTime) < 0.025) {
                return;
              }

              lastRequestedTime = targetTime;
              video.currentTime = targetTime;
            },
          },
          0,
        );

        // Headline fades out during the first 20% of the scroll.
        timeline.to(
          heading,
          {
            opacity: 0,
            y: -80,
            duration: 0.2,
            ease: "none",
          },
          0,
        );

        // Property details appear shortly after the headline begins fading.
        timeline.fromTo(
          details,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "none",
          },
          0.15,
        );
        }, section);

        ScrollTrigger.refresh();
      } catch {
        initializing = false;
      }
    };

    if (video.readyState >= 1) {
      setupAnimation();
    } else {
      video.addEventListener("loadedmetadata", setupAnimation);
    }

    return () => {
      cancelled = true;
      video.removeEventListener("loadedmetadata", setupAnimation);
      context?.revert();
    };
  }, [isDesktop]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative isolate h-svh min-h-155 w-full overflow-hidden bg-layout-dark text-white"
    >
      {/* Property footage */}
      <img
        src="/Properties/ab-hero.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {isDesktop && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500"
          src="/Video/VV-hero.mp4"
          poster="/Properties/property-4-optimized.webp"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-label="Cinematic Vastu Vihar property showcase"
        />
      )}

      <div className="pointer-events-none absolute inset-0 z-1 bg-linear-to-r from-layout-dark/70 via-layout-dark/25 to-black/10" />
      <div className="pointer-events-none absolute inset-0 z-1 bg-linear-to-t from-layout-dark/50 via-transparent to-black/10" />

      {/* Hero content */}
      <div className="vv-hero-heading absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center md:items-start md:px-[10%] md:text-left">
        <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-light sm:text-xs">
          A new perspective on living
        </p>

        <h1 className="max-w-5xl text-5xl font-normal leading-[0.98] tracking-[-0.045em] sm:text-7xl lg:text-8xl xl:text-[108px]">
          Where life
          <br />
          <span className="font-serif italic font-extralight">
            finds its space.
          </span>
        </h1>

        <p className="mt-7 max-w-md text-sm leading-7 text-white/85 sm:text-base">
          Thoughtfully planned spaces. A better way to live.
        </p>

        <Link
          to="/models"
          className="pointer-events-auto mt-9 inline-flex items-center gap-5 rounded-sm border border-white/60 bg-brand/75 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] backdrop-blur-md transition duration-300 hover:border-brand-light hover:bg-layout-dark sm:text-xs"
        >
          Explore our residences
          <ArrowUpRight size={17} />
        </Link>
      </div>

      {/* Project details revealed during scrolling */}
      <div className="vv-hero-details pointer-events-none absolute inset-x-0 bottom-10 z-10 flex flex-col items-start justify-between gap-2 px-6 sm:bottom-14 sm:flex-row sm:items-end sm:gap-4 sm:px-10 lg:px-16">
        <div>
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/65 sm:text-[10px]">
            Vastu Vihar · Nepal
          </p>
          <h2 className="mt-2 font-serif text-2xl italic sm:text-4xl">
            A place to call home.
          </h2>
        </div>
      </div>

      {/* Scroll prompt */}
      <div className="absolute bottom-7 left-1/2 z-10 hidden uppercase tracking-[0.2em] text-white md:block sm:right-10 lg:right-16">
        <span className="flex items-center gap-2">
          <img className="w-10" src="/Icons/scroll.gif" alt="Scroll to discover" />
        </span>
      </div>

      {/* Scroll progress indicator */}
      <div className="absolute bottom-0 left-0 z-20 hidden h-0.75 w-full bg-white/20 md:block">
        <div
          ref={progressRef}
          className="h-full origin-left w-full bg-white"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </section>
  );
}
