
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { site } from "@/data";


export default function BrandStory() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="our-story"
      className="relative overflow-hidden bg-[#faf8f3]
        px-4 py-8 text-[#211c16] sm:px-6 sm:py-8
        lg:px-10 lg:pb-8 lg:pt-16 w-[100%]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32
          top-0 h-80 w-80 rounded-full bg-[#c5a36d]/10
          blur-[100px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32
          left-0 h-72 w-72 rounded-full bg-[#d8c5a5]/15
          blur-[100px]"
      />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 items-center
          gap-10 md:grid-cols-2 md:gap-10
          lg:gap-16 xl:gap-24">

          <motion.div
            initial={
              reduceMotion ? false : { opacity: 0, x: -35 }
            }
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 md:order-1"
          >

            <h2 className="max-w-xl font-serif
              text-3xl font-normal leading-[1.2]
              tracking-[-0.035em] text-[#272019]
              sm:text-4xl lg:text-[42px] xl:text-[60px]">
              {site.about.title}{" "}
              <span className="italic text-[#a18759]">
                {site.about.highlight}
              </span>
            </h2>

            <motion.div
              initial={reduceMotion ? false : { width: 0 }}
              whileInView={{ width: 65 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-6 h-[2px] bg-[#b79a68]"
            />

            <div className="mt-6 space-y-4 text-sm
              leading-7 text-[#756b5f] sm:text-[15px]
              sm:leading-[1.9] lg:text-xl">
              {site.about.pageParagraphs.slice(0, 2).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8">
              <motion.div
                whileHover={reduceMotion ? undefined : { y: -3 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="inline-flex"
              >
                <Link
                  href={site.about.button.href}
                  className="group inline-flex min-h-[50px]
                    items-center justify-center gap-4
                    rounded-[4px] border border-[#171613]
                    bg-[#171613] px-7 py-4 text-[10px]
                    font-semibold uppercase tracking-[0.18em]
                    text-white shadow-[0_6px_20px_rgba(0,0,0,0.08)]
                    transition-all duration-300
                    hover:border-[#a18759] hover:bg-[#a18759] lg:text-[16px]"
                >
                  {site.about.button.label}
                  <ArrowRight
                    size={15}
                    className="transition-transform
                      duration-300 group-hover:translate-x-1.5"
                  />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Artisan image */}
          <motion.div
            initial={
              reduceMotion ? false : { opacity: 0, x: 35, scale: 0.97 }
            }
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="group relative order-1 md:order-2"
          >
            {/* Offset decorative frame */}
            <div
              aria-hidden="true"
              className="absolute -right-2 -top-2
                h-full w-full border border-[#b79a68]/50
                transition-transform duration-700
                group-hover:translate-x-1.5
                group-hover:-translate-y-1.5
                sm:-right-3 sm:-top-3"
            />

            <div className="relative aspect-[5/4]
              overflow-hidden bg-[#e7dfd3]
              sm:aspect-[1.12/1] md:aspect-[0.98/1]
              lg:aspect-[1.08/1]">
              <Image
                src={site.about.mainImage}
                alt={site.about.mainImageAlt}
                fill
                priority={false}
                sizes="(max-width: 767px) 100vw, (max-width: 1199px) 48vw, 600px"
                className="object-cover transition-transform
                  duration-[1200ms] ease-out
                  group-hover:scale-[1.055]"
              />

              <div className="absolute inset-0 bg-gradient-to-t
                from-black/35 via-transparent to-transparent
                opacity-80 transition-opacity duration-500
                group-hover:opacity-50"
              />

              {/* Corner label */}
              <div className="absolute bottom-4 left-4
                border border-white/30 bg-black/30
                px-4 py-3 backdrop-blur-md
                sm:bottom-6 sm:left-6 sm:px-5">
                <p className="text-[9px] uppercase
                  tracking-[0.22em] text-[#e5cc9e]">
                  {site.about.eyebrow}
                </p>
                <p className="mt-1 font-serif text-lg
                  text-white sm:text-xl">
                  {site.about.experience.value}{" "}
                  {site.about.experience.label.join(" ")}
                </p>
              </div>

              {/* Decorative corner */}
              <div className="absolute right-4 top-4
                flex h-11 w-11 items-center justify-center
                rounded-full border border-white/40
                text-white backdrop-blur-sm sm:right-6 sm:top-6">
                <Sparkles size={18} strokeWidth={1.3} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
