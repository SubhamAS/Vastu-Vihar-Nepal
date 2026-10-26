import { Inbox } from "lucide-react";

export default function AdminEmptyState({ title, description, compact = false }) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${compact ? "px-5 py-10" : "px-6 py-16"}`}>
      <span className="flex size-11 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <Inbox size={19} strokeWidth={1.8} />
      </span>
      <h3 className="mt-4 text-sm font-semibold text-slate-800">{title}</h3>
      <p className="mt-1.5 max-w-md text-xs leading-5 text-slate-500">{description}</p>
    </div>
  );
}
