"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ShieldCheck,
  Gem,
  Truck,
  RotateCcw,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { productDetailsData } from "@/data";
import Link from "next/link";

const product = productDetailsData.product;
const copy = productDetailsData.copy;
const featureIcons: Record<string, typeof Gem> = {
  gem: Gem,
  shield: ShieldCheck,
  returns: RotateCcw,
  truck: Truck,
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

export default function ProductDetails() {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.initialSize);
  const [wishlist, setWishlist] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartMessage, setCartMessage] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const reduceMotion = useReducedMotion();

  const changeImage = (direction: number) => {
    setActiveImage(
      (current) =>
        (current + direction + product.images.length) % product.images.length,
    );
  };

  return (
    <section
      className="relative overflow-hidden bg-[#faf8f3]
      px-4 pt-16 pb-8 sm:px-6 sm:pt-12 sm:pb-12 lg:px-10 lg:pb-12 lg:pt-16 w-[100%]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20
          h-96 w-96 rounded-full bg-[#d7bd91]/10 blur-[100px]"
      />

      <div
        className="relative mx-auto grid max-w-[1400px]
        grid-cols-1 gap-8 md:grid-cols-2
        md:gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]
        lg:gap-12 xl:gap-16"
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="items-start"
        >
          <div
            className="group relative aspect-[7.2/5]
            overflow-hidden rounded-md bg-[#e8e0d4]
            shadow-[0_8px_35px_rgba(37,28,18,0.08)]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={product.images[activeImage].src}
                  alt={product.images[activeImage].alt}
                  fill
                  priority
                  sizes="(max-width: 767px) 80vw, 48vw"
                  className="object-cover transition-transform
                    duration-1000 ease-out
                    md:group-hover:scale-[1.035]"
                />
              </motion.div>
            </AnimatePresence>

            <div
              className="absolute bottom-4 left-4
              rounded-full border border-white/20
              bg-black/45 px-3 py-1.5 text-[10px]
              tracking-[0.15em] text-white backdrop-blur-md"
            >
              {String(activeImage + 1).padStart(2, "0")}
              {" / "}
              {String(product.images.length).padStart(2, "0")}
            </div>

            <div
              className="absolute bottom-3 right-3
              flex gap-2 sm:bottom-4 sm:right-4"
            >
              <button
                type="button"
                onClick={() => changeImage(-1)}
                aria-label={copy.previousImage}
                className="flex h-9 w-9 items-center justify-center
                  rounded-full border border-white/30
                  bg-black/35 text-white backdrop-blur-md
                  transition-colors hover:bg-black/65"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => changeImage(1)}
                aria-label={copy.nextImage}
                className="flex h-9 w-9 items-center justify-center
                  rounded-full border border-white/30
                  bg-black/35 text-white backdrop-blur-md
                  transition-colors hover:bg-black/65"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
          className="flex flex-col pt-1 sm:pt-2 lg:pt-1 justify-center"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-7 bg-[#b3996c]" />
            <span
              className="text-[10px] font-medium uppercase
              tracking-[0.23em] text-[#a18759]"
            >
              {copy.collection}
            </span>
          </div>

          <h1
            className="font-serif text-3xl font-normal
            leading-tight tracking-[-0.035em] text-[#241d16]
            sm:text-4xl lg:text-[63px]"
          >
            {product.name}
          </h1>

          <p
            className="mt-4 max-w-xl text-sm leading-7
            text-[#756b5f] sm:text-[15px] sm:leading-7 lg:text-[18px]"
          >
            {product.description}
          </p>

          <div className="mt-9 flex">
            <Link
              href={product.enquiryNow.href}
              className="inline-flex items-center gap-2
                        border border-[#b69a68] px-6 py-3
                        text-[11px] font-semibold uppercase
                        tracking-[0.16em] text-[#29231c]
                        transition-colors hover:bg-[#b69a68]
                        hover:text-white"
            >
              {product.enquiryNow.label}
              <ArrowRight size={15} />
            </Link>
          </div>

          <AnimatePresence>
            {cartMessage && (
              <motion.div
                role="status"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-4 flex items-start gap-3
                  border border-[#d7c8aa] bg-[#f1ebdf]
                  p-4 text-sm text-[#55452d]"
              >
                <Check size={18} className="mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="font-medium">{copy.addedConfirmation}</p>
                  <p className="mt-1 text-[10px] text-[#8c7b62]">
                    {copy.cartCount.replace("{count}", cartCount.toString())}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCartMessage(false)}
                  aria-label={copy.dismissConfirmation}
                  className="p-1 hover:text-black"
                >
                  <X size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {showSizeGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex
              items-center justify-center bg-black/50
              p-4 backdrop-blur-sm"
            onClick={() => setShowSizeGuide(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="size-guide-title"
              initial={
                reduceMotion ? false : { opacity: 0, y: 18, scale: 0.97 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-md rounded-md
                border border-[#e5dac7] bg-[#faf8f3]
                p-6 shadow-2xl sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className="text-[10px] uppercase
                    tracking-[0.2em] text-[#a48650]"
                  >
                    {copy.findFit}
                  </p>
                  <h2
                    id="size-guide-title"
                    className="mt-2
                    font-serif text-2xl text-[#29221a]"
                  >
                    {copy.sizeGuideTitle}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setShowSizeGuide(false)}
                  aria-label={copy.closeSizeGuide}
                  className="p-2 text-[#655a4c] hover:bg-[#eee8dd]"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#756b5f]">
                {copy.sizeGuideDescription}
              </p>

              <div className="mt-5 overflow-hidden border border-[#e4ddd1]">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#eee7db] text-[#554735]">
                    <tr>
                      <th className="px-4 py-3 font-medium">
                        {copy.sizeColumn}
                      </th>
                      <th className="px-4 py-3 font-medium">
                        {copy.fitColumn}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.sizes.map((size) => (
                      <tr key={size} className="border-t border-[#e4ddd1]">
                        <td className="px-4 py-3 text-[#29221a]">{size}</td>
                        <td className="px-4 py-3 text-[#756b5f]">
                          {selectedSize === size
                            ? copy.selectedSize
                            : copy.availableSize}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-3 text-xs leading-5 text-[#8b7e6b]">
                {copy.sizeGuideNote}
              </p>

              <button
                type="button"
                onClick={() => setShowSizeGuide(false)}
                className="mt-6 w-full bg-[#151512] px-5 py-3.5
                  text-xs font-semibold uppercase tracking-widest
                  text-white transition-colors hover:bg-[#8e754c]"
              >
                {copy.done}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="reviews" className="scroll-mt-24" />
    </section>
  );
}
