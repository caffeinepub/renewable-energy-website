import { useScrollReveal } from "../hooks/useScrollReveal";

const cases = [
  {
    name: "Hornsea Wind Farm",
    location: "Yorkshire, UK",
    capacity: "1.2 GW",
    type: "Offshore Wind",
    year: "2020",
    impact:
      "Powers 1 million UK homes, largest offshore wind farm at completion.",
    gradient: "linear-gradient(135deg, #1a3a5c 0%, #0a1a3a 100%)",
    accent: "#23c8ff",
    icon: "💨",
  },
  {
    name: "Bhadla Solar Park",
    location: "Rajasthan, India",
    capacity: "2.2 GW",
    type: "Utility Solar",
    year: "2020",
    impact:
      "World's largest solar park. Offsets 4 million tonnes of CO₂ annually.",
    gradient: "linear-gradient(135deg, #3a2a00 0%, #1a1000 100%)",
    accent: "#ffd24a",
    icon: "☀️",
  },
  {
    name: "Three Gorges Dam",
    location: "Hubei, China",
    capacity: "22.5 GW",
    type: "Hydropower",
    year: "2003",
    impact: "World's largest hydropower project, generating 100+ TWh per year.",
    gradient: "linear-gradient(135deg, #0a2a1a 0%, #051a10 100%)",
    accent: "#7cff4d",
    icon: "💧",
  },
  {
    name: "Noor Solar Complex",
    location: "Ouarzazate, Morocco",
    capacity: "580 MW",
    type: "Concentrated Solar",
    year: "2016",
    impact: "Africa's largest CSP plant, powering 2 million Moroccan homes.",
    gradient: "linear-gradient(135deg, #3a1a0a 0%, #1a0800 100%)",
    accent: "#ff6b35",
    icon: "🌞",
  },
];

export default function CaseStudiesSection() {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="case-studies" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={sectionRef} className="section-reveal">
          <div className="text-center mb-16">
            <p
              className="text-xs font-orbitron tracking-[0.3em] uppercase mb-3"
              style={{ color: "#23c8ff" }}
            >
              Real World Impact
            </p>
            <h2 className="font-orbitron font-bold text-3xl sm:text-4xl text-white tracking-wide">
              FEATURED CASE STUDIES
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cases.map((c, i) => (
              <div
                key={c.name}
                className="glass-card rounded-2xl overflow-hidden neon-glow-hover group"
                style={{ transitionDelay: `${i * 100}ms` }}
                data-ocid={`case-studies.item.${i + 1}`}
              >
                {/* Visual header */}
                <div
                  className="h-40 flex items-center justify-center relative overflow-hidden"
                  style={{ background: c.gradient }}
                >
                  <div className="text-6xl">{c.icon}</div>
                  <div
                    className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-orbitron tracking-wider"
                    style={{
                      background: `${c.accent}22`,
                      border: `1px solid ${c.accent}55`,
                      color: c.accent,
                    }}
                  >
                    {c.type}
                  </div>
                  {/* Capacity badge */}
                  <div
                    className="absolute bottom-3 left-3 font-orbitron font-black text-2xl"
                    style={{
                      color: c.accent,
                      textShadow: `0 0 20px ${c.accent}80`,
                    }}
                  >
                    {c.capacity}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-orbitron font-bold text-sm tracking-wider text-white mb-1">
                    {c.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">
                    📍 {c.location} • {c.year}
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {c.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
