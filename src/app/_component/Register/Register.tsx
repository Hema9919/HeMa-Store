"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  User,
  UserPlus,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  registerSchema,
  type RegisterFormData,
} from "@/schemas/registerShema";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      toast.success("Account created successfully! 🎉");

      reset();

      // هنا بعد كده ممكن تعمل redirect للـ login
      // router.push("/login");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
       

          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
  Create Account
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Join HeMa Store and start your shopping journey.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Full Name
              </label>

              <div className="relative">
                <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  placeholder="Ahmed Abd Al-Muti"
                  {...register("name")}
                  className={`h-12 w-full rounded-xl border bg-slate-50 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
                    errors.name
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10"
                  }`}
                />
              </div>

              {errors.name && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className={`h-12 w-full rounded-xl border bg-slate-50 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
                    errors.email
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10"
                  }`}
                />
              </div>

              {errors.email && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Phone Number
              </label>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="tel"
                  placeholder="01012345678"
                  {...register("phone")}
                  className={`h-12 w-full rounded-xl border bg-slate-50 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
                    errors.phone
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10"
                  }`}
                />
              </div>

              {errors.phone && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className={`h-12 w-full rounded-xl border bg-slate-50 pl-12 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
                    errors.password
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Confirm Password
              </label>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type={showRePassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("rePassword")}
                  className={`h-12 w-full rounded-xl border bg-slate-50 pl-12 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
                    errors.rePassword
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowRePassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  {showRePassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {errors.rePassword && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.rePassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login */}
          <div className="mt-6 border-t border-slate-100 pt-6 text-center">
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-indigo-600 transition hover:text-indigo-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}