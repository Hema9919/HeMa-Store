import { getProduct } from "@/api/services/ProductApi";
import ProductDetailsClient from "@/app/_component/ProductDetail/ProductDetailsClient";

interface ProductDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetails({ params }: ProductDetailsProps) {
  const { id } = await params;
  const response = await getProduct(id);
  const product = response;

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Product Not Found
          </h1>
          <p className="mt-2 text-slate-500">
            The product you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return <ProductDetailsClient product={product} />;
}
