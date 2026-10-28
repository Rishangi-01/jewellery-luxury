import JewelryGallery from "@/components/gallery/JewelryGallery";
import GalleryHero from "@/components/gallery/GalleryHero";

export default function Gallery() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <GalleryHero />
      <JewelryGallery />
    </div>
  );
}
