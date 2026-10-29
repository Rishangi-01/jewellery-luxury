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
import { Phone, Mail } from "lucide-react";
import { LuMapPin } from "react-icons/lu";

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
        className="mx-auto max-w-[1600px] px-6 pb-8 pt-12
        sm:px-10 sm:pb-8 sm:pt-16 lg:px-14 lg:pt-16 xl:px-20"
      >

      <div className="absolute inset-0 -z-30">
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
          className="grid grid-cols-2 gap-10 sm:grid-cols-2
            sm:gap-x-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.7fr)_minmax(0,0.7fr)_minmax(0,1.2fr)]
            lg:gap-10 xl:gap-14"
        >
          <motion.div variants={reveal} className="col-span-2 space-y-5 lg:col-span-1 lg:border-r border-white/10">
            <Link
              href="/"
              aria-label={`${site.site.name} home`}
              className="group inline-block"
            >
              <div className="flex flex-col lg:h-[60px] md:h-[40px] h-[35px]">
                <img src={site.site.logo} alt={site.site.name} className="h-full w-full object-contain" />
              </div>
            </Link>

            <p
              className="max-w-[250px] text-sm leading-7
              text-white/50 xl:text-[16px]"
            >
              {site.footer.about}
            </p>
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
                    className="flex h-9 w-9 bg-[#ba894a] items-center justify-center
                      rounded-full border border-white/15
                      text-white/60 transition-colors duration-300
                      hover:border-[#c6a66d]/70 hover:bg-[#c6a66d]/10
                      hover:text-[#e4c994]"
                  >
                    <Icon size={18} strokeWidth={1.7} />
                  </motion.a>
                );
              })}
            </div>
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
              <div className="mb-6 mt-3 h-px w-8 bg-[#d6bf91]"></div>

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

          <motion.div
            variants={reveal}
            className="col-span-2 min-w-0 space-y-5 lg:col-span-1"
          >
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.19em] text-[#d6bf91] lg:text-lg">
              {site.footer.contactTitle ?? "Get In Touch"}
            </h3>
            <div className="mb-6 mt-3 h-px w-8 bg-[#d6bf91]"></div>

            <div className="space-y-5">
              {(site.footer.contactDetails ?? [
                {
                  title: "Call Us",
                  value: "+1 (212) 555-0186",
                  href: "tel:+12125550186",
                  icon: "phone",
                },
                {
                  title: "Email Us",
                  value: "hello@velora.com",
                  href: "mailto:hello@velora.com",
                  icon: "mail",
                },
                {
                  title: "Visit Us",
                  value: "123 Luxury Lane, New York, NY 10001, USA",
                  href: "https://maps.google.com/?q=123+Luxury+Lane+New+York+NY+10001",
                  icon: "map-pin",
                },
              ]).map((item) => {
                const Icon =
                  item.icon === "phone"
                    ? Phone
                    : item.icon === "mail"
                      ? Mail
                      : LuMapPin;

                return (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#ba894a]/40 bg-[#ba894a]/10 text-[#d6bf91]">
                      <Icon size={17} strokeWidth={1.6} />
                    </div>

                    <div className="min-w-0 space-y-1">
                      <h4 className="text-sm font-medium text-white">
                        {item.title}
                      </h4>

                      <a
                        href={item.href}
                        target={item.icon === "map-pin" ? "_blank" : undefined}
                        rel={item.icon === "map-pin" ? "noreferrer" : undefined}
                        className="break-words text-sm leading-6 text-white/55 transition-colors duration-300 hover:text-[#e4c994] xl:text-[15px]"
                      >
                        {item.value}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </motion.div>
      </div>

      <div className="border-t border-white/10">
        <div
          className="mx-auto flex max-w-[1600px] flex-col
          gap-4 px-3 py-5 sm:px-8 md:flex-row
          md:items-center md:justify-between lg:px-14 xl:px-20"
        >
          <p className="text-xs text-white/45 lg:text-[16px] mx-auto">
            {site.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
