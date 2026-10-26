
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  X,
  Gift,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { site } from "@/data";

type CartItem = {
  id: number;
  name: string;
  variant?: string;
  price: number;
  quantity: number;
  image: string;
};

const initialItems: CartItem[] = [
  {
    id: 1,
    name: "Eternal Diamond Ring",
    variant: "Size: 6",
    price: 2499,
    quantity: 1,
    image: "/images/home/banner4.webp",
  },
  {
    id: 2,
    name: "Golden Bloom Necklace",
    price: 1899,
    quantity: 1,
    image: "/images/home/banner4.webp",
  },
  {
    id: 3,
    name: "Pearl Drop Earrings",
    price: 1299,
    quantity: 1,
    image: "/images/home/banner4.webp",
  },
];

const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function CartSection() {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const reduceMotion = useReducedMotion();
  const cartLink = site.footer.columns
    .flatMap((column) => column.links)
    .find((link) => link.href === "/cart");

  if (!cartLink) {
    throw new Error("Cart link is missing from site footer data.");
  }

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Free shipping above ₹3,000.
  const shipping = subtotal === 0 || subtotal >= 3000 ? 0 : 99;
  const total = subtotal + shipping;

  function changeQuantity(id: number, amount: number) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(
                1,
                Math.min(99, item.quantity + amount)
              ),
            }
          : item
      )
    );
  }

  function removeItem(id: number) {
    setItems((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#faf8f3]
      px-4 py-10 text-[#28241e] sm:px-7 sm:py-14
      lg:px-10 lg:py-16 w-[100%]">
      <div className="mx-auto max-w-[1350px]">

        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mb-7 sm:mb-9"
        >

          <h1 className="font-serif text-4xl
            tracking-[-0.04em] sm:text-5xl">
            {cartLink.label}
          </h1>

          <p className="mt-2 text-sm text-[#81776b]">
            {site.site.description}
          </p>
        </motion.header>

        {items.length > 0 ? (
          <>
            <div className="hidden grid-cols-[minmax(230px,2fr)_0.8fr_1fr_0.8fr_24px]
              gap-4 border-b border-[#e6dfd4] px-2 pb-4
              text-[10px] uppercase tracking-[0.12em]
              text-[#877c6e] md:grid">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
              <span />
            </div>

            <div>
              <AnimatePresence initial={false}>
                {items.map((item, index) => (
                  <motion.article
                    key={item.id}
                    layout={!reduceMotion}
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, y: 15 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : {
                            opacity: 0,
                            x: 24,
                            height: 0,
                            marginTop: 0,
                            marginBottom: 0,
                          }
                    }
                    transition={{
                      duration: 0.35,
                      delay: index * 0.07,
                      layout: { duration: 0.3 },
                    }}
                    className="grid grid-cols-1 gap-3
                      border-b border-[#e6dfd4] py-4
                      sm:py-5
                      md:grid-cols-[minmax(230px,2fr)_0.8fr_1fr_0.8fr_24px]
                      md:items-center md:gap-4 md:px-2"
                  >
                    {/* Product details */}
                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                      <div className="relative h-[72px] w-[72px]
                        shrink-0 overflow-hidden border
                        border-[#e6dfd4] bg-[#e9e0d3]
                        sm:h-[84px] sm:w-[84px]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="84px"
                          className="object-cover transition-transform
                            duration-700 hover:scale-110"
                        />
                      </div>

                      <div className="min-w-0">
                        <h2 className="font-serif text-base
                          leading-snug sm:text-lg">
                          {item.name}
                        </h2>

                        {item.variant && (
                          <p className="mt-1 text-xs text-[#84796c]">
                            {item.variant}
                          </p>
                        )}

                        <p className="mt-2 text-xs text-[#84796c] md:hidden">
                          {formatPrice(item.price)} each
                        </p>
                      </div>
                    </div>

                    <div className="hidden text-sm md:block">
                      {formatPrice(item.price)}
                    </div>

                    <div className="flex items-center justify-between md:justify-start">
                      <span className="text-xs text-[#84796c] md:hidden">
                        Quantity
                      </span>

                      <div className="flex h-9 items-center
                        border border-[#e4ddd1] bg-white/60">
                        <button
                          type="button"
                          disabled={item.quantity <= 1}
                          aria-label={`Decrease ${item.name} quantity`}
                          onClick={() => changeQuantity(item.id, -1)}
                          className="flex h-full w-8 items-center
                            justify-center transition-colors
                            hover:bg-[#eee6da] disabled:opacity-30"
                        >
                          <Minus size={12} />
                        </button>

                        <motion.span
                          key={item.quantity}
                          initial={reduceMotion ? false : { opacity: 0.4, y: 3 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="min-w-7 text-center text-xs tabular-nums"
                        >
                          {item.quantity}
                        </motion.span>

                        <button
                          type="button"
                          disabled={item.quantity >= 99}
                          aria-label={`Increase ${item.name} quantity`}
                          onClick={() => changeQuantity(item.id, 1)}
                          className="flex h-full w-8 items-center
                            justify-center transition-colors
                            hover:bg-[#eee6da] disabled:opacity-30"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm md:block">
                      <span className="text-xs text-[#84796c] md:hidden">
                        Item total
                      </span>
                      <motion.span
                        key={item.price * item.quantity}
                        initial={reduceMotion ? false : { opacity: 0.4 }}
                        animate={{ opacity: 1 }}
                        className="font-medium tabular-nums"
                      >
                        {formatPrice(item.price * item.quantity)}
                      </motion.span>
                    </div>

                    <div className="flex justify-end md:justify-center">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="group flex items-center gap-1.5
                          text-xs text-[#82776a] transition-colors
                          hover:text-red-700 md:p-1"
                      >
                        <span className="md:hidden">Remove</span>
                        <X
                          size={15}
                          className="transition-transform duration-300
                            group-hover:rotate-90"
                        />
                      </button>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-6
              sm:mt-9 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr]
              lg:gap-10">

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7 }}
                className="group relative flex min-h-[210px]
                  items-center overflow-hidden border
                  border-[#b49a6a]/35 bg-[#17120c]
                  sm:min-h-[240px]"
              >
                <Image
                  src="/images/about/banner2.webp"
                  alt="Luxury jewelry gift wrapped in an elegant presentation box"
                  fill
                  sizes="(max-width: 1023px) 100vw, 55vw"
                  className="object-cover object-center
                    transition-transform duration-1000
                    group-hover:scale-105"
                />

                <div className="absolute inset-0
                  bg-gradient-to-r from-black/85
                  via-black/55 to-black/10"
                />

                <div className="relative z-10 max-w-[320px] p-6 sm:p-8">
                  <div className="mb-4 flex items-center gap-2 text-[#d8bb87]">
                    <Gift size={16} strokeWidth={1.4} />
                    <span className="text-[9px] uppercase tracking-[0.23em]">
                      A Little Something Special
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl
                    leading-tight text-[#fff7e9] sm:text-3xl">
                    Luxury in Every Detail
                  </h2>

                  <p className="mt-3 max-w-[260px] text-xs
                    leading-5 text-white/75 sm:text-sm">
                    Complimentary gift wrapping with every order.
                  </p>

                  <div className="mt-5 flex items-center gap-2
                    text-[9px] uppercase tracking-[0.15em]
                    text-[#e0c28f]">
                    <Sparkles size={12} />
                    Beautifully yours
                  </div>
                </div>
              </motion.div>

              <motion.aside
                initial={reduceMotion ? false : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="border border-[#e6dfd4]
                  bg-white/40 p-5 sm:p-7 lg:p-8"
              >
                <h2 className="font-serif text-2xl">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[#81776b]">Subtotal</span>
                    <motion.span
                      key={subtotal}
                      initial={reduceMotion ? false : { opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      className="tabular-nums"
                    >
                      {formatPrice(subtotal)}
                    </motion.span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[#81776b]">Shipping</span>
                    <span className={shipping === 0 ? "text-[#71815e]" : ""}>
                      {shipping === 0 ? "Free" : formatPrice(shipping)}
                    </span>
                  </div>

                  {subtotal > 0 && subtotal < 3000 && (
                    <p className="text-xs leading-5 text-[#927850]">
                      Add {formatPrice(3000 - subtotal)} more to qualify
                      for free shipping.
                    </p>
                  )}
                </div>

                <div className="my-5 border-t border-[#e6dfd4]" />

                <div className="flex items-center justify-between gap-4">
                  <span className="font-serif text-xl">Total</span>
                  <motion.span
                    key={total}
                    initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-serif text-2xl tabular-nums"
                  >
                    {formatPrice(total)}
                  </motion.span>
                </div>

                <Link
                  href="/checkout"
                  className="group mt-6 flex min-h-12 w-full
                    items-center justify-center gap-3
                    bg-[#11110f] px-5 py-4 text-center
                    text-[10px] font-medium uppercase
                    tracking-[0.16em] text-white
                    transition-colors duration-300
                    hover:bg-[#9a7b4d]"
                >
                  <ShoppingBag size={15} />
                  Proceed to Checkout
                  <ArrowRight
                    size={15}
                    className="transition-transform
                      duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </motion.aside>
            </div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-7 sm:mt-9"
            >
              <Link
                href="/collections"
                className="group inline-flex items-center gap-2
                  text-[10px] uppercase tracking-[0.14em]
                  text-[#81776b] transition-colors
                  hover:text-[#9b8055]"
              >
                <ArrowLeft
                  size={14}
                  className="transition-transform duration-300
                    group-hover:-translate-x-1"
                />
                Continue Shopping
              </Link>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center border-y
              border-[#e6dfd4] px-5 py-16 text-center"
          >
            <ShoppingBag size={34} strokeWidth={1} />
            <h2 className="mt-5 font-serif text-2xl">
              Your cart is waiting
            </h2>
            <p className="mt-2 text-sm text-[#81776b]">
              Discover a piece that feels uniquely yours.
            </p>
            <Link
              href="/collections"
              className="mt-6 bg-[#11110f] px-7 py-4
                text-[10px] uppercase tracking-[0.15em]
                text-white transition-colors hover:bg-[#9a7b4d]"
            >
              Explore Collections
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
