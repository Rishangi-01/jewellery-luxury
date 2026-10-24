
"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Lookbook", href: "/lookbook" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-0 sm:px-5 sm:pt-0">
      <motion.nav
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-[1600px] overflow-hidden
          rounded-md border border-white/10 bg-[#080807]/95
          shadow-[0_8px_40px_rgba(0,0,0,0.35)]
          backdrop-blur-xl"
      >
        {/* Ambient golden light */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <motion.div
            animate={{ x: ["-15%", "15%", "-15%"] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-10 -top-16 h-36 w-80
              rounded-full bg-amber-600/10 blur-[65px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b
            from-white/[0.035] to-transparent" />
        </div>

        <div className="relative flex min-h-[68px] items-center
          justify-between gap-4 px-4 sm:min-h-[82px] sm:px-7 lg:px-12">

          {/* Brand */}
          <Link
            href="/"
            aria-label="Vélora home"
            className="group relative shrink-0"
          >
            <motion.span
              whileHover={{ letterSpacing: "0.14em" }}
              transition={{ duration: 0.3 }}
              className="block font-serif text-[25px] font-medium
                tracking-[0.08em] text-[#d7c49c]
                sm:text-[30px] lg:text-[35px]"
            >
              VÉLORA
            </motion.span>

            <span className="absolute -bottom-1 left-0 h-px w-0
              bg-[#d7c49c] transition-all duration-500
              group-hover:w-full" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex lg:gap-9 xl:gap-11">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15 + index * 0.09,
                  duration: 0.45,
                }}
              >
                <Link
                  href={link.href}
                  className="group relative py-3 text-[13px]
                    font-medium tracking-wide text-white/80
                    transition-colors duration-300
                    hover:text-[#e0cba3] lg:text-[15px]"
                >
                  {link.name}
                  <span className="absolute -bottom-0.5 left-0 h-px
                    w-0 bg-[#d7c49c] transition-all duration-300
                    group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex shrink-0 items-center gap-3 sm:gap-5">

            {/* Search */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchOpen((prev) => !prev)}
              aria-label="Toggle search"
              aria-expanded={searchOpen}
              className="text-white/90 transition-colors
                hover:text-[#e0cba3]"
            >
              {searchOpen ? (
                <X size={22} strokeWidth={1.7} />
              ) : (
                <Search size={22} strokeWidth={1.8} />
              )}
            </motion.button>

            {/* Wishlist */}
            <motion.div
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="relative block text-white/90
                  transition-colors hover:text-[#e0cba3]"
              >
                <Heart size={22} strokeWidth={1.7} />
                <span className="absolute -right-1 -top-1 h-2 w-2
                  rounded-full bg-[#d6a66b] ring-2 ring-[#080807]" />
              </Link>
            </motion.div>

            {/* Shopping bag */}
            <motion.div
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link
                href="/cart"
                aria-label="Shopping bag"
                className="relative block text-white/90
                  transition-colors hover:text-[#e0cba3]"
              >
                <ShoppingBag size={23} strokeWidth={1.7} />
                <span className="absolute -right-1 -top-1 h-2 w-2
                  rounded-full bg-[#b96948] ring-2 ring-[#080807]" />
              </Link>
            </motion.div>

            {/* Mobile menu button */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="ml-1 text-white md:hidden"
            >
              {menuOpen ? <X size={23} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Expandable Search */}
        <AnimatePresence>
          {searchOpen && (
            <motion.form
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const query = String(formData.get("q") || "").trim();

                if (query) {
                  window.location.href =
                    `/shop?q=${encodeURIComponent(query)}`;
                }
              }}
              className="relative overflow-hidden border-t
                border-white/10"
            >
              <div className="flex items-center gap-3 px-5 py-4 sm:px-8">
                <Search size={19} className="text-[#d7c49c]" />
                <input
                  name="q"
                  type="search"
                  autoFocus
                  placeholder="Search collections, clothing..."
                  aria-label="Search products"
                  className="w-full bg-transparent text-sm
                    text-white outline-none placeholder:text-white/40"
                />
                <button
                  type="submit"
                  aria-label="Submit search"
                  className="text-[#d7c49c] hover:text-white"
                >
                  <ArrowUpRight size={21} />
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden border-t border-white/10 md:hidden"
            >
              <div className="space-y-1 px-5 py-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between
                        border-b border-white/[0.07] py-3.5
                        text-sm tracking-wide text-white/80
                        transition-colors hover:text-[#d7c49c]"
                    >
                      {link.name}
                      <ArrowUpRight
                        size={16}
                        className="text-[#d7c49c]"
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
