/**
 * Prototype disaster classification scale.
 * These are not official Hawaiʻi or NWS warning levels.
 * Replace `assignProvisionalLevel` with documented thresholds and live feeds later.
 */

export const CLASSIFICATION_LEVELS = {
  1: {
    id: 1,
    key: "normal",
    label: "Normal",
    fullLabel: "Level 1 — Normal",
    short: "Normal / Safe",
    color: "#22c55e",
    bg: "#ecfdf3",
    text: "#166534",
    description: "No significant hazards or impacts reported. Routine monitoring.",
  },
  2: {
    id: 2,
    key: "advisory",
    label: "Advisory",
    fullLabel: "Level 2 — Advisory",
    short: "Advisory / Monitor",
    color: "#eab308",
    bg: "#fefce8",
    text: "#854d0e",
    description: "Developing conditions or limited exposure. Stay informed and prepared.",
  },
  3: {
    id: 3,
    key: "elevated",
    label: "Elevated",
    fullLabel: "Level 3 — Elevated",
    short: "Elevated",
    color: "#f97316",
    bg: "#fff7ed",
    text: "#9a3412",
    description: "Significant hazard exposure or potential impacts. Increased readiness recommended.",
  },
  4: {
    id: 4,
    key: "emergency",
    label: "Emergency",
    fullLabel: "Level 4 — Emergency",
    short: "Emergency",
    color: "#ef4444",
    bg: "#fef2f2",
    text: "#991b1b",
    description: "Confirmed impacts and ongoing hazards. Active response and support may be needed.",
  },
  5: {
    id: 5,
    key: "critical",
    label: "Critical",
    fullLabel: "Level 5 — Critical",
    short: "Critical",
    color: "#7f1d1d",
    bg: "#fee2e2",
    text: "#7f1d1d",
    description: "Severe impacts and major emergency support needs. Immediate coordinated response likely required.",
  },
  unknown: {
    id: "unknown",
    key: "unknown",
    label: "Unknown",
    fullLabel: "Unknown",
    short: "Unknown",
    color: "#9ca3af",
    bg: "#f3f4f6",
    text: "#4b5563",
    description: "Insufficient or unverified information available.",
  },
};

export const LEVEL_LIST = [1, 2, 3, 4, 5, "unknown"].map(
  (id) => CLASSIFICATION_LEVELS[id]
);

export function getLevel(levelId) {
  return CLASSIFICATION_LEVELS[levelId] ?? CLASSIFICATION_LEVELS.unknown;
}

/**
 * Placeholder for future threshold logic.
 * Communities are classified independently; nearby towns are not auto-escalated.
 */
export function assignProvisionalLevel(community) {
  if (community?.provisionalLevel == null) {
    return CLASSIFICATION_LEVELS.unknown;
  }
  return getLevel(community.provisionalLevel);
}
