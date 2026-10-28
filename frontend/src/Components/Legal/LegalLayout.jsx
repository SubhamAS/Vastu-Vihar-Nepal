export default function LegalLayout({ eyebrow, title, updated, intro, children }) {
  return (
    <main className="min-h-screen bg-white px-5 pb-20 pt-24 sm:px-8 lg:px-16">
      <article className="mx-auto max-w-4xl py-10 sm:py-14 lg:py-20">
        <header className="mb-12 border-b border-border-light pb-9 sm:mb-14">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-highlight-hover">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-display text-4xl font-light leading-tight text-brand sm:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            {intro}
          </p>
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
            Last updated: {updated}
          </p>
        </header>
        <div className="space-y-10 text-sm leading-7 text-slate-700 sm:text-base">
          {children}
        </div>
      </article>
    </main>
  );
}
