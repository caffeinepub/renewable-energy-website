import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface Hotspot {
  id: string;
  name: string;
  type: "solar" | "wind";
  location: string;
  capacity: string;
  area: string;
  operator: string;
  impact: string;
  x: number;
  y: number;
}

const hotspots: Hotspot[] = [
  {
    id: "bhadla",
    name: "Bhadla Solar Park",
    type: "solar",
    location: "Jodhpur, Rajasthan",
    capacity: "2,245 MW",
    area: "14,000 Acres",
    operator: "RRECL / NTPC",
    impact: "Powers 1.2 million homes",
    x: 24,
    y: 25,
  },
  {
    id: "pavagada",
    name: "Pavagada Solar Park",
    type: "solar",
    location: "Tumkur, Karnataka",
    capacity: "2,050 MW",
    area: "13,000 Acres",
    operator: "KREDL",
    impact: "CO₂ offset: 3.8 Mt/year",
    x: 32,
    y: 70,
  },
  {
    id: "rewa",
    name: "Rewa Ultra Mega Solar",
    type: "solar",
    location: "Rewa, Madhya Pradesh",
    capacity: "750 MW",
    area: "1,590 Hectares",
    operator: "RUMSL",
    impact: "Supplies Delhi Metro power",
    x: 45,
    y: 40,
  },
  {
    id: "tamilnadu",
    name: "Tamil Nadu Wind Corridor",
    type: "wind",
    location: "Coimbatore, Tamil Nadu",
    capacity: "8,631 MW",
    area: "Distributed",
    operator: "Multiple operators",
    impact: "Largest wind power state",
    x: 38,
    y: 80,
  },
  {
    id: "gujarat",
    name: "Gujarat Wind Farms",
    type: "wind",
    location: "Kutch, Gujarat",
    capacity: "7,810 MW",
    area: "Kutch Coast",
    operator: "GUVNL / Private",
    impact: "Offshore wind potential: 36 GW",
    x: 15,
    y: 38,
  },
];

export default function IndiaMapSection() {
  const [selected, setSelected] = useState<Hotspot | null>(null);
  const sectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="india-map"
      className="py-24"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(35,200,255,0.04) 0%, transparent 70%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={sectionRef} className="section-reveal">
          <div className="text-center mb-16">
            <p
              className="text-xs font-orbitron tracking-[0.3em] uppercase mb-3"
              style={{ color: "#ffd24a" }}
            >
              Regional Focus
            </p>
            <h2 className="font-orbitron font-bold text-3xl sm:text-4xl text-white tracking-wide">
              INDIA'S SOLAR &amp; WIND MAP
            </h2>
            <p className="text-gray-500 mt-3 text-sm">
              Click on a hotspot to explore project details
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="glass-card rounded-2xl p-6 relative">
              <svg
                viewBox="0 0 100 120"
                className="w-full max-w-sm mx-auto"
                aria-label="India Renewable Energy Map"
              >
                <title>India Renewable Energy Map</title>
                <path
                  d="M25,5 L40,3 L55,8 L70,12 L78,20 L82,30 L80,42 L75,50 L72,58 L70,68 L65,75 L60,82 L55,88 L50,95 L48,100 L46,95 L42,88 L38,82 L32,75 L28,68 L24,60 L20,52 L16,44 L14,35 L15,25 L18,15 Z"
                  fill="rgba(35,200,255,0.08)"
                  stroke="rgba(35,200,255,0.5)"
                  strokeWidth="0.8"
                />
                <line
                  x1="15"
                  y1="30"
                  x2="80"
                  y2="30"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="0.3"
                />
                <line
                  x1="18"
                  y1="50"
                  x2="78"
                  y2="50"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="0.3"
                />
                <line
                  x1="22"
                  y1="70"
                  x2="68"
                  y2="70"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="0.3"
                />

                {hotspots.map((h) => (
                  // biome-ignore lint/a11y/useKeyWithClickEvents: SVG interactive element
                  <g
                    key={h.id}
                    onClick={() => setSelected(h)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={h.x}
                      cy={h.y}
                      r="4"
                      fill="none"
                      stroke={h.type === "solar" ? "#ffd24a" : "#23c8ff"}
                      strokeWidth="0.5"
                      opacity="0.5"
                    >
                      <animate
                        attributeName="r"
                        from="2"
                        to="7"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.8"
                        to="0"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx={h.x}
                      cy={h.y}
                      r="2.5"
                      fill={h.type === "solar" ? "#ffd24a" : "#23c8ff"}
                      stroke={selected?.id === h.id ? "white" : "none"}
                      strokeWidth="0.5"
                    />
                    <text
                      x={h.x + 3.5}
                      y={h.y + 1}
                      fontSize="3.5"
                      fill="rgba(255,255,255,0.75)"
                      fontFamily="Inter"
                    >
                      {h.name.split(" ")[0]}
                    </text>
                  </g>
                ))}
              </svg>

              <div className="flex gap-6 justify-center mt-4">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <div className="w-3 h-3 rounded-full bg-[#ffd24a]" />
                  Solar Parks
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <div className="w-3 h-3 rounded-full bg-[#23c8ff]" />
                  Wind Farms
                </div>
              </div>
            </div>

            <div className="h-[350px] flex items-center">
              {selected ? (
                <div
                  className="glass-card rounded-2xl p-8 w-full"
                  style={{
                    border: `1px solid ${selected.type === "solar" ? "rgba(255,210,74,0.4)" : "rgba(35,200,255,0.4)"}`,
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {selected.type === "solar" ? "☀️" : "💨"}
                      </span>
                      <div>
                        <h3
                          className="font-orbitron font-bold text-lg"
                          style={{
                            color:
                              selected.type === "solar" ? "#ffd24a" : "#23c8ff",
                          }}
                        >
                          {selected.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {selected.location}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelected(null)}
                      className="text-gray-500 hover:text-white text-xl"
                      data-ocid="india-map.close_button"
                    >
                      ×
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Capacity", value: selected.capacity },
                      { label: "Area", value: selected.area },
                      { label: "Operator", value: selected.operator },
                      { label: "Impact", value: selected.impact },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="p-3 rounded-lg"
                        style={{ background: "rgba(255,255,255,0.04)" }}
                      >
                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                          {item.label}
                        </div>
                        <div className="text-sm text-white font-medium">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  className="w-full text-center"
                  data-ocid="india-map.empty_state"
                >
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="font-orbitron text-gray-500 text-sm tracking-wider">
                    SELECT A HOTSPOT TO VIEW DETAILS
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
