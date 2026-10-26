import { lazy, Suspense } from "react";

const Hero = lazy(() => import("./home/sections/Hero"));
const FeaturedProperties = lazy(() => import("./home/sections/FeaturedProperties"));
const NepalLocations = lazy(() => import("./home/sections/NepalLocations"));
const BrandStory = lazy(() => import("./home/sections/BrandStory"));

function HomePage() {
  return (
    <>
      <div id="home">
        <Suspense fallback={null}>
          <Hero />
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <FeaturedProperties />
      </Suspense>
      <Suspense fallback={null}>
        <NepalLocations />
      </Suspense>
      <Suspense fallback={null}>
        <BrandStory />
      </Suspense>
    </>
  );
}

export default HomePage;
