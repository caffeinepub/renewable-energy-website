import { useScrollReveal } from "../hooks/useScrollReveal";

const nodes = [
  {
    id: "solar",
    label: "Solar Farm",
    x: 50,
    y: 15,
    color: "#ffd24a",
    icon: "☀️",
  },
  {
    id: "wind",
    label: "Wind Farm",
    x: 20,
    y: 35,
    color: "#23c8ff",
    icon: "💨",
  },
  {
    id: "grid",
    label: "Smart Grid",
    x: 50,
    y: 50,
    color: "#7cff4d",
    icon: "⚡",
  },
  {
    id: "storage",
    label: "Battery",
    x: 80,
    y: 35,
    color: "#7cff4d",
    icon: "🔋",
  },
  { id: "ai", label: "AI Control", x: 50, y: 82, color: "#23c8ff", icon: "🧠" },
  { id: "city", label: "City Grid", x: 20, y: 68, color: "#ffd24a", icon: "🏙️" },
  { id: "ev", label: "EV Network", x: 80, y: 68, color: "#7cff4d", icon: "🚗" },
];

const connections = [
  ["solar", "grid"],
  ["wind", "grid"],
  ["grid", "storage"],
  ["grid", "ai"],
  ["grid", "city"],
  ["storage", "ev"],
  ["ai", "city"],
  ["ai", "ev"],
];

function getNode(id: string) {
  return nodes.find((n) => n.id === id)!;
}

const batteries = [
  { label: "Grid-Scale", fill: 78, color: "#7cff4d" },
  { label: "Residential", fill: 62, color: "#23c8ff" },
  { label: "EV Fleet", fill: 45, color: "#ffd24a" },
];

export default function FutureSection() {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      className="py-24"
      style={{
        background:
          "radial-gradient(ellipse at 70% 50%, rgba(35,200,255,0.05) 0%, transparent 60%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={sectionRef} className="section-reveal">
          <div className="text-center mb-16">
            <p
              className="text-xs font-orbitron tracking-[0.3em] uppercase mb-3"
              style={{ color: "#23c8ff" }}
            >
              Vision 2050
            </p>
            <h2 className="font-orbitron font-bold text-3xl sm:text-4xl text-white tracking-wide">
              THE FUTURE OF CLEAN ENERGY
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-orbitron font-semibold text-sm tracking-widest text-[#7cff4d] mb-6">
                ⚡ SMART GRID NETWORK
              </h3>
              <div className="relative w-full" style={{ paddingBottom: "90%" }}>
                <svg
                  viewBox="0 0 100 95"
                  className="absolute inset-0 w-full h-full"
                  aria-label="Smart Grid Network Diagram"
                >
                  <title>Smart Grid Network</title>
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {connections.map(([a, b]) => {
                    const na = getNode(a);
                    const nb = getNode(b);
                    return (
                      <line
                        key={`${a}-${b}`}
                        x1={na.x}
                        y1={na.y}
                        x2={nb.x}
                        y2={nb.y}
                        stroke="rgba(124,255,77,0.25)"
                        strokeWidth="0.6"
                        strokeDasharray="3 2"
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          from="20"
                          to="0"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                      </line>
                    );
                  })}

                  {connections.map(([a, b]) => {
                    const na = getNode(a);
                    const nb = getNode(b);
                    return (
                      <circle
                        key={`dot-${a}-${b}`}
                        r="1"
                        fill="#7cff4d"
                        filter="url(#glow)"
                      >
                        <animateMotion
                          dur={`${2 + Math.random() * 2}s`}
                          repeatCount="indefinite"
                          path={`M${na.x},${na.y} L${nb.x},${nb.y}`}
                        />
                      </circle>
                    );
                  })}

                  {nodes.map((node) => (
                    <g key={node.id}>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="7"
                        fill="rgba(14,22,30,0.9)"
                        stroke={node.color}
                        strokeWidth="1"
                        filter="url(#glow)"
                      />
                      <text
                        x={node.x}
                        y={node.y + 1}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="5"
                      >
                        {node.icon}
                      </text>
                      <text
                        x={node.x}
                        y={node.y + 11}
                        textAnchor="middle"
                        fontSize="3.5"
                        fill="rgba(255,255,255,0.6)"
                        fontFamily="Inter"
                      >
                        {node.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-orbitron font-semibold text-sm tracking-widest text-[#23c8ff] mb-5">
                  🔋 BATTERY STORAGE CAPACITY
                </h3>
                <div className="space-y-4">
                  {batteries.map((b) => (
                    <div key={b.label}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-gray-300">{b.label}</span>
                        <span
                          className="font-semibold"
                          style={{ color: b.color }}
                        >
                          {b.fill}%
                        </span>
                      </div>
                      <div
                        className="h-3 rounded-full"
                        style={{ background: "rgba(255,255,255,0.08)" }}
                      >
                        <div
                          className="h-3 rounded-full transition-all duration-2000"
                          style={{
                            width: `${b.fill}%`,
                            background: `linear-gradient(90deg, ${b.color}88, ${b.color})`,
                            boxShadow: `0 0 10px ${b.color}55`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: "🧠",
                    title: "AI Grid Management",
                    desc: "Predict & balance energy loads in real-time",
                    color: "#23c8ff",
                  },
                  {
                    icon: "🚀",
                    title: "Space-Based Solar",
                    desc: "Orbital solar panels transmit energy 24/7",
                    color: "#ffd24a",
                  },
                  {
                    icon: "⚛️",
                    title: "Green Hydrogen",
                    desc: "Store excess renewable energy as clean fuel",
                    color: "#7cff4d",
                  },
                  {
                    icon: "🔬",
                    title: "Fusion Energy",
                    desc: "Unlimited clean energy from plasma reactions",
                    color: "#23c8ff",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="glass-card rounded-xl p-4 neon-glow-hover"
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <h4
                      className="font-orbitron text-xs font-semibold tracking-wider"
                      style={{ color: item.color }}
                    >
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
