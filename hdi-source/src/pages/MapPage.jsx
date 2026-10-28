import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AlertDetailsModal from "../components/alerts/AlertDetailsModal";
import IncidentTable from "../components/alerts/IncidentTable";
import LiveAlertsPanel from "../components/alerts/LiveAlertsPanel";
import CommunityPanel from "../components/community/CommunityPanel";
import DisclaimerBanner from "../components/DisclaimerBanner";
import CountySelector from "../components/map/CountySelector";
import Legend from "../components/map/Legend";
import MapView from "../components/map/MapView";
import { alertsForCommunity, alertsForCounty } from "../data/alerts";
import { COMMUNITIES, communitiesByCounty, getCommunity } from "../data/communities";
import { getCounty } from "../data/counties";

export default function MapPage() {
  const [params, setParams] = useSearchParams();
  const countyId = params.get("county") || "honolulu";
  const selectedId =
    params.get("community") ||
    (countyId === "honolulu" ? "ewa-beach" : communitiesByCounty(countyId)[0]?.id);
  const [alert, setAlert] = useState(null);

  const county = getCounty(countyId);
  const selected = getCommunity(selectedId);

  const incidentRows = useMemo(() => {
    if (selected?.history?.length) {
      return selected.history.map((item) => ({
        ...item,
        title: item.title,
      }));
    }
    return alertsForCounty(countyId).map((item) => ({
      date: item.issuedAt,
      title: `${item.title} · ${item.location}`,
      type: item.disasterType,
      level: item.level,
      source: item.source.split(" (")[0],
    }));
  }, [selected, countyId]);

  function update(nextCounty, nextCommunity) {
    const next = new URLSearchParams(params);
    next.set("county", nextCounty);
    if (nextCommunity) next.set("community", nextCommunity);
    else next.delete("community");
    setParams(next);
  }

  function handleCounty(id) {
    const first = communitiesByCounty(id)[0];
    update(id, first?.id);
  }

  function handleSelect(communityId) {
    const community = getCommunity(communityId);
    update(community?.countyId || countyId, communityId);
  }

  function handleAlertDetails(item) {
    const community = COMMUNITIES.find((entry) => entry.id === item.communityId);
    if (community) update(community.countyId, community.id);
    setAlert(item);
  }

  return (
    <div className="mx-auto max-w-[1440px] space-y-4 px-4 py-6 sm:px-6">
      <div>
        <h1 className="text-3xl font-bold text-forest">Statewide Disaster Map</h1>
        <p className="mt-1 text-sm text-muted">
          Explore demonstration information and community impacts by island. Click a
          community marker for more details. Classifications are provisional and
          fictional for this prototype.
        </p>
      </div>

      <CountySelector value={countyId} onChange={handleCounty} />

      <div className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)_320px]">
        <Legend />
        <div className="min-h-[520px]">
          <MapView
            countyId={countyId}
            selectedId={selectedId}
            onSelect={handleSelect}
          />
        </div>
        <div className="space-y-4">
          <CommunityPanel community={selected} onClose={() => update(countyId)} />
          <LiveAlertsPanel
            countyId={countyId}
            onViewDetails={handleAlertDetails}
          />
        </div>
      </div>

      <IncidentTable
        title={`Recent Incidents — ${selected?.name ?? county.shortName}`}
        rows={
          selected
            ? [
                ...incidentRows,
                ...alertsForCommunity(selected.id).map((item) => ({
                  date: item.issuedAt,
                  title: item.title,
                  type: item.disasterType,
                  level: item.level,
                  source: item.source.split(" (")[0],
                })),
              ].filter(
                (row, index, list) =>
                  list.findIndex((item) => item.date === row.date && item.title === row.title) ===
                  index
              )
            : incidentRows
        }
      />

      <DisclaimerBanner />
      <AlertDetailsModal alert={alert} onClose={() => setAlert(null)} />
    </div>
  );
}
