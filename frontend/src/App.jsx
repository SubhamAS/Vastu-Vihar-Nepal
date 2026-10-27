import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import ScrollTop from "./Components/ScrollTop";
import WhatsAppButton from "./Components/WhatsAppButton/WhatsAppButton";
import Loading from "./Components/Loading/Loading";

const HomePage = lazy(() => import("./pages/HomePage"));
const DiscoverPropertyPage = lazy(
  () => import("./pages/properties/DiscoverPropertyPage"),
);
const ModelsPage = lazy(() => import("./pages/models/ModelsPage"));
const AboutPage = lazy(() => import("./pages/about/AboutPage"));
const AmenitiesPage = lazy(() => import("./pages/projects/AmenitiesPage"));
const TechnologyPage = lazy(() => import("./pages/projects/TechnologyPage"));
const GalleryPage = lazy(() => import("./pages/gallery/GalleryPage"));
const PriceListPage = lazy(() => import("./pages/pricing/PriceListPage"));
const OfficeContactPage = lazy(
  () => import("./pages/contact/OfficeContactPage"),
);
const SiteContactPage = lazy(() => import("./pages/contact/SiteContactPage"));
const NotFoundPage = lazy(() => import("./pages/not-found/NotFoundPage"));
const CareerPage = lazy(() => import("./pages/career/CareerPage"));
const TermsPage = lazy(() => import("./pages/legal/TermsPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/legal/PrivacyPolicyPage"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminLayout = lazy(() => import("./Components/admin/AdminLayout"));
const AdminOverview = lazy(() => import("./pages/admin/AdminOverview"));
const AdminEnquiries = lazy(() => import("./pages/admin/AdminEnquiries"));
const AdminPriceLists = lazy(() => import("./pages/admin/AdminPriceLists"));
const ContactModal = lazy(
  () => import("./Components/ContactModal/ContactModal"),
);

const App = () => {
  const location = useLocation();
  const knownRoutes = [
    "/",
    "/models",
    "/projects/amenities",
    "/projects/technology",
    "/about",
    "/career",
    "/gallery",
    "/price-list",
    "/contact",
    "/contact/office",
    "/contact/site",
    "/terms-and-conditions",
    "/privacy-policy",
    "/admin",
  ];
  const normalizedPathname = location.pathname.replace(/\/+$/, "") || "/";
  const isAdminPath =
    normalizedPathname === "/admin" || normalizedPathname.startsWith("/admin/");
  const isKnownRoute =
    knownRoutes.includes(normalizedPathname) ||
    /^\/properties\/[^/]+$/.test(normalizedPathname);
  const loadingClassName = isAdminPath
    ? "min-h-screen bg-slate-50"
    : isKnownRoute
      ? "min-h-[110svh]"
      : "mt-[4%] min-h-[min(690px,calc(100svh-84px))] max-[600px]:min-h-[min(650px,calc(100svh-70px))]";
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleOpenContact = useCallback((propertyName = "") => {
    setSelectedProperty(propertyName);
    setFormSubmitted(false);
    setSubmitError("");
    setIsContactOpen(true);
  }, []);

  const handleCloseContact = useCallback(() => {
    setIsContactOpen(false);
  }, []);

  const handleContactSubmit = useCallback(
    async (form) => {
      setIsSending(true);
      setSubmitError("");

      try {
        const response = await fetch("/api/enquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            property: form.property || selectedProperty,
          }),
        });
        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            result.error || "We could not save your enquiry. Please try again.",
          );
        }

        setFormSubmitted(true);
      } catch (error) {
        setSubmitError(
          error.message || "We could not save your enquiry. Please try again.",
        );
      } finally {
        setIsSending(false);
      }
    },
    [selectedProperty],
  );

  useEffect(() => {
    if (!isContactOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleEscape = (event) => {
      if (event.key === "Escape") handleCloseContact();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isContactOpen, handleCloseContact]);

  return (
    <div>
      <ScrollTop />
      {!isAdminPath && <Navbar onOpenContact={handleOpenContact} />}
      <Suspense
        fallback={
          <Loading
            className={loadingClassName}
            label={
              isAdminPath
                ? "Loading admin workspace..."
                : "Loading Vastu Vihar..."
            }
          />
        }
      >
        <Routes>
          <Route path="/admin">
            <Route index element={<AdminLogin />} />
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminOverview />} />
              <Route path="enquiries" element={<AdminEnquiries />} />
              <Route path="price-lists" element={<AdminPriceLists />} />
              <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Route>
          </Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/models" element={<ModelsPage />} />
          <Route
            path="/projects/amenities"
            element={<AmenitiesPage onOpenContact={handleOpenContact} />}
          />
          <Route
            path="/projects/technology"
            element={<TechnologyPage onOpenContact={handleOpenContact} />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/price-list" element={<PriceListPage />} />
          <Route path="/contact" element={<OfficeContactPage />} />
          <Route path="/contact/office" element={<OfficeContactPage />} />
          <Route path="/contact/site" element={<SiteContactPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

          <Route
            path="/properties/:id"
            element={<DiscoverPropertyPage onOpenContact={handleOpenContact} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      {!isAdminPath && <Footer />}
      {!isAdminPath && <WhatsAppButton />}
      {/* <HelpDesk /> */}
      {isContactOpen && (
        <Suspense fallback={null}>
          <ContactModal
            key={selectedProperty}
            isOpen={isContactOpen}
            onClose={handleCloseContact}
            selectedProperty={selectedProperty}
            onSubmit={handleContactSubmit}
            formSubmitted={formSubmitted}
            isSending={isSending}
            submitError={submitError}
          />
        </Suspense>
      )}
    </div>
  );
};

export default App;
