import { getShopCategories } from "@/api/services/categoriesApi";
import MainTitle from "./../Maintitle/MainTitle";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";



export default async function ShopCategory() {
  const categories = await getShopCategories();


  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <MainTitle
          title="Shop Categories"
          subtitle="Discover our handpicked selection of categories"
        />

        {/* Categories */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/categoryDetailes/${category._id}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-200 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
            >
              {/* Image */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent transition-opacity duration-500 group-hover:from-indigo-950/90" />

              {/* Arrow */}
              <div className="absolute right-3 top-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight className="h-4 w-4" />
              </div>

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <div className="mb-2 h-1 w-7 rounded-full bg-indigo-400 transition-all duration-300 group-hover:w-12" />

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
        {categories.length === 0 && (
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