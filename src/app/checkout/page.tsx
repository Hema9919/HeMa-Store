"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  MapPin,
  Phone,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import { createCashOrder } from "@/api/services/ordersApi";

export default function CheckoutPage() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const {
    cart,
    cartCount,
    totalCartPrice,
    isLoading: isCartLoading,
    clearCartAction,
  } = useCart();

  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Cairo");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = session?.accessToken;

  const items = cart?.products || [];

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!token) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }

    if (!cart?._id) {
      toast.error("Your cart is empty");
      return;
    }

    if (!details.trim()) {
      toast.error("Please enter your address");
      return;
    }

    if (!phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    if (!city.trim()) {
      toast.error("Please enter your city");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await createCashOrder(
        cart._id,
        token,
        {
          details: details.trim(),
          phone: phone.trim(),
          city: city.trim(),
        }
      );

      console.log("ORDER CREATED:", response);

      const cartCleared = await clearCartAction();

      if (!cartCleared) {
        console.warn(
          "Order created but cart could not be cleared"
        );
      }

      toast.success("Order placed successfully!");

      router.push("/order-success");
    } catch (error) {
      console.error("Create order error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to place order"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading" || isCartLoading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />

          <p className="text-sm font-medium text-slate-500">
            Loading checkout...
          </p>
        </div>
      </main>
    );
  }

  if (status === "unauthenticated") {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600">
            <ShoppingBag size={36} />
          </div>

          <h1 className="mt-6 text-2xl font-black text-slate-900">
            Please Sign In
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            You need to login before completing your order.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
          >
            Login
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600">
            <ShoppingBag size={36} />
          </div>

          <h1 className="mt-6 text-2xl font-black text-slate-900">
            Your Cart is Empty
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Add some products to your cart before checkout.
          </p>

          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
          >
            Continue Shopping
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
          >
            <ArrowLeft size={16} />
            Back to Cart
          </Link>

          <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Complete your shipping information to place your order.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-8 lg:grid-cols-12"
        >
          {/* Shipping Information */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <MapPin size={20} />
                </div>

                <div>
                  <h2 className="text-lg font-black text-slate-900">
                    Shipping Information
                  </h2>

                  <p className="text-sm text-slate-500">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-5">
                {/* Address */}
                <div>
                  <label
                    htmlFor="details"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Full Address
                  </label>

                  <textarea
                    id="details"
                    value={details}
                    onChange={(event) =>
                      setDetails(event.target.value)
                    }
                    placeholder="Enter your full address..."
                    rows={4}
                    disabled={isSubmitting}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Phone Number
                    </label>

                    <div className="relative">
                      <Phone
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(event) =>
                          setPhone(event.target.value)
                        }
                        placeholder="010xxxxxxxx"
                        disabled={isSubmitting}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50 disabled:cursor-not-allowed disabled:opacity-60"
                      />
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label
                      htmlFor="city"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      City
                    </label>

                    <input
                      id="city"
                      type="text"
                      value={city}
                      onChange={(event) =>
                        setCity(event.target.value)
                      }
                      placeholder="Cairo"
                      disabled={isSubmitting}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-black text-slate-900">
                Order Summary
              </h2>

              <div className="mt-5 space-y-4 border-b border-slate-100 pb-5">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>
                    {cartCount}{" "}
                    {cartCount === 1 ? "Item" : "Items"}
                  </span>

                  <span className="font-bold text-slate-900">
                    ${totalCartPrice}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-slate-600">
                  <span>Shipping</span>

                  <span className="font-bold text-emerald-600">
                    Free
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-base font-black text-slate-900">
                  Total
                </span>

                <span className="text-2xl font-black text-indigo-600">
                  ${totalCartPrice}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    <span>Placing Order...</span>
                  </>
                ) : (
                  <>
                    <span>Place Order</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck
                  size={16}
                  className="text-emerald-500"
                />

                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}