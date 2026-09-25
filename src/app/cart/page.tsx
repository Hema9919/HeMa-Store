"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Loader2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";

export default function CartPage() {
  const { status } = useSession();
  const {
    cart,
    cartCount,
    totalCartPrice,
    isLoading,
    isActionLoading,
    updateQuantityAction,
    removeItemAction,
    clearCartAction,
  } = useCart();

  if (status === "loading" || isLoading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
          <p className="text-sm font-medium text-slate-500">
            Loading your cart...
          </p>
        </div>
      </main>
    );
  }

  if (status === "unauthenticated") {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600">
            <ShoppingCart size={36} />
          </div>
          <h1 className="mt-6 text-2xl font-black text-slate-900">
            Sign In to View Your Cart
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Please log in to your account to view saved items in your shopping
            cart.
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

  const items = cart?.products || [];

  if (items.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600">
            <ShoppingBag size={36} />
          </div>
          <h1 className="mt-6 text-2xl font-black text-slate-900">
            Your Cart is Empty
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Looks like you haven't added any items to your cart yet. Explore our
            latest arrivals and best deals!
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
          >
            <span>Start Shopping</span>
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
                Shopping Cart
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                You have {cartCount} {cartCount === 1 ? "item" : "items"} in
                your cart.
              </p>
            </div>

            <button
              type="button"
              onClick={() => clearCartAction()}
              disabled={isActionLoading}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-100 active:scale-95 disabled:opacity-50"
            >
              <Trash2 size={15} />
              <span>Clear Cart</span>
            </button>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Items List */}
          <div className="space-y-4 lg:col-span-8">
            {items.map((item) => {
              const product = item.product;
              const productId = product._id || product.id;

              return (
                <div
                  key={item._id}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-indigo-100 sm:flex-row sm:items-center sm:gap-6 sm:p-5"
                >
                  {/* Image */}
                  <div className="relative aspect-square h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 sm:h-28 sm:w-28">
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                        {product.category?.name || "Product"}
                      </span>
                      <Link
                        href={`/productDetails/${productId}`}
                        className="mt-1 block text-base font-bold text-slate-900 transition hover:text-indigo-600"
                      >
                        {product.title}
                      </Link>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
                      {/* Price */}
                      <div>
                        <span className="text-lg font-black text-slate-900">
                          ${item.price}
                        </span>
                        {item.count > 1 && (
                          <span className="ml-2 text-xs text-slate-400">
                            (${item.price} each)
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 items-center rounded-xl border border-slate-200 bg-slate-50">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantityAction(productId, item.count - 1)
                            }
                            disabled={isActionLoading}
                            className="flex h-full w-9 items-center justify-center text-slate-500 transition hover:text-indigo-600 disabled:opacity-40"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={15} />
                          </button>
                          <span className="flex w-9 justify-center text-xs font-bold text-slate-900">
                            {item.count}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantityAction(productId, item.count + 1)
                            }
                            disabled={isActionLoading}
                            className="flex h-full w-9 items-center justify-center text-slate-500 transition hover:text-indigo-600 disabled:opacity-40"
                            aria-label="Increase quantity"
                          >
                            <Plus size={15} />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => removeItemAction(productId)}
                          disabled={isActionLoading}
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-black text-slate-900">
                Order Summary
              </h2>

              <div className="mt-5 space-y-3.5 border-b border-slate-100 pb-5 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">
                    ${totalCartPrice}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-emerald-600">Free</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Taxes</span>
                  <span className="text-xs text-slate-400">
                    Calculated at checkout
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between text-base font-black text-slate-900">
                <span>Total</span>
                <span className="text-2xl font-black text-indigo-600">
                  ${totalCartPrice}
                </span>
              </div>
              <Link href="/checkout">
                <button type="button">
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={17} />
                </button>
              </Link>
              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span>Secure Checkout with 100% Protection</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
