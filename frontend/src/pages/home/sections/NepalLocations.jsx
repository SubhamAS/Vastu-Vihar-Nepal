import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./NepalLocations.css";
import { Link } from "react-router-dom";

const locations = [
  {
    id: "birgunj",
    name: "Birgunj",
    province: "Madhesh Province",
    coordinates: [27.0449, 84.86721],
    places: ["Shop No-8, 2nd Floor, Rungta Mall, Adarsh Nagar, Birgunj 44300"],
  },
  {
    id: "birtanagar",
    name: "Birtanagar",
    province: "Madhesh Province",
    coordinates: [26.457102778040237, 87.27592287736644],
    places: ["Shop No-8, 2nd Floor, Rungta Mall, Adarsh Nagar, Birgunj 44300"],
  },
  {
    id: "birtamode",
    name: "Birtamode",
    province: "Koshi Province",
    coordinates: [26.6293, 87.98247],
    places: [
      "211, 2nd Floor, Hanuman Center, Mukti Chowk, Birtamode, Jhapa",
      "Project site: Charpani, near Heavens Water Park, Birtamode, Jhapa",
    ],
  },
];

function markerIcon() {
  return L.divIcon({
    className: "vv-nepal-marker-wrap",
    html: '<span class="vv-nepal-marker"><span></span></span>',
    iconSize: [32, 40],
    iconAnchor: [16, 38],
    tooltipAnchor: [0, -35],
  });
}

function createPopup(location) {
  const content = document.createElement("div");
  content.className = "vv-nepal-popup";

  const title = document.createElement("strong");
  title.textContent = location.name;
  content.append(title);

  const province = document.createElement("span");
  province.className = "vv-nepal-popup__province";
  province.textContent = location.province;
  content.append(province);

  const places = document.createElement("ul");
  location.places.forEach((place) => {
    const item = document.createElement("li");
    item.textContent = place;
    places.append(item);
  });
  content.append(places);

  const link = document.createElement("a");
  link.href = `https://www.google.com/maps?q=${location.coordinates.join(",")}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Open in Google Maps ↗";
  content.append(link);

  return content;
}

export default function NepalLocations() {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return undefined;

    const map = L.map(mapContainerRef.current, {
      scrollWheelZoom: true,
      zoomControl: true,
    }).setView([27, 86], 5.5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 16,
    }).addTo(map);

    locations.forEach((location) => {
      L.marker(location.coordinates, {
        icon: markerIcon(),
        title: location.name,
        alt: `${location.name}, ${location.province}`,
      })
        .addTo(map)
        .bindPopup(createPopup(location), { maxWidth: 290 });
    });

    const resizeObserver = new ResizeObserver(() => map.invalidateSize());
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
    };
  }, []);

  return (
    <section
      id="locations"
      aria-labelledby="nepal-locations-title"
      className="w-full overflow-hidden bg-white pb-8 text-[#171717]"
    >
      <div className="mx-auto flex max-w-360 flex-col gap-5 px-5 pb-7 sm:flex-row sm:items-end sm:justify-between sm:px-8 lg:px-12">
        <div>
          <h2
            id="nepal-locations-title"
            className="font-sans text-4xl font-bold tracking-[-0.045em] sm:text-5xl"
          >
            Locations
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#626262] sm:text-base">
            Find our offices and project sites across Nepal.
          </p>
        </div>
        <Link
          to={"models"}
          className="inline-flex w-fit items-center gap-3 rounded-full bg-[#d9272e] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(217,39,46,0.22)] transition-colors hover:bg-[#b91f27] focus-visible:outline  focus-visible:outline-offset-4 focus-visible:outline-[#d9272e]"
        >
          Explore our homes
          <ArrowRight size={17} />
        </Link>
      </div>

      <div className="vv-nepal-map-shell isolate relative mx-4 mb-6 mt-2 h-[clamp(430px,58vw,790px)] w-auto overflow-hidden rounded-3xl border border-slate-200 shadow-[0_18px_55px_rgba(16,41,76,0.14)] sm:mx-8 lg:mx-12">
        <div
          ref={mapContainerRef}
          className="vv-nepal-map absolute inset-0"
          role="region"
          aria-label="Interactive map of Nepal showing Vastu Vihar locations in Birgunj and Birtamode"
        />
        <div aria-hidden="true" className="vv-nepal-map-fade" />
      </div>
    </section>
  );
}

