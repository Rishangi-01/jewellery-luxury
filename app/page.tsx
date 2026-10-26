import Image from "next/image";
import HeroSection from "@/components/home/HeroSection";
import SignatureCollections from "@/components/home/SignatureCollections";
import BrandStory from "@/components/our-story/BrandStory";
import StatsSection from "@/components/our-story/StatsSection";
import LegacyBanner from "@/components/home/LegacyBanner";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroSection />
      <SignatureCollections />
      <BrandStory />
      <StatsSection />
      <LegacyBanner />
    </div>
  );
}
