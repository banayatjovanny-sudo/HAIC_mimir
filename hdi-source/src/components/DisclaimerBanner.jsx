import { Info } from "lucide-react";

export default function DisclaimerBanner({ compact = false }) {
  return (
    <div
      className={`flex gap-3 rounded-2xl border border-sky-100 bg-sky-50/80 text-sm text-slate-700 ${
        compact ? "px-3 py-2" : "px-4 py-3"
      }`}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-700" />
      <p>
        This website is a prototype developed for the Hawaiʻi Annual Innovation
        Challenge. It is not an official emergency warning system. Always follow
        instructions from authorized emergency management agencies.
      </p>
    </div>
  );
}
