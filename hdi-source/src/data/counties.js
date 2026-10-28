export const COUNTIES = [
  {
    id: "honolulu",
    name: "Honolulu County",
    shortName: "Oʻahu",
    islandLabel: "Oʻahu",
    subtitle: "Honolulu County",
    islands: ["Oʻahu"],
    center: [21.4389, -158.0001],
    zoom: 10,
    bounds: [
      [21.23, -158.3],
      [21.75, -157.62],
    ],
  },
  {
    id: "maui",
    name: "Maui County",
    shortName: "Maui",
    islandLabel: "Maui County",
    subtitle: "Maui, Molokaʻi, Lānaʻi",
    islands: ["Maui", "Molokaʻi", "Lānaʻi", "Kahoʻolawe"],
    center: [20.85, -156.45],
    zoom: 9,
    bounds: [
      [20.5, -157.35],
      [21.25, -155.9],
    ],
  },
  {
    id: "hawaii",
    name: "Hawaiʻi County",
    shortName: "Hawaiʻi",
    islandLabel: "Hawaiʻi Island",
    subtitle: "Hawaiʻi Island",
    islands: ["Hawaiʻi Island"],
    center: [19.6, -155.5],
    zoom: 8.4,
    bounds: [
      [18.9, -156.1],
      [20.3, -154.75],
    ],
  },
  {
    id: "kauai",
    name: "Kauaʻi County",
    shortName: "Kauaʻi",
    islandLabel: "Kauaʻi County",
    subtitle: "Kauaʻi and Niʻihau",
    islands: ["Kauaʻi", "Niʻihau"],
    center: [22.0, -159.55],
    zoom: 9.4,
    bounds: [
      [21.73, -160.3],
      [22.28, -159.25],
    ],
  },
];

export const STATEWIDE_VIEW = {
  center: [20.7, -157.3],
  zoom: 7,
};

export function getCounty(id) {
  return COUNTIES.find((county) => county.id === id) ?? COUNTIES[0];
}
