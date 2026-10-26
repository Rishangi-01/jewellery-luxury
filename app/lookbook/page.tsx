import CollectionEditorial from "@/components/lookbook/CollectionEditorial";
import LookbookHero from "@/components/lookbook/LookbookHero";

export default function Lookbook() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <LookbookHero />
      <CollectionEditorial />
    </div>
  );
}
