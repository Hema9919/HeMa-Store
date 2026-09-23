"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowRight,
  Sparkles,
  Loader2,
  Star,
  ArrowUpRight,
} from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";

export default function WishlistPage() {
  const { status } = useSession();
  const {
    wishlistItems,
    wishlistCount,
    isLoading,
    removeFromWishlistAction,
  } = useWishlist();
  const { addToCartAction } = useCart();

  if (status === "loading" || isLoading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
          <p className="text-sm font-medium text-slate-500">
            Loading your wishlist...
          </p>
        </div>
      </main>
    );
  }

  if (status === "unauthenticated") {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-red-500">
            <Heart size={36} />
          </div>
          <h1 className="mt-6 text-2xl font-black text-slate-900">
            Sign In to View Your Wishlist
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Save your favorite items and track their prices by signing in to your
            account.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
          >
            <span>Log In</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600">
            <Heart size={36} />
          </div>
          <h1 className="mt-6 text-2xl font-black text-slate-900">
            Your Wishlist is Empty
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            You haven't saved any items yet. Browse products and tap the heart
            icon to add them to your wishlist.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
          >
            <span>Explore Products</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600">
                <Sparkles size={14} />
                <span>HeMa Store</span>
              </div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                My Wishlist
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                {wishlistCount} saved {wishlistCount === 1 ? "item" : "items"}
              </p>
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 transition hover:border-indigo-600 hover:text-indigo-600"
            >
              <span>Continue Shopping</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wishlistItems.map((product) => {
            const productId = product._id || product.id;
            const hasDiscount =
              product.priceAfterDiscount &&
              product.priceAfterDiscount < product.price;

            return (
              <div
                key={productId}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
              >
                {/* Image Section */}
                <div className="relative aspect-square overflow-hidden bg-slate-50">
                  <Link href={`/productDetails/${productId}`}>
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeFromWishlistAction(productId)}
                    aria-label="Remove from wishlist"
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-red-500 shadow-md backdrop-blur-sm transition hover:bg-red-50 hover:scale-105"
                  >
                    <Trash2 size={17} />
                  </button>

                  {/* Quick View */}
                  <Link
                    href={`/productDetails/${productId}`}
                    className="absolute bottom-3 left-1/2 flex -translate-x-1/2 translate-y-3 items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-indigo-600 hover:text-white"
                  >
                    Quick View
                    <ArrowUpRight size={14} />
                  </Link>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    {product.category?.name && (
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {product.category.name}
                      </span>
                    )}

                    <Link href={`/productDetails/${productId}`}>
                      <h3 className="mt-1 line-clamp-2 min-h-[44px] text-sm font-bold text-slate-900 transition hover:text-indigo-600">
                        {product.title}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div className="mt-2 flex items-center gap-1.5">
                      <Star size={14} className="fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-slate-700">
                        {Number(product.ratingsAverage || 0).toFixed(1)}
                      </span>
                      <span className="text-xs text-slate-400">
                        ({product.ratingsQuantity || 0})
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    <div>
                      {hasDiscount && (
                        <span className="text-xs font-medium text-slate-400 line-through">
                          ${product.price}
                        </span>
                      )}
                      <p className="text-lg font-black text-slate-900">
                        ${hasDiscount ? product.priceAfterDiscount : product.price}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => addToCartAction(productId)}
                      className="flex h-10 items-center gap-2 rounded-xl bg-indigo-600 px-3.5 text-xs font-bold text-white shadow-md shadow-indigo-100 transition hover:bg-indigo-700 active:scale-95"
                    >
                      <ShoppingCart size={15} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
