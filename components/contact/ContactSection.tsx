
"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Send,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import { LuMapPin } from "react-icons/lu";
import { FaPhoneAlt, FaInstagram  } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { AiOutlineYoutube } from "react-icons/ai";
import { TbBrandLinkedin  } from "react-icons/tb";
import { FiFacebook  } from "react-icons/fi";
import type { IconType } from "react-icons";
import { site } from "@/data";

const contactIcons: Record<string, IconType> = {
  "pin-solid": LuMapPin,
  "phone-solid": FaPhoneAlt,
  "mail-solid": IoIosMail,
};

const socialIcons: Record<string, IconType> = {
  facebook: FiFacebook,
  instagram: FaInstagram,
  linkedin: TbBrandLinkedin,
  youtube: AiOutlineYoutube,
};

function getContactLines(field: string) {
  switch (field) {
    case "address":
      return site.site.addressLines;
    case "emails":
      return [...new Set(site.site.emails)];
    case "phones":
      return [...new Set(site.site.phones)];
    default:
      throw new Error(`Unsupported contact field in site data: ${field}`);
  }
}

export default function ContactSection() {
  const reduceMotion = useReducedMotion();
  const contactDetails = site.contact.cards.map((card) => ({
    ...card,
    icon: contactIcons[card.icon],
    lines: getContactLines(card.field),
  }));
  const contactTitle = [...site.contact.title, site.contact.highlight].join(" ");
  const hours = site.site.hours[0];

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [submitting, setSubmitting] = useState(false);

  function updateField(
    field: keyof typeof form,
    value: string
  ) {
    setForm((current) => ({ ...current, [field]: value }));
    setStatus("idle");
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSubmitting(true);
    setStatus("idle");

    try {

      await new Promise((resolve) => setTimeout(resolve, 700));

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      className="overflow-hidden bg-[#faf8f3]
        px-4 py-12 text-[#25231f]
        sm:px-7 sm:py-16 lg:px-12 lg:pb-20 lg:pt-36 w-[100%]"
    >
      <div className="mx-auto max-w-[1300px]">

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-10 max-w-2xl sm:mb-14"
        >

          <h1 className="font-serif text-4xl
            tracking-[-0.035em] sm:text-5xl lg:text-6xl">
            {contactTitle}
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7
            text-[#81776b] sm:text-base">
            {site.contact.text}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10
          lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">

          <motion.aside
            initial={reduceMotion ? false : { opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="border-b border-[#e5ddd0]
              pb-8 lg:border-b-0 lg:border-r
              lg:pb-0 lg:pr-10"
          >
            <h2 className="font-serif text-2xl">
              {site.contact.eyebrow}
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#81776b]">
              We&apos;re always happy to assist you.
            </p>

            <div className="mt-8 space-y-7 sm:space-y-9">
              {contactDetails.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={
                      reduceMotion ? false : { opacity: 0, y: 12 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.1,
                    }}
                    className="group flex gap-4"
                  >
                    <div className="flex h-11 w-11 shrink-0
                      items-center justify-center
                      border border-[#e5ddd0] bg-white/50
                      transition-all duration-300
                      group-hover:border-[#b59a69]
                      group-hover:bg-[#eee5d6]"
                    >
                      <Icon
                        size={18}
                        strokeWidth={1.5}
                        className="text-[#78664a]"
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-medium">
                        {item.title}
                      </h3>

                      <div className="mt-1.5 space-y-1">
                        {item.lines.map((line) => (
                          <p
                            key={line}
                            className="text-sm leading-5 text-[#81776b]"
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0
                  items-center justify-center border
                  border-[#e5ddd0] bg-white/50">
                  <Clock3
                    size={18}
                    strokeWidth={1.5}
                    className="text-[#78664a]"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium">
                    Customer Care
                  </h3>
                  <p className="mt-1.5 text-sm leading-5 text-[#81776b]">
                    {hours.days}
                  </p>
                  <p className="mt-1 text-sm text-[#81776b]">
                    {hours.time}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-9 border-t border-[#e5ddd0] pt-6">
              <h3 className="text-[10px] uppercase
                tracking-[0.18em] text-[#81776b]">
                Follow Our Journey
              </h3>

              <div className="mt-4 flex gap-3">
                {site.site.socials.map((social) => {
                  const Icon = socialIcons[social.icon];

                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      whileHover={
                        reduceMotion
                          ? undefined
                          : { y: -4, scale: 1.05 }
                      }
                      whileTap={
                        reduceMotion
                          ? undefined
                          : { scale: 0.94 }
                      }
                      className="flex h-10 w-10
                        items-center justify-center
                        border border-[#e5ddd0]
                        transition-colors duration-300
                        hover:border-[#a88b5a]
                        hover:bg-[#eee5d6]"
                    >
                      <Icon size={16} strokeWidth={1.5} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.aside>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="mb-6">
              <h2 className="font-serif text-2xl sm:text-3xl">
                {site.contact.formTitle} {site.contact.formHighlight}
              </h2>

              <p className="mt-2 text-sm text-[#81776b]">
                {site.contact.formText}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-xs font-medium"
                >
                  Name <span className="text-[#a18453]">*</span>
                </label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Your full name"
                  className="h-12 w-full border
                    border-[#ded7cb] bg-white/40
                    px-4 text-sm outline-none
                    transition-all duration-300
                    placeholder:text-[#b0a698]
                    hover:border-[#b8a17b]
                    focus:border-[#a88b5a]
                    focus:ring-2 focus:ring-[#a88b5a]/15"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-xs font-medium"
                >
                  Email <span className="text-[#a18453]">*</span>
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="you@example.com"
                  className="h-12 w-full border
                    border-[#ded7cb] bg-white/40
                    px-4 text-sm outline-none
                    transition-all duration-300
                    placeholder:text-[#b0a698]
                    hover:border-[#b8a17b]
                    focus:border-[#a88b5a]
                    focus:ring-2 focus:ring-[#a88b5a]/15"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-xs font-medium"
                >
                  Message <span className="text-[#a18453]">*</span>
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={3000}
                  rows={5}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  placeholder="Tell us how we can help..."
                  className="min-h-[135px] w-full resize-y
                    border border-[#ded7cb] bg-white/40
                    px-4 py-3 text-sm outline-none
                    transition-all duration-300
                    placeholder:text-[#b0a698]
                    hover:border-[#b8a17b]
                    focus:border-[#a88b5a]
                    focus:ring-2 focus:ring-[#a88b5a]/15"
                />

                <p className="mt-1 text-right text-[10px] text-[#9b9184]">
                  {form.message.length}/3000
                </p>
              </div>

              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                  className="flex items-center gap-2
                    text-sm text-green-800"
                >
                  <CheckCircle2 size={17} />
                  Demo submitted successfully. Connect your API to send it.
                </motion.p>
              )}

              {status === "error" && (
                <p role="alert" className="text-sm text-red-700">
                  Something went wrong. Please try again.
                </p>
              )}

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={
                  reduceMotion || submitting
                    ? undefined
                    : { y: -2 }
                }
                whileTap={
                  reduceMotion || submitting
                    ? undefined
                    : { scale: 0.99 }
                }
                className="group flex min-h-[50px] w-full
                  items-center justify-center gap-3
                  bg-[#11110f] px-5 py-4
                  text-[10px] font-medium uppercase
                  tracking-[0.18em] text-white
                  transition-colors duration-300
                  hover:bg-[#a18453]
                  disabled:cursor-wait disabled:opacity-70"
              >
                <Send size={14} />
                {submitting ? "Sending..." : "Send Message"}
                {!submitting && (
                  <ArrowUpRight
                    size={14}
                    className="transition-transform
                      duration-300 group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5"
                  />
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="group relative mt-12 h-[250px]
            overflow-hidden border border-[#e5ddd0]
            bg-[#e9e6de] sm:mt-16 sm:h-[320px]
            lg:mt-20 lg:h-[350px]"
        >
          <iframe
            title={`Map showing ${site.site.addressLines.join(" ")}`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(site.site.addressLines.join(" "))}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full
              grayscale-[0.45] transition-all duration-700
              group-hover:grayscale-0"
          />

          <div className="pointer-events-none absolute
            bottom-4 left-4 right-4 z-10 flex
            max-w-[320px] items-center gap-3
            border border-white/60 bg-[#faf8f3]/95
            p-4 shadow-lg backdrop-blur-md sm:bottom-6 sm:left-6"
          >
            <div className="flex h-10 w-10 shrink-0
              items-center justify-center bg-[#11110f] text-white">
              <LuMapPin  size={19} />
            </div>

            <div>
              <p className="font-serif text-base">
                {site.contact.location.mapCard.title}
              </p>
              <p className="mt-1 text-xs text-[#81776b]">
                {site.site.addressLines.join(" ")}
              </p>
            </div>
          </div>
        </motion.div>

        <p className="mt-3 text-[10px] leading-5 text-[#968b7d]">
          {site.site.description}
        </p>
      </div>
    </section>
  );
}
