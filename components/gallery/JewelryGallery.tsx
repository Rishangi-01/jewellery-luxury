
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Gem, X } from "lucide-react";
import { galleryData } from "@/data";

export default function JewelrygalleryData() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<
    (typeof galleryData.items)[number] | null
  >(null);
  const shouldReduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  const totalPages = Math.ceil(
    galleryData.items.length / galleryData.itemsPerPage
  );

  const visibleItems = galleryData.items.slice(
    (currentPage - 1) * galleryData.itemsPerPage,
    currentPage * galleryData.itemsPerPage
  );

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    setCurrentPage(page);

    document.getElementById("galleryData")?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    if (!selectedImage) {
      openerRef.current?.focus();
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      } else if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  const openImage = (
    item: (typeof galleryData.items)[number],
    button: HTMLButtonElement
  ) => {
    openerRef.current = button;
    setSelectedImage(item);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <section
      id="galleryData"
      className="relative overflow-hidden bg-[#fbf8f4] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20 w-[100%]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full bg-[#bd8749]/10 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-[#e4c9a8]/20 blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto mb-8 max-w-2xl text-center sm:mb-10"
        >
          <div className="mb-3 flex items-center justify-center gap-3 text-[#ad7134]">
            <span className="h-px w-8 bg-[#bd8749]" />
            <Gem size={19} strokeWidth={1.5} />
            <span className="h-px w-8 bg-[#bd8749]" />
          </div>

          <h2 className="font-serif text-3xl font-semibold tracking-tight text-[#27221e] sm:text-4xl lg:text-5xl">
            {galleryData.headingPrefix}{" "}
            <span className="text-[#b8793e]">
              {galleryData.headingHighlight}
            </span>
          </h2>

          <div className="mx-auto mt-3 h-[2px] w-12 bg-[#bd8749]" />

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#716b65] sm:text-base">
            {galleryData.description}
          </p>
        </motion.div>

        {/* galleryData grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
          >
            {visibleItems.map((item, index) => (
              <motion.article
                key={item.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: shouldReduceMotion ? 0 : index * 0.07,
                }}
                className="group relative overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-[#e8dfd4]/80"
              >
                <button
                  type="button"
                  onClick={(event) => openImage(item, event.currentTarget)}
                  aria-label={`Enlarge ${item.title}`}
                  className="group relative block aspect-[1.18/1] w-full cursor-zoom-in overflow-hidden bg-[#eee6dc] text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#ad7134] sm:aspect-[1.08/1] lg:aspect-[1.12/1]"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Elegant hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#20150d]/65 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#f2d1a3] sm:text-xs">
                      {item.category}
                    </p>
                    <h3 className="mt-1 font-serif text-lg sm:text-xl">
                      {item.title}
                    </h3>
                  </div>
                </button>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Functional pagination */}
        <nav
          aria-label={galleryData.paginationAriaLabel}
          className="mt-7 flex flex-wrap items-center justify-center gap-2 sm:mt-9"
        >
          <button
            type="button"
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label={galleryData.previousPageLabel}
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#e4d7c8] text-[#956438] transition-colors hover:bg-[#b8793e] hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-[#956438]"
          >
            <ChevronLeft size={17} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                type="button"
                onClick={() => changePage(page)}
                aria-label={galleryData.goToPageLabelTemplate.replace(
                  "{page}",
                  String(page)
                )}
                aria-current={currentPage === page ? "page" : undefined}
                className={`flex h-10 min-w-10 items-center justify-center rounded-sm border px-3 text-sm transition-all duration-300 ${
                  currentPage === page
                    ? "border-[#ad7134] bg-[#ad7134] text-white shadow-md shadow-[#ad7134]/20"
                    : "border-[#e4d7c8] bg-transparent text-[#956438] hover:border-[#ad7134] hover:bg-[#f0e4d5]"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label={galleryData.nextPageLabel}
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#e4d7c8] text-[#956438] transition-colors hover:bg-[#b8793e] hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-[#956438]"
          >
            <ChevronRight size={17} />
          </button>
        </nav>

        <p
          aria-live="polite"
          className="mt-3 text-center text-xs tracking-wide text-[#93877b]"
        >
          {galleryData.pageLabelTemplate
            .replace("{current}", String(currentPage))
            .replace("{total}", String(totalPages))}
        </p>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`Enlarged galleryData image: ${selectedImage.title}`}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeLightbox}
              aria-label="Close enlarged image"
              className="absolute right-4 top-4 z-10 rounded-full bg-white p-3 text-black transition-colors hover:bg-[#e9d6bd] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6 sm:top-6"
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
              onClick={(event) => event.stopPropagation()}
              className="relative h-[85vh] w-full max-w-6xl"
            >
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                sizes="95vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
