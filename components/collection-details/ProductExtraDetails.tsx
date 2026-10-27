"use client";

import Image from "next/image";
import { productExtraDetailsData } from "@/data";

export default function ProductExtraDetails() {
  return (
    <section className="bg-[#faf8f3] px-4 py-6 sm:px-6 sm:py-6 lg:px-10 lg:py-8 w-[100%]">
      <div className="mx-auto grid max-w-[1560px] grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-8 lg:gap-12">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#a87c42]">
            {productExtraDetailsData.eyebrow}
          </p>
          <h2 className="mt-2 font-serif text-4xl font-normal leading-tight tracking-[-0.035em] text-[#241d16] sm:text-5xl">
            {productExtraDetailsData.title}
          </h2>
          <div aria-hidden="true" className="mt-5 h-1 w-16 bg-[#b98a4a]" />

          <div className="mt-8 overflow-hidden rounded border border-[#e9dfd2] bg-white/70">
            <table className="w-full border-collapse text-left">
              <tbody>
                {productExtraDetailsData.specifications.map((specification) => (
                  <tr
                    key={specification.label}
                    className="border-b border-[#e9dfd2] last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="w-[45%] border-r border-[#e9dfd2] px-4 py-4 text-sm font-semibold text-[#302b26] sm:px-7 sm:py-[18px] sm:text-base"
                    >
                      {specification.label}
                    </th>
                    <td className="px-4 py-4 text-sm text-[#756b5f] sm:px-7 sm:py-[18px] sm:text-base">
                      {specification.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded border border-[#e8d9c6] p-2.5 sm:p-3">
          <div className="relative aspect-square overflow-hidden rounded-sm bg-[#e8e0d4]">
            <Image
              src={productExtraDetailsData.image.src}
              alt={productExtraDetailsData.image.alt}
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 46vw, 42vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
