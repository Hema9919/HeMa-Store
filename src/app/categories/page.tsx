import React from 'react'
import ShopCategory from '../_component/ShopCategory/ShopCategory'
import ShopSubCategory from '../_component/ShopSubCategory/ShopSubCategory'
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
export default function Category() {
  return (
    <div>
      <ShopCategory/>
      <ShopSubCategory/>
    </div>
  )
}
