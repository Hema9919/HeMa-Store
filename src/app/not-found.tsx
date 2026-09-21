"use client"
import React from "react";

import { ArrowLeft, Home, Search } from "lucide-react";
import Link from "next/link";

export default function Notfound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl text-center">

        {/* 404 */}
        <div className="relative mb-8">
          <h1 className="text-[140px] sm:text-[180px] font-black leading-none tracking-tighter text-slate-900">
            404
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="mt-6 rounded-full bg-indigo-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-200">
              Oops!
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-xl">
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900">
            Looks like you're lost
          </h2>

          <p className="mt-4 text-base sm:text-lg leading-8 text-slate-500">
            The page you're looking for doesn't exist or may have been moved.
            Let's get you back to shopping.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">

          <button
            onClick={() => window.history.back()}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

          <Link
            href="/"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
          >
            <Home size={18} />
            Back to Home
          </Link>

        </div>

        {/* Search suggestion */}
        <div className="mx-auto mt-12 max-w-md">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
            <Search className="ml-3 shrink-0 text-slate-400" size={20} />

            <input
              type="text"
              placeholder="Search for products..."
              className="min-w-0 flex-1 bg-transparent px-1 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />

            <button className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Search
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}