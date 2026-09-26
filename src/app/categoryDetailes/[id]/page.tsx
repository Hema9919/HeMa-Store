import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShoppingBag,ArrowUpRight } from "lucide-react";
import { getCategory,getSubCate } from "@/api/services/categoriesApi";

interface CategoryDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CategoryDetails({
  params,
}: CategoryDetailsProps) {
  const { id } = await params;

  const category = await getCategory(id);
  const subcate = await getSubCate(id);
  if (!category) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-black text-slate-900">
            Category Not Found
          </h1>

          <p className="mt-3 text-slate-500">
            We couldn't find the category you're looking for.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-500"
          >
            <ArrowLeft className="h-4 w-4" />
            Back Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ================= BREADCRUMB ================= */}
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
            href="/categories"
            className="transition hover:text-indigo-600"
          >
            Categories
          </Link>

          <span>/</span>

          <span className="font-medium text-slate-900">
            {category.name}
          </span>
        </div>
      </div>

      {/* ================= HERO ================= */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="relative min-h-[500px] overflow-hidden rounded-[2rem] bg-slate-950 shadow-2xl">
          {/* Background Image */}
          <Image
            src={category.image}
            alt={category.name}
            fill
            priority
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="100vw"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-slate-950/10" />

          {/* Content */}
          <div className="relative flex min-h-[500px] items-center px-6 py-12 sm:px-10 lg:px-16">
            <div className="max-w-xl">
              {/* Label */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-300 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                HeMa Store
              </div>

              {/* Title */}
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                {category.name}
              </h1>

              {/* Description */}
              <p className="mt-5 max-w-lg text-base leading-7 text-slate-300 sm:text-lg">
                Explore our carefully selected collection of{" "}
                <span className="font-semibold text-white">
                  {category.name}
                </span>{" "}
                and discover products made to match your style.
              </p>

              {/* Button */}
              <Link
                href={`/shop?category=${category._id}`}
                className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-500"
              >
                <ShoppingBag className="h-5 w-5" />

                Shop {category.name}

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Decorative Glow */}
          <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-indigo-600/20 blur-[100px]" />
        </div>
      </section>

      {/* ================= SubCate ================= */}
<section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
  <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    {subcate.map((category) => (
      <Link
        key={category._id}
        href={`/subcategoryDetailes/${category._id}`}
        className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-950 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-900/20"
      >
        {/* Decorative Glow */}
        <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/10 blur-3xl transition-transform duration-700 group-hover:scale-150" />

        <div className="absolute -bottom-16 -left-12 h-44 w-44 rounded-full bg-indigo-400/20 blur-3xl transition-transform duration-700 group-hover:scale-125" />

        {/* Big Animated Letter */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <span className="select-none text-[110px] font-black uppercase leading-none text-white/10 transition-all duration-700 ease-out group-hover:scale-125 group-hover:-rotate-6 group-hover:text-white/20 sm:text-[130px]">
            {category.name.charAt(0)}
          </span>
        </div>

        {/* Extra Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />

        {/* Arrow */}
        <div className="absolute right-3 top-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <div className="mb-2 h-1 w-7 rounded-full bg-indigo-300 transition-all duration-300 group-hover:w-12" />

          <h3 className="text-base font-bold text-white sm:text-lg">
            {category.name}
          </h3>

          <p className="mt-1 flex items-center gap-1 text-xs text-white/60 transition-colors duration-300 group-hover:text-white/80">
            Explore Collection

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </p>
        </div>
      </Link>
    ))}
  </div>
</section>

      {/* ================= BOTTOM INFO ================= */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-bold text-slate-900">
              Carefully Selected
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Products selected with quality in mind.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-bold text-slate-900">
              Premium Experience
            </p>

            <p className="mt-1 text-sm text-slate-500">
              A smooth shopping experience from start to finish.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-bold text-slate-900">
              Find Your Style
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Explore the collection and find what fits you.
            </p>
          </div>
        </div>
      </section>


    </main>
  );
}