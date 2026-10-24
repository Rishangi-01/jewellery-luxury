
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  Heart,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  X,
  ArrowRight,
  ArrowUpDown,
  Check,
  ShoppingBag,
} from "lucide-react";

type Category = "Rings" | "Necklaces" | "Earrings" | "Bracelets";
type Material = "Gold" | "Diamond" | "Platinum" | "Silver";

type Product = {
  id: number;
  name: string;
  category: Category;
  materials: Material[];
  price: number;
  image: string;
  badge?: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Eternal Diamond Ring",
    category: "Rings",
    materials: ["Gold", "Diamond"],
    price: 3499,
    image:
      "/images/home/banner4.webp",
  },
  {
    id: 2,
    name: "Golden Bloom Necklace",
    category: "Necklaces",
    materials: ["Gold", "Diamond"],
    price: 4999,
    image:
      "/images/home/banner2.webp",
    badge: "Bestseller",
  },
  {
    id: 3,
    name: "Pearl Drop Earrings",
    category: "Earrings",
    materials: ["Gold", "Silver"],
    price: 2199,
    image:
      "/images/home/banner3.webp",
  },
  {
    id: 4,
    name: "Royal Bangle",
    category: "Bracelets",
    materials: ["Gold"],
    price: 1499,
    image:
      "/images/about/banner1.png",
  },
  {
    id: 5,
    name: "Solitaire Ring",
    category: "Rings",
    materials: ["Gold", "Diamond", "Platinum"],
    price: 3299,
    image:
      "/images/home/banner4.webp",
  },
  {
    id: 6,
    name: "Celestial Earrings",
    category: "Earrings",
    materials: ["Gold", "Diamond"],
    price: 3299,
    image:
      "/images/home/banner4.webp",
  },
  {
    id: 7,
    name: "Golden Halo Ring",
    category: "Rings",
    materials: ["Gold"],
    price: 2599,
    image:
      "/images/home/banner4.webp",
  },
  {
    id: 8,
    name: "Classic Gold Chain",
    category: "Necklaces",
    materials: ["Gold"],
    price: 1899,
    image:
      "/images/home/banner4.webp",
  },
  {
    id: 9,
    name: "Golden Charm Bracelet",
    category: "Bracelets",
    materials: ["Gold", "Diamond"],
    price: 2899,
    image:
      "/images/home/banner4.webp",
  },
];

const categories: Category[] = [
  "Rings",
  "Necklaces",
  "Earrings",
  "Bracelets",
];

const materials: Material[] = [
  "Gold",
  "Diamond",
  "Platinum",
  "Silver",
];

const PAGE_SIZE = 6;

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ProductListing() {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([]);
  const [priceRange, setPriceRange] = useState(50000);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [expanded, setExpanded] = useState({
    category: true,
    material: true,
    price: true,
  });

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const materialMatch =
        selectedMaterials.length === 0 ||
        selectedMaterials.some((material) =>
          product.materials.includes(material)
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
    Math.ceil(filteredProducts.length / PAGE_SIZE)
  );

  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function toggleCategory(category: Category) {
    setSelectedCategories((previous) =>
      previous.includes(category)
        ? previous.filter((item) => item !== category)
        : [...previous, category]
    );
    setCurrentPage(1);
  }

  function toggleMaterial(material: Material) {
    setSelectedMaterials((previous) =>
      previous.includes(material)
        ? previous.filter((item) => item !== material)
        : [...previous, material]
    );
    setCurrentPage(1);
  }

  function toggleWishlist(id: number) {
    setWishlist((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  function resetFilters() {
    setSelectedCategories([]);
    setSelectedMaterials([]);
    setPriceRange(50000);
    setSortBy("featured");
    setCurrentPage(1);
  }

  const filterPanel = (
    <div className="space-y-7">
      {/* Filter heading */}
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl text-[#241d16]">
          Filters
        </h2>

        <button
          onClick={resetFilters}
          className="text-[10px] uppercase tracking-widest
            text-[#9c8154] hover:text-[#4b3922]"
        >
          Clear all
        </button>
      </div>

      <div className="h-px bg-[#dfd8cb]" />

      {/* Categories */}
      <div>
        <button
          onClick={() =>
            setExpanded((previous) => ({
              ...previous,
              category: !previous.category,
            }))
          }
          className="flex w-full items-center justify-between"
          aria-expanded={expanded.category}
        >
          <span className="text-sm font-semibold text-[#28221b]">
            Category
          </span>
          {expanded.category ? (
            <ChevronUp size={17} />
          ) : (
            <ChevronDown size={17} />
          )}
        </button>

        <AnimatePresence initial={false}>
          {expanded.category && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-3.5 pt-5">
                {categories.map((category) => {
                  const checked = selectedCategories.includes(category);
                  const count = products.filter(
                    (product) => product.category === category
                  ).length;

                  return (
                    <label
                      key={category}
                      className="flex cursor-pointer items-center
                        justify-between gap-3 text-sm text-[#6e655a]
                        transition-colors hover:text-[#9a7847]"
                    >
                      <span className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleCategory(category)}
                          className="peer sr-only"
                        />
                        <span
                          className={`flex h-[17px] w-[17px]
                            items-center justify-center rounded-[3px]
                            border transition-colors ${
                              checked
                                ? "border-[#a78953] bg-[#a78953] text-white"
                                : "border-[#c9c0b2] bg-transparent"
                            }`}
                        >
                          {checked && <Check size={12} />}
                        </span>
                        {category}
                      </span>
                      <span className="text-xs text-[#a49a8d]">
                        ({count})
                      </span>
                    </label>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price range */}
      <div>
        <button
          onClick={() =>
            setExpanded((previous) => ({
              ...previous,
              price: !previous.price,
            }))
          }
          className="mb-5 flex w-full items-center justify-between"
          aria-expanded={expanded.price}
        >
          <span className="text-sm font-semibold text-[#28221b]">
            Price Range
          </span>
          {expanded.price ? (
            <ChevronUp size={17} />
          ) : (
            <ChevronDown size={17} />
          )}
        </button>

        <AnimatePresence initial={false}>
          {expanded.price && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <input
                type="range"
                min={0}
                max={50000}
                step={500}
                value={priceRange}
                onChange={(event) => {
                  setPriceRange(Number(event.target.value));
                  setCurrentPage(1);
                }}
                aria-label="Maximum price"
                className="w-full cursor-pointer accent-[#a78953]"
              />

              <div className="mt-2 flex justify-between text-xs
                text-[#766c60]">
                <span>₹0</span>
                <span>{formatPrice(priceRange)}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Materials */}
      <div>
        <button
          onClick={() =>
            setExpanded((previous) => ({
              ...previous,
              material: !previous.material,
            }))
          }
          className="flex w-full items-center justify-between"
          aria-expanded={expanded.material}
        >
          <span className="text-sm font-semibold text-[#28221b]">
            Material
          </span>
          {expanded.material ? (
            <ChevronUp size={17} />
          ) : (
            <ChevronDown size={17} />
          )}
        </button>

        <AnimatePresence initial={false}>
          {expanded.material && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-3.5 pt-5">
                {materials.map((material) => {
                  const checked = selectedMaterials.includes(material);

                  return (
                    <label
                      key={material}
                      className="flex cursor-pointer items-center
                        gap-2.5 text-sm text-[#6e655a]
                        hover:text-[#9a7847]"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleMaterial(material)}
                        className="peer sr-only"
                      />
                      <span
                        className={`flex h-[17px] w-[17px]
                          items-center justify-center rounded-[3px]
                          border transition-colors ${
                            checked
                              ? "border-[#a78953] bg-[#a78953] text-white"
                              : "border-[#c9c0b2]"
                          }`}
                      >
                        {checked && <Check size={12} />}
                      </span>
                      {material}
                    </label>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sort */}
      <div>
        <label
          htmlFor="sort-products"
          className="mb-3 block text-sm font-semibold text-[#28221b]"
        >
          Sort By
        </label>

        <div className="relative">
          <select
            id="sort-products"
            value={sortBy}
            onChange={(event) => {
              setSortBy(event.target.value);
              setCurrentPage(1);
            }}
            className="w-full appearance-none rounded-[3px]
              border border-[#ded6c9] bg-transparent
              px-3 py-3 pr-9 text-sm text-[#6e655a]
              outline-none transition-colors
              focus:border-[#a78953]"
          >
            <option value="featured">Best Selling</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3
              top-1/2 -translate-y-1/2 text-[#7b705f]"
          />
        </div>
      </div>

      <button
        onClick={resetFilters}
        className="w-full border border-[#bda16f]/70
          px-4 py-3 text-xs font-semibold uppercase
          tracking-[0.14em] text-[#8b7046]
          transition-colors hover:bg-[#bda16f]
          hover:text-white"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <section className="min-h-screen bg-[#faf8f3] px-4 py-8
      sm:px-6 sm:py-10 lg:px-10 lg:py-12 w-[100%]">
      <div className="mx-auto max-w-[1600px]">

        {/* Mobile toolbar */}
        <div className="mb-6 flex items-center justify-between
          gap-3 lg:hidden">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="inline-flex items-center gap-2 border
              border-[#ded6c9] px-4 py-2.5 text-sm
              text-[#29231c]"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>

          <span className="text-xs text-[#766c60]">
            {filteredProducts.length} products
          </span>

          <button
            onClick={() =>
              document.getElementById("sort-products-mobile")?.focus()
            }
            className="inline-flex items-center gap-2 text-sm text-[#29231c]"
          >
            <ArrowUpDown size={16} />
            Sort
          </button>
        </div>

        {/* Mobile sort control */}
        <div className="mb-5 lg:hidden">
          <label htmlFor="sort-products-mobile" className="sr-only">
            Sort products
          </label>
          <select
            id="sort-products-mobile"
            value={sortBy}
            onChange={(event) => {
              setSortBy(event.target.value);
              setCurrentPage(1);
            }}
            className="w-full border border-[#ded6c9] bg-transparent
              px-3 py-2.5 text-sm text-[#6e655a] outline-none"
          >
            <option value="featured">Best Selling</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[245px_minmax(0,1fr)]
          lg:gap-7 xl:grid-cols-[275px_minmax(0,1fr)] xl:gap-10">

          {/* Desktop filters */}
          <aside className="hidden border-r border-[#e4ded3]
            pr-6 lg:block xl:pr-8">
            <div className="sticky top-24">
              {filterPanel}
            </div>
          </aside>

          {/* Product area */}
          <div className="min-w-0">
            <div className="mb-5 hidden items-center justify-between lg:flex">
              <p className="text-xs text-[#887d6f]">
                Showing{" "}
                <span className="font-medium text-[#29231c]">
                  {filteredProducts.length === 0
                    ? 0
                    : (currentPage - 1) * PAGE_SIZE + 1}
                  {"–"}
                  {Math.min(currentPage * PAGE_SIZE, filteredProducts.length)}
                </span>{" "}
                of {filteredProducts.length} products
              </p>

              <p className="text-[10px] uppercase tracking-[0.16em]
                text-[#a18a63]">
                Crafted to be cherished
              </p>
            </div>

            {/* Product grid */}
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
                        <div className="relative aspect-square
                          overflow-hidden rounded-[3px]
                          bg-[#eae4d9]">
                          <Link
                            href={`/collections/collection-details`}
                            aria-label={`View ${product.name}`}
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

                          {/* Soft image overlay */}
                          <div className="pointer-events-none absolute inset-0
                            bg-gradient-to-t from-black/20
                            via-transparent to-black/[0.04]
                            opacity-60 transition-opacity
                            group-hover:opacity-100" />

                          {product.badge && (
                            <span className="absolute left-2 top-2
                              bg-[#f8f1e3] px-2 py-1 text-[9px]
                              uppercase tracking-wider text-[#81683e]
                              sm:left-3 sm:top-3 sm:text-[10px]">
                              {product.badge}
                            </span>
                          )}

                          {/* Wishlist */}
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            aria-label={
                              isWishlisted
                                ? `Remove ${product.name} from wishlist`
                                : `Add ${product.name} to wishlist`
                            }
                            aria-pressed={isWishlisted}
                            className="absolute right-2 top-2 z-10 flex
                              h-9 w-9 items-center justify-center
                              rounded-full bg-[#faf8f3]/90
                              text-[#33291d] shadow-sm
                              transition-all duration-300
                              hover:bg-white sm:right-3 sm:top-3
                              sm:h-10 sm:w-10"
                          >
                            <Heart
                              size={18}
                              strokeWidth={1.7}
                              className={`transition-colors ${
                                isWishlisted
                                  ? "fill-[#a77c48] text-[#a77c48]"
                                  : ""
                              }`}
                            />
                          </button>

                          {/* Quick view / shopping action */}
                          <Link
                            href={`/collections/collection-details`}
                            className="absolute bottom-0 left-0 right-0
                              flex translate-y-full items-center
                              justify-center gap-2 bg-[#17130e]/90
                              py-3 text-[10px] font-medium uppercase
                              tracking-[0.15em] text-[#f8f1e3]
                              transition-transform duration-300
                              group-hover:translate-y-0"
                          >
                            <ShoppingBag size={14} />
                            View Product
                          </Link>
                        </div>

                        <div className="pt-3">
                          <Link href={`/collections/collection-details`}>
                            <h3 className="line-clamp-2 text-sm
                              font-medium leading-5 text-[#29231c]
                              transition-colors hover:text-[#9b7a49]
                              sm:text-base">
                              {product.name}
                            </h3>
                          </Link>

                          <p className="mt-2 text-sm font-semibold
                            text-[#393027]">
                            {formatPrice(product.price)}
                          </p>

                          <p className="mt-1 text-[10px] text-[#a09688]">
                            Inclusive of taxes
                          </p>
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="flex min-h-72 flex-col items-center
                justify-center px-5 text-center">
                <SlidersHorizontal
                  size={28}
                  className="mb-4 text-[#b39a70]"
                />
                <h3 className="font-serif text-2xl text-[#29231c]">
                  No pieces found
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-[#81776a]">
                  Try changing your filters to discover more of our collection.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-5 border border-[#bda16f]
                    px-5 py-3 text-xs uppercase tracking-wider
                    text-[#81683e] hover:bg-[#bda16f] hover:text-white"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="mt-12 flex flex-wrap items-center
                justify-center gap-2 sm:mt-16">
                <button
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="flex h-10 w-10 items-center justify-center
                    rounded-full text-[#665a49] transition-colors
                    hover:bg-[#eae3d7] disabled:cursor-not-allowed
                    disabled:opacity-30"
                >
                  <ArrowRight size={17} className="rotate-180" />
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1)
                  .map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      aria-label={`Page ${page}`}
                      aria-current={
                        currentPage === page ? "page" : undefined
                      }
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
                    setCurrentPage((page) =>
                      Math.min(totalPages, page + 1)
                    )
                  }
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
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

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close filters"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 z-[60] bg-black/45"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Product filters"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-[70]
                w-[min(88vw,360px)] overflow-y-auto
                bg-[#faf8f3] p-6 shadow-2xl"
            >
              <div className="mb-7 flex items-center justify-between">
                <h2 className="font-serif text-2xl text-[#29231c]">
                  Filters
                </h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Close filters"
                  className="flex h-10 w-10 items-center justify-center
                    text-[#29231c] hover:bg-[#eee8dd]"
                >
                  <X size={21} />
                </button>
              </div>

              {filterPanel}

              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="mt-6 w-full bg-[#15130f] px-4 py-4
                  text-xs font-semibold uppercase tracking-widest
                  text-white transition-colors hover:bg-[#8b7046]"
              >
                Show {filteredProducts.length} Products
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
