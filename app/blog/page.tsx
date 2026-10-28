import BlogHero from "@/components/blog/BlogHero";
import LatestJewelleryInsights from "@/components/blog/LatestJewelleryInsights";

export default function Blog() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <BlogHero />
      <LatestJewelleryInsights />
    </div>
  );
}
