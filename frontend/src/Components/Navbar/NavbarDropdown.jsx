
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function NavbarDropdown({
  item,
  linkClass,
  closeMenu,
}) {
  return (
    <li className="group relative">
      {/* Dropdown trigger */}
      <div className="flex items-center">
        {item.to ? (
          <Link
            to={item.to}
            onClick={closeMenu}
            className={`flex items-center ${linkClass}`}
          >
            {item.label}
            <ChevronDown
              size={13}
              className="ml-1 shrink-0 text-slate-500 transition-transform duration-300 group-hover:rotate-180"
            />
          </Link>
        ) : (
          <button
            type="button"
            className={`flex items-center ${linkClass}`}
            aria-haspopup="true"
          >
            {item.label}
            <ChevronDown
              size={13}
              className="ml-1 shrink-0 text-slate-500 transition-transform duration-300 group-hover:rotate-180"
            />
          </button>
        )}
      </div>

      {/* First dropdown */}
      <ul className="invisible absolute left-0 top-full z-50 min-w-56 translate-y-2 border border-border-light bg-white p-2 text-text opacity-0 shadow-[0_16px_40px_rgba(15,23,42,0.14)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-reduce:transition-none">
        {item.children?.map((child) => (
          <li
            key={child.to || child.label}
            className="group/sub relative"
          >
            <div className="flex items-center justify-between rounded-md transition-colors hover:bg-stone-50">
              {child.to ? (
              <Link
                  to={child.to}
                  onClick={closeMenu}
                  className="flex-1 px-4 py-3 text-[13px] font-medium normal-case tracking-normal text-[#3f4c44] transition-colors hover:text-highlight-hover"
                >
                  {child.label}
                </Link>
              ) : (
                <span className="flex-1 px-4 py-3 text-[13px] font-medium normal-case tracking-normal text-[#3f4c44]">
                  {child.label}
                </span>
              )}

              {child.children?.length > 0 && (
                <ChevronRight
                  size={14}
                  className="mr-3 text-black transition-transform duration-300 group-hover/sub:rotate-180"
                />
              )}
            </div>

            {/* Nested dropdown */}
            {child.children?.length > 0 && (
              <ul className="invisible absolute left-full top-0 z-50 ml-1 min-w-48 -translate-x-2 border border-border-light bg-white p-2 text-text opacity-0 shadow-[0_16px_40px_rgba(15,23,42,0.14)] transition-all duration-200 group-hover/sub:visible group-hover/sub:translate-x-0 group-hover/sub:opacity-100 group-focus-within/sub:visible group-focus-within/sub:translate-x-0 group-focus-within/sub:opacity-100 motion-reduce:transition-none">
                {child.children.map((subChild) => (
                  <li key={subChild.to || subChild.label}>
                    {subChild.to ? (
                      <Link
                        to={subChild.to}
                        onClick={closeMenu}
                        className="block px-4 py-3 text-[13px] font-medium normal-case tracking-normal text-[#3f4c44] transition-colors hover:bg-white hover:text-highlight-hover"
                      >
                        {subChild.label}
                      </Link>
                    ) : (
                      <span className="block px-4 py-3 text-[13px] font-medium normal-case tracking-normal text-[#3f4c44]">
                        {subChild.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </li>
  );
}
