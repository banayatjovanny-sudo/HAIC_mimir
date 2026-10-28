import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Bus,
  ClipboardList,
  HeartPulse,
  MessageCircle,
  Shield,
  Users,
} from "lucide-react";
import DisclaimerBanner from "../components/DisclaimerBanner";
import { COMMUNITIES, communitiesByCounty, getCommunity } from "../data/communities";
import { COUNTIES } from "../data/counties";
import { formatNumber, formatPercent } from "../lib/format";
import {
  calculateResources,
  DISASTER_TYPES,
} from "../lib/resourceCalculator";
import { buildPlanningReport, downloadReport } from "../lib/reportGenerator";

const CMIST = [
  { key: "communication", label: "Communication", icon: MessageCircle },
  { key: "medical", label: "Medical", icon: HeartPulse },
  { key: "independence", label: "Independence", icon: Users },
  { key: "safety", label: "Safety and Support", icon: Shield },
  { key: "transportation", label: "Transportation", icon: Bus },
];

export default function ResourcePlanningPage() {
  const [params] = useSearchParams();
  const [countyId, setCountyId] = useState(params.get("county") || "honolulu");
  const [communityId, setCommunityId] = useState(params.get("community") || "ewa-beach");
  const [disasterTypeId, setDisasterTypeId] = useState("coastal-flood");
  const [reportPreview, setReportPreview] = useState(null);

  const countyCommunities = communitiesByCounty(countyId);
  const community = getCommunity(communityId) ?? countyCommunities[0];

  const assessment = useMemo(() => {
    if (!community) return null;
    return calculateResources({ community, disasterTypeId });
  }, [community, disasterTypeId]);

  function handleCounty(id) {
    setCountyId(id);
    const next = communitiesByCounty(id)[0];
    setCommunityId(next?.id);
  }

  function handleGenerate() {
    const report = buildPlanningReport({ community, assessment });
    setReportPreview(report);
    downloadReport(report);
  }

  const v = community?.vulnerability;

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
      <div>
        <h1 className="text-3xl font-bold text-forest">Resource Planning</h1>
        <p className="mt-2 max-w-3xl text-sm text-muted">
          Hypothetical ESF-6 calculator for the HAIC prototype. Select a county,
          community, and disaster type. Results use published formulas and sample
          aggregated data — not verified operational counts.
        </p>
      </div>

      <section className="rounded-3xl bg-white p-5 shadow-sm">
        <h2 className="font-semibold">Scenario inputs</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <label className="text-sm">
            <span className="mb-1 block text-muted">County</span>
            <select
              value={countyId}
              onChange={(event) => handleCounty(event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2"
            >
              {COUNTIES.map((county) => (
                <option key={county.id} value={county.id}>
                  {county.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-muted">Community</span>
            <select
              value={community?.id}
              onChange={(event) => setCommunityId(event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2"
            >
              {countyCommunities.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-muted">Disaster type</span>
            <select
              value={disasterTypeId}
              onChange={(event) => setDisasterTypeId(event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2"
            >
              {DISASTER_TYPES.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="mt-3 text-xs text-amber-700">
          Demonstration scenario. Population and capacity figures are sample
          planning values.
        </p>
      </section>

      {assessment ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            ["Estimated residents needing shelter", assessment.estimatedShelterNeed, assessment.formulas.estimatedShelterNeed],
            ["Available shelter capacity", assessment.availableCapacity, "community.shelterCapacity (sample)"],
            ["Potential shelter shortage", assessment.shelterShortfall, assessment.formulas.shelterShortfall],
            ["Transportation assistance estimates", assessment.transportAssist, assessment.formulas.transportAssist],
            ["Backup electricity considerations", assessment.electricityBackup, assessment.formulas.electricityBackup],
            ["Essential water (gallons)", assessment.waterGallons, assessment.formulas.waterGallons],
          ].map(([label, value, formula]) => (
            <article key={label} className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm text-muted">{label}</p>
              <p className="mt-2 text-3xl font-bold text-forest">{formatNumber(value)}</p>
              <p className="mt-2 font-mono text-[11px] leading-4 text-slate-500">{formula}</p>
            </article>
          ))}
        </section>
      ) : null}

      {assessment ? (
        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Assumptions</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
            <li>Population input: {formatNumber(assessment.inputs.population)} (sample aggregate)</li>
            <li>Shelter rate: {(assessment.inputs.shelterRate * 100).toFixed(0)}% · {assessment.rates.notes}</li>
            <li>Planning horizon: {assessment.inputs.days} days</li>
            <li>Meals: {formatNumber(assessment.meals)} ({assessment.formulas.meals})</li>
            <li>{assessment.dataLabel}</li>
          </ul>
        </section>
      ) : null}

      <section id="vulnerability" className="scroll-mt-24 rounded-3xl bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Population vulnerability (CMIST / AFN)</h2>
        <p className="mt-1 text-sm text-muted">
          Sample aggregated indicators for {community?.name}. No individual personal
          or medical records are stored. Replace these values with Census ACS and
          agency datasets later.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Stat label="Older adults" value={formatPercent(v?.olderAdultsPct)} />
          <Stat label="Households without vehicles" value={formatPercent(v?.noVehiclePct)} />
          <Stat label="Disability indicator" value={formatPercent(v?.disabilityPct)} />
          <Stat label="Limited English proficiency" value={formatPercent(v?.lepPct)} />
          <Stat
            label="Electricity-dependent medical needs (est.)"
            value={v?.electricityDependentEst == null ? "Unknown" : formatNumber(v.electricityDependentEst)}
          />
          <Stat label="Hazard exposure" value={v?.hazardExposure ?? "Unknown"} />
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {CMIST.map((item) => (
            <article key={item.key} className="rounded-2xl bg-forest-soft/60 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-forest">
                <item.icon size={16} />
                {item.label}
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-700">
                {v?.cmist?.[item.key] ?? "Unknown"}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="coordination" className="scroll-mt-24 rounded-3xl bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Emergency coordination</h2>
        <p className="mt-1 text-sm text-muted">
          Suggested responsibilities for government agencies and community partners.
          This is a planning aid, not an operations order.
        </p>
        {assessment ? (
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold">Identified needs and shortages</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted">
                <li>Shelter shortage: {formatNumber(assessment.shelterShortfall)}</li>
                <li>Transportation assistance: {formatNumber(assessment.transportAssist)}</li>
                <li>Backup electricity considerations: {formatNumber(assessment.electricityBackup)}</li>
              </ul>
              <h3 className="mt-4 text-sm font-semibold">Required verification</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                <li>Confirm official alerts before public messaging.</li>
                <li>Verify shelter capacity with the county mass-care lead.</li>
                <li>Use authorized AFN lists only — never this website.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Agencies and pathways</h3>
              <ul className="mt-2 space-y-2 text-sm text-muted">
                <li>County emergency management / civil defense — overall coordination</li>
                <li>DHS / mass care — sheltering and functional needs support</li>
                <li>Red Cross and VOAD — feeding and family assistance</li>
                <li>Transit / paratransit — movement of households without vehicles</li>
                <li>Health coalition and utilities — electricity-dependent support</li>
              </ul>
            </div>
          </div>
        ) : null}
        <button
          type="button"
          onClick={handleGenerate}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white hover:bg-forest-dark"
        >
          <ClipboardList size={16} />
          Generate Planning Report
        </button>
        <p className="mt-2 text-xs text-muted">
          Downloads a structured text template. This report is not AI-generated.
        </p>
      </section>

      {reportPreview ? (
        <section className="rounded-3xl bg-slate-900 p-5 text-sm text-emerald-50">
          <h2 className="text-lg font-semibold text-white">{reportPreview.title}</h2>
          <p className="mt-2 text-emerald-100">{reportPreview.disclaimer}</p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            {reportPreview.proposedActions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="text-xs text-muted">
        Statewide sample communities in this prototype: {COMMUNITIES.length}.
      </p>
      <DisclaimerBanner />
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <article className="rounded-2xl border border-slate-100 p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </article>
  );
}
