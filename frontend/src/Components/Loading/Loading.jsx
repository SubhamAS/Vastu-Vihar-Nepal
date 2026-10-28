const Loading = ({ label = "Loading…", fullScreen = false, className = "" }) => (
  <div
    className={`flex flex-col items-center justify-center gap-4 text-brand ${
      fullScreen ? "min-h-svh bg-white" : "py-10"
    } ${className}`}
    role="status"
    aria-live="polite"
  >
    <span className="relative grid size-12 place-items-center" aria-hidden="true">
      <span className="absolute inset-0 rounded-full border border-brand/15" />
      <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-border-dark motion-reduce:animate-none" />
      <span className="font-display text-xl text-brand">V</span>
    </span>
    <span className="text-xs font-medium tracking-[0.12em] text-muted">
      {label}
    </span>
  </div>
);

export default Loading;
