"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  Heart,
  SlidersHorizontal,
  X,
  ArrowRight,
  ArrowUpDown,
  Check,
  ShoppingBag,
} from "lucide-react";
import { productListingData } from "@/data";

const { products, categories, materials, copy } = productListingData;
type Category = (typeof categories)[number];
type Material = (typeof materials)[number];

export default function ProductListing() {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([]);
  const [priceRange, setPriceRange] = useState(productListingData.maxPrice);
  const [sortBy, setSortBy] = useState(productListingData.defaultSort);
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const materialMatch =
        selectedMaterials.length === 0 ||
        selectedMaterials.some((material) =>
          product.materials.includes(material),
        );

      const priceMatch = product.price <= priceRange;

      return categoryMatch && materialMatch && priceMatch;
    });

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result.sort((a, b) => a.id - b.id);
    }

    return result;
  }, [selectedCategories, selectedMaterials, priceRange, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / productListingData.pageSize),
  );

  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * productListingData.pageSize,
    currentPage * productListingData.pageSize,
  );

  function toggleWishlist(id: number) {
    setWishlist((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id],
    );
  }

  function resetFilters() {
    setSelectedCategories([]);
    setSelectedMaterials([]);
    setPriceRange(productListingData.maxPrice);
    setSortBy(productListingData.defaultSort);
    setCurrentPage(1);
  }

  return (
    <section
      className="min-h-screen bg-[#faf8f3] px-4 py-8
      sm:px-6 sm:py-10 lg:px-10 lg:py-12 w-[100%]"
    >
      <div className="mx-auto max-w-[1600px]">
        <div>
          <div className="min-w-0">
            <div className="mb-5 hidden items-center justify-between lg:flex">
              <p className="text-xs text-[#887d6f] lg:text-[16px]">
                {copy.showing}{" "}
                <span className="font-medium text-[#29231c]">
                  {filteredProducts.length === 0
                    ? 0
                    : (currentPage - 1) * productListingData.pageSize + 1}
                  {"–"}
                  {Math.min(
                    currentPage * productListingData.pageSize,
                    filteredProducts.length,
                  )}
                </span>{" "}
                {copy.of}{" "}
                {copy.productsCount.replace(
                  "{count}",
                  filteredProducts.length.toString(),
                )}
              </p>

              <p
                className="text-[10px] uppercase tracking-[0.16em]
                text-[#a18a63]"
              >
                {copy.crafted}
              </p>
            </div>

            {visibleProducts.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-2 gap-x-4 gap-y-8
                  sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10
                  xl:grid-cols-3 xl:gap-x-7"
              >
                <AnimatePresence mode="popLayout">
                  {visibleProducts.map((product, index) => {
                    const isWishlisted = wishlist.includes(product.id);

                    return (
                      <motion.article
                        layout
                        key={product.id}
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.045,
                        }}
                        className="group min-w-0"
                      >
                        <div
                          className="relative aspect-square
                          overflow-hidden rounded-[3px]
                          bg-[#eae4d9]"
                        >
                          <Link
                            href={copy.collectionHref}
                            aria-label={copy.viewProductAria.replace(
                              "{name}",
                              product.name,
                            )}
                            className="absolute inset-0 z-0"
                          >
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="(max-width: 639px) 48vw,
                                (max-width: 1279px) 45vw, 30vw"
                              className="object-cover transition-transform
                                duration-700 ease-out
                                group-hover:scale-[1.06]"
                            />
                          </Link>

                          <div
                            className="pointer-events-none absolute inset-0
                            bg-gradient-to-t from-black/20
                            via-transparent to-black/[0.04]
                            opacity-60 transition-opacity
                            group-hover:opacity-100"
                          />

                          {product.badge && (
                            <span
                              className="absolute left-2 top-2
                              bg-[#f8f1e3] px-2 py-1 text-[9px]
                              uppercase tracking-wider text-[#81683e]
                              sm:left-3 sm:top-3 sm:text-[10px]"
                            >
                              {product.badge}
                            </span>
                          )}
                          <Link
                            href={copy.collectionHref}
                            className="absolute bottom-0 left-0 right-0
                              flex translate-y-full items-center
                              justify-center gap-2 bg-[#17130e]/90
                              py-3 text-[10px] font-medium uppercase
                              tracking-[0.15em] text-[#f8f1e3]
                              transition-transform duration-300
                              group-hover:translate-y-0 lg:text-xl"
                          >
                            <ShoppingBag size={14} />
                            {copy.viewProduct}
                          </Link>
                        </div>

                        <div className="pt-3">
                          <Link href={copy.collectionHref}>
                            <h3
                              className="text-sm
                              font-medium leading-5 text-[#29231c]
                              transition-colors hover:text-[#9b7a49]
                              sm:text-base lg:text-3xl"
                            >
                              {product.name}
                            </h3>
                          </Link>

                          <p className="mt-1 text-[10px] text-[#a09688] lg:text-xl">
                            {copy.inclusiveTaxes}
                          </p>
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div
                className="flex min-h-72 flex-col items-center
                justify-center px-5 text-center"
              >
                <SlidersHorizontal size={28} className="mb-4 text-[#b39a70]" />
                <h3 className="font-serif text-2xl text-[#29231c]">
                  {copy.noProducts}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-[#81776a]">
                  {copy.emptyDescription}
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-5 border border-[#bda16f]
                    px-5 py-3 text-xs uppercase tracking-wider
                    text-[#81683e] hover:bg-[#bda16f] hover:text-white"
                >
                  {copy.clearFilters}
                </button>
              </div>
            )}

            {filteredProducts.length > 0 && (
              <div
                className="mt-12 flex flex-wrap items-center
                justify-center gap-2 sm:mt-16"
              >
                <button
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  disabled={currentPage === 1}
                  aria-label={copy.previousPage}
                  className="flex h-10 w-10 items-center justify-center
                    rounded-full text-[#665a49] transition-colors
                    hover:bg-[#eae3d7] disabled:cursor-not-allowed
                    disabled:opacity-30"
                >
                  <ArrowRight size={17} className="rotate-180" />
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    aria-label={copy.page.replace("{page}", page.toString())}
                    aria-current={currentPage === page ? "page" : undefined}
                    className={`flex h-10 w-10 items-center
                        justify-center rounded-full text-sm
                        transition-all duration-300 ${
                          currentPage === page
                            ? "bg-[#11110f] text-white shadow-md"
                            : "text-[#655b4f] hover:bg-[#eae3d7]"
                        }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  disabled={currentPage === totalPages}
                  aria-label={copy.nextPage}
                  className="flex h-10 w-10 items-center justify-center
                    rounded-full text-[#665a49] transition-colors
                    hover:bg-[#eae3d7] disabled:cursor-not-allowed
                    disabled:opacity-30"
                >
                  <ArrowRight size={17} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
