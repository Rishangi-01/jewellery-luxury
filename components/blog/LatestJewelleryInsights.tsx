
"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { blogData } from "@/data";

export default function LatestJewelleryInsights() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(
    blogData.posts.length /
      blogData.postsPerPage
  );

  const currentPosts = useMemo(() => {
    const start =
      (currentPage - 1) * blogData.postsPerPage;
    return blogData.posts.slice(
      start,
      start + blogData.postsPerPage
    );
  }, [currentPage]);

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    setCurrentPage(page);

    document.getElementById("jewellery-insights")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="jewellery-insights"
      className="relative overflow-hidden bg-[#faf8f5] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-12"
    >
      
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full bg-[#c18a4b]/[0.06] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-[#c18a4b]/[0.06] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto mb-6 lg:mb-9 max-w-2xl text-center sm:mb-12"
        >
          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-[#b78043]" />
            <span className="text-sm text-[#b78043]">◇</span>
            <span className="h-px w-9 bg-[#b78043]" />
          </div>

          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.28em] text-[#a76e30]">
            {blogData.sectionEyebrow}
          </p>

          <h2 className="font-serif text-3xl tracking-tight text-[#202020] sm:text-4xl lg:text-5xl">
            {blogData.headingPrefix}{" "}
            <span className="text-[#b7793c]">
              {blogData.headingHighlight}
            </span>
            {blogData.headingSuffix}
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#77736e] sm:text-base">
            {blogData.description}
          </p>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 58 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-5 h-px bg-[#c18a4b]"
          />
        </motion.header>

        {/* Blog cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10 }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.09 },
              },
            }}
            className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-2 lg:gap-x-7 lg:gap-y-10"
          >
            {currentPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={{
                  hidden: { opacity: 0, y: 22 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  },
                }}
                className="group min-w-0"
              >
                {/* Image */}
                <a
                  href={blogData.linkTemplate.replace(
                    "{slug}",
                    post.slug
                  )}
                  aria-label={blogData.readLabelTemplate.replace(
                    "{title}",
                    post.title
                  )}
                  className="relative mb-4 block aspect-[2.15/1] overflow-hidden bg-[#eee7de]"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />

                  <span className="absolute left-3 top-3 flex items-center gap-1.5 bg-white/95 px-2 py-1 text-[9px] font-semibold tracking-wide text-[#302b25] shadow-sm">
                    <span>{post.date}</span>
                    <span className="text-[#c18a4b]">|</span>
                    <span>{post.year}</span>
                  </span>

                  <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/[0.06]" />

                  <span className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white text-[#a86e32] opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight size={17} />
                  </span>
                </a>

                {/* Content */}
                <div className="px-0.5">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b7793c]">
                    {post.category}
                  </p>

                  <h3 className="font-serif text-xl leading-[1.3] text-[#25231f] transition-colors duration-300 group-hover:text-[#a86e32] sm:text-[22px]">
                    <a
                      href={blogData.linkTemplate.replace(
                        "{slug}",
                        post.slug
                      )}
                    >
                      {post.title}
                    </a>
                  </h3>

                  <p className="mt-2 line-clamp-3 text-[13px] leading-[1.7] text-[#77736e] sm:text-sm">
                    {post.description}
                  </p>

                  <a
                    href={blogData.detailsHref}
                    className="mt-4 inline-flex min-h-9 items-center gap-3 bg-[#171717] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-[#b7793c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b7793c] focus-visible:ring-offset-2"
                  >
                    {blogData.moreDetailsLabel}
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Functional pagination */}
        <nav
          aria-label={blogData.paginationAriaLabel}
          className="mt-10 flex flex-wrap items-center justify-center gap-1.5 sm:mt-14 sm:gap-2"
        >
          <button
            type="button"
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label={blogData.previousPageLabel}
            className="flex h-9 w-9 items-center justify-center border border-[#e4ddd4] bg-white text-[#8f673d] transition-colors hover:border-[#b7793c] hover:bg-[#b7793c] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                type="button"
                onClick={() => changePage(page)}
                aria-label={blogData.goToPageLabelTemplate.replace(
                  "{page}",
                  String(page)
                )}
                aria-current={currentPage === page ? "page" : undefined}
                className={`flex h-9 min-w-9 items-center justify-center border px-2 text-xs transition-all duration-300 ${
                  currentPage === page
                    ? "border-[#b7793c] bg-[#b7793c] text-white shadow-sm"
                    : "border-[#e4ddd4] bg-white text-[#8f673d] hover:border-[#b7793c] hover:bg-[#f5ede4]"
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
            aria-label={blogData.nextPageLabel}
            className="flex h-9 w-9 items-center justify-center border border-[#e4ddd4] bg-white text-[#8f673d] transition-colors hover:border-[#b7793c] hover:bg-[#b7793c] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={16} />
          </button>
        </nav>

        <p className="mt-4 text-center text-xs text-[#969087]">
          {blogData.showingLabel}{" "}
          {(currentPage - 1) * blogData.postsPerPage + 1}
          {blogData.rangeSeparator}
          {Math.min(
            currentPage * blogData.postsPerPage,
            blogData.posts.length
          )}{" "}
          {blogData.ofLabel}{" "}
          {blogData.posts.length}{" "}
          {blogData.articlesLabel}
        </p>
      </div>
    </section>
  );
}
