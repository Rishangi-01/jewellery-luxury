"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { site } from "@/data";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

const textVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-0 md:px-3 pt-0 sm:px-5 sm:pt-0">
      <motion.nav
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-[1600px] overflow-hidden
          rounded-0 border border-white/10 bg-[#080807]/95
          shadow-[0_8px_40px_rgba(0,0,0,0.35)]
          backdrop-blur-xl"
      >
       
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
          <div
            className="absolute inset-0 bg-gradient-to-b
            from-white/[0.035] to-transparent"
          />
        </div>

        <div
          className="relative flex min-h-[68px] items-center
          justify-between gap-4 px-4 sm:min-h-[82px] sm:px-7 lg:px-12"
        >
          
          <Link
            href="/"
            aria-label={`${site.site.name} home`}
            className="group relative shrink-0"
          >
            <div className="flex flex-col lg:h-[60px] md:h-[40px] h-[35px]">
              <img src={site.site.logo} alt={site.site.name} className="h-full w-full object-contain" />
            </div>

            <span
              className="absolute -bottom-1 left-0 h-px w-0
              bg-[#d7c49c] transition-all duration-500
              group-hover:w-full"
            />
          </Link>

          <div className="hidden items-center gap-6 md:flex lg:gap-9 xl:gap-11">
            {site.nav.links.map((link, index) => (
              <motion.div
                key={link.href}
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
                    hover:text-[#e0cba3] lg:text-[16px]"
                >
                  {link.label}
                  <span
                    className="absolute -bottom-0.5 left-0 h-px
                    w-0 bg-[#d7c49c] transition-all duration-300
                    group-hover:w-full"
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex shrink-0 items-center md:gap-2 gap-2 lg:gap-5">
            
              <Link
                href={site.nav.button.href}
                className="group inline-flex lg:min-h-[40px] min-h-[35px]
                                items-center justify-center lg:gap-5 gap-2
                                border border-[#c6a66d]/80 px-2 md:px-3 py-1 md:py-2 sm:py-3 rounded-xs
                                text-[9px] md:text-[10px] font-semibold tracking-[0.15em]
                                text-[#f6eddb] transition-all duration-300
                                hover:border-[#e4c68c] hover:bg-[#c6a66d]
                                hover:text-[#100d08]
                                sm:min-h-[40px] sm:px-7 sm:text-xs lg:text-[16px]"
              >
                {site.nav.button.label}

                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300
                                  group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>

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
                {site.nav.links.map((link, index) => (
                  <motion.div
                    key={link.href}
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
                      {link.label}
                      <ArrowUpRight size={16} className="text-[#d7c49c]" />
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
