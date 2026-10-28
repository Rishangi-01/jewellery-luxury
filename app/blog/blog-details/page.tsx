import BeautyTipsArticle from "@/components/blog-details/BeautyTipsArticle";
import BlogDetailsHero from "@/components/blog-details/BlogDetailsHero";

export default function BlogDetails() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <BlogDetailsHero />
      <BeautyTipsArticle />
    </div>
  );
}
