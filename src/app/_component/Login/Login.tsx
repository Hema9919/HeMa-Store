"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, LogIn, Mail, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

import { loginSchema, type LoginFormData } from "@/schemas/loginSchema";
import { userLogin } from "@/api/actions/auth.action";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await userLogin(data);

      if (result) {
        toast.success("Logged in successfully! 🎉");
        router.push("/");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Invalid email or password",
      );
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
            <LogIn className="h-8 w-8" />
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Login to your HeMa Store account and continue shopping.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-sm font-semibold text-slate-700">
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  Forgot Password?
                </Link>
              </div>

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
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
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

            {/* Remember Info */}
            <div className="flex items-start gap-3 rounded-xl bg-indigo-50 p-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />

              <p className="text-xs leading-5 text-indigo-700">
                Your account information is securely handled by HeMa Store.
              </p>
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
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Register */}
          <div className="mt-6 border-t border-slate-100 pt-6 text-center">
            <p className="text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-indigo-600 transition hover:text-indigo-500"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
