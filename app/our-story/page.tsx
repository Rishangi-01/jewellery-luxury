import OurStoryHero from "@/components/our-story/OurStoryHero";
import BrandStory from "@/components/our-story/BrandStory";
import StatsSection from "@/components/our-story/StatsSection";
import BrandStatement from "@/components/our-story/BrandStatement";

export default function OurStory() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <OurStoryHero />
      <BrandStory />
      <StatsSection />
      <BrandStatement />
    </div>
  );
}
