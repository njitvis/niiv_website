import { Menu } from "lucide-react";
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

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          
          {/* Logo Cluster */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
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
            <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
              <img
                src={niivLogo}
                alt="NIIV Lab Logo"
                className="h-7 sm:h-8 md:h-9 w-auto flex-shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="truncate text-[10px] sm:text-[11px] md:text-sm font-medium text-gray-900 leading-tight">
                  NJIT’s Intelligible Information Visualization Lab
                </span>
                <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-600">
                  Department of Data Science
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`rounded-md px-2.5 lg:px-3 py-1.5 lg:py-2 text-[13px] md:text-sm font-medium transition-colors hover:bg-gray-100 hover:text-[#CC0000] ${
                  isActive(link.href)
                    ? "bg-gray-100 text-[#CC0000]"
                    : "text-gray-900"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-md hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="border-t border-gray-200 pb-4 md:hidden">
            <div className="flex flex-col space-y-1 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-md px-3 py-2 text-sm sm:text-[15px] font-medium transition-colors hover:bg-gray-100 hover:text-[#CC0000] ${
                    isActive(link.href)
                      ? "bg-gray-100 text-[#CC0000]"
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
