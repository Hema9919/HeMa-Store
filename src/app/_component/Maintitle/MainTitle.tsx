interface MainTitleProps {
  title: string;
  subtitle?: string;
}

export default function MainTitle({
  title,
  subtitle,
}: MainTitleProps) {
  return (
    <div className="mb-8 flex flex-col items-center text-center">
      
      {/* Small Label */}
      <div className="mb-3 flex items-center gap-2">
        <span className="h-px w-8 bg-indigo-600" />

        <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
          HeMa Store
        </span>

        <span className="h-px w-8 bg-indigo-600" />
      </div>

      {/* Main Title */}
      <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          {subtitle}
        </p>
      )}

      {/* Accent */}
      <div className="mt-5 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
        <span className="h-1.5 w-8 rounded-full bg-indigo-600" />
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
      </div>
    </div>
  );
}