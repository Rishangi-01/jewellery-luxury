import CartHero from "@/components/cart/CartHero";
import CartSection from "@/components/cart/CartSection";

export default function Cart() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <CartHero />
      <CartSection />
    </div>
  );
}
