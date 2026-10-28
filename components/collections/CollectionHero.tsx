
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { site } from "@/data";

export default function CollectionHero() {
  const reduceMotion = useReducedMotion();
  const pageLink = site.nav.links.find((link) => link.href === "/collections");
  const homeLabel = site.nav.links.find((link) => link.href === "/")?.label;

  if (!pageLink) {
    throw new Error("Collections navigation link is missing from site data.");
  }

  return (
    <section
      aria-labelledby="collection-heading"
      className="relative isolate mt-0 overflow-hidden
        border-y border-[#c8aa78]/25 bg-[#21170f] w-[100%]"
    >
      <div className="absolute inset-0 -z-30">
        <Image
          src={site.site.bannerImage}
          alt={site.site.description}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_50%]"
        />
      </div>

      <div className="absolute inset-0 -z-20 bg-black/15" />

      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r
          from-[#130e09]/90 via-[#21150c]/60 to-transparent"
      />

      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t
          from-black/35 via-transparent to-black/10"
      />

      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          animate={{ opacity: [0.12, 0.25, 0.12] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute -left-20 top-0
            -z-10 h-full w-72 bg-[#d2ad71]/15 blur-[90px]"
        />
      )}

      <div
        className="mx-auto flex min-h-[220px] max-w-[1600px]
          flex-col justify-center px-6 pb-9 pt-24
          sm:min-h-[260px] sm:px-10 sm:py-12
          md:min-h-[290px] md:px-14
          lg:min-h-[480px] lg:px-20"
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          <motion.div
            initial={reduceMotion ? false : { width: 0 }}
            animate={{ width: 38 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-4 h-px bg-[#d4b57d] sm:mb-5"
          />

          <h1
            id="collection-heading"
            className="font-serif text-4xl font-normal
              tracking-[-0.035em] text-[#fff8eb]
              drop-shadow-md sm:text-5xl md:text-6xl"
          >
            {pageLink.label}
          </h1>
        </motion.div>

        <motion.nav
          aria-label="Breadcrumb"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-7 flex items-center gap-2
            text-[10px] tracking-wide sm:mt-9 sm:text-xs lg:text-[18px]"
        >
          <Link
            href="/"
            className="text-white/55 transition-colors
              hover:text-[#e3c58f]"
          >
            {homeLabel}
          </Link>

          <ChevronRight
            size={12}
            className="text-[#c6a66d]"
          />

          <span
            aria-current="page"
            className="text-[#e3c58f]"
          >
            {pageLink.label}
          </span>
        </motion.nav>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-full
          bg-gradient-to-r from-transparent
          via-[#c6a66d]/70 to-transparent"
      />
    </section>
  );
}
