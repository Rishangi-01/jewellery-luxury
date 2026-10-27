
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { collectionEditorialData } from "@/data";

export default function CollectionEditorial() {
  const reduceMotion = useReducedMotion();
  const { collections, viewAll } = collectionEditorialData;

  return (
    <section
      className="relative overflow-hidden bg-[#faf8f3]
        px-4 py-12 sm:px-6 sm:py-16
        lg:px-10 lg:py-20 w-[100%]"
    >
      <div className="mx-auto max-w-[1500px]">
        
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-7 flex flex-wrap items-end
            justify-between gap-4 sm:mb-9"
        >
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-7 bg-[#ae8e5b]" />
              <span className="text-[9px] uppercase
                tracking-[0.27em] text-[#a18759]">
                {collectionEditorialData.eyebrow}
              </span>
            </div>

            <h2 className="font-serif text-3xl
              tracking-[-0.035em] text-[#272019]
              sm:text-4xl lg:text-[42px]">
              {collectionEditorialData.title}
            </h2>

            <p className="mt-2 max-w-lg text-sm
              leading-6 text-[#82776a]">
              {collectionEditorialData.description}
            </p>
          </div>

          <Link
            href={viewAll.href}
            className="group inline-flex items-center gap-2
              border-b border-[#b69a68]/60 pb-2
              text-[10px] font-medium uppercase
              tracking-[0.16em] text-[#43382a]
              transition-colors hover:text-[#a18759]"
          >
            {viewAll.label}
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5"
            />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-4
          sm:grid-cols-2 sm:gap-5 lg:gap-6">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 28,
                      scale: 0.985,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative isolate"
            >
              <Link
                href={viewAll.href}
                aria-label={collectionEditorialData.collectionAriaLabel
                  .replace("{title}", collection.title)
                  .replace("{subtitle}", collection.subtitle)}
                className="relative flex aspect-[1.48/1]
                  min-h-[220px] w-full items-end
                  overflow-hidden border border-[#b69a68]/30
                  bg-[#24180f] sm:aspect-[1.48/1]
                  sm:min-h-[235px] lg:min-h-[270px]
                  xl:min-h-[310px]"
              >
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 50vw"
                  className="object-cover transition-transform
                    duration-[1200ms] ease-out
                    group-hover:scale-[1.08]"
                  style={{
                    objectPosition: collection.position,
                  }}
                />

                <div className="absolute inset-0
                  bg-gradient-to-t from-black/85
                  via-black/25 to-black/5
                  transition-opacity duration-500
                  group-hover:opacity-90"
                />

                <div className="absolute inset-0
                  bg-gradient-to-r from-black/25
                  to-transparent opacity-70"
                />

                <motion.div
                  aria-hidden="true"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 + 0.3 }}
                  className="pointer-events-none absolute
                    inset-2 border border-white/0
                    transition-all duration-500
                    group-hover:inset-4
                    group-hover:border-[#dfc18d]/65"
                />

                <span className="absolute right-5 top-5
                  font-serif text-xs tracking-[0.18em]
                  text-white/75 transition-colors
                  group-hover:text-[#e2c493]">
                  {collection.number}
                </span>

                <div className="relative z-10 w-full
                  p-5 sm:p-5 md:p-6 lg:p-7">
                  <div className="mb-3 flex items-center gap-2
                    text-[#dfc18d]">
                    <Sparkles size={13} strokeWidth={1.4} />
                    <span className="text-[8px] uppercase
                      tracking-[0.24em]">
                      {collectionEditorialData.editLabel}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl
                    leading-tight text-white
                    transition-transform duration-500
                    group-hover:-translate-y-1
                    sm:text-2xl md:text-3xl">
                    {collection.title}
                  </h3>

                  <p className="mt-2 max-w-xs text-xs
                    leading-5 text-white/75 sm:text-sm">
                    {collection.subtitle}
                  </p>

                  <div className="mt-4 inline-flex
                    items-center gap-2 border-b
                    border-[#dfc18d]/70 pb-1.5
                    text-[9px] font-medium uppercase
                    tracking-[0.18em] text-white
                    transition-colors duration-300
                    group-hover:text-[#e4c793]">
                    {collectionEditorialData.discoverLabel}
                    <ArrowUpRight
                      size={13}
                      className="transition-transform
                        duration-300 group-hover:translate-x-1
                        group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>

                <div className="pointer-events-none
                  absolute inset-0 bg-[#d4af70]/[0.06]
                  opacity-0 transition-opacity duration-700
                  group-hover:opacity-100"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
