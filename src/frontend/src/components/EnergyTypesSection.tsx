import { useScrollReveal } from "../hooks/useScrollReveal";

const energyTypes = [
  {
    icon: "☀️",
    title: "Solar Energy",
    description:
      "Harnessing sunlight via photovoltaic cells and concentrated solar power systems for electricity generation.",
    stat: "1000 GW",
    statLabel: "Global capacity",
    color: "#ffd24a",
  },
  {
    icon: "💨",
    title: "Wind Energy",
    description:
      "Converting kinetic energy of wind into electricity through onshore and offshore turbine arrays.",
    stat: "825 GW",
    statLabel: "Global capacity",
    color: "#23c8ff",
  },
  {
    icon: "💧",
    title: "Hydropower",
    description:
      "Generating electricity from flowing water using dams, run-of-river systems, and tidal energy.",
    stat: "1360 GW",
    statLabel: "Global capacity",
    color: "#7cff4d",
  },
  {
    icon: "🌋",
    title: "Geothermal",
    description:
      "Tapping Earth's internal heat for electricity and direct use heating applications worldwide.",
    stat: "15.9 GW",
    statLabel: "Global capacity",
    color: "#ff6b35",
  },
  {
    icon: "🌿",
    title: "Biomass",
    description:
      "Converting organic materials — wood, crops, waste — into electricity, heat, and biofuels.",
    stat: "130 GW",
    statLabel: "Global capacity",
    color: "#7cff4d",
  },
];

export default function EnergyTypesSection() {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="solutions" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={sectionRef} className="section-reveal">
          <div className="text-center mb-16">
            <p
              className="text-xs font-orbitron tracking-[0.3em] uppercase mb-3"
              style={{ color: "#7cff4d" }}
            >
              Clean Technology
            </p>
            <h2 className="font-orbitron font-bold text-3xl sm:text-4xl text-white tracking-wide">
              EXPLORE RENEWABLE SOURCES
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {energyTypes.map((type) => (
              <div
                key={type.title}
                className="glass-card rounded-xl p-6 card-3d-hover neon-glow-hover cursor-pointer flex flex-col gap-4"
                style={{ perspective: "1000px" }}
                data-ocid="solutions.card"
              >
                <div className="text-4xl">{type.icon}</div>
                <div>
                  <h3 className="font-orbitron font-semibold text-sm tracking-wider text-white mb-2">
                    {type.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {type.description}
                  </p>
                </div>
                <div
                  className="mt-auto pt-4"
                  style={{ borderTop: `1px solid ${type.color}33` }}
                >
                  <div
                    className="font-orbitron font-bold text-xl"
                    style={{ color: type.color }}
                  >
                    {type.stat}
                  </div>
                  <div className="text-xs text-gray-500 tracking-wider">
                    {type.statLabel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
