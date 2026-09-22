import { getAllProducts } from "@/api/services/ProductApi";
import ShopProducts from "../_component/ShopProducts/ShopProducts";

export default async function Shop() {
  const products = await getAllProducts();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <ShopProducts products={products} />
      </div>
    </main>
  );
}