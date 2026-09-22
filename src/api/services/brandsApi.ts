import { Brand } from "../types/productTypes";

export async function getBrands(): Promise<Brand[]> {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/brands",
    );
    if (!response.ok) throw new Error("API ERROR");
    const payload = await response.json();
    return payload.data;
  } catch (error) {
    throw new Error("API ERROR");
  }
}


export async function getBrand(subcategoryid: string): Promise<Brand> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${subcategoryid}`,
    );
    if (!response.ok) throw new Error("API ERROR");
    const payload = await response.json();
    return payload.data;
  } catch (error) {
    throw new Error("API ERROR");
  }
}