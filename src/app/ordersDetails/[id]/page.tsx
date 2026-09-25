"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  Phone,
  Truck,
} from "lucide-react";

import { getUserOrders } from "@/api/services/ordersApi";
import type { Order } from "@/api/types/orderTypes";

export default function OrderDetails() {
  const { data: session, status } = useSession();
  const params = useParams();

  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (status !== "authenticated") return;

      const userId = session?.user?.id;
      const token = session?.accessToken;

      if (!userId || !token || !orderId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        const orders = await getUserOrders(userId, token);

        const foundOrder = orders.find(
          (item) => item._id === orderId
        );

        if (!foundOrder) {
          toast.error("Order not found");
          setOrder(null);
          return;
        }

        setOrder(foundOrder);
      } catch (error) {
        console.error("Get order details error:", error);

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to load order"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [status, session, orderId]);

  if (status === "loading" || isLoading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading order...
          </p>
        </div>
      </main>
    );
  }

  if (status === "unauthenticated") {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="text-center">
          <Package
            size={48}
            className="mx-auto text-slate-300"
          />

          <h1 className="mt-5 text-2xl font-black text-slate-900">
            Please Login
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            You need to login to view your order.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="text-center">
          <Package
            size={48}
            className="mx-auto text-slate-300"
          />

          <h1 className="mt-5 text-2xl font-black text-slate-900">
            Order Not Found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            We couldn&apos;t find this order.
          </p>

          <Link
            href="/my-orders"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            <ArrowLeft size={16} />
            Back to Orders
          </Link>
        </div>
      </main>
    );
  }

  const formattedDate = new Date(
    order.createdAt
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = new Date(
    order.createdAt
  ).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Back */}
        <Link
          href="/my-orders"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-indigo-600"
        >
          <ArrowLeft size={17} />
          Back to My Orders
        </Link>

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
              Order Details
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
              Order #{order.id}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={16} />
                {formattedDate}
              </span>

              <span>{formattedTime}</span>
            </div>
          </div>

          {/* Order Status */}
          <div
            className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${
              order.isDelivered
                ? "bg-emerald-50 text-emerald-600"
                : "bg-amber-50 text-amber-600"
            }`}
          >
            {order.isDelivered ? (
              <>
                <CheckCircle2 size={16} />
                Delivered
              </>
            ) : (
              <>
                <Clock3 size={16} />
                Processing
              </>
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Products */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Package size={20} />
                </div>

                <div>
                  <h2 className="font-black text-slate-900">
                    Order Items
                  </h2>

                  <p className="text-sm text-slate-500">
                    {order.cartItems.length}{" "}
                    {order.cartItems.length === 1
                      ? "item"
                      : "items"}
                  </p>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {order.cartItems.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex gap-4 py-5 first:pt-0 last:pb-0"
                  >
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="h-24 w-24 rounded-xl object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 font-bold text-slate-900">
                        {item.product.title}
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        Quantity:{" "}
                        <span className="font-bold text-slate-700">
                          {item.count}
                        </span>
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Price:{" "}
                        <span className="font-bold text-slate-700">
                          {item.price.toLocaleString()} EGP
                        </span>
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="font-black text-slate-900">
                        {(item.price * item.count).toLocaleString()}{" "}
                        EGP
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Shipping Address */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <MapPin size={20} />
                </div>

                <div>
                  <h2 className="font-black text-slate-900">
                    Shipping Address
                  </h2>

                  <p className="text-sm text-slate-500">
                    Delivery information
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="font-bold text-slate-900">
                  {order.shippingAddress.city}
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {order.shippingAddress.details}
                </p>

                <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                  <Phone size={15} />
                  {order.shippingAddress.phone}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Payment */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Truck size={20} />
                </div>

                <div>
                  <h2 className="font-black text-slate-900">
                    Payment
                  </h2>

                  <p className="text-sm text-slate-500">
                    Payment information
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="text-sm text-slate-500">
                  Method
                </span>

                <span className="font-bold capitalize text-slate-900">
                  {order.paymentMethodType}
                </span>
              </div>

              <div className="flex items-center justify-between pt-4">
                <span className="text-sm text-slate-500">
                  Payment Status
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    order.isPaid
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Unpaid"}
                </span>
              </div>
            </section>

            {/* Summary */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-black text-slate-900">
                Order Summary
              </h2>

              <div className="mt-5 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Subtotal
                  </span>

                  <span className="font-bold text-slate-900">
                    {(
                      order.totalOrderPrice -
                      order.shippingPrice -
                      order.taxPrice
                    ).toLocaleString()}{" "}
                    EGP
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Shipping
                  </span>

                  <span className="font-bold text-slate-900">
                    {order.shippingPrice.toLocaleString()} EGP
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Tax
                  </span>

                  <span className="font-bold text-slate-900">
                    {order.taxPrice.toLocaleString()} EGP
                  </span>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900">
                      Total
                    </span>

                    <span className="text-xl font-black text-indigo-600">
                      {order.totalOrderPrice.toLocaleString()} EGP
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Back Button */}
            <Link
              href="/my-orders"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3.5 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
            >
              <ArrowLeft size={16} />
              Back to My Orders
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}