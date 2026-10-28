import { getLevel } from "../data/classification";
import { getCounty } from "../data/counties";
import { DISASTER_TYPES } from "./resourceCalculator";

export function buildPlanningReport({ community, assessment, generatedAt = new Date() }) {
  const level = getLevel(community.provisionalLevel);
  const county = getCounty(community.countyId);
  const disasterLabel =
    DISASTER_TYPES.find((item) => item.id === assessment.disasterTypeId)?.label ??
    community.disasterType;

  return {
    title: `ESF-6 Planning Report — ${community.name}`,
    subtitle: "Hawaiʻi Disaster Intelligence prototype (HAIC 2026)",
    generatedAt: generatedAt.toISOString(),
    disclaimer:
      "This report is a structured planning template filled with demonstration data. It is not AI-generated and is not an official emergency order, evacuation instruction, or resource request.",
    community: {
      name: community.name,
      county: county.name,
      island: community.island,
      provisionalLevel: level.fullLabel,
      disasterType: disasterLabel,
    },
    needs: [
      { item: "Estimated residents needing shelter", value: assessment.estimatedShelterNeed },
      { item: "Available shelter capacity", value: assessment.availableCapacity },
      { item: "Potential shelter shortage", value: assessment.shelterShortfall },
      { item: "Transportation assistance estimates", value: assessment.transportAssist },
      { item: "Backup electricity considerations", value: assessment.electricityBackup },
      { item: "Water (gallons, planning horizon)", value: assessment.waterGallons },
      { item: "Meals (planning horizon)", value: assessment.meals },
    ],
    agencies: [
      {
        name: "County emergency management / civil defense",
        role: "Overall ESF-5/ESF-6 coordination, confirmation of official alerts, shelter opening decisions",
      },
      {
        name: "Department of Human Services / mass care partners",
        role: "Congregate care, functional needs support, and recovery referrals",
      },
      {
        name: "American Red Cross and VOAD",
        role: "Shelter operations, feeding, and family reunification support",
      },
      {
        name: "Transit agency and paratransit providers",
        role: "Transportation assistance for households without vehicles",
      },
      {
        name: "Health care coalitions and utilities",
        role: "Electricity-dependent medical needs and backup power",
      },
    ],
    verificationSteps: [
      "Confirm the official NWS, PTWC, or county warning product before any public message.",
      "Verify shelter capacities with the county mass-care lead — prototype numbers are sample planning values.",
      "Check Access and Functional Needs lists through authorized agencies only; this site stores no personal records.",
      "Validate transportation routes against current road closures.",
    ],
    communicationPathways: [
      "County Emergency Operations Center → ESF-6 desk",
      "Official public alerts via HIEMA / county sirens / NOAA Weather Radio",
      "Partner conference bridge for VOAD, transit, and health",
      "Community messengers for limited-English-proficiency households",
    ],
    proposedActions: [
      "Review shelter shortfall and identify overflow or hotel/non-congregate options.",
      "Pre-assign transportation for the estimated no-vehicle share.",
      "Stage backup power support for the electricity-dependent planning estimate.",
      "Keep this prototype classification visually separate from official alerts.",
    ],
  };
}

export function reportToText(report) {
  const lines = [
    report.title,
    report.subtitle,
    `Generated: ${report.generatedAt}`,
    "",
    report.disclaimer,
    "",
    `Community: ${report.community.name}`,
    `County / island: ${report.community.county} / ${report.community.island}`,
    `Provisional classification: ${report.community.provisionalLevel}`,
    `Scenario disaster type: ${report.community.disasterType}`,
    "",
    "Identified resource needs",
    ...report.needs.map((need) => `- ${need.item}: ${need.value}`),
    "",
    "Agencies and suggested responsibilities",
    ...report.agencies.map((agency) => `- ${agency.name}: ${agency.role}`),
    "",
    "Required verification steps",
    ...report.verificationSteps.map((step) => `- ${step}`),
    "",
    "Communication pathways",
    ...report.communicationPathways.map((item) => `- ${item}`),
    "",
    "Proposed emergency planning actions",
    ...report.proposedActions.map((item) => `- ${item}`),
  ];
  return lines.join("\n");
}

export function downloadReport(report) {
  const blob = new Blob([reportToText(report)], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${report.community.name.replace(/\s+/g, "-").toLowerCase()}-esf6-planning-report.txt`;
  link.click();
  URL.revokeObjectURL(url);
}
