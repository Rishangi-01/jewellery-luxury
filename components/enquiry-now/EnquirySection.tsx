
"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { enquirySectionData } from "@/data";
import {
  UserRound,
  Gem,
  ShieldCheck,
  BadgeCheck,
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
  type LucideIcon,
} from "lucide-react";

const benefitIcons: Record<string, LucideIcon> = {
  UserRound,
  Gem,
  ShieldCheck,
  BadgeCheck,
};

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  interest: "",
  message: "",
};

type FormData = typeof initialForm;

export default function EnquirySection() {
  const reduceMotion = useReducedMotion();
  const { benefitsHeader, benefits, image, form: formContent } = enquirySectionData;
  const { fields } = formContent;
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (
    field: keyof FormData,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (status !== "idle") {
      setStatus("idle");
    }
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");
    setIsSubmitting(true);

    try {
      // Connect this section to your real enquiry API here.
      // Do not show success until the server confirms receipt.
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Unable to submit enquiry.");
      }

      setStatus("success");
      setFormData(initialForm);
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  const reveal = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      id="enquiry"
      className="relative overflow-hidden bg-[#faf9f5]
        px-4 py-14 text-[#191b1b]
        sm:px-7 sm:py-20 lg:px-12 lg:py-24 w-[100%]"
    >
      
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32
          -top-32 h-80 w-80 rounded-full
          bg-[#d9c39c]/15 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-[1380px]
        grid-cols-1 items-start gap-9
        md:gap-12 lg:grid-cols-[0.88fr_1.12fr]
        lg:gap-14 xl:gap-16"
      >
        {/* LEFT: Image and benefits */}
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              x: reduceMotion ? 0 : -35,
            },
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                duration: reduceMotion ? 0 : 0.8,
                ease: [0.22, 1, 0.36, 1] as const,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="min-w-0"
        >
          
          <motion.div
            whileHover={reduceMotion ? undefined : { y: -4 }}
            transition={{ duration: 0.35 }}
            className="group relative overflow-hidden rounded-xl
              border border-[#e4ddd1] bg-[#e8dfd2]
              shadow-[0_8px_30px_rgba(40,30,15,0.06)]"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <motion.img
                src={image.src}
                alt={image.alt}
                initial={false}
                whileHover={
                  reduceMotion ? undefined : { scale: 1.055 }
                }
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full w-full object-cover"
              />
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0
                bg-gradient-to-t from-black/15
                via-transparent to-white/5"
            />

            <div
              className="pointer-events-none absolute inset-3
                rounded-lg border border-white/0
                transition-colors duration-500
                group-hover:border-white/40 sm:inset-4"
            />
          </motion.div>

          {/* Benefits heading */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-7 mt-8 sm:mb-9 sm:mt-10"
          >
            <p className="mb-2 text-[10px] font-medium
              uppercase tracking-[0.28em] text-[#a38a5e]">
              {benefitsHeader.eyebrow}
            </p>

            <h2 className="font-serif text-2xl
              tracking-tight sm:text-3xl">
              {benefitsHeader.title}
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6
              text-[#77736b]">
              {benefitsHeader.description}
            </p>
          </motion.div>

          {/* Benefit list */}
          <div className="space-y-5 sm:space-y-6">
            {benefits.map((benefit, index) => {
              const Icon = benefitIcons[benefit.icon];

              return (
                <motion.div
                  key={benefit.title}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    delay: reduceMotion ? 0 : index * 0.09,
                  }}
                  className="group flex items-start gap-4 sm:gap-5"
                >
                  <div
                    className="flex h-11 w-11 shrink-0 items-center
                      justify-center rounded-full border
                      border-[#ded5c5] bg-white/70
                      text-[#383a36] transition-all duration-300
                      group-hover:border-[#b49a6c]
                      group-hover:bg-[#f0e7d7]
                      sm:h-12 sm:w-12"
                  >
                    <Icon
                      size={21}
                      strokeWidth={1.5}
                      className="transition-transform duration-300
                        group-hover:scale-110"
                    />
                  </div>

                  <div className="pt-0.5">
                    <h3 className="text-sm font-medium
                      tracking-wide sm:text-base">
                      {benefit.title}
                    </h3>

                    <p className="mt-1.5 text-xs leading-5
                      text-[#858078] sm:text-sm sm:leading-6">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* RIGHT: Enquiry form */}
        <motion.div
          initial={{
            opacity: 0,
            x: reduceMotion ? 0 : 35,
          }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            delay: reduceMotion ? 0 : 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative min-w-0 rounded-xl
            border border-[#e8e3d9] bg-white/55
            p-5 shadow-[0_10px_45px_rgba(35,28,18,0.035)]
            sm:p-8 lg:p-8 xl:p-10"
        >
          {/* Decorative gold accent */}
          <div
            aria-hidden="true"
            className="absolute left-6 right-6 top-0
              h-px bg-gradient-to-r from-transparent
              via-[#bda477] to-transparent sm:left-10 sm:right-10"
          />

          <div className="mb-7 sm:mb-8">
            <p className="mb-2 text-[10px] font-medium
              uppercase tracking-[0.28em] text-[#a38a5e]">
              {formContent.eyebrow}
            </p>

            <h2 className="font-serif text-3xl
              tracking-tight sm:text-4xl">
              {formContent.title}
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6
              text-[#77736b]">
              {formContent.description}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full name */}
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-medium"
              >
                {fields.fullName.label} <span className="text-[#a47c46]">*</span>
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                minLength={2}
                maxLength={100}
                value={formData.fullName}
                onChange={(event) =>
                  updateField("fullName", event.target.value)
                }
                placeholder={fields.fullName.placeholder}
                className="w-full rounded-md border
                  border-[#dedbd3] bg-white/60 px-4 py-3
                  text-sm outline-none transition-all duration-300
                  placeholder:text-[#aaa49a]
                  hover:border-[#c6b99f]
                  focus:border-[#a38a5e]
                  focus:ring-4 focus:ring-[#b49a6c]/10"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
              >
                {fields.email.label} <span className="text-[#a47c46]">*</span>
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                value={formData.email}
                onChange={(event) =>
                  updateField("email", event.target.value)
                }
                placeholder={fields.email.placeholder}
                className="w-full rounded-md border
                  border-[#dedbd3] bg-white/60 px-4 py-3
                  text-sm outline-none transition-all duration-300
                  placeholder:text-[#aaa49a]
                  hover:border-[#c6b99f]
                  focus:border-[#a38a5e]
                  focus:ring-4 focus:ring-[#b49a6c]/10"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium"
              >
                {fields.phone.label} <span className="text-[#a47c46]">*</span>
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                minLength={7}
                maxLength={20}
                pattern="[0-9+() .-]{7,20}"
                value={formData.phone}
                onChange={(event) =>
                  updateField("phone", event.target.value)
                }
                placeholder={fields.phone.placeholder}
                className="w-full rounded-md border
                  border-[#dedbd3] bg-white/60 px-4 py-3
                  text-sm outline-none transition-all duration-300
                  placeholder:text-[#aaa49a]
                  hover:border-[#c6b99f]
                  focus:border-[#a38a5e]
                  focus:ring-4 focus:ring-[#b49a6c]/10"
              />
            </div>

            {/* Interest */}
            <div>
              <label
                htmlFor="interest"
                className="mb-2 block text-sm font-medium"
              >
                {fields.interest.label}
              </label>

              <select
                id="interest"
                name="interest"
                value={formData.interest}
                onChange={(event) =>
                  updateField("interest", event.target.value)
                }
                className="w-full appearance-none rounded-md
                  border border-[#dedbd3] bg-white/60
                  px-4 py-3 text-sm text-[#45413b]
                  outline-none transition-all duration-300
                  hover:border-[#c6b99f]
                  focus:border-[#a38a5e]
                  focus:ring-4 focus:ring-[#b49a6c]/10"
              >
                <option value="">{fields.interest.placeholder}</option>
                {fields.interest.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium"
              >
                {fields.message.label} <span className="text-[#a47c46]">*</span>
              </label>

              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                maxLength={fields.message.maxLength}
                rows={5}
                value={formData.message}
                onChange={(event) =>
                  updateField("message", event.target.value)
                }
                placeholder={fields.message.placeholder}
                className="min-h-32 w-full resize-y rounded-md
                  border border-[#dedbd3] bg-white/60 px-4 py-3
                  text-sm leading-6 outline-none transition-all
                  duration-300 placeholder:text-[#aaa49a]
                  hover:border-[#c6b99f]
                  focus:border-[#a38a5e]
                  focus:ring-4 focus:ring-[#b49a6c]/10"
              />

              <p className="mt-1 text-right text-[11px]
                text-[#969087]">
                {formData.message.length}
                {fields.message.counterSeparator}
                {fields.message.maxLength}
              </p>
            </div>

            {/* Submission status */}
            {status === "success" && (
              <div
                role="status"
                className="flex items-start gap-2 rounded-md
                  border border-emerald-200 bg-emerald-50
                  p-3 text-sm text-emerald-800"
              >
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                <p>{formContent.status.success}</p>
              </div>
            )}

            {status === "error" && (
              <p role="alert" className="text-sm text-red-700">
                {formContent.status.error}
              </p>
            )}

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={
                reduceMotion || isSubmitting
                  ? undefined
                  : { y: -2 }
              }
              whileTap={
                reduceMotion || isSubmitting
                  ? undefined
                  : { scale: 0.99 }
              }
              className="group flex w-full items-center
                justify-center gap-3 rounded-md
                bg-[#101718] px-5 py-4 text-xs font-medium
                uppercase tracking-[0.18em] text-white
                shadow-[0_5px_16px_rgba(16,23,24,0.12)]
                transition-colors duration-300
                hover:bg-[#26332e]
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-[#a38a5e]
                focus-visible:ring-offset-2
                disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle size={17} className="animate-spin" />
                  {formContent.submit.submitting}
                </>
              ) : (
                <>
                  {formContent.submit.label}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300
                      group-hover:translate-x-1"
                  />
                </>
              )}
            </motion.button>

            <p className="text-center text-[11px] leading-5
              text-[#969087]">
              {formContent.privacyNotice}
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
