import {Subcategory } from "../types/productTypes";

export async function getShopSubCategories(): Promise<Subcategory[]> {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/subcategories",
    );
    if (!response.ok) throw new Error("API ERROR");
    const payload = await response.json();
    return payload.data;
  } catch (error) {
    throw new Error("API ERROR");
  }
}


export async function getSubCategory(subcategoryid: string): Promise<Subcategory> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/subcategories/${subcategoryid}`,
    );
    if (!response.ok) throw new Error("API ERROR");
    const payload = await response.json();
    return payload.data;
  } catch (error) {
    throw new Error("API ERROR");
  }
}