import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const niivLogo = new URL("../assets/images/niiv-logo.png", import.meta.url).href;
const njitLogo = new URL("../assets/images/njit-logo.png", import.meta.url).href;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Research", href: "/research" },
    { name: "Publications", href: "/publications" },
    { name: "People", href: "/people" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(`${path}/`));

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="site-shell">
        <div className="flex min-h-14 items-center justify-between gap-3 py-2 sm:min-h-16">
          
          {/* Logo Cluster */}
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <a
              href="https://ds.njit.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 transition-opacity hover:opacity-80"
            >
              <img
                src={njitLogo}
                alt="NJIT Logo"
                className="h-8 sm:h-9 md:h-10 w-auto"
              />
            </a>
            <div className="h-6 sm:h-7 md:h-8 w-px bg-gray-300" />
            <Link
              to="/"
              className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden sm:gap-3"
            >
              <img
                src={niivLogo}
                alt="NIIV Lab Logo"
                className="h-7 sm:h-8 md:h-9 w-auto flex-shrink-0"
              />
              <div className="hidden min-w-0 max-w-sm flex-1 flex-col min-[30rem]:flex">
                <span className="text-[0.6875rem] font-semibold leading-tight text-gray-900 sm:text-xs xl:text-sm">
                  NJIT’s Intelligible Information Visualization Lab
                </span>
                <span className="truncate text-[0.5625rem] text-gray-600 sm:text-[0.625rem] md:text-xs">
                  Department of Data Science
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden shrink-0 items-center space-x-2 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`rounded-md px-2.5 lg:px-3 py-1.5 lg:py-2 text-[0.8125rem] md:text-sm font-medium transition-colors hover:bg-gray-100 hover:text-[#CC0000] ${
                  isActive(link.href)
                    ? "bg-gray-100 font-semibold text-[#CC0000]"
                    : "text-gray-900"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2 lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-gray-200 pb-4 lg:hidden"
          >
            <div className="flex flex-col space-y-1 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-md px-3 py-2 text-sm sm:text-[0.9375rem] font-medium transition-colors hover:bg-gray-100 hover:text-[#CC0000] ${
                    isActive(link.href)
                      ? "bg-gray-100 font-semibold text-[#CC0000]"
                      : "text-gray-900"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
