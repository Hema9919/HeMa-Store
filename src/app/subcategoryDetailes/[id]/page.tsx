import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Layers3,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

import { getSubCategory } from "@/api/services/subcategories";

interface SubCategoryDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export default async function SubcategoryDetails({
  params,
}: SubCategoryDetailsProps) {
  const { id } = await params;

  const subcategory: Subcategory = await getSubCategory(id);

  if (!subcategory) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
            <Layers3 className="h-7 w-7 text-red-500" />
          </div>

          <h1 className="mt-5 text-3xl font-black text-slate-900">
            Subcategory Not Found
          </h1>

          <p className="mt-3 text-slate-500">
            We couldn't find the subcategory you're looking for.
          </p>

          <Link
            href="/categories"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-500"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Categories
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ================= BREADCRUMB ================= */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link
            href="/"
            className="transition hover:text-indigo-600"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href="/categories"
            className="transition hover:text-indigo-600"
          >
            Categories
          </Link>

          <span>/</span>

          <span className="font-medium text-slate-900">
            {subcategory.name}
          </span>
        </div>
      </div>

      {/* ================= HERO ================= */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-16 shadow-2xl sm:px-10 lg:px-16 lg:py-24">
          {/* Background Glow */}
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />

          <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[120px]" />

          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:60px_60px]" />

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-300 backdrop-blur-md">
              <Sparkles className="h-4 w-4" />
              <span>HeMa Collection</span>
            </div>

            {/* Icon */}
            <div className="mx-auto mt-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
              <Layers3 className="h-9 w-9 text-indigo-400" />
            </div>

            {/* Title */}
            <h1 className="mt-7 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              {subcategory.name}
            </h1>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
              Explore our collection of{" "}
              <span className="font-semibold text-white">
                {subcategory.name}
              </span>{" "}
              and discover products selected just for you.
            </p>

            {/* Button */}
            <Link
              href={`/shop?subcategory=${subcategory._id}`}
              className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-500"
            >
              <ShoppingBag className="h-5 w-5" />

              Shop Collection

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= INFO CARDS ================= */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
              <Sparkles className="h-5 w-5 text-indigo-600" />
            </div>

            <h3 className="mt-4 font-bold text-slate-900">
              Curated Collection
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Discover products carefully selected for this collection.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
              <ShoppingBag className="h-5 w-5 text-indigo-600" />
            </div>

            <h3 className="mt-4 font-bold text-slate-900">
              Easy Shopping
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Browse the collection and find what fits your style.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
              <Layers3 className="h-5 w-5 text-indigo-600" />
            </div>

            <h3 className="mt-4 font-bold text-slate-900">
              Explore More
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Explore related products from our store.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}