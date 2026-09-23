"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star, ArrowUpRight, Tag } from "lucide-react";
import { ProductType } from "@/api/types/productTypes";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const {
    id,
    _id,
    title,
    slug,
    price,
    priceAfterDiscount,
    imageCover,
    ratingsAverage,
    ratingsQuantity,
    quantity,
    brand,
    category,
  } = product;

  const productId = id || _id;

  const { addToCartAction } = useCart();
  const { isInWishlist, toggleWishlistAction } = useWishlist();

  const inWishlist = isInWishlist(productId);

  const hasDiscount = priceAfterDiscount && priceAfterDiscount < price;

  const discountPercentage = hasDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;

  const isOutOfStock = quantity <= 0;

  const brandName = typeof brand === "string" ? brand : brand?.name || "";

  const categoryName =
    typeof category === "string" ? category : category?.name || "";

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/60">
      {/* ================= IMAGE ================= */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <Link href={`/productDetails/${productId}`}>
          <Image
            src={imageCover}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-red-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
            <Tag size={12} />
            {discountPercentage}% OFF
          </div>
        )}

        {/* Out Of Stock */}
        {isOutOfStock && (
          <div className="absolute left-3 top-3 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-bold text-white">
            Out of Stock
          </div>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlistAction(productId);
          }}
          aria-label="Toggle wishlist"
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-lg ${
            inWishlist ? "text-red-500" : "text-slate-600 hover:text-red-500"
          }`}
        >
          <Heart
            size={19}
            strokeWidth={1.8}
            className={`transition-transform duration-300 hover:scale-110 ${
              inWishlist ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </button>

        {/* Quick View */}
        <Link
          href={`/productDetails/${productId}`}
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 translate-y-4 items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-indigo-600 hover:text-white"
        >
          Quick View
          <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-4 sm:p-5">
        {/* Brand / Category */}
        <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-400">
          {brandName && (
            <>
              <span className="uppercase tracking-wide">{brandName}</span>

              {categoryName && (
                <span className="h-1 w-1 rounded-full bg-slate-300" />
              )}
            </>
          )}

          {categoryName && <span className="truncate">{categoryName}</span>}
        </div>

        {/* Product Title */}
        <Link href={`/productDetails/${productId}`}>
          <h3 className="line-clamp-2 min-h-[48px] text-sm font-bold leading-6 text-slate-900 transition-colors duration-300 hover:text-indigo-600 sm:text-base">
            {title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1">
            <Star size={14} fill="currentColor" className="text-amber-400" />

            <span className="text-xs font-bold text-slate-700">
              {Number(ratingsAverage || 0).toFixed(1)}
            </span>
          </div>

          <span className="text-xs text-slate-400">
            ({ratingsQuantity || 0} reviews)
          </span>
        </div>

        {/* Price + Cart */}
        <div className="mt-4 flex items-end justify-between gap-3">
          <div className="flex flex-col">
            {hasDiscount && (
              <span className="text-xs font-medium text-slate-400 line-through">
                ${price}
              </span>
            )}

            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              ${hasDiscount ? priceAfterDiscount : price}
            </span>
          </div>

          {/* Cart Button */}
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCartAction(productId);
            }}
            className={`
              flex h-11 w-11 shrink-0 items-center justify-center
              rounded-xl transition-all duration-300
              ${
                isOutOfStock
                  ? "cursor-not-allowed bg-slate-100 text-slate-300"
                  : "bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 active:scale-95"
              }
            `}
            aria-label="Add to cart"
          >
            <ShoppingCart
              size={19}
              strokeWidth={2}
              className={
                !isOutOfStock
                  ? "transition-transform duration-300 group-hover:scale-110"
                  : ""
              }
            />
          </button>
        </div>

        {/* Stock */}
        {!isOutOfStock && quantity <= 5 && (
          <p className="mt-3 text-xs font-medium text-orange-500">
            Only {quantity} left in stock
          </p>
        )}
      </div>
    </article>
  );
}
