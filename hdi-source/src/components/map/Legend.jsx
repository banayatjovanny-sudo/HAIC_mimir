import { LEVEL_LIST } from "../../data/classification";

export default function Legend({ compact = false }) {
  if (compact) {
    return (
      <div className="rounded-2xl bg-white/95 p-4 shadow-lg">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          Disaster Level
        </p>
        <div className="flex flex-wrap gap-3">
          {LEVEL_LIST.map((level) => (
            <span key={level.key} className="inline-flex items-center gap-1.5 text-xs">
              <span
                className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{ background: level.color }}
              >
                {level.id === "unknown" ? "?" : level.id}
              </span>
              {level.label}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <aside className="rounded-3xl bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold">Disaster Level Classification</h2>
      <ul className="mt-4 space-y-4">
        {LEVEL_LIST.map((level) => (
          <li key={level.key} className="flex gap-3">
            <span
              className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{ background: level.color }}
            >
              {level.id === "unknown" ? "?" : level.id}
            </span>
            <span>
              <span className="block text-sm font-semibold">{level.fullLabel}</span>
              <span className="block text-xs leading-5 text-muted">
                {level.description}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
