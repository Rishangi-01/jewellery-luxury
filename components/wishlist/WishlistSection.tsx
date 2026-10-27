
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
  X,
  Heart,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Check,
} from "lucide-react";
import { wishlistSectionData } from "@/data";

type WishlistItem = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

export default function WishlistSection() {
  const [wishlist, setWishlist] =
    useState<WishlistItem[]>(wishlistSectionData.items);

  const [addedItems, setAddedItems] = useState<number[]>([]);
  const reduceMotion = useReducedMotion();
  const copy = wishlistSectionData.copy;

  const removeFromWishlist = (id: number) => {
    setWishlist((current) =>
      current.filter((item) => item.id !== id)
    );
    setAddedItems((current) =>
      current.filter((itemId) => itemId !== id)
    );
  };

  const addToCart = (id: number) => {
    setAddedItems((current) =>
      current.includes(id) ? current : [...current, id]
    );
  };

  return (
    <section className="min-h-[70vh] overflow-hidden
      bg-[#faf8f3] px-4 py-10 text-[#24211c]
      sm:px-7 sm:py-14 lg:px-12 lg:pb-16 lg:pt-36 w-[100%]">

      <div className="mx-auto max-w-[1250px]">

        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-8 border-b border-[#e7e0d5]
            pb-7 sm:mb-5 sm:pb-6"
        >

          <div className="flex flex-wrap items-end
            justify-between gap-4">
            <div>
              <h1 className="font-serif text-4xl
                tracking-[-0.04em] sm:text-5xl">
                {copy.title}
              </h1>

              <p className="mt-2 text-sm
                text-[#82796e] sm:text-base">
                {copy.description}
              </p>
            </div>

            <motion.div
              key={wishlist.length}
              initial={reduceMotion ? false : { scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2
                border border-[#e5ddd0] px-3 py-2"
            >
              <Heart
                size={14}
                className="text-[#a88a59]"
              />
              <span className="text-xs tabular-nums">
                {wishlist.length}{" "}
                {wishlist.length === 1 ? copy.piece : copy.pieces}
              </span>
            </motion.div>
          </div>
        </motion.header>

        {wishlist.length > 0 ? (
          <div className="divide-y divide-[#e7e0d5]">
            <AnimatePresence initial={false}>
              {wishlist.map((item, index) => {
                const isAdded = addedItems.includes(item.id);

                return (
                  <motion.article
                    key={item.id}
                    layout={!reduceMotion}
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, y: 22 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : {
                            opacity: 0,
                            x: 35,
                            height: 0,
                            paddingTop: 0,
                            paddingBottom: 0,
                          }
                    }
                    transition={{
                      duration: 0.4,
                      delay: index * 0.07,
                      layout: { duration: 0.3 },
                    }}
                    className="group relative flex flex-col
                      gap-4 py-5 sm:flex-row sm:items-center
                      sm:gap-6 sm:py-6 md:gap-7"
                  >
                    <Link
                      href={copy.productHref.replace(
                        "{id}",
                        item.id.toString()
                      )}
                      aria-label={copy.viewItem.replace("{name}", item.name)}
                      className="relative block h-36 w-full
                        shrink-0 overflow-hidden
                        border border-[#e4dace] bg-[#eee7dc]
                        sm:h-[112px] sm:w-[120px]
                        md:h-[132px] md:w-[145px]"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 639px) 100vw, 145px"
                        className="object-cover
                          transition-transform duration-700
                          ease-out group-hover:scale-110"
                      />

                      <div className="pointer-events-none absolute
                        inset-0 bg-black/0 transition-colors
                        duration-500 group-hover:bg-black/5" />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col
                      items-start justify-center">
                      <Link
                        href={copy.productHref.replace(
                          "{id}",
                          item.id.toString()
                        )}
                        className="font-serif text-lg
                          transition-colors duration-300
                          hover:text-[#a88a59] sm:text-xl"
                      >
                        {item.name}
                      </Link>

                      <p className="mt-2 text-sm font-medium
                        tabular-nums tracking-wide">
                        {formatPrice(item.price)}
                      </p>

                      <div className="mt-4 flex flex-wrap
                        items-center gap-3 sm:mt-3">
                        <motion.button
                          type="button"
                          whileHover={reduceMotion ? undefined : { y: -2 }}
                          whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                          onClick={() => addToCart(item.id)}
                          disabled={isAdded}
                          className="inline-flex min-h-10
                            items-center justify-center gap-2
                            bg-[#11110f] px-5 py-3
                            text-[9px] font-medium uppercase
                            tracking-[0.15em] text-white
                            transition-colors duration-300
                            hover:bg-[#a18453]
                            disabled:cursor-default
                            disabled:bg-[#70664f]"
                        >
                          {isAdded ? (
                            <>
                              <Check size={13} />
                              {copy.addedToCart}
                            </>
                          ) : (
                            <>
                              <ShoppingBag size={13} />
                              {copy.addToCart}
                            </>
                          )}
                        </motion.button>

                        <motion.button
                          type="button"
                          whileHover={
                            reduceMotion
                              ? undefined
                              : { scale: 1.12 }
                          }
                          whileTap={
                            reduceMotion
                              ? undefined
                              : { scale: 0.88 }
                          }
                          onClick={() => removeFromWishlist(item.id)}
                          aria-label={copy.removeItem.replace(
                            "{name}",
                            item.name
                          )}
                          className="flex h-10 w-10
                            items-center justify-center
                            text-[#82796e] transition-colors
                            hover:text-red-700"
                        >
                          <Heart
                            size={17}
                            strokeWidth={1.5}
                            className="transition-colors
                              duration-300 hover:fill-red-100"
                          />
                        </motion.button>
                      </div>
                    </div>

                    <motion.button
                      type="button"
                      whileHover={
                        reduceMotion
                          ? undefined
                          : { rotate: 90, scale: 1.12 }
                      }
                      whileTap={
                        reduceMotion
                          ? undefined
                          : { scale: 0.9 }
                      }
                      onClick={() => removeFromWishlist(item.id)}
                      aria-label={copy.deleteItem.replace(
                        "{name}",
                        item.name
                      )}
                      className="absolute right-0 top-5
                        flex h-8 w-8 items-center
                        justify-center text-[#82796e]
                        transition-colors hover:text-red-700
                        sm:top-6"
                    >
                      <X size={15} strokeWidth={1.5} />
                    </motion.button>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center
              border-b border-[#e7e0d5] px-5 py-16
              text-center sm:py-24"
          >
            <div className="flex h-16 w-16 items-center
              justify-center rounded-full border
              border-[#e5ddd0]">
              <Heart size={25} strokeWidth={1} />
            </div>

            <h2 className="mt-6 font-serif text-2xl sm:text-3xl">
              {copy.emptyTitle}
            </h2>

            <p className="mt-3 max-w-md text-sm
              leading-6 text-[#82796e]">
              {copy.emptyDescription}
            </p>

            <Link
              href={copy.exploreHref}
              className="group mt-7 inline-flex
                items-center gap-3 bg-[#11110f]
                px-7 py-4 text-[10px] uppercase
                tracking-[0.16em] text-white
                transition-colors hover:bg-[#a18453]"
            >
              {copy.exploreCollection}
              <ArrowRight
                size={14}
                className="transition-transform
                  group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        )}

        {wishlist.length > 0 && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-7 flex flex-wrap items-center
              justify-between gap-4 sm:mt-9"
          >
            <Link
              href={copy.continueShoppingHref}
              className="group inline-flex items-center gap-2
                text-[10px] uppercase tracking-[0.14em]
                text-[#82796e] transition-colors
                hover:text-[#a88a59]"
            >
              <ArrowRight
                size={14}
                className="rotate-180 transition-transform
                  group-hover:-translate-x-1"
              />
              {copy.continueShopping}
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
