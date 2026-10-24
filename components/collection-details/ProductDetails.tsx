
"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Heart,
  Star,
  ShieldCheck,
  Gem,
  Truck,
  RotateCcw,
  Ruler,
  ShoppingBag,
  Check,
  Minus,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const product = {
  name: "Eternal Diamond Ring",
  price: 2499,
  rating: 4.8,
  reviews: 24,
  description:
    "A symbol of everlasting love, this exquisite diamond ring features a brilliant-cut center stone set in 18k gold, designed to shine for a lifetime.",
  features: [
    { label: "18k Gold", icon: Gem },
    { label: "Certified Diamond", icon: ShieldCheck },
    { label: "Lifetime Warranty", icon: RotateCcw },
    { label: "Free Shipping", icon: Truck },
  ],
  sizes: ["5", "6", "7", "8", "9"],
  images: [
    {
      src: "images/home/banner3.webp",
      alt: "Eternal diamond ring front view",
    },
    {
      src: "images/about/banner1.webp",
      alt: "Diamond ring side detail",
    },
    {
      src: "images/home/banner2.webp",
      alt: "Luxury jewelry close-up",
    },
  ],
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

export default function ProductDetails() {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("7");
  const [wishlist, setWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [cartMessage, setCartMessage] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const reduceMotion = useReducedMotion();

  const changeImage = (direction: number) => {
    setActiveImage((current) =>
      (current + direction + product.images.length) %
      product.images.length
    );
  };

  const addToCart = () => {
    setCartCount((count) => count + quantity);
    setCartMessage(true);
  };

  return (
    <section className="relative overflow-hidden bg-[#faf8f3]
      px-4 pt-8 pb-8 sm:px-6 sm:pt-12 sm:pb-12 lg:px-10 lg:pb-16 lg:pt-32 w-[100%]">

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20
          h-96 w-96 rounded-full bg-[#d7bd91]/10 blur-[100px]"
      />

      <div className="relative mx-auto grid max-w-[1400px]
        grid-cols-1 gap-8 md:grid-cols-2
        md:gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]
        lg:gap-12 xl:gap-16">

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-[54px_minmax(0,1fr)]
            items-start gap-3 sm:grid-cols-[72px_minmax(0,1fr)]
            sm:gap-4 lg:grid-cols-[76px_minmax(0,1fr)]
            lg:gap-5"
        >
          <div className="flex flex-col gap-3 sm:gap-4">
            {product.images.map((image, index) => (
              <motion.button
                key={image.src}
                type="button"
                onClick={() => setActiveImage(index)}
                whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                aria-label={`View image ${index + 1}`}
                aria-pressed={activeImage === index}
                className={`group relative aspect-[3/4]
                  overflow-hidden rounded-md border-2
                  bg-[#e9e1d5] transition-all duration-300 ${
                    activeImage === index
                      ? "border-[#aa8954] shadow-[0_4px_18px_rgba(170,137,84,0.18)]"
                      : "border-transparent opacity-75 hover:opacity-100"
                  }`}
              >
                <Image
                  src="/images/home/banner3.webp"
                  alt={image.alt}
                  fill
                  sizes="76px"
                  className="object-cover transition-transform
                    duration-500 group-hover:scale-110"
                />
                {activeImage === index && (
                  <motion.span
                    layoutId="active-thumbnail"
                    className="absolute inset-0 border border-[#aa8954]"
                    transition={{ duration: 0.25 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <div className="group relative aspect-[4/5]
            overflow-hidden rounded-md bg-[#e8e0d4]
            shadow-[0_8px_35px_rgba(37,28,18,0.08)]">

            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, scale: 1.025 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src="/images/home/banner3.webp"
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

            <div className="absolute bottom-4 left-4
              rounded-full border border-white/20
              bg-black/45 px-3 py-1.5 text-[10px]
              tracking-[0.15em] text-white backdrop-blur-md">
              {String(activeImage + 1).padStart(2, "0")}
              {" / "}
              {String(product.images.length).padStart(2, "0")}
            </div>

            <div className="absolute bottom-3 right-3
              flex gap-2 sm:bottom-4 sm:right-4">
              <button
                type="button"
                onClick={() => changeImage(-1)}
                aria-label="Previous product image"
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
                aria-label="Next product image"
                className="flex h-9 w-9 items-center justify-center
                  rounded-full border border-white/30
                  bg-black/35 text-white backdrop-blur-md
                  transition-colors hover:bg-black/65"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <motion.button
              type="button"
              whileTap={reduceMotion ? undefined : { scale: 0.88 }}
              onClick={() => setWishlist((value) => !value)}
              aria-label={wishlist ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={wishlist}
              className="absolute right-3 top-3 flex h-10 w-10
                items-center justify-center rounded-full
                border border-white/40 bg-[#faf8f3]/90
                text-[#2b241c] shadow-sm backdrop-blur-md
                transition-colors hover:bg-white sm:right-4 sm:top-4"
            >
              <Heart
                size={19}
                className={`transition-colors duration-300 ${
                  wishlist ? "fill-[#a78953] text-[#a78953]" : ""
                }`}
              />
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
          className="flex flex-col pt-1 sm:pt-2 lg:pt-1"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-7 bg-[#b3996c]" />
            <span className="text-[10px] font-medium uppercase
              tracking-[0.23em] text-[#a18759]">
              The Signature Collection
            </span>
          </div>

          <h1 className="font-serif text-3xl font-normal
            leading-tight tracking-[-0.035em] text-[#241d16]
            sm:text-4xl lg:text-[42px]">
            {product.name}
          </h1>

          <motion.p
            key={product.price}
            initial={reduceMotion ? false : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-xl font-semibold tracking-tight
              text-[#29221a] sm:text-2xl"
          >
            {formatPrice(product.price)}
          </motion.p>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            <div
              className="flex items-center gap-0.5 text-[#a48650]"
              aria-label={`Rated ${product.rating} out of 5`}
            >
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  size={15}
                  strokeWidth={1.5}
                  className={
                    index < Math.round(product.rating)
                      ? "fill-[#a48650]"
                      : ""
                  }
                />
              ))}
            </div>

            <span className="text-xs text-[#7c7163]">
              {product.rating.toFixed(1)}
            </span>

            <span className="h-3 w-px bg-[#d8d0c3]" />

            <a
              href="#reviews"
              className="text-xs text-[#786c5e]
                underline-offset-4 transition-colors
                hover:text-[#a48650] hover:underline"
            >
              {product.reviews} reviews
            </a>
          </div>

          <p className="mt-6 max-w-xl text-sm leading-7
            text-[#756b5f] sm:text-[15px] sm:leading-7">
            {product.description}
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4
            sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4">
            {product.features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.label}
                  initial={reduceMotion ? false : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + index * 0.08,
                  }}
                  className="flex items-center gap-3 text-sm
                    text-[#756b5f]"
                >
                  <span className="flex h-8 w-8 shrink-0
                    items-center justify-center rounded-full
                    border border-[#e2d8c6] text-[#a48650]">
                    <Icon size={16} strokeWidth={1.5} />
                  </span>
                  {feature.label}
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 border-t border-[#e4ddd1] pt-6">
            <div className="flex flex-wrap items-center
              justify-between gap-3">
              <span className="text-sm font-medium text-[#33291f]">
                Select Ring Size
              </span>

              <button
                type="button"
                onClick={() => setShowSizeGuide(true)}
                className="inline-flex items-center gap-1.5
                  text-xs text-[#8c7146] underline
                  underline-offset-4 transition-colors
                  hover:text-[#3a2d1e]"
              >
                <Ruler size={14} />
                Size Guide
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2.5">
              {product.sizes.map((size) => (
                <motion.button
                  key={size}
                  type="button"
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                  onClick={() => setSelectedSize(size)}
                  aria-pressed={selectedSize === size}
                  className={`flex h-11 w-11 items-center
                    justify-center rounded-full border text-sm
                    transition-all duration-300 ${
                      selectedSize === size
                        ? "border-[#191713] bg-[#191713] text-white shadow-md"
                        : "border-[#e0d8cc] bg-transparent text-[#5e5448] hover:border-[#a78953]"
                    }`}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center
            justify-between gap-3">
            <span className="text-sm text-[#655a4c]">
              Quantity
            </span>

            <div className="flex h-10 items-center
              border border-[#dfd7ca]">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                disabled={quantity === 1}
                aria-label="Decrease quantity"
                className="flex h-full w-10 items-center
                  justify-center text-[#655a4c]
                  transition-colors hover:bg-[#eee8dd]
                  disabled:opacity-40"
              >
                <Minus size={14} />
              </button>

              <span
                aria-live="polite"
                className="w-8 text-center text-sm text-[#29221a]"
              >
                {quantity}
              </span>

              <button
                type="button"
                onClick={() => setQuantity((value) => Math.min(10, value + 1))}
                disabled={quantity === 10}
                aria-label="Increase quantity"
                className="flex h-full w-10 items-center
                  justify-center text-[#655a4c]
                  transition-colors hover:bg-[#eee8dd]
                  disabled:opacity-40"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <motion.button
              type="button"
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.99 }}
              onClick={addToCart}
              className="group flex min-h-[52px] w-full
                items-center justify-center gap-3
                rounded-[4px] border border-[#151512]
                bg-[#151512] px-5 py-4 text-xs
                font-semibold uppercase tracking-[0.16em]
                text-white shadow-sm transition-colors
                duration-300 hover:border-[#8e754c]
                hover:bg-[#8e754c]"
            >
              {cartMessage ? (
                <>
                  <Check size={17} />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag
                    size={16}
                    className="transition-transform duration-300
                      group-hover:-translate-y-0.5"
                  />
                  Add to Cart
                </>
              )}
            </motion.button>

            <motion.button
              type="button"
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.99 }}
              onClick={() => setWishlist((value) => !value)}
              aria-pressed={wishlist}
              className={`flex min-h-[50px] w-full
                items-center justify-center gap-2.5
                rounded-[4px] border px-5 py-3.5 text-xs
                font-semibold uppercase tracking-[0.15em]
                transition-all duration-300 ${
                  wishlist
                    ? "border-[#bda16f] bg-[#eee5d5] text-[#8c7146]"
                    : "border-[#bfb6a9] bg-transparent text-[#4c4338] hover:border-[#8e754c] hover:bg-[#f2ede4]"
                }`}
            >
              <Heart
                size={17}
                className={wishlist ? "fill-[#a78953]" : ""}
              />
              {wishlist ? "Added to Wishlist" : "Add to Wishlist"}
            </motion.button>
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
                  <p className="font-medium">
                    Added to your shopping bag
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#796b58]">
                    {quantity} × {product.name} · Size {selectedSize}
                    {" · "}
                    {formatPrice(product.price * quantity)}
                  </p>
                  <p className="mt-1 text-[10px] text-[#8c7b62]">
                    Demo cart items added: {cartCount}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCartMessage(false)}
                  aria-label="Dismiss confirmation"
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
              initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-md rounded-md
                border border-[#e5dac7] bg-[#faf8f3]
                p-6 shadow-2xl sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase
                    tracking-[0.2em] text-[#a48650]">
                    Find your perfect fit
                  </p>
                  <h2 id="size-guide-title" className="mt-2
                    font-serif text-2xl text-[#29221a]">
                    Ring Size Guide
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setShowSizeGuide(false)}
                  aria-label="Close size guide"
                  className="p-2 text-[#655a4c] hover:bg-[#eee8dd]"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#756b5f]">
                Select your preferred size. Ring sizing can vary by region,
                so please confirm the sizing system before ordering.
              </p>

              <div className="mt-5 overflow-hidden border border-[#e4ddd1]">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#eee7db] text-[#554735]">
                    <tr>
                      <th className="px-4 py-3 font-medium">Size</th>
                      <th className="px-4 py-3 font-medium">Fit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.sizes.map((size) => (
                      <tr key={size} className="border-t border-[#e4ddd1]">
                        <td className="px-4 py-3 text-[#29221a]">
                          {size}
                        </td>
                        <td className="px-4 py-3 text-[#756b5f]">
                          {selectedSize === size
                            ? "Currently selected"
                            : "Available"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-3 text-xs leading-5 text-[#8b7e6b]">
                This sample guide uses placeholder size labels. Replace
                these with your jeweler's verified size chart.
              </p>

              <button
                type="button"
                onClick={() => setShowSizeGuide(false)}
                className="mt-6 w-full bg-[#151512] px-5 py-3.5
                  text-xs font-semibold uppercase tracking-widest
                  text-white transition-colors hover:bg-[#8e754c]"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="reviews" className="scroll-mt-24" />
    </section>
  );
}
