export default function PageHeader({ title, subtitle, badge }: { title: string; subtitle?: string; badge?: string }) {
  return (
    <section className="relative pt-32 lg:pt-40 pb-12 lg:pb-16 bg-gradient-warm overflow-hidden">
      <div className="absolute top-20 right-0 w-96 h-96 bg-brand-300 rounded-full blur-[100px] opacity-40" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-deep-200 rounded-full blur-[100px] opacity-30" />
      <div className="container relative text-center max-w-3xl">
        {badge && (
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-700 px-4 py-1.5 rounded-full text-xs font-medium mb-5 animate-fade-down">
            {badge}
          </div>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink-900 tracking-tight mb-4 animate-fade-up">{title}</h1>
        {subtitle && <p className="text-ink-600 text-base md:text-lg animate-fade-up" style={{ animationDelay: '100ms' }}>{subtitle}</p>}
      </div>
    </section>
  );
}
