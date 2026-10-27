
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { site } from "@/data";

export default function LegacyBanner() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-[#f8f5ef] px-0 pt-8 pb-0 sm:px-0 sm:pt-8 sm:pb-0 lg:px-0 w-[100%]">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="group relative isolate mx-auto max-w-[1600px]
          overflow-hidden border border-[#c6a66d]/30
          bg-[#100d09] shadow-[0_15px_50px_rgba(35,24,12,0.12)]"
      >
        <div className="absolute inset-0 -z-30">
          <Image
            src={site.cta.image}
            alt={site.cta.text}
            fill
            sizes="100vw"
            className="object-cover object-[65%_50%]
              transition-transform duration-[1400ms]
              ease-out group-hover:scale-[1.04]"
          />
        </div>

        <div className="absolute inset-0 -z-20 bg-black/25" />

        <div
          className="absolute inset-0 -z-10 bg-gradient-to-r
            from-[#080b09] via-[#100d09]/90 via-40%
            to-[#100d09]/10"
        />

        <div
          className="absolute inset-0 -z-10 bg-gradient-to-t
            from-black/35 via-transparent to-black/10"
        />

        {!shouldReduceMotion && (
          <motion.div
            aria-hidden="true"
            animate={{ opacity: [0.12, 0.3, 0.12], x: [0, 25, 0] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute right-[15%] top-0
              -z-10 h-full w-48 bg-[#d2a75c]/20 blur-[70px]"
          />
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-2
            border border-white/10 sm:inset-3"
        />

        <div
          className="relative flex min-h-[330px] items-center
            px-7 py-12 sm:min-h-[370px] sm:px-12
            sm:py-14 md:min-h-[400px] md:px-16
            lg:min-h-[430px] lg:px-20"
        >
          <div className="max-w-[510px]">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-5 flex items-center gap-3"
            >
              <span className="h-px w-8 bg-[#c5a46a]" />
              <span
                className="text-[10px] font-medium uppercase
                  tracking-[0.28em] text-[#ddc18c] sm:text-xs"
              >
                {site.cta.eyebrow}
              </span>
              <Sparkles size={14} className="text-[#ddc18c]" />
            </motion.div>

            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-4xl font-normal
                leading-[1.08] tracking-[-0.035em] text-[#f5ead4]
                sm:text-5xl md:text-6xl"
            >
              {site.cta.title.map((line, index) => (
                <span
                  key={line}
                  className={index === 1 ? "mt-1 block italic text-[#d8bc87]" : "block"}
                >
                  {line}
                </span>
              ))}
            </motion.h2>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-5 max-w-[390px] text-sm leading-7
                text-white/75 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg"
            >
              {site.cta.text}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-7 sm:mt-9"
            >
              <Link
                href={site.cta.button.href}
                className="group/button inline-flex min-h-12
                  items-center gap-4 border border-[#c5a46a]/80
                  bg-black/20 px-5 py-3 text-[10px] font-semibold
                  uppercase tracking-[0.17em] text-[#f5ead4]
                  transition-all duration-300
                  hover:border-[#d8bc87] hover:bg-[#c5a46a]
                  hover:text-[#100d09]
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-[#d8bc87] focus-visible:ring-offset-2
                  focus-visible:ring-offset-[#100d09] sm:px-6 sm:text-xs"
              >
                {site.cta.button.label}
                <ArrowUpRight
                  size={17}
                  strokeWidth={1.5}
                  className="transition-transform duration-300
                    group-hover/button:-translate-y-0.5
                    group-hover/button:translate-x-0.5"
                />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Gold accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="absolute bottom-0 left-0 h-[2px] w-full
            origin-left bg-gradient-to-r from-transparent
            via-[#d8bc87] to-transparent"
        />
      </motion.div>
    </section>
  );
}
