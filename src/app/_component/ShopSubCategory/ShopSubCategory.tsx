import MainTitle from "./../Maintitle/MainTitle";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getShopSubCategories } from "@/api/services/subcategories";

export default async function ShopSubCategory() {
  const Subcategories = await getShopSubCategories();

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <MainTitle
          title="Shop Sub Categories"
          subtitle="Discover our handpicked selection of Sub categories"
        />

        {/* Sub Categories */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Subcategories.map((category) => (
            <Link
              key={category._id}
              href={`/subcategoryDetailes/${category._id}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-950 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-900/20"
            >
              {/* Decorative Background */}
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl transition-transform duration-700 group-hover:scale-150" />

              <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-indigo-400/20 blur-3xl transition-transform duration-700 group-hover:scale-125" />

              {/* Big Initial */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[100px] font-black uppercase leading-none text-white/10 transition-all duration-500 group-hover:scale-110 group-hover:text-white/15">
                  {category.name.charAt(0)}
                </span>
              </div>

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

        {/* Empty State */}
        {Subcategories.length === 0 && (
          <div className="flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white">
            <p className="text-sm text-slate-500">
              No categories available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
