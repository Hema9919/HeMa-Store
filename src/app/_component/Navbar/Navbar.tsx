"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

import {
  ShoppingCart,
  Heart,
  Menu,
  X,
  Phone,
  MapPin,
  User,
  LogOut,
  Box,
} from "lucide-react";

type NavLink = {
  name: string;
  href: string;
};
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const pathname = usePathname();

  const navLinks: NavLink[] = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Categories",
      href: "/categories",
    },
    {
      name: "Shop",
      href: "/shop",
    },
    {
      name: "Brands",
      href: "/brands",
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      {/* ================= TOP BAR ================= */}

      <div className="hidden border-b border-slate-100 bg-slate-950 text-slate-300 md:block">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6 text-xs">
          {/* Contact */}

          <div className="flex items-center gap-5">
            <a
              href="tel:+201000000000"
              className="flex items-center gap-2 transition hover:text-white"
            >
              <Phone size={14} />

              <span>+20 100 000 0000</span>
            </a>

            <span className="h-4 w-px bg-slate-700" />

            <div className="flex items-center gap-2">
              <MapPin size={14} />

              <span>Cairo, Egypt</span>
            </div>
          </div>

          {/* Auth */}

          <div className="flex items-center gap-4">
            {status === "authenticated" ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/profile"
                  className="flex items-center gap-1.5 font-medium text-white transition hover:text-indigo-400"
                >
                  <User size={13} />
                  <span>Hi, {session?.user?.name || "My Account"}</span>
                </Link>
                <span className="text-slate-700">|</span>
                <Link
                  className="flex items-center gap-1.5 font-medium text-white transition hover:text-indigo-400"
                  href="/my-orders"
                >
                  <Box size={13} />
                  <span>My Orders</span>
                </Link>
                <span className="text-slate-700">|</span>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="flex items-center gap-1 text-slate-300 transition hover:text-red-400"
                >
                  <LogOut size={13} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="transition hover:text-white">
                  Login
                </Link>

                <span className="text-slate-700">|</span>

                <Link
                  href="/register"
                  className="font-semibold text-white transition hover:text-indigo-400"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ================= MAIN NAVBAR ================= */}

      <div className="border-b border-slate-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6">
          {/* ================= LOGO ================= */}

          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/assets/HeMa.png"
              alt="HeMa Store"
              width={240}
              height={120}
              priority
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* ================= DESKTOP NAVIGATION ================= */}

          <nav className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative py-3 text-sm font-semibold
                    transition-all duration-300
                    ${
                      active
                        ? "text-indigo-600"
                        : "text-slate-600 hover:text-indigo-600"
                    }
                  `}
                >
                  {link.name}

                  {/* Active Line */}

                  <span
                    className={`
                      absolute -bottom-1 left-1/2 h-0.5
                      -translate-x-1/2 rounded-full
                      bg-indigo-600
                      transition-all duration-300
                      ${active ? "w-full opacity-100" : "w-0 opacity-0"}
                    `}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ================= ACTIONS ================= */}

          <div className="flex items-center gap-2">
            {/* Wishlist */}

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className={`
                group relative flex h-12 w-12
                items-center justify-center
                rounded-full
                transition-all duration-300
                ${
                  pathname.startsWith("/wishlist")
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                }
              `}
            >
              <Heart
                size={22}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:scale-110"
              />

              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-indigo-600 px-1 text-[9px] font-bold text-white">
                {wishlistCount}
              </span>
            </Link>

            {/* Cart */}

            <Link
              href="/cart"
              aria-label="Shopping Cart"
              className={`
                group relative flex h-12 w-12
                items-center justify-center
                rounded-full
                transition-all duration-300
                ${
                  pathname.startsWith("/cart")
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                }
              `}
            >
              <ShoppingCart
                size={22}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:scale-110"
              />

              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-indigo-600 px-1 text-[9px] font-bold text-white">
                {cartCount}
              </span>
            </Link>

            {/* Mobile Menu */}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-1 flex h-12 w-12 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100 md:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}

      {isMenuOpen && (
        <div className="border-b border-slate-100 bg-white shadow-lg md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-4">
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    rounded-xl px-4 py-3
                    font-semibold
                    transition-all duration-300
                    ${
                      active
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                    }
                  `}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile Auth */}

            <div className="mt-3 border-t border-slate-100 pt-3">
              {status === "authenticated" ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <User size={18} className="text-indigo-600" />
                    <span>My Profile ({session?.user?.name || "Account"})</span>
                  </Link>
                  <Link
                    className="flex items-center gap-2 rounded-xl px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                    href="/my-orders"
                  >
                    <Box  size={18} className="text-indigo-600" />
                    <span>My Orders</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      signOut({ callbackUrl: "/login" });
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-4 py-3 font-semibold text-red-500 hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                      block rounded-xl px-4 py-3
                      font-medium transition
                      ${
                        pathname === "/login"
                          ? "bg-indigo-50 text-indigo-600"
                          : "text-slate-700 hover:bg-slate-50"
                      }
                    `}
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                      block rounded-xl px-4 py-3
                      font-semibold transition
                      ${
                        pathname === "/register"
                          ? "bg-indigo-50 text-indigo-600"
                          : "text-indigo-600 hover:bg-indigo-50"
                      }
                    `}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
