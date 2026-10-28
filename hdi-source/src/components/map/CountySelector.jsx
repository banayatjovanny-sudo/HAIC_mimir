import { COUNTIES } from "../../data/counties";
import IslandSilhouette from "../IslandSilhouette";

const ISLAND_KEY = {
  honolulu: "oahu",
  maui: "maui",
  hawaii: "hawaii",
  kauai: "kauai",
};

export default function CountySelector({ value, onChange, variant = "cards" }) {
  if (variant === "pills") {
    return (
      <div className="grid gap-3 sm:grid-cols-4">
        {COUNTIES.map((county) => {
          const active = county.id === value;
          return (
            <button
              key={county.id}
              type="button"
              onClick={() => onChange(county.id)}
              className={`flex items-center justify-center gap-3 rounded-2xl px-4 py-4 text-sm font-semibold shadow-sm transition ${
                active
                  ? "bg-forest text-white"
                  : "bg-white text-ink ring-1 ring-slate-100 hover:ring-forest/30"
              }`}
            >
              <IslandSilhouette
                island={ISLAND_KEY[county.id]}
                className={`h-8 w-8 ${active ? "text-white/90" : "text-slate-400"}`}
              />
              {county.shortName}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {COUNTIES.map((county) => {
        const active = county.id === value;
        return (
          <button
            key={county.id}
            type="button"
            onClick={() => onChange(county.id)}
            className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
              active
                ? "border-forest bg-white shadow-sm ring-2 ring-forest/20"
                : "border-transparent bg-white/80 hover:border-forest/20"
            }`}
          >
            <IslandSilhouette
              island={ISLAND_KEY[county.id]}
              className={`h-9 w-9 ${active ? "text-forest" : "text-slate-400"}`}
            />
            <span>
              <span className="block text-sm font-semibold text-ink">
                {county.islandLabel}
              </span>
              <span className="block text-xs text-muted">{county.subtitle}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
