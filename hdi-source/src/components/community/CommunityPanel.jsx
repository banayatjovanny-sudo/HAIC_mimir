import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Clock,
  ExternalLink,
  FileText,
  Flame,
  MapPin,
  X,
} from "lucide-react";
import { getLevel } from "../../data/classification";
import { getCounty } from "../../data/counties";
import { formatTimestamp } from "../../lib/format";

export default function CommunityPanel({ community, onClose }) {
  if (!community) {
    return (
      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Community details</h2>
        <p className="mt-2 text-sm text-muted">
          Click a town marker to view provisional classification, incident notes,
          and a path to resource assessment.
        </p>
      </section>
    );
  }

  const level = getLevel(community.provisionalLevel);
  const county = getCounty(community.countyId);

  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">{community.name}</h2>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted">
            <MapPin size={14} />
            {community.island}, {county.name}
          </p>
        </div>
        {onClose ? (
          <button type="button" onClick={onClose} className="rounded-full p-1 hover:bg-slate-100" aria-label="Close details">
            <X size={18} />
          </button>
        ) : null}
      </div>

      <div
        className="mt-4 rounded-2xl px-4 py-3"
        style={{ background: level.bg, color: level.text }}
      >
        <p className="flex items-center gap-2 text-sm font-semibold">
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ background: level.color }}
          >
            {level.id === "unknown" ? "?" : level.id}
          </span>
          {level.fullLabel}
        </p>
        <p className="mt-1 text-xs">
          Provisional prototype classification — not an official warning.
        </p>
      </div>

      <div className="mt-4 space-y-3 text-sm">
        <p className="flex items-center gap-2 font-medium">
          <Flame size={16} className="text-orange-600" />
          {community.disasterType}
        </p>
        <p>
          <span className="font-semibold">Incident description. </span>
          {community.incidentDescription}
        </p>
        <p>
          <span className="font-semibold">Affected geographic area. </span>
          {community.affectedArea}
        </p>
        <div>
          <p className="font-semibold">Potential impacts on residents</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-muted">
            {community.potentialImpacts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold">Official source links</p>
          <ul className="mt-1 space-y-1">
            {community.sources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-forest hover:underline"
                >
                  {source.label}
                  <ExternalLink size={12} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="flex items-center gap-2 text-xs text-muted">
          <Clock size={14} />
          Last updated {formatTimestamp(community.lastUpdated)}
        </p>
      </div>

      <div className="mt-5 grid gap-2">
        <Link
          to={`/resource-planning?community=${community.id}&county=${community.countyId}`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-4 py-3 text-sm font-semibold text-white hover:bg-forest-dark"
        >
          View Resource Assessment
          <AlertTriangle size={16} />
        </Link>
        <Link
          to={`/resource-planning?community=${community.id}&county=${community.countyId}#coordination`}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold hover:bg-slate-50"
        >
          <FileText size={16} />
          Generate Planning Report
        </Link>
      </div>
    </section>
  );
}
