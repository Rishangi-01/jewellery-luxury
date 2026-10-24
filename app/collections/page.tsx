import Image from "next/image";
import CollectionHero from "@/components/collections/CollectionHero";
import ProductListing from "@/components/collections/ProductListing";

export default function Collections() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <CollectionHero />
      <ProductListing />
    </div>
  );
}
