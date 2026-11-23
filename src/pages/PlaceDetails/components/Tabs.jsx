import { NavLink } from "react-router";

export default function Tabs({ tabs, label = "التبويبات", className = "" }) {
  return (
    <nav
      aria-label={label}
      className={`flex gap-1 rounded-2xl bg-card p-1.5 ${className}`}
    >
      {tabs.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          end={t.end}
          className={({ isActive }) =>
            `flex-1 rounded-xl px-5 py-2.5 text-center text-sm font-medium transition-colors md:text-base lg:flex-none lg:px-8 lg:py-3 ${
              isActive ? "bg-brand text-white" : "text-mute hover:bg-bg"
            }`
          }
        >
          {t.label}
        </NavLink>
      ))}
    </nav>
  );
}
