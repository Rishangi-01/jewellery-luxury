import Image from "next/image";
import ProductDetails from "@/components/collection-details/ProductDetails";
import ProductExtraDetails from "@/components/collection-details/ProductExtraDetails";
import CollectionDetailsHero from "@/components/collection-details/CollectionDetailsHero";

export default function CollectionDetails() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <CollectionDetailsHero />
      <ProductDetails />
      <ProductExtraDetails />
    </div>
  );
}
