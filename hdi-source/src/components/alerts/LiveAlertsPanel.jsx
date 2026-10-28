import { useMemo, useState } from "react";
import { ExternalLink, RefreshCw, Waves } from "lucide-react";
import { DEMO_ALERTS, DISASTER_CATEGORIES } from "../../data/alerts";
import { getLevel } from "../../data/classification";
import { formatTimestamp } from "../../lib/format";

const FILTERS = ["All", ...DISASTER_CATEGORIES];

export default function LiveAlertsPanel({
  countyId,
  communityId,
  onViewDetails,
}) {
  const [filter, setFilter] = useState("All");

  const alerts = useMemo(() => {
    return DEMO_ALERTS.filter((alert) => {
      const countyOk = countyId ? alert.countyId === countyId : true;
      const communityOk = communityId ? alert.communityId === communityId : true;
      const categoryOk = filter === "All" || alert.category === filter;
      return countyOk && (communityId ? communityOk : true) && categoryOk;
    });
  }, [countyId, communityId, filter]);

  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Live Alerts</h2>
          <p className="text-xs text-amber-700">
            Simulated demonstration feed — not live NWS products
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-forest">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Demo
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {FILTERS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              filter === item
                ? "bg-forest text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <ul className="mt-4 space-y-3">
        {alerts.length === 0 ? (
          <li className="rounded-2xl bg-slate-50 p-4 text-sm text-muted">
            No demonstration alerts in this filter.
          </li>
        ) : (
          alerts.map((alert) => {
            const level = getLevel(alert.level);
            return (
              <li key={alert.id} className="rounded-2xl border border-slate-100 p-3">
                <div className="flex items-start gap-3">
                  <span
                    className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full text-white"
                    style={{ background: level.color }}
                  >
                    <Waves size={14} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{alert.title}</p>
                    <p className="text-xs text-muted">{alert.location}</p>
                    <p className="mt-1 text-xs font-medium" style={{ color: level.text }}>
                      {level.fullLabel} · {alert.severity}
                    </p>
                    <p className="text-xs text-muted">{formatTimestamp(alert.issuedAt)}</p>
                    <p className="text-xs text-muted">
                      Source: {alert.source} · {alert.status}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => onViewDetails?.(alert)}
                        className="rounded-full bg-forest-soft px-3 py-1 text-xs font-semibold text-forest"
                      >
                        View Details
                      </button>
                      <a
                        href={alert.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-forest hover:underline"
                      >
                        Official source
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            );
          })
        )}
      </ul>

      <p className="mt-4 inline-flex items-center gap-2 text-xs text-muted">
        <RefreshCw size={12} />
        Ready for National Weather Service API connection
      </p>
    </section>
  );
}
