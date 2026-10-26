import { useState } from "react";
import NavbarDropdown from "./NavbarDropdown";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/vvr.webp";
import { ArrowUpRight, Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Models", to: "/models" },
  {
    label: "Projects",
    children: [
      {
        label: "Residential",
        children: [
          {
            label: "Birgunj",
            to: "/projects/residentals/brigunj",
          },
          {
            label: "Birtamode",
            to: "/projects/residentals/birtamode",
          },
          {
            label: "Biratnagar",
            to: "/projects/residentals/biratnagar",
          },
        ],
      },
      {
        label: "Projects Amenities",
        to: "/projects/amenities",
      },
      {
        label: "Technology Used",
        to: "/projects/technology",
      },
      {
        label: "Gallery",
        to: "/gallery",
      },
    ],
  },
  { label: "About Us", to: "/about" },
  { label: "Price List", to: "/price-list" },
  {
    label: "Contact",
    children: [
      { label: "Office Contact", to: "/contact/office" },
      { label: "Site Contact", to: "/contact/site" },
    ],
  },
];

// Mobile navigation item, supports nested links.
function MobileNavItems({
  item,
  closeMenu,
  expandedMenus,
  setExpandedMenus,
  level = 0,
}) {
  const isExpanded = !!expandedMenus[item.label];
  const hasChildren = !!item.children?.length;

  const toggle = () => {
    setExpandedMenus((prev) => ({
      ...prev,
      [item.label]: !prev[item.label],
    }));
  };

  return (
    <li className="border-b border-stone-200 last:border-0">
      <div
        className="flex items-center justify-between gap-3"
        style={{ paddingLeft: `${level * 16}px` }}
      >
        {item.to ? (
          <NavLink
            to={item.to}
            onClick={closeMenu}
            className={({ isActive }) =>
              `block flex-1 border-l-2 py-4 pl-3 text-sm font-medium tracking-wide transition-colors hover:text-brand-ochre ${isActive ? "border-brand-brass text-brand-pine" : "border-transparent text-[#526058]"}`
            }
          >
            {item.label}
          </NavLink>
        ) : (
          <span className="flex-1 py-4 text-sm font-medium tracking-wide">
            {item.label}
          </span>
        )}

        {hasChildren && (
          <button
            type="button"
            onClick={toggle}
            aria-label={`Toggle ${item.label}`}
            aria-expanded={isExpanded}
            className="p-3"
          >
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>

      {hasChildren && isExpanded && (
        <ul>
          {item.children.map((child) => (
            <MobileNavItems
              key={child.to || child.label}
              item={child}
              closeMenu={closeMenu}
              expandedMenus={expandedMenus}
              setExpandedMenus={setExpandedMenus}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

const Navbar = ({ onOpenContact }) => {
  const [expandedMenus, setExpandedMenus] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  const handleContactClick = () => {
    closeMenu();

    if (onOpenContact) {
      onOpenContact();
    } else {
      navigate("/contact");
    }
  };

  const linkClass =
    "inline-flex items-center whitespace-nowrap border-b-2 border-transparent px-2.5 py-3 text-[12px] font-medium leading-none tracking-[0.01em] text-[#34423a] transition-colors hover:border-brand-brass hover:text-brand-pine focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-brass xl:px-3 xl:text-[13px]";

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-brand-line bg-brand-paper/95 shadow-[0_4px_22px_rgba(16,41,32,0.07)] backdrop-blur-xl">
      <nav
        className="mx-auto flex min-h-20 w-full max-w-[1600px] items-center justify-between gap-4 px-5 sm:px-8 lg:gap-6 lg:px-[5%]"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="shrink-0"
          aria-label="Vastu Vihar home"
        >
          <img
            src={logo}
            alt="Vastu Vihar"
            width={216}
            height={117}
            className="block h-auto w-20 sm:w-24"
          />
        </Link>

        {/* Desktop navigation */}
      <ul className="hidden flex-1 items-center justify-center gap-1.5 lg:flex xl:gap-3">
          {navLinks.map((link) =>
            link.children ? (
              <NavbarDropdown
                key={link.to || link.label}
                item={link}
                linkClass={linkClass}
                closeMenu={closeMenu}
              />
            ) : (
              <li key={link.to || link.label}>
                <NavLink
                  to={link.to}
                  onClick={closeMenu}
                  className={({ isActive }) => `${linkClass} ${isActive ? "border-brand-brass text-brand-pine" : ""}`}
                >
                  {link.label}
                </NavLink>
              </li>
            ),
          )}
        </ul>

        {/* Desktop actions */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={handleContactClick}
            className="inline-flex cursor-pointer items-center gap-2 rounded-sm bg-brand-pine px-5 py-3 text-xs font-semibold tracking-wide text-white shadow-sm transition-colors hover:bg-brand-forest active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-brass"
          >
            Enquire
            <ArrowUpRight size={15} />
          </button>

          <a
            href="https://vastuvihar.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClass} border-l border-stone-200 pl-4 text-[10px] text-slate-500`}
          >
            For India
          </a>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={handleContactClick}
            className="rounded-sm bg-brand-pine px-3.5 py-2.5 text-[10px] font-semibold tracking-wide text-white transition hover:bg-brand-forest"
          >
            Enquire
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            className="flex size-10 items-center justify-center rounded-sm border border-brand-line text-brand-pine transition hover:border-brand-pine"
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </nav>

      {/* Mobile navigation */}
      {menuOpen && (
        <div
          id="mobile-nav-menu"
          className="max-h-[calc(100dvh-4.75rem)] overflow-y-auto border-t border-stone-200 bg-white px-6 py-3 text-slate-800 shadow-xl lg:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <MobileNavItems
                key={link.to || link.label}
                item={link}
                closeMenu={closeMenu}
                expandedMenus={expandedMenus}
                setExpandedMenus={setExpandedMenus}
              />
            ))}

            <li>
              <a
                href="https://vastuvihar.org/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="block py-4 text-sm font-medium tracking-wide text-slate-600 transition-colors hover:text-brand-ochre"
              >
                FOR INDIA
              </a>
            </li>
          </ul>
        </div>
      )}

    </header>
  );
};

export default Navbar;
