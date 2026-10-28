import { DEMO_ALERTS } from "../data/alerts";

/**
 * Official NWS API hook (not connected in this prototype).
 * Future: GET https://api.weather.gov/alerts/active?area=HI
 * Headers: { Accept: "application/geo+json", User-Agent: "HawaiiDisasterIntelligence/0.1" }
 */
export const NWS_ALERTS_ENDPOINT = "https://api.weather.gov/alerts/active?area=HI";

export async function fetchAlerts({ useLive = false } = {}) {
  if (!useLive) {
    return {
      source: "demonstration",
      fetchedAt: new Date().toISOString(),
      alerts: DEMO_ALERTS,
    };
  }

  const response = await fetch(NWS_ALERTS_ENDPOINT, {
    headers: {
      Accept: "application/geo+json",
    },
  });

  if (!response.ok) {
    throw new Error(`NWS alerts request failed (${response.status})`);
  }

  const geojson = await response.json();
  return {
    source: "nws",
    fetchedAt: new Date().toISOString(),
    alerts: geojson.features ?? [],
    raw: geojson,
  };
}
