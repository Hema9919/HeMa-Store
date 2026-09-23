import { ProductType } from "../types/productTypes";

// call api to get all products
export async function getAllProducts(): Promise<ProductType[]> {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/products",
      {
        cache: "force-cache",
      },
    );
    if (!response.ok) throw new Error("API ERROR");
    const payload = await response.json();
    return payload.data;
  } catch (error) {
    throw new Error("API ERROR");
  }
}

//call api to get single product
// https://ecommerce.routemisr.com/api/v1/products/6428de2adc1175abc65ca05b
export async function getProduct(productid: string): Promise<ProductType> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${productid}`,
    );
    if (!response.ok) throw new Error("API ERROR");
    const payload = await response.json();
    return payload.data;
  } catch (error) {
    throw new Error("API ERROR");
  }
}
