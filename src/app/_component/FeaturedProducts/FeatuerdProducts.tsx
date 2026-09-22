import { getAllProducts } from "@/api/services/ProductApi";
import ProductCard from "../ProductCard/ProductCard";
import MainTitle from "../Maintitle/MainTitle";

export default async function FeatuerdProducts() {
  // Call API
  const products = await getAllProducts();

  return (
    <>
      <MainTitle
        title="Featured Products"
        subtitle="Discover our handpicked selection of products"
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id || product._id} product={product} />
        ))}
      </div>
    </>
  );
}
