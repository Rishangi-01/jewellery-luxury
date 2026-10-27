"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { TbBrandLinkedin } from "react-icons/tb";
import type { IconType } from "react-icons";
import { site } from "@/data";

const socialIcons: Record<string, IconType> = {
  facebook: CiFacebook,
  instagram: FaInstagram,
  linkedin: TbBrandLinkedin,
  youtube: AiOutlineYoutube,
};

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");
  const reduceMotion = useReducedMotion();

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubscribed(true);
  }

  return (
    <footer
      className="relative isolate overflow-hidden bg-[#080a09]
      text-[#e9e1d2]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40
          left-1/3 -z-10 h-72 w-72 rounded-full
          bg-[#b18b4e]/[0.07] blur-[100px]"
      />

      <div
        className="mx-auto max-w-[1300px] px-6 pb-8 pt-12
        sm:px-10 sm:pb-8 sm:pt-16 lg:px-14 lg:pt-16 xl:px-20"
      >

      <div className="absolute inset-0 -z-30 bottom-[4rem]">
        <Image
          src={site.site.bgImage}
          alt={site.site.alt}
          fill
          sizes="100vw"
          className="object-cover object-[35%_50%]
                    transition-transform duration-[1400ms]
                    ease-out group-hover:scale-[1.04]"
        />
      </div>

        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12 },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-10 sm:grid-cols-2
            sm:gap-x-8 lg:grid-cols-[1.05fr_0.7fr_0.7fr_1fr]
            lg:gap-10 xl:gap-14"
        >
          <motion.div variants={reveal} className="space-y-5">
            <Link
              href="/"
              aria-label={`${site.site.name} home`}
              className="group inline-block"
            >
              <span
                className="font-serif text-3xl tracking-[0.1em]
                text-[#d6bf91] transition-colors duration-300
                group-hover:text-[#f1dfb7] sm:text-4xl"
              >
                {site.site.name}
              </span>
            </Link>

            <p
              className="max-w-[250px] text-sm leading-7
              text-white/50 xl:text-[16px]"
            >
              {site.footer.about}
            </p>
          </motion.div>

          {site.footer.columns.map((group) => (
            <motion.div
              variants={reveal}
              key={group.title}
              className="space-y-4"
            >
              <h3
                className="text-[11px] font-semibold uppercase
                tracking-[0.19em] text-[#d6bf91] lg:text-lg"
              >
                {group.title}
              </h3>

              <ul className="space-y-3.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1
                        text-sm text-white/55 transition-colors
                        duration-300 hover:text-[#e4c994] lg:text-[16px]"
                    >
                      <span>{link.label}</span>
                      <ArrowRight
                        size={12}
                        className="opacity-0 transition-all
                          duration-300 group-hover:translate-x-1
                          group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div variants={reveal} className="min-w-0">
            <h3
              className="text-[11px] font-semibold uppercase
              tracking-[0.19em] text-[#d6bf91] lg:text-lg"
            >
              Join Our Newsletter
            </h3>

            <p
              className="mt-4 max-w-sm text-sm leading-6
              text-white/50 lg:text-[16px]"
            >
              Be the first to discover new collections, exclusive previews, and
              stories from {site.site.name}.
            </p>

            <form onSubmit={handleSubscribe} className="mt-5">
              <label htmlFor="footer-email" className="sr-only">
                Your email address
              </label>

              <div
                className="group flex min-h-[54px] items-center
                border border-white/15 bg-white/[0.025]
                transition-colors duration-300
                focus-within:border-[#c6a66d]/80
                hover:border-white/30"
              >
                <input
                  id="footer-email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                    setSubscribed(false);
                  }}
                  placeholder="Your email address"
                  autoComplete="email"
                  required
                  className="min-w-0 flex-1 bg-transparent
                    px-4 py-3 text-sm text-white outline-none
                    placeholder:text-white/35 lg:text-md"
                />

                <motion.button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  whileHover={reduceMotion ? undefined : { x: 2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.94 }}
                  className="mr-2 flex h-10 w-10 shrink-0
                    items-center justify-center text-[#d6bf91]
                    transition-colors hover:text-white"
                >
                  {subscribed ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <ArrowRight size={21} />
                  )}
                </motion.button>
              </div>

              {error && (
                <p role="alert" className="mt-2 text-xs text-red-300">
                  {error}
                </p>
              )}

              {subscribed && (
                <p role="status" className="mt-2 text-xs text-[#d6bf91]">
                  Thank you! Your email has been validated.
                </p>
              )}
            </form>

            <div className="mt-7 flex items-center gap-3">
              {site.site.socials.map(({ icon, label, href }) => {
                const Icon = socialIcons[icon];

                return (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    whileHover={
                      reduceMotion ? undefined : { y: -3, scale: 1.06 }
                    }
                    whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                    className="flex h-9 w-9 items-center justify-center
                      rounded-full border border-white/15
                      text-white/60 transition-colors duration-300
                      hover:border-[#c6a66d]/70 hover:bg-[#c6a66d]/10
                      hover:text-[#e4c994]"
                  >
                    <Icon size={15} strokeWidth={1.7} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="border-t border-white/10">
        <div
          className="mx-auto flex max-w-[1600px] flex-col
          gap-4 px-6 py-5 sm:px-10 md:flex-row
          md:items-center md:justify-between lg:px-14 xl:px-20"
        >
          <p className="text-xs text-white/45 lg:text-[16px]">
            {site.footer.copyright}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {site.footer.bottomLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-white/45 transition-colors
                  hover:text-[#d6bf91] lg:text-[16px]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
