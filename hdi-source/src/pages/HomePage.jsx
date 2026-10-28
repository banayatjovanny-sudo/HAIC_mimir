import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  ClipboardList,
  Network,
  Shield,
  Users,
} from "lucide-react";
import DisclaimerBanner from "../components/DisclaimerBanner";

const FEATURES = [
  {
    icon: Shield,
    title: "Live Disaster Information",
    body: "View verified weather, seismic and emergency alerts across Hawaiʻi.",
    to: "/map",
  },
  {
    icon: Users,
    title: "Vulnerable Community Insights",
    body: "Identify populations that may need additional support during emergencies.",
    to: "/resource-planning#vulnerability",
  },
  {
    icon: ClipboardList,
    title: "Resource Planning",
    body: "Estimate shelter, transportation and essential resource needs.",
    to: "/resource-planning",
  },
  {
    icon: Network,
    title: "Coordinated Response",
    body: "Generate planning reports for more effective emergency coordination.",
    to: "/resource-planning#coordination",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6">
      <section className="relative overflow-hidden rounded-[2rem] bg-white shadow-sm">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.78) 38%, rgba(255,255,255,0.08) 62%), url('/hero.jpg')",
          }}
        />
        <div className="relative grid min-h-[540px] items-center px-6 py-16 sm:px-12 lg:grid-cols-2">
          <div className="max-w-xl">
            <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Hawaiʻi
              <span className="mt-2 block text-forest">Disaster Intelligence</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted">
              Real-time information, vulnerability insights, and resource planning
              for a safer and more resilient Hawaiʻi.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/map"
                className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-forest-dark"
              >
                <BookOpen size={16} />
                View Map
                <ArrowRight size={16} />
              </Link>
              <a
                href="#learn-more"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-3 text-sm font-semibold text-ink hover:bg-white"
              >
                Learn More
                <ChevronDown size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="learn-more"
        className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {FEATURES.map((feature) => (
          <Link
            key={feature.title}
            to={feature.to}
            className="rounded-3xl border border-emerald-50 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-forest-soft text-forest">
              <feature.icon size={22} />
            </span>
            <h2 className="mt-5 text-lg font-semibold">{feature.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{feature.body}</p>
          </Link>
        ))}
      </section>

      <p className="mt-10 text-center text-xs font-semibold tracking-[0.28em] text-muted">
        INFORMATION TODAY • A SAFER TOMORROW
      </p>

      <div className="mx-auto mt-8 max-w-4xl">
        <DisclaimerBanner />
      </div>
    </div>
  );
}
