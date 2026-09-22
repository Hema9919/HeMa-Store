import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { getBrands } from "@/api/services/brandsApi";
import MainTitle from "../_component/Maintitle/MainTitle";

export default async function Brands() {
  const brands = await getBrands();

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
              <Sparkles className="h-4 w-4" />
              Our Brands
            </div>

            <MainTitle
              title="Explore Our Brands"
              subtitle="Discover products from brands we carefully selected for the HeMa Store."
            />
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {brands.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {brands.map((brand) => (
              <Link
                key={brand._id}
                href={`/brandDetailes/${brand._id}`}
                className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/10"
              >
                {/* Hover background */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Brand Image */}
                <div className="relative h-full w-full">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 16vw"
                    className="object-contain p-3 transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Arrow */}
                <div className="absolute right-3 top-3 flex h-8 w-8 translate-x-2 -translate-y-2 items-center justify-center rounded-full bg-indigo-600 text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </div>

                {/* Name */}
                <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-white/90 px-3 py-2 text-center shadow-sm backdrop-blur-sm">
                  <p className="truncate text-xs font-bold text-slate-800 sm:text-sm">
                    {brand.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white">
            <p className="text-sm text-slate-500">
              No brands available.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}