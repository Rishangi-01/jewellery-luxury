import EnquiryNowHero from "@/components/enquiry-now/EnquiryNowHero";
import EnquirySection from "@/components/enquiry-now/EnquirySection";

export default function EnquiryNow() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <EnquiryNowHero />
      <EnquirySection />
    </div>
  );
}
