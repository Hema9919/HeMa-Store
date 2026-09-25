import FeatuerdProducts from "./_component/FeaturedProducts/FeatuerdProducts";
import HeroSection from "./_component/HeroSection/HeroSection";
import dynamic from "next/dynamic";
// import ShopCategory from "./_component/ShopCategory/ShopCategory";
const ShopCategory = dynamic(
  () => import("./_component/ShopCategory/ShopCategory"),
  {
    loading: () => <div>..Loading</div>,
  }
);
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to HeMa Store. Shop quality products, discover great deals, and enjoy a secure online shopping experience.",
  openGraph: {
    title: "HeMa Store | Online Shopping",
    description:
      "Shop quality products and discover great deals at HeMa Store.",
    url: "/",
  },
};
export default function Home() {
  return (
    <>
      <HeroSection />
        <ShopCategory />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <FeatuerdProducts />
      </div>
    </>
  );
}
