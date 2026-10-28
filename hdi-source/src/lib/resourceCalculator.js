/**
 * Transparent ESF-6 resource estimation.
 * All rates are documented planning assumptions for the HAIC prototype.
 * Resource Shortfall = max(0, Estimated Demand − Available Capacity)
 */

export const DISASTER_TYPES = [
  { id: "coastal-flood", label: "Coastal flooding / tsunami" },
  { id: "wildfire", label: "Wildfire" },
  { id: "hurricane", label: "Hurricane / tropical cyclone" },
  { id: "flood", label: "Inland / stream flooding" },
];

export const PLANNING_RATES = {
  "coastal-flood": {
    shelterRate: 0.12,
    transportAssistRate: 0.18,
    electricityBackupRate: 0.035,
    waterGallonsPerPersonDay: 1,
    mealPerPersonDay: 2,
    days: 3,
    notes: "Assumes 12% of residents may need congregate or non-congregate shelter if low-lying zones are inundated.",
  },
  wildfire: {
    shelterRate: 0.08,
    transportAssistRate: 0.12,
    electricityBackupRate: 0.03,
    waterGallonsPerPersonDay: 1,
    mealPerPersonDay: 2,
    days: 2,
    notes: "Assumes 8% short-term displacement from smoke or immediate threat areas.",
  },
  hurricane: {
    shelterRate: 0.2,
    transportAssistRate: 0.22,
    electricityBackupRate: 0.06,
    waterGallonsPerPersonDay: 1,
    mealPerPersonDay: 3,
    days: 5,
    notes: "Assumes 20% shelter demand for a county-scale wind and flood event.",
  },
  flood: {
    shelterRate: 0.07,
    transportAssistRate: 0.14,
    electricityBackupRate: 0.025,
    waterGallonsPerPersonDay: 1,
    mealPerPersonDay: 2,
    days: 2,
    notes: "Assumes 7% of residents in stream-adjacent housing may need short-term shelter.",
  },
};

export function shortfall(demand, capacity) {
  return Math.max(0, demand - capacity);
}

export function calculateResources({ community, disasterTypeId }) {
  const rates = PLANNING_RATES[disasterTypeId] ?? PLANNING_RATES.flood;
  const population = community.population ?? 0;
  const noVehiclePct = (community.vulnerability?.noVehiclePct ?? 10) / 100;
  const estimatedShelterNeed = Math.round(population * rates.shelterRate);
  const availableCapacity = community.shelterCapacity ?? 0;
  const shelterShortfall = shortfall(estimatedShelterNeed, availableCapacity);
  const transportAssist = Math.round(
    estimatedShelterNeed * Math.max(rates.transportAssistRate, noVehiclePct)
  );
  const electricityBackup = Math.round(
    Math.max(
      community.vulnerability?.electricityDependentEst ?? 0,
      population * rates.electricityBackupRate
    )
  );
  const waterGallons = estimatedShelterNeed * rates.waterGallonsPerPersonDay * rates.days;
  const meals = estimatedShelterNeed * rates.mealPerPersonDay * rates.days;

  return {
    community,
    disasterTypeId,
    rates,
    inputs: {
      population,
      shelterRate: rates.shelterRate,
      availableCapacity,
      noVehiclePct,
      days: rates.days,
    },
    estimatedShelterNeed,
    availableCapacity,
    shelterShortfall,
    transportAssist,
    electricityBackup,
    waterGallons,
    meals,
    formulas: {
      estimatedShelterNeed: "round(population × shelterRate)",
      shelterShortfall: "max(0, estimatedShelterNeed − availableCapacity)",
      transportAssist: "round(estimatedShelterNeed × max(transportAssistRate, noVehiclePct))",
      electricityBackup: "round(max(sampleElectricityDependent, population × electricityBackupRate))",
      waterGallons: "estimatedShelterNeed × 1 gallon × days",
      meals: "estimatedShelterNeed × mealsPerPersonDay × days",
    },
    dataLabel: "Demonstration calculation — not an operational resource request",
  };
}
