import { forwardRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
  Download,
  Eye,
} from "lucide-react";
import {
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../../assets/vvr.webp";

const exploreLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Career", to: "/career" },
  { label: "Gallery", to: "/gallery" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/VastuVihar/",
    icon: FaFacebookF,
  },
  {
    label: "X",
    href: "https://x.com/VastuVihar",
    icon: FaXTwitter,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/vastu-vihar-technoculture-building-centre-pvt-ltd/",
    icon: FaLinkedinIn,
  },
];

const Footer = forwardRef(function Footer(_, ref) {
  return (
    <footer ref={ref} className="fixed inset-x-0 bottom-0 z-0 bg-layout-dark text-white">
      <div className="mx-auto max-w-[1800px] px-6 pb-8 pt-12 sm:px-10 lg:px-16 lg:pt-16">
        {/* Main footer */}
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_1fr_1.3fr] lg:gap-10 xl:gap-16">
          {/* Brand */}
          <div className="min-w-0">
            <Link to="/" className="inline-block">
              <img
                src={logo}
                alt="Vastu Vihar"
                width={120}
                height={65}
                className="footer-logo-outline"
              />
            </Link>

            <p className="mt-5 text-xs font-medium tracking-[0.08em] text-highlight">
              Building more than homes.
            </p>

            <p className="mt-4 max-w-sm text-sm leading-7 text-white/60">
              We create thoughtfully planned communities where aspirations take
              shape and families find a place to belong.
            </p>

            <div
              className="mt-6 flex items-center gap-3"
              aria-label="Social media"
            >
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-highlight hover:text-highlight"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>

            <a
              href="https://vastuvihar.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 border-b border-highlight/60 pb-2 text-xs uppercase tracking-widest transition-colors hover:text-highlight"
            >
              Visit our India website
              <ArrowUpRight size={15} />
            </a>
          </div>

          {/* Navigation */}
          <div className="min-w-0">
            <h3 className="mb-6 text-sm font-semibold tracking-[0.02em] text-white">
              Explore
            </h3>

            <ul className="space-y-4">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/65 transition-colors hover:text-highlight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="min-w-0">
            <h3 className="mb-6 text-sm font-semibold tracking-[0.02em] text-white">
              Resources
            </h3>

            <div className="flex flex-col items-start gap-5">
              <a
                href="/Brochure_Layout_Nepal.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-sm text-white/65 transition-colors hover:text-highlight"
              >
                <Eye
                  size={17}
                  className="shrink-0 text-highlight transition-transform group-hover:scale-110"
                />
                View Brochure
                <ArrowUpRight size={13} />
              </a>

              <a
                href="/Brochure_Layout_Nepal.pdf"
                download="Property-Brochure.pdf"
                className="group inline-flex items-center gap-3 text-sm text-white/65 transition-colors hover:text-highlight"
              >
                <Download
                  size={17}
                  className="shrink-0 text-highlight transition-transform group-hover:translate-y-0.5"
                />
                Download Brochure
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="min-w-0">
            <h3 className="mb-6 text-sm font-semibold tracking-[0.02em] text-white">
              Get in touch
            </h3>

            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-highlight" />
                <p className="text-sm leading-6 text-white/65">
                  Shop No-8, 2nd Floor, Rungta Mall, Adarsh Nagar, Birgunj -
                  44300 (Nepal)
                </p>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={17} className="shrink-0 text-highlight" />
                <a
                  href="tel:+9779802591815"
                  className="text-sm text-white/65 transition-colors hover:text-highlight"
                >
                  +977 - 98025-91815
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Mail size={17} className="mt-0.5 shrink-0 text-highlight" />
                <a
                  href="mailto:info@vastuvihar.org"
                  className="break-all text-sm text-white/65 transition-colors hover:text-highlight"
                >
                  info@vastuvihar.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-white/40">
            © {new Date().getFullYear()} Vastu Vihar. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              to="/privacy-policy"
              className="text-xs text-white/55 transition-colors hover:text-highlight"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-and-conditions"
              className="text-xs text-white/55 transition-colors hover:text-highlight"
            >
              Terms &amp; Conditions
            </Link>
            <a
              href="https://vastuvihar.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-highlight transition-colors hover:text-white"
            >
              Building your future
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
