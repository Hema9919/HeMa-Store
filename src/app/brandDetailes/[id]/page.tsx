import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Tag,
} from "lucide-react";

import { getBrand } from "@/api/services/brandsApi";

interface BrandDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Brand({
  params,
}: BrandDetailsProps) {
  const { id } = await params;

  const brand = await getBrand(id);

  if (!brand) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
            <Tag className="h-7 w-7 text-red-500" />
          </div>

          <h1 className="mt-5 text-3xl font-black text-slate-900">
            Brand Not Found
          </h1>

          <p className="mt-3 text-slate-500">
            We couldn't find the brand you're looking for.
          </p>

          <Link
            href="/brands"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-500"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Brands
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link
            href="/"
            className="transition hover:text-indigo-600"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href="/brands"
            className="transition hover:text-indigo-600"
          >
            Brands
          </Link>

          <span>/</span>

          <span className="font-medium text-slate-900">
            {brand.name}
          </span>
        </div>
      </div>

      {/* Brand Hero */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 shadow-2xl">
          {/* Background Glow */}
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />

          <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[120px]" />

          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:60px_60px]" />

          <div className="relative z-10 grid items-center gap-10 px-6 py-14 sm:px-10 lg:grid-cols-2 lg:px-16 lg:py-20">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-300 backdrop-blur-md">
                <Sparkles className="h-4 w-4" />
                Featured Brand
              </div>

              <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                {brand.name}
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
                Explore the latest collection from{" "}
                <span className="font-semibold text-white">
                  {brand.name}
                </span>{" "}
                available at HeMa Store.
              </p>

              <Link
                href={`/shop?brand=${brand._id}`}
                className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-500"
              >
                <ShoppingBag className="h-5 w-5" />

                Shop {brand.name}

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Brand Logo */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative flex h-64 w-64 items-center justify-center rounded-[2rem] border border-white/10 bg-white p-10 shadow-2xl sm:h-80 sm:w-80">
                <div className="absolute inset-4 rounded-[1.5rem] border border-slate-100" />

                <div className="relative h-full w-full">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    priority
                    sizes="320px"
                    className="object-contain p-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Info */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
              <Tag className="h-5 w-5 text-indigo-600" />
            </div>

            <h3 className="mt-4 font-bold text-slate-900">
              Official Collection
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Browse products from the {brand.name} collection.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
              <ShoppingBag className="h-5 w-5 text-indigo-600" />
            </div>

            <h3 className="mt-4 font-bold text-slate-900">
              Easy Shopping
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Find your favorite products in just a few clicks.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
              <Sparkles className="h-5 w-5 text-indigo-600" />
            </div>

            <h3 className="mt-4 font-bold text-slate-900">
              Discover More
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Explore more collections available at HeMa Store.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}