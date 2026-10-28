const PATHS = {
  oahu: "M18 28c2-8 10-16 22-14 8 1 16 8 18 16 1 6-2 14-10 18-6 3-14 2-20-2-7-5-12-10-10-18z",
  maui: "M12 30c3-10 12-16 22-12 4 2 6 6 10 6 8 0 16 6 16 14-1 8-10 14-20 12-8-1-12-6-18-8-8-3-12-6-10-12z",
  hawaii: "M20 18c10-8 22-8 28 2 6 10 6 24-4 32-10 8-24 6-30-4-6-10-4-22 6-30z",
  kauai: "M16 30c3-12 16-18 26-10 8 6 10 16 4 24-7 9-20 10-26 2-5-6-6-10-4-16z",
};

export default function IslandSilhouette({ island = "oahu", className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="currentColor" aria-hidden="true">
      <path d={PATHS[island] ?? PATHS.oahu} />
    </svg>
  );
}
