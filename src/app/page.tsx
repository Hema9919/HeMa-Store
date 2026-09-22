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
