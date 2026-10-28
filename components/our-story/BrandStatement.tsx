
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/data";

export default function BrandStatement() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-[#faf8f3] px-3 py-5 sm:px-5 sm:py-7 lg:px-8 w-[100%]">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="group relative mx-auto min-h-[190px]
          max-w-[1500px] overflow-hidden border
          border-[#bda47d]/50 bg-[#100d09]
          sm:min-h-[220px] lg:min-h-[300px]"
      >
      
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20
            -top-24 h-72 w-72 rounded-full
            bg-[#bd8c4c]/15 blur-[100px]"
        />

     
        <motion.div
          initial={reduceMotion ? false : { scale: 1.08, opacity: 0.7 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: "easeOut" }}
          className="absolute inset-y-0 right-0 w-[72%]
            sm:w-[65%] lg:w-[58%]"
        >
          <Image
            src={site.about.mainImage}
            alt={site.about.mainImageAlt}
            fill
            sizes="(max-width: 640px) 72vw, (max-width: 1024px) 65vw, 58vw"
            className="object-cover object-center
              transition-transform duration-[1600ms]
              ease-out group-hover:scale-105"
          />
        </motion.div>

      
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r
            from-[#100d09] from-[5%]
            via-[#100d09]/90 via-[30%]
            to-transparent to-[90%]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t
            from-black/25 to-transparent"
        />

      
        <motion.div
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute left-0 top-0 h-[2px]
            w-full origin-left bg-gradient-to-r
            from-[#c7a46a] via-[#8e6b3c]/50 to-transparent"
        />

      
        <div className="relative z-10 flex min-h-[190px]
          items-center px-6 py-9 sm:min-h-[220px]
          sm:px-10 lg:min-h-[250px] lg:px-12 xl:px-16">

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-[620px]"
          >

            <h2 className="font-serif text-[27px]
              font-normal leading-[1.3] tracking-[-0.025em]
              text-[#f8f0e3] sm:text-3xl
              md:text-4xl lg:text-[32px] xl:text-[36px]">
              {site.about.pageParagraphs[3]}
            </h2>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-5 h-px bg-[#c5a36d]/80"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
