import { useEffect, useMemo } from "react";
import {
  CircleMarker,
  LayerGroup,
  LayersControl,
  MapContainer,
  ScaleControl,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { Crosshair, Home, Minus, Plus } from "lucide-react";
import { getLevel } from "../../data/classification";
import { getCounty, STATEWIDE_VIEW } from "../../data/counties";
import { communitiesByCounty } from "../../data/communities";

function FitCounty({ countyId }) {
  const map = useMap();
  useEffect(() => {
    const county = getCounty(countyId);
    map.flyTo(county.center, county.zoom, { duration: 0.8 });
  }, [countyId, map]);
  return null;
}

function MapButtons({ countyId }) {
  const map = useMap();
  const county = getCounty(countyId);

  return (
    <div className="absolute left-3 top-3 z-[1000] flex flex-col overflow-hidden rounded-xl bg-white shadow">
      <button
        type="button"
        className="p-2 hover:bg-slate-50"
        onClick={() => map.zoomIn()}
        aria-label="Zoom in"
      >
        <Plus size={16} />
      </button>
      <button
        type="button"
        className="border-t border-slate-100 p-2 hover:bg-slate-50"
        onClick={() => map.zoomOut()}
        aria-label="Zoom out"
      >
        <Minus size={16} />
      </button>
      <button
        type="button"
        className="border-t border-slate-100 p-2 hover:bg-slate-50"
        onClick={() => map.flyTo(county.center, county.zoom)}
        aria-label="Reset county view"
      >
        <Home size={16} />
      </button>
      <button
        type="button"
        className="border-t border-slate-100 p-2 hover:bg-slate-50"
        onClick={() => map.flyTo(STATEWIDE_VIEW.center, STATEWIDE_VIEW.zoom)}
        aria-label="Statewide view"
      >
        <Crosshair size={16} />
      </button>
    </div>
  );
}

export default function MapView({
  countyId,
  selectedId,
  onSelect,
}) {
  const communities = useMemo(() => communitiesByCounty(countyId), [countyId]);
  const county = getCounty(countyId);

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
  }, []);

  return (
    <div className="relative h-full min-h-[420px] overflow-hidden rounded-3xl">
      <MapContainer
        center={county.center}
        zoom={county.zoom}
        className="h-full min-h-[420px] w-full"
        zoomControl={false}
        attributionControl
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite (Esri)">
            <TileLayer
              attribution="Tiles &copy; Esri"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        <FitCounty countyId={countyId} />
        <MapButtons countyId={countyId} />
        <ScaleControl position="bottomleft" imperial />
        <LayerGroup>
          {communities.map((community) => {
            const level = getLevel(community.provisionalLevel);
            const selected = community.id === selectedId;
            return (
              <CircleMarker
                key={community.id}
                center={[community.lat, community.lng]}
                radius={selected ? 14 : 10}
                pathOptions={{
                  color: "#fff",
                  weight: selected ? 3 : 2,
                  fillColor: level.color,
                  fillOpacity: 0.95,
                }}
                eventHandlers={{
                  click: () => onSelect(community.id),
                }}
              >
                <Tooltip direction="top" offset={[0, -8]} opacity={1} permanent={selected}>
                  <span className="font-semibold">{community.name}</span>
                </Tooltip>
              </CircleMarker>
            );
          })}
        </LayerGroup>
      </MapContainer>
      <div className="pointer-events-none absolute left-4 top-4 rounded-xl bg-slate-900/70 px-3 py-2 text-white">
        <p className="text-sm font-semibold">{county.islandLabel}</p>
        <p className="text-xs text-white/80">{county.name}</p>
      </div>
    </div>
  );
}
