"use client";

import Link from "next/link";
import {
  CheckCircle2,
  ShoppingBag,
  Package,
  ArrowRight,
} from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-2xl text-center">

        {/* Success Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2
            size={56}
            className="text-emerald-500"
          />
        </div>

        {/* Heading */}
        <h1 className="mt-8 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Order Placed Successfully!
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
          Thank you for your purchase. Your order has been
          received successfully and will be processed soon.
        </p>

        {/* Info Card */}
        <div className="mx-auto mt-8 max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4 text-left">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Package size={21} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                What happens next?
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                We&apos;ll prepare your order and deliver it
                to the shipping address you provided.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

          <Link
            href="/my-orders"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 active:scale-95"
          >
            <Package size={17} />
            <span>View My Orders</span>
          </Link>

          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600 active:scale-95"
          >
            <ShoppingBag size={17} />
            <span>Continue Shopping</span>
            <ArrowRight size={16} />
          </Link>

        </div>

      </div>
    </main>
  );
}