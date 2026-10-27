"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Gem,
  Heart,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { productExtraDetailsData } from "@/data";

const { tabs, tabContent, completeLook } = productExtraDetailsData;

type TabId = (typeof tabs)[number]["id"];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

export default function ProductExtraDetails() {
  const [activeTab, setActiveTab] = useState<TabId>("description");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [addedProducts, setAddedProducts] = useState<string[]>([]);
  const reduceMotion = useReducedMotion();
  const activeTabContent = Object.entries(tabContent).find(
    ([id]) => id === activeTab
  )?.[1];

  if (!activeTabContent) {
    throw new Error(`Missing product information content for tab "${activeTab}".`);
  }

  const toggleWishlist = (name: string) => {
    setWishlist((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name],
    );
  };

  const addToBag = (name: string) => {
    setAddedProducts((current) =>
      current.includes(name) ? current : [...current, name],
    );
  };

  return (
    <section
      className="relative overflow-hidden bg-[#faf8f3]
      px-4 pb-8 pt-2 sm:px-6 sm:pb-8 sm:pt-2 lg:px-10 lg:pb-8 lg:pt-2 w-[100%]"
    >
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div
            role="tablist"
            aria-label={productExtraDetailsData.tabListLabel}
            className="flex flex-wrap gap-x-7 gap-y-3
              border-b border-[#e6dfd4] sm:gap-x-10"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative pb-4 text-[12px]
                    font-medium transition-colors duration-300
                    sm:text-sm lg:text-[18px] ${
                      isActive
                        ? "text-[#241e17]"
                        : "text-[#928779] hover:text-[#4e4030]"
                    }`}
                >
                  {tab.label}

                  {isActive && (
                    <motion.span
                      layoutId="product-tab-underline"
                      className="absolute inset-x-0 bottom-0
                        h-[2px] bg-[#a58a5b]"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            className="min-h-[150px] py-6 sm:py-7"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.25 }}
              >
                <h2
                  className="mb-3 font-serif text-xl
                  text-[#29221a] sm:text-2xl lg:text-[3xl]"
                >
                  {activeTabContent.title}
                </h2>

                {activeTabContent.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="mb-2 max-w-3xl text-sm
                        leading-7 text-[#766c60] sm:text-[15px] lg:text-[16px]"
                  >
                    {paragraph}
                  </p>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.section
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          aria-labelledby="complete-look-title"
          className="relative overflow-hidden
            border border-[#c4a779]/50 bg-[#100e0b]
            text-white shadow-[0_18px_60px_rgba(32,22,12,0.12)]"
        >
          <div
            className="relative grid grid-cols-1
            lg:grid-cols-[0.78fr_1.22fr]
            xl:bg-[image:var(--complete-look-background)]
            xl:bg-center bg-no-repeat"
            style={{
              backgroundSize: "100% 100%",
              "--complete-look-background": `url("${completeLook.backgroundImage}")`,
            } as React.CSSProperties}
          >
            <div
              className="group relative min-h-[230px]
              overflow-hidden sm:min-h-[300px]
              lg:min-h-[440px] hidden xl:block"
            ></div>

            <div
              className="relative flex flex-col
              justify-center px-5 py-5 sm:px-7 sm:py-6 md:px-9 md:py-9 lg:px-8 lg:py-6
              xl:px-10 xl:py-6"
            >
              <div
                className="mb-6 flex flex-wrap
                items-end justify-between gap-4 sm:mb-8"
              >
                <div>

                  <h2
                    id="complete-look-title"
                    className="font-serif text-2xl
                      leading-tight tracking-[-0.02em]
                      sm:text-3xl lg:text-[32px]"
                  >
                    {completeLook.title}
                  </h2>

                  <p
                    className="mt-2 max-w-sm text-xs
                    leading-5 text-white/55 sm:text-sm"
                  >
                    {completeLook.description}
                  </p>
                </div>

                <a
                  href={completeLook.href}
                  className="group/link inline-flex shrink-0
                    items-center gap-2 pb-1 text-[10px]
                    uppercase tracking-[0.15em] text-[#d6bd91]
                    transition-colors hover:text-white"
                >
                  {completeLook.viewAll}
                  <ArrowUpRight
                    size={14}
                    className="transition-transform
                      group-hover/link:translate-x-0.5
                      group-hover/link:-translate-y-0.5"
                  />
                </a>
              </div>

              <div
                className="grid grid-cols-1 gap-5
                sm:grid-cols-3 sm:gap-3 lg:gap-4 xl:gap-5"
              >
                {completeLook.items.map((item, index) => {
                  const isWishlisted = wishlist.includes(item.name);
                  const isAdded = addedProducts.includes(item.name);

                  return (
                    <motion.article
                      key={item.name}
                      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.55,
                        delay: index * 0.12,
                        ease: "easeOut",
                      }}
                      whileHover={reduceMotion ? undefined : { y: -5 }}
                      className="group/card min-w-0"
                    >
                      <a
                        href={completeLook.href}
                        aria-label={completeLook.exploreItem.replace(
                          "{name}",
                          item.name
                        )}
                        className="relative block aspect-[1.35/1]
                          overflow-hidden border-2 border-[#b9a080]/45
                          bg-[#2a211a] sm:aspect-[1/1] rounded-lg"
                      >
                        <Image
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          sizes="(max-width: 639px) 90vw, (max-width: 1023px) 30vw, 24vw"
                          className="object-cover transition-transform
                            duration-700 ease-out
                            group-hover/card:scale-110"
                        />

                        <div
                          className="absolute inset-0
                          bg-gradient-to-t from-black/45
                          via-transparent to-transparent
                          opacity-70 transition-opacity
                          duration-500 group-hover/card:opacity-40"
                        />

                        <span
                          className="absolute left-2 top-2
                          border border-white/20 bg-black/45
                          px-2 py-1 text-[8px] uppercase
                          tracking-[0.15em] text-white/90
                          backdrop-blur-sm sm:left-2.5 sm:top-2.5"
                        >
                          {item.category}
                        </span>

                        <button
                          type="button"
                          aria-label={
                            isWishlisted
                              ? completeLook.removeFromWishlist.replace(
                                  "{name}",
                                  item.name
                                )
                              : completeLook.addToWishlist.replace(
                                  "{name}",
                                  item.name
                                )
                          }
                          aria-pressed={isWishlisted}
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            toggleWishlist(item.name);
                          }}
                          className="absolute right-2 top-2
                            flex h-8 w-8 items-center
                            justify-center rounded-full
                            border border-white/20 bg-black/40
                            text-white backdrop-blur-md
                            transition-all hover:bg-white
                            hover:text-[#17120d] sm:right-2.5 sm:top-2.5"
                        >
                          <Heart
                            size={15}
                            className={
                              isWishlisted
                                ? "fill-[#d6bd91] text-[#d6bd91]"
                                : ""
                            }
                          />
                        </button>

                        <span
                          className="absolute bottom-2
                          right-2 flex h-8 w-8 translate-y-2
                          items-center justify-center
                          bg-[#d6bd91] text-[#17120d]
                          opacity-0 transition-all duration-300
                          group-hover/card:translate-y-0
                          group-hover/card:opacity-100"
                        >
                          <ArrowRight size={16} />
                        </span>
                      </a>

                      <div className="pt-3">
                        <a
                          href={completeLook.href}
                          className="block truncate font-serif
                            text-base text-[#f3e9da]
                            transition-colors hover:text-[#d6bd91]
                            sm:text-sm lg:text-base"
                        >
                          {item.name}
                        </a>

                        <p
                          className="mt-1 text-sm font-medium
                          tracking-wide text-[#d6bd91]"
                        >
                          {formatPrice(item.price)}
                        </p>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </section>
  );
}
