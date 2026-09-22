"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

import ProductCard from "../ProductCard/ProductCard";
import MainTitle from "../Maintitle/MainTitle";

import type { ProductType } from "@/api/types/productTypes";

interface ShopProductsProps {
  products: ProductType[];
}

export default function ShopProducts({
  products,
}: ShopProductsProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = new Map();

    products.forEach((product) => {
      if (product.category?._id) {
        uniqueCategories.set(
          product.category._id,
          product.category.name
        );
      }
    });

    return Array.from(uniqueCategories, ([id, name]) => ({
      id,
      name,
    }));
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        product.category?._id === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("all");
  };

  return (
    <>
      {/* Header */}
      <MainTitle
        title="Shop All Products"
        subtitle="Explore our complete collection and find something made for you"
      />

      {/* Search & Filter */}
      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a product..."
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category */}
          <div className="flex items-center gap-3 lg:w-72">
            <SlidersHorizontal className="hidden h-5 w-5 shrink-0 text-slate-400 sm:block" />

            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value)
              }
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            >
              <option value="all">All Categories</option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Clear */}
          {(search || selectedCategory !== "all") && (
            <button
              type="button"
              onClick={clearFilters}
              className="h-12 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results Info */}
      <div className="mt-8 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-bold text-slate-900">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>
        </div>

        {(search || selectedCategory !== "all") && (
          <p className="hidden text-sm text-slate-400 sm:block">
            {search && `Search: "${search}"`}
          </p>
        )}
      </div>

      {/* Products */}
      {filteredProducts.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id || product._id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
            <Search className="h-7 w-7 text-slate-400" />
          </div>

          <h3 className="mt-5 text-xl font-bold text-slate-900">
            No products found
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            We couldn't find any products matching your search or
            selected category.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-500"
          >
            Clear Filters
          </button>
        </div>
      )}
    </>
  );
}