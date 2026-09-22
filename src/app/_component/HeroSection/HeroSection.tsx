import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -left-32 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-purple-600/15 blur-[120px]" />

        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:60px_60px]" />
      </div>

      {/* Decorative circles */}
      <div className="absolute -right-32 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full border border-white/5" />
      <div className="absolute -right-20 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full border border-indigo-500/10" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* ================= LEFT ================= */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-300 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span>New Collection 2026</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              Style That
              <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
                Speaks For You.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
              Discover carefully selected fashion, shoes and accessories
              designed to make every look feel uniquely yours.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-indigo-600/30"
              >
                <ShoppingBag className="h-5 w-5" />

                Shop Now

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/categories"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                Explore Categories
              </Link>
            </div>

            {/* Trust stats */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-6">
              <div>
                <p className="text-xl font-bold text-white">10K+</p>
                <p className="mt-1 text-xs text-slate-500">
                  Happy Customers
                </p>
              </div>

              <div className="h-8 w-px bg-white/10" />

              <div>
                <p className="flex items-center gap-1 text-xl font-bold text-white">
                  4.9
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Customer Rating
                </p>
              </div>

              <div className="h-8 w-px bg-white/10" />

              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
                  <Truck className="h-4 w-4 text-emerald-400" />
                </div>

                <div>
                  <p className="text-sm font-bold text-white">
                    Fast Delivery
                  </p>
                  <p className="text-xs text-slate-500">
                    Across Egypt
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="relative flex min-h-[480px] items-center justify-center lg:min-h-[560px]">
            {/* Main glow */}
            <div className="absolute h-[320px] w-[320px] rounded-full bg-indigo-600/25 blur-[90px] sm:h-[400px] sm:w-[400px]" />

            {/* Main product circle */}
            <div className="relative flex h-[330px] w-[330px] items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm sm:h-[430px] sm:w-[430px]">
              {/* Inner ring */}
              <div className="absolute inset-5 rounded-full border border-indigo-400/10" />

              {/* Product image */}
              <div className="relative h-[280px] w-[280px] sm:h-[370px] sm:w-[370px]">
                <Image
              src="/assets/HeMa.png"
                  alt="Featured Product"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)] transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 640px) 280px, 370px"
                />
              </div>
            </div>

   

            {/* Floating sparkle */}
            <div className="absolute right-10 top-10 flex h-10 w-10 animate-pulse items-center justify-center rounded-full border border-indigo-400/20 bg-indigo-500/10">
              <Sparkles className="h-5 w-5 text-indigo-300" />
            </div>

          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
}