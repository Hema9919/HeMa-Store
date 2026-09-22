import Image from "next/image";

export default function Loading() {
  return (
    <main className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-slate-950">
      
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />

      {/* Decorative circles */}
      <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-500/10" />

      <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-500/5" />

      {/* Main Loader */}
      <div className="relative flex flex-col items-center">

        {/* Rotating Ring */}
        <div className="absolute -inset-10 animate-[spin_5s_linear_infinite] rounded-full border border-transparent border-t-indigo-500/80 border-r-indigo-500/20" />

        {/* Second Ring */}
        <div className="absolute -inset-6 animate-[spin_3s_linear_infinite_reverse] rounded-full border border-transparent border-b-indigo-400/60" />

        {/* Logo Container */}
        <div className="relative flex h-32 w-32 items-center justify-center">

          {/* Glow */}
          <div className="absolute inset-0 animate-pulse rounded-full bg-indigo-500/20 blur-2xl" />

          {/* Logo Background */}
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-white p-4 shadow-2xl shadow-indigo-500/20">
            <Image
              src="/assets/HeMa.png"
              alt="HeMa Store"
              width={180}
              height={100}
              priority
              className="h-auto w-full object-contain"
            />
          </div>

        </div>

        {/* Brand */}
        <div className="mt-12 text-center">

          <h1 className="text-2xl font-black tracking-[0.25em] text-white">
            HEMA
          </h1>

          <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.35em] text-slate-500">
            Store
          </p>

        </div>

        {/* Loading Bar */}
        <div className="mt-8 w-48">

          <div className="h-1 overflow-hidden rounded-full bg-white/10">

            <div className="h-full w-1/2 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400" />

          </div>

          <p className="mt-3 text-center text-[11px] font-medium tracking-wider text-slate-500">
            Loading your experience...
          </p>

        </div>

        {/* Floating dots */}
        <div className="mt-5 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-300" />
        </div>

      </div>

      {/* Bottom text */}
      <div className="absolute bottom-8 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-slate-700">
          Premium Shopping Experience
        </p>
      </div>



    </main>
  );
}