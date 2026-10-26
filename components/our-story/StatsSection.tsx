
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { site } from "@/data";

function parseStatValue(value: string) {
  const match = /^(\d+)(.*)$/.exec(value);

  return match
    ? { value: Number(match[1]), suffix: match[2] }
    : null;
}

function AnimatedNumber({
  value,
  suffix,
  active,
  reduceMotion,
}: {
  value: number;
  suffix: string;
  active: boolean;
  reduceMotion: boolean | null;
}) {
  const [count, setCount] = useState(
    reduceMotion ? value : 0
  );

  useEffect(() => {
    if (!active || reduceMotion) return;

    let frameId = 0;
    const duration = 1600;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );

      // Ease-out cubic for a refined counting animation.
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(eased * value));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [active, value, reduceMotion]);

  return (
    <span>
      {reduceMotion ? value : count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.4,
  });
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      aria-label={`${site.site.name} achievements`}
      className="relative overflow-hidden bg-[#faf8f3]
        px-4 py-8 sm:px-6 sm:py-8 lg:px-10 lg:py-8 w-[100%]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2
          top-0 h-40 w-2/3 -translate-x-1/2
          rounded-full bg-[#c5a36d]/[0.06] blur-3xl"
      />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {site.stats.map((stat, index) => {
            const value = parseStatValue(stat.value);

            return (
              <motion.div
              key={stat.label}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 22 }
              }
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : undefined
              }
              transition={{
                duration: 0.7,
                delay: index * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`
                group relative flex min-h-[108px]
                flex-col items-center justify-center
                px-2 py-5 text-center
                transition-colors duration-500
                hover:bg-[#f2eee6]
                sm:min-h-[125px] sm:px-4
                lg:min-h-[120px] lg:py-3
                ${index % 2 === 0
                  ? "border-r border-[#e9e3d9] lg:border-r"
                  : "lg:border-r lg:border-[#e9e3d9]"}
                ${index >= 2
                  ? "border-t border-[#e9e3d9] lg:border-t-0"
                  : ""}
                ${index === 3 ? "lg:border-r-0" : ""}
              `}
            >
              <motion.span
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.14 + 0.2,
                  ease: "easeOut",
                }}
                className="absolute top-0 h-[2px] w-8
                  origin-center bg-[#b69a68]
                  opacity-0 transition-opacity
                  duration-300 group-hover:opacity-100
                  lg:top-auto lg:bottom-0"
              />

              <div
                className="font-serif text-[36px]
                  font-normal leading-none
                  tracking-[-0.045em] text-[#252019]
                  transition-colors duration-300
                  group-hover:text-[#9c7d4b]
                  sm:text-5xl lg:text-[48px]
                  xl:text-[65px]"
              >
                {value ? (
                  <AnimatedNumber
                    value={value.value}
                    suffix={value.suffix}
                    active={isInView}
                    reduceMotion={reduceMotion}
                  />
                ) : (
                  stat.value
                )}
              </div>

              <p className="mt-3 text-[10px]
                font-normal leading-5 tracking-[0.02em]
                text-[#82786b] sm:mt-4 sm:text-xs
                sm:tracking-wide lg:text-xl">
                {stat.label}
              </p>

              <motion.span
                aria-hidden="true"
                initial={{ width: 0 }}
                animate={isInView ? { width: 20 } : { width: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.14 + 0.45,
                }}
                className="mt-2 h-px bg-[#b69a68]/70"
              />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
