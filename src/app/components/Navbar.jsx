"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // List path yang tidak menampilkan navbar
  const hiddenPaths = ["/adminWash", "/adminWash/dashboard"];

  // Jika sedang di path yang disembunyikan → return null
  if (hiddenPaths.includes(pathname)) {
    return null;
  }

  return (
    <nav className="backdrop-blur-md bg-white/10 text-white shadow-lg sticky top-0 z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold tracking-wide">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            CarWash
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>

          {/* Booking Special Button */}
          <Link
            href="/booking"
            className="px-5 py-2 bg-gradient-to-r from-purple-400 to-blue-500 text-black font-semibold rounded-full hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            Booking
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl focus:outline-none transition-transform duration-300 hover:scale-110"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown with animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="md:hidden backdrop-blur-lg bg-white/10 border-t border-white/20 px-6 py-4 space-y-4 shadow-xl"
          >
            <MobileNavLink href="/" setOpen={setOpen}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/about" setOpen={setOpen}>
              About
            </MobileNavLink>
            <MobileNavLink href="/contact" setOpen={setOpen}>
              Contact
            </MobileNavLink>
            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              className="block text-center px-4 py-2 bg-gradient-to-r from-purple-400 to-blue-500 text-black font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              Booking
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* Desktop NavLink dengan underline animasi */
function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="relative group transition duration-300 text-lg"
    >
      {children}
      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
    </Link>
  );
}

/* Mobile NavLink */
function MobileNavLink({ href, children, setOpen }) {
  return (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className="block text-lg hover:text-yellow-300 transition duration-300"
    >
      {children}
    </Link>
  );
}
