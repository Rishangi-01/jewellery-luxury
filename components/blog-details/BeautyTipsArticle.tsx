
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  CalendarDays,
  Sparkles,
} from "lucide-react";
import { blogDetailsData } from "@/data";

export default function BeautyTipsArticle() {
  return (
    <main className="relative overflow-hidden bg-[#fdfcfb] px-4 py-10 text-[#202333] sm:px-6 sm:py-12 lg:px-16 lg:py-12">
      
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-72 h-80 w-80 rounded-full bg-[#c18a4b]/[0.04] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-[#c18a4b]/[0.05] blur-3xl"
      />

      <article className="relative mx-auto lg:max-w-7xl">
       
        <motion.header
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-5xl text-center"
        >
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#c8b9a7]" />
            <Sparkles
              size={13}
              strokeWidth={1.3}
              className="text-[#b98243]"
            />
            <span className="h-px w-12 bg-[#c8b9a7]" />
          </div>

          <p className="mb-2 text-[18px] font-medium uppercase tracking-[0.25em] text-[#b98243]">
            {blogDetailsData.eyebrow}
          </p>

          <h1 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl lg:text-[60px]">
            {blogDetailsData.headingFirst}
            <span className="text-[#c17c2e]">
              {blogDetailsData.headingHighlight}
            </span>
          </h1>

          <div className="mt-3 flex items-center justify-center gap-2 text-[18px] tracking-[0.12em] text-[#777783]">
            <CalendarDays size={12} strokeWidth={1.5} />
            <time dateTime={blogDetailsData.dateTime}>
              {blogDetailsData.dateLabel}
            </time>
          </div>

          <p className="mx-auto mt-4 text-sm leading-[1.8] text-[#777783] sm:text-xl">
            {blogDetailsData.introduction}
          </p>
        </motion.header>

        
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="group relative mt-7 overflow-hidden sm:mt-9"
        >
          <div className="relative min-h-[190px] w-full overflow-hidden sm:min-h-[280px] lg:min-h-[460px]">
            <Image
              src={blogDetailsData.image.src}
              alt={blogDetailsData.image.alt}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 960px"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.10] to-transparent opacity-70" />
        </motion.div>

       
        <motion.blockquote
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65 }}
          className="my-7 border-l-2 border-[#c18a4b] py-1 pl-4 sm:my-9 sm:ml-3 sm:pl-5"
        >
          <p className="font-serif text-sm leading-[1.8] text-[#46434a] sm:text-base lg:text-xl">
            {blogDetailsData.quotation}
          </p>
        </motion.blockquote>

      
        <div className="space-y-7 sm:space-y-9">
          {blogDetailsData.tips.map((tip) => (
            <motion.section
              key={tip.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.65,
                delay: 0.05,
                ease: "easeOut",
              }}
              className="group"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="h-px w-5 bg-[#c18a4b]" />
                <span className="text-[11px] font-medium tracking-wide text-[#b98243]">
                  {tip.number}
                </span>
              </div>

              <h2 className="font-serif text-xl leading-snug text-[#252533] transition-colors duration-300 group-hover:text-[#b7793c] sm:text-2xl lg:text-4xl">
                {tip.title}
              </h2>

              <div className="mt-2 space-y-2">
                {tip.paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraphIndex}
                    className="text-xs leading-[1.85] text-[#777783] sm:text-sm lg:text-xl"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </article>
    </main>
  );
}
