
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const slides = [
  {
    eyebrow: "THE ART OF FINE JEWELRY",
    title: ["Timeless", "Elegance", "For Modern", "Queens"],
    description:
      "Exquisite jewelry crafted for the romantic in all of us.",
    button: "EXPLORE COLLECTION",
    image:
      "/images/hero.webp",
    position: "center 35%",
  },
  {
    eyebrow: "A TOUCH OF GOLD",
    title: ["Beauty In", "Every", "Little", "Detail"],
    description:
      "Discover statement pieces that make every moment unforgettable.",
    button: "DISCOVER THE EDIT",
    image:
      "/images/about/banner1.png",
    position: "center 30%",
  },
  {
    eyebrow: "MADE TO BE CHERISHED",
    title: ["Your Story", "Deserves", "Something", "Beautiful"],
    description:
      "Find your signature style with our thoughtfully curated collection.",
    button: "SHOP SIGNATURES",
    image:
      "/images/home/banner4.webp",
    position: "center 30%",
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const currentSlide = slides[activeSlide];

  const changeSlide = (direction: number) => {
    setActiveSlide(
      (previous) => (previous + direction + slides.length) % slides.length
    );
  };

  return (
    <section
      aria-label="Vélora featured collection"
      className="relative isolate min-h-[680px] overflow-hidden bg-[#080706]
        sm:min-h-[760px] lg:min-h-[min(850px,100svh)] w-[100%]"
    >
      {/* Background image slider */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide.image}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.8 },
            scale: { duration: 6, ease: "linear" },
          }}
          className="absolute inset-0 -z-30"
        >
          <Image
            src={currentSlide.image}
            alt="Vélora luxury fashion collection"
            fill
            priority={activeSlide === 0}
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: currentSlide.position }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlays for readable text */}
      <div className="absolute inset-0 -z-20 bg-black/20" />

      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r
          from-[#080706] via-[#080706]/90 via-35%
          to-transparent sm:via-[#080706]/70"
      />

      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t
          from-black/45 via-transparent to-black/15"
      />

      {/* Subtle golden atmosphere */}
      <div
        className="pointer-events-none absolute left-[-10%] top-[20%]
          -z-10 h-72 w-72 rounded-full bg-[#b18a4a]/10 blur-[120px]
          sm:h-96 sm:w-96"
      />

      {/* Main content */}
      <div
        className="mx-auto flex min-h-[680px] max-w-[1600px]
          items-center px-6 pb-28 pt-32
          sm:min-h-[760px] sm:px-10 sm:pb-32 sm:pt-36
          lg:min-h-[min(850px,100svh)] lg:px-14
          xl:px-20"
      >
        <div className="w-full max-w-[620px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -15 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.13,
                    delayChildren: 0.15,
                  },
                },
              }}
            >
              {/* Eyebrow */}
              <motion.div
                variants={textVariants}
                className="mb-5 flex items-center gap-3 sm:mb-7"
              >
                <span className="h-px w-9 bg-[#c9a76b] sm:w-12" />

                <span
                  className="text-[10px] font-medium tracking-[0.28em]
                    text-[#e0c99c] sm:text-xs sm:tracking-[0.34em]"
                >
                  {currentSlide.eyebrow}
                </span>

                <Sparkles
                  size={14}
                  className="text-[#c9a76b]"
                  strokeWidth={1.3}
                />
              </motion.div>

              {/* Main heading */}
              <h1
                className="font-serif text-[clamp(3.2rem,8vw,6.8rem)]
                  font-normal leading-[0.98] tracking-[-0.045em]
                  text-[#f6eddb]"
              >
                {currentSlide.title.map((line, index) => (
                  <motion.span
                    key={`${activeSlide}-${line}`}
                    variants={textVariants}
                    className="block"
                  >
                    {line}
                  </motion.span>
                ))}
              </h1>

              {/* Description */}
              <motion.p
                variants={textVariants}
                className="mt-6 max-w-[340px] text-sm leading-7
                  text-white/70 sm:mt-8 sm:max-w-[380px]
                  sm:text-base sm:leading-8"
              >
                {currentSlide.description}
              </motion.p>

              {/* CTA */}
              <motion.div
                variants={textVariants}
                className="mt-8 sm:mt-10"
              >
                <Link
                  href="/shop"
                  className="group inline-flex min-h-[54px]
                    items-center justify-center gap-5
                    border border-[#c6a66d]/80 px-5 py-4
                    text-[10px] font-semibold tracking-[0.15em]
                    text-[#f6eddb] transition-all duration-300
                    hover:border-[#e4c68c] hover:bg-[#c6a66d]
                    hover:text-[#100d08]
                    sm:min-h-[60px] sm:px-7 sm:text-xs"
                >
                  {currentSlide.button}

                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300
                      group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom slider controls */}
      <div
        className="absolute bottom-7 left-6 right-6 z-10
          flex items-end justify-between gap-4
          sm:bottom-10 sm:left-10 sm:right-10
          lg:left-14 lg:right-14 xl:left-20 xl:right-20"
      >
        {/* Slide number */}
        <div className="flex items-center gap-3">
          <span className="font-serif text-2xl text-[#e2c58f]">
            0{activeSlide + 1}
          </span>

          <span className="h-px w-9 bg-white/35 sm:w-14" />

          <span className="text-xs text-white/45">
            0{slides.length}
          </span>
        </div>

        {/* Progress indicators */}
        <div className="flex flex-1 items-center justify-center gap-2 px-2 sm:gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.eyebrow}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeSlide === index ? "true" : undefined}
              onClick={() => setActiveSlide(index)}
              className="group flex h-8 items-center"
            >
              <span
                className={`block h-[2px] transition-all duration-500 ${
                  activeSlide === index
                    ? "w-8 bg-[#d4b578] sm:w-12"
                    : "w-4 bg-white/35 group-hover:bg-white/70 sm:w-6"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Previous / Next */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => changeSlide(-1)}
            className="flex h-10 w-10 items-center justify-center
              border border-white/20 text-white/80
              transition-all duration-300 hover:border-[#c9a76b]
              hover:bg-[#c9a76b] hover:text-black
              sm:h-12 sm:w-12"
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
          </button>

          <button
            type="button"
            aria-label="Next slide"
            onClick={() => changeSlide(1)}
            className="flex h-10 w-10 items-center justify-center
              border border-[#c9a76b]/70 bg-[#c9a76b]/10
              text-[#f3dfb4] transition-all duration-300
              hover:bg-[#c9a76b] hover:text-black
              sm:h-12 sm:w-12"
          >
            <ArrowRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Decorative side line */}
      <div
        aria-hidden="true"
        className="absolute bottom-28 right-0 top-36
          hidden w-px bg-gradient-to-b from-transparent
          via-[#d2b27a]/40 to-transparent lg:block"
      />
    </section>
  );
}
