
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { signatureCollectionsData } from "@/data";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut" as const,
    },
  },
};

export default function SignatureCollections() {
  const { collections, viewAll } = signatureCollectionsData;

  return (
    <section
      id="collections"
      className="relative overflow-hidden bg-[#f8f5ef]
        px-5 py-16 sm:px-8 sm:py-8 lg:px-12 lg:py-8
        xl:px-16 w-[100%]"
    >
      
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32
          -top-32 h-80 w-80 rounded-full bg-[#c8aa75]/10
          blur-[100px]"
      />

      <div className="relative mx-auto max-w-[1500px]">

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-8 flex items-end justify-between gap-4
            sm:mb-10 lg:mb-12"
        >
          <div>
            <p
              className="mb-3 text-[10px] font-semibold
                uppercase tracking-[0.28em] text-[#a28a60]
                sm:text-xs sm:tracking-[0.32em]"
            >
              {signatureCollectionsData.eyebrow}
            </p>

            <h2
              className="font-serif text-3xl font-normal
                tracking-[-0.035em] text-[#211b16]
                sm:text-4xl lg:text-5xl"
            >
              {signatureCollectionsData.title}
            </h2>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-4 h-px bg-[#b69a68]"
            />
          </div>

          <Link
            href={viewAll.href}
            className="group mb-1 hidden shrink-0 items-center
              gap-2 border-b border-[#a28a60]/60 pb-2
              text-[11px] font-semibold uppercase tracking-[0.14em]
              text-[#29231c] transition-colors hover:text-[#a28a60]
              sm:inline-flex"
          >
            {viewAll.label}
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>

        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-1 gap-x-5 gap-y-8
            sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10
            lg:grid-cols-4 lg:gap-x-6 xl:gap-x-8"
        >
          {collections.map((collection) => (
            <motion.article
              key={collection.name}
              variants={cardVariants}
              className="group min-w-0"
            >
              <Link
                href={viewAll.href}
                className="block focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-[#a28a60]
                  focus-visible:ring-offset-4"
              >

                <div
                  className="relative aspect-[1.08/1] overflow-hidden
                    rounded-[3px] bg-[#e8e0d4]
                    sm:aspect-[1.05/1] lg:aspect-[0.94/1]"
                >
                  <Image
                    src={collection.image}
                    alt={collection.alt}
                    fill
                    sizes="(max-width: 639px) 100vw,
                      (max-width: 1023px) 50vw, 25vw"
                    className="object-cover transition-transform
                      duration-700 ease-out
                      group-hover:scale-[1.07]"
                  />

                  
                  <div
                    className="absolute inset-0 bg-gradient-to-t
                      from-[#21160b]/35 via-transparent to-transparent
                      opacity-70 transition-opacity duration-500
                      group-hover:opacity-100"
                  />

                  
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-4 right-4 flex
                      h-10 w-10 items-center justify-center
                      rounded-full border border-white/60
                      bg-[#f8f5ef]/90 text-[#211b16]
                      transition-all duration-300
                      group-hover:bg-[#c5a875]"
                  >
                    <ArrowUpRight size={19} strokeWidth={1.5} />
                  </motion.span>

                  {/* Small collection number */}
                  <span
                    className="absolute left-4 top-4 text-[10px]
                      tracking-[0.18em] text-white/90
                      drop-shadow-md"
                  >
                    {collection.number}
                  </span>
                </div>

                
                <div className="pt-4 sm:pt-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      className="font-serif text-xl font-medium
                        tracking-[-0.02em] text-[#29231c]
                        transition-colors duration-300
                        group-hover:text-[#9a7947]
                        sm:text-2xl lg:text-3xl"
                    >
                      {collection.name}
                    </h3>

                    <ArrowRight
                      size={17}
                      strokeWidth={1.4}
                      className="shrink-0 text-[#9b8156]
                        transition-transform duration-300
                        group-hover:translate-x-1"
                    />
                  </div>

                  <p
                    className="mt-2 text-xs leading-5
                      text-[#766d61] sm:text-sm lg:text-xl"
                  >
                    {collection.description}
                    <span className="ml-1.5 text-[#a28a60]">→</span>
                  </p>

                  <div
                    className="mt-4 h-px w-0 bg-[#b69a68]
                      transition-all duration-500
                      group-hover:w-full"
                  />
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        
        <div className="mt-9 flex justify-center sm:hidden">
          <Link
            href={viewAll.href}
            className="inline-flex items-center gap-2
              border border-[#b69a68] px-6 py-3
              text-[11px] font-semibold uppercase
              tracking-[0.16em] text-[#29231c]
              transition-colors hover:bg-[#b69a68]
              hover:text-white"
          >
            {viewAll.label}
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
