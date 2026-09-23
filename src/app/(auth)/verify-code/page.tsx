"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, Key, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { verifyResetCode } from "@/api/services/authPasswordApi";

function VerifyCodeForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [resetCode, setResetCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetCode) {
      toast.error("Please enter the verification code");
      return;
    }

    try {
      setIsSubmitting(true);
      await verifyResetCode({ resetCode });
      toast.success("Code verified! Set your new password");
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      toast.error(err.message || "Invalid or expired reset code");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            6-Digit Reset Code
          </label>
          <div className="relative">
            <Key className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              maxLength={6}
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value.trim())}
              placeholder="e.g. 535863"
              required
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-center font-mono text-lg font-bold tracking-widest text-slate-900 outline-none transition placeholder:font-sans placeholder:text-sm placeholder:tracking-normal placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>
          {email && (
            <p className="mt-2 text-xs text-slate-400">
              Code was sent to: <span className="font-semibold text-slate-700">{email}</span>
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 active:scale-[0.99] disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Verifying code...</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={18} />
              <span>Verify Code</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-6 border-t border-slate-100 pt-5 text-center">
        <Link
          href="/forgot-password"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 transition hover:text-indigo-600"
        >
          <ArrowLeft size={14} />
          <span>Resend code or change email</span>
        </Link>
      </div>
    </div>
  );
}

export default function VerifyCodePage() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <Key size={28} />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Verify Code
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Enter the 6-digit verification code sent to your email inbox.
          </p>
        </div>

        <Suspense fallback={<div className="text-center text-slate-500">Loading...</div>}>
          <VerifyCodeForm />
        </Suspense>
      </div>
    </main>
  );
}
