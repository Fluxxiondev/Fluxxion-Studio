import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react"; 
import { motion as Motion } from "framer-motion";

// Custom Logo SVG Component (Adjusted colors to match the new blue theme)
const FluxionLogo = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mr-2 transition-colors duration-300"
  >
    {/* Use the main primary blue color for the logo elements */}
    <path
      d="M10 24C10 21.6 15 16 24 16C33 16 38 21.6 38 24C38 26.4 33 32 24 32C15 32 10 26.4 10 24Z"
      stroke="#1E40AF" // Darker blue for contrast
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24 8V40"
      stroke="#2563EB" // Primary blue
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle 
        cx="24" 
        cy="24" 
        r="4" 
        fill="#2563EB" 
    />
  </svg>
);


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const isHamburger = e.target.closest('button[aria-label="Toggle Menu"]');
      if (menuRef.current && !menuRef.current.contains(e.target) && !isHamburger) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Close menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const links = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "FAQs", path: "/faqs" },
  ];

  const isActivePath = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const logoText = "Fluxion Studio"; 
  const phoneNumber = "+92 men-nai-dun-gi"; 
  const ctaText = "Book Consultation"; 

  const menuVariants = {
    open: { x: 0 },
    closed: { x: "100%" },
  };

  return (
    <nav
      // Set to 'fixed' to always stick to the top, ensuring no bottom space from content
      className="fixed top-0 left-0 w-full z-50 bg-white shadow-md"
    >
        {/* Global style for consistent cursor */}
        <style jsx="true">
            {`
            a:hover, button:hover, .cursor-pointer {
                cursor: pointer;
            }
            `}
        </style>

      {/* !!! REMOVED: Top Blue Banner element here !!! */}

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold flex items-center text-blue-800"
        >
          <FluxionLogo />
          {logoText}
        </Link>

        {/* Desktop Links, Phone & CTA */}
        <div className="hidden md:flex items-center space-x-8">
            {/* Desktop Links */}
            <ul className="flex space-x-6 text-gray-700 font-medium items-center">
                {links.map((link) => (
                    <li key={link.name}>
                        <Link
                            to={link.path}
                            className={`text-base relative py-2 transition-all duration-200 cursor-pointer ${
                                isActivePath(link.path)
                                ? "text-blue-600 font-semibold" 
                                : "text-gray-700 hover:text-blue-600"
                            }`}
                        >
                            {link.name}
                            {/* Underline indicator for active link */}
                            {isActivePath(link.path) && (
                                <Motion.span
                                    layoutId="underline"
                                    className="absolute left-0 bottom-0 h-[3px] w-full bg-blue-600 rounded-full"
                                />
                            )}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Phone Number */}
            <a 
                href={`tel:${phoneNumber.replace(/[^0-9+]/g, '')}`}
                className="flex items-center space-x-2 text-lg text-gray-700 hover:text-blue-600 transition duration-300 ml-8"
            >
                <Phone size={18} className="text-blue-600" />
                <span className="font-semibold">{phoneNumber}</span>
            </a>

            {/* Desktop CTA Button */}
            <Link to="/contact">
                <Motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 4px 15px rgba(37, 99, 235, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="ml-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 cursor-pointer"
                >
                {ctaText}
                </Motion.button>
            </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide-In */}
      <Motion.div
        ref={menuRef}
        initial="closed"
        animate={menuOpen ? "open" : "closed"}
        variants={menuVariants}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed top-0 right-0 h-screen w-72 bg-white shadow-2xl z-40 md:hidden"
      >
        <div className="p-6">
          {/* Close button inside the menu */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
            >
              <X size={28} />
            </button>
          </div>
          
          <ul className="flex flex-col items-start space-y-2 text-lg font-semibold text-gray-800 mt-10">
            {/* Phone Number in Mobile Menu */}
            <li className="w-full pb-4 border-b border-gray-100">
                <a 
                    href={`tel:${phoneNumber.replace(/[^0-9+]/g, '')}`}
                    className="flex items-center space-x-2 text-lg text-blue-600 font-bold hover:text-blue-700 transition duration-300"
                >
                    <Phone size={18} />
                    <span>Call Us Now</span>
                </a>
            </li>

            {links.map((link) => (
              <Motion.li 
                key={link.name} 
                className="w-full"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.1 + links.indexOf(link) * 0.05 }}
              >
                <Link
                  to={link.path}
                  onClick={() => setMenuOpen(false)} 
                  className={`block w-full py-3 px-4 rounded-lg transition-colors border-l-4 ${
                    isActivePath(link.path)
                      ? "bg-blue-50 text-blue-600 border-blue-600" 
                      : "hover:bg-gray-50 text-gray-700 border-transparent" 
                  } cursor-pointer`}
                >
                  {link.name}
                </Link>
              </Motion.li>
            ))}
            
            {/* CTA in mobile menu */}
            <li className="w-full pt-6">
               <Link to="/contact">
                  <Motion.button
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition duration-300 cursor-pointer"
                  >
                    {ctaText}
                  </Motion.button>
                </Link>
            </li> 
          </ul>
        </div>
      </Motion.div>
      
      {/* Overlay to dim background when menu is open */}
       {menuOpen && (
          <Motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-30 md:hidden" 
            onClick={() => setMenuOpen(false)}
          />
        )}
    </nav>
  );
};

export default Navbar;