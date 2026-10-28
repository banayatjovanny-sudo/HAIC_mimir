import DisclaimerBanner from "../components/DisclaimerBanner";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-forest">About</h1>
      <p className="text-muted">
        Hawaiʻi Disaster Intelligence is a 2026 Hawaiʻi Annual Innovation Challenge
        prototype for Challenge 2: Enhancing ESF-6 Planning Through AI-Supported
        Insights.
      </p>
      <p className="text-sm leading-7 text-slate-700">
        Emergency Support Function 6 covers mass care, emergency assistance,
        temporary housing, and human services. This website helps planners see
        community conditions, sample Access and Functional Needs indicators, and
        transparent resource estimates. It is built to support emergency management
        planning rather than replace official alerts, evacuation instructions, or
        existing emergency operations plans.
      </p>
      <p className="text-sm leading-7 text-slate-700">
        The map uses Leaflet and OpenStreetMap with real geographic coordinates.
        Incident stories, alert cards, and calculations are clearly marked as
        demonstration data so they cannot be mistaken for live warnings.
      </p>
      <DisclaimerBanner />
    </div>
  );
}
