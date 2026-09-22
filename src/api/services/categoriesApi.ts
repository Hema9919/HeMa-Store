import { Category, Subcategory } from "../types/productTypes";

export async function getShopCategories(): Promise<Category[]> {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories",
    );
    if (!response.ok) throw new Error("API ERROR");
    const payload = await response.json();
    return payload.data;
  } catch (error) {
    throw new Error("API ERROR");
  }
}


export async function getCategory(categoryid: string): Promise<Category> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryid}`,
    );
    if (!response.ok) throw new Error("API ERROR");
    const payload = await response.json();
    return payload.data;
  } catch (error) {
    throw new Error("API ERROR");
  }
}


export async function getSubCate(categoryid: string): Promise<Subcategory[]> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryid}/subcategories`,
    );
    if (!response.ok) throw new Error("API ERROR");
    const payload = await response.json();
    return payload.data;
  } catch (error) {
    throw new Error("API ERROR");
  }
}