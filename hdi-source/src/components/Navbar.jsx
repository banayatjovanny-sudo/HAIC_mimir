import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";
import PrototypeBadge from "./PrototypeBadge";

const LINKS = [
  { to: "/map", label: "Map" },
  { to: "/resource-planning", label: "Resource Planning" },
  { to: "/methodology", label: "Methodology" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-100/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <Logo className="h-11 w-11" />
          <span className="leading-tight">
            <span className="block text-lg font-bold tracking-[0.14em] text-forest">
              HAWAIʻI
            </span>
            <span className="block text-[10px] font-semibold tracking-[0.22em] text-muted">
              DISASTER INTELLIGENCE
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-ink md:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative pb-1 transition ${
                  isActive
                    ? "font-semibold text-forest after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-forest"
                    : "text-ink/80 hover:text-forest"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <PrototypeBadge />
          <button
            type="button"
            className="rounded-lg p-2 text-forest md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-emerald-100 bg-white px-4 py-3 md:hidden">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-ink hover:bg-forest-soft"
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      ) : null}
    </header>
  );
}
