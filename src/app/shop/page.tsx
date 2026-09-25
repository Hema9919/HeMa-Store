import { getAllProducts } from "@/api/services/ProductApi";
import ShopProducts from "../_component/ShopProducts/ShopProducts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse all products at HeMa Store. Find quality products across different categories with secure online checkout.",
  openGraph: {
    title: "Shop | HeMa Store",
    description:
      "Browse and shop products from HeMa Store.",
    url: "/shop",
  },
};
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