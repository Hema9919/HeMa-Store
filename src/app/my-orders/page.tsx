"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Loader2,
  Package,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { getUserOrders } from "@/api/services/ordersApi";
import type { Order } from "@/api/types/orderTypes";

export default function MyOrdersPage() {
  const { data: session, status } = useSession();

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (status !== "authenticated") {
        return;
      }

      const userId = session?.user?.id;
      const token = session?.accessToken;

      if (!userId || !token) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        const response = await getUserOrders(userId, token);

        console.log("USER ORDERS:", response);

        setOrders(response);
      } catch (error) {
        console.error("Get orders error:", error);

        toast.error(
          error instanceof Error ? error.message : "Failed to load orders",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [status, session]);

  if (status === "loading" || isLoading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={40} className="animate-spin text-indigo-600" />

          <p className="text-sm font-medium text-slate-500">
            Loading your orders...
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
            <Package size={36} />
          </div>

          <h1 className="mt-6 text-2xl font-black text-slate-900">
            Sign In to View Your Orders
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Please login to your account to view your previous orders.
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

  if (orders.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600">
            <ShoppingBag size={36} />
          </div>

          <h1 className="mt-6 text-2xl font-black text-slate-900">
            No Orders Yet
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            You haven&apos;t placed any orders yet. Start shopping and your
            orders will appear here.
          </p>

          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
          >
            Start Shopping
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
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="mt-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600">
              <Package size={14} />
              <span>HeMa Store</span>
            </div>

            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              My Orders
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Track and view your previous orders.
            </p>
          </div>
        </div>
      </section>

      {/* Orders */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-5">
          {orders.map((order) => {
            const itemCount =
              order.cartItems?.reduce((total, item) => total + item.count, 0) ??
              0;

            const orderDate = new Date(order.createdAt).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              },
            );

            return (
              <div
                key={order._id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-100 sm:p-6"
              >
                {/* Top */}
                <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Package size={18} className="text-indigo-600" />

                      <span className="text-sm font-black text-slate-900">
                        Order #{order.id}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                      <CalendarDays size={14} />
                      <span>{orderDate}</span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Total
                    </p>

                    <p className="mt-1 text-xl font-black text-indigo-600">
                      ${order.totalOrderPrice}
                    </p>
                  </div>
                </div>

                {/* Info */}
                <div className="grid grid-cols-1 gap-4 py-5 sm:grid-cols-3">
                  {/* Items */}
                  <div className="rounded-xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <ShoppingBag size={16} />

                      <span className="text-xs font-semibold">Items</span>
                    </div>

                    <p className="mt-2 text-sm font-black text-slate-900">
                      {itemCount} {itemCount === 1 ? "item" : "items"}
                    </p>
                  </div>

                  {/* Payment */}
                  <div className="rounded-xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock3 size={16} />

                      <span className="text-xs font-semibold">Payment</span>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      {order.isPaid ? (
                        <>
                          <CheckCircle2
                            size={15}
                            className="text-emerald-500"
                          />

                          <span className="text-sm font-bold text-emerald-600">
                            Paid
                          </span>
                        </>
                      ) : (
                        <>
                          <Clock3 size={15} className="text-amber-500" />

                          <span className="text-sm font-bold text-amber-600">
                            Not Paid
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Delivery */}
                  <div className="rounded-xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Truck size={16} />

                      <span className="text-xs font-semibold">Delivery</span>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      {order.isDelivered ? (
                        <>
                          <CheckCircle2
                            size={15}
                            className="text-emerald-500"
                          />

                          <span className="text-sm font-bold text-emerald-600">
                            Delivered
                          </span>
                        </>
                      ) : (
                        <>
                          <Clock3 size={15} className="text-amber-500" />

                          <span className="text-sm font-bold text-amber-600">
                            Processing
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom */}
                <div className="flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs text-slate-400">
                    Payment Method:{" "}
                    <span className="font-bold capitalize text-slate-600">
                      {order.paymentMethodType}
                    </span>
                  </div>

                  <Link
                    className="mt-6 w-80 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 active:scale-95"
                    href={`/ordersDetails/${order._id}`}
                  >
                    View Order
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
