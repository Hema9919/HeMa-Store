import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  ShoppingBag,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/20">
                <ShoppingBag className="h-5 w-5" />
              </div>

              <span className="text-2xl font-black tracking-tight">
                HeMa
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
              Discover a carefully selected collection of fashion,
              shoes and accessories designed to make your style stand
              out.
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Phone className="h-4 w-4 text-indigo-400" />
                <span>+20 100 000 0000</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Mail className="h-4 w-4 text-indigo-400" />
                <span>hello@hemastore.com</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-400">
                <MapPin className="h-4 w-4 text-indigo-400" />
                <span>Egypt</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-slate-400 transition hover:text-indigo-400"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/shop"
                  className="text-sm text-slate-400 transition hover:text-indigo-400"
                >
                  Shop
                </Link>
              </li>

              <li>
                <Link
                  href="/categories"
                  className="text-sm text-slate-400 transition hover:text-indigo-400"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  href="/brands"
                  className="text-sm text-slate-400 transition hover:text-indigo-400"
                >
                  Brands
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Follow Us
            </h3>

            <p className="mt-5 text-sm leading-6 text-slate-400">
              Follow HeMa and stay updated with our latest products
              and collections.
            </p>

        
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-white/10" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} HeMa Store. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-xs text-slate-500">
            Made with
            <span className="text-red-500">♥</span>
            by
            <span className="font-bold text-indigo-400">
              HeMa
            </span>
          </p>

          <Link
            href="/shop"
            className="group flex items-center gap-1 text-xs font-semibold text-slate-400 transition hover:text-indigo-400"
          >
            Start Shopping
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}