import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const infoPanels: Record<
  string,
  { title: string; desc: string; stat: string; color: string }
> = {
  solar: {
    title: "Solar Panels",
    desc: "Rooftop solar panels generate clean electricity from sunlight. A typical 5kW system offsets 6-7 tonnes of CO₂ per year.",
    stat: "5 kW system = 6,500 kWh/year",
    color: "#ffd24a",
  },
  ev: {
    title: "Electric Vehicle",
    desc: "EVs powered by renewable energy produce zero direct emissions. They're 3x more efficient than combustion engine cars.",
    stat: "0g CO₂ per km (clean charge)",
    color: "#23c8ff",
  },
  battery: {
    title: "Home Battery Storage",
    desc: "Home batteries store excess solar energy for use at night or during outages, maximizing self-consumption to 80%.",
    stat: "10 kWh storage = 2 days backup",
    color: "#7cff4d",
  },
  smartmeter: {
    title: "Smart Energy Meter",
    desc: "AI-powered smart meters optimize energy usage, predict demand, and sell excess power back to the grid automatically.",
    stat: "Up to 30% energy cost reduction",
    color: "#7cff4d",
  },
};

function HouseScene({ onPartClick }: { onPartClick: (part: string) => void }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 8, 5]} color="#ffd24a" intensity={1.2} />
      <pointLight position={[-5, 5, -5]} color="#23c8ff" intensity={0.6} />

      {/* House body */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[3, 2, 2]} />
        <meshPhongMaterial color="#1a2535" />
      </mesh>

      {/* Roof */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: R3F mesh does not support keyboard events */}
      <mesh position={[0, 0.8, 0]} onClick={() => onPartClick("solar")}>
        <coneGeometry args={[2.4, 1.2, 4]} />
        <meshPhongMaterial color="#2a3a50" />
      </mesh>

      {/* Solar panels on roof */}
      {[-0.6, 0, 0.6].map((x) => (
        // biome-ignore lint/a11y/useKeyWithClickEvents: R3F mesh does not support keyboard events
        <mesh
          key={x}
          position={[x, 0.9, 0.3]}
          rotation={[0.5, 0, 0]}
          onClick={() => onPartClick("solar")}
        >
          <boxGeometry args={[0.5, 0.05, 0.35]} />
          <meshPhongMaterial
            color="#1a3a6a"
            emissive="#0a1a3a"
            shininess={80}
          />
        </mesh>
      ))}

      {/* EV car */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: R3F mesh does not support keyboard events */}
      <mesh position={[2.2, -1.2, 0]} onClick={() => onPartClick("ev")}>
        <boxGeometry args={[1.4, 0.5, 0.8]} />
        <meshPhongMaterial color="#23c8ff" emissive="#0a2a3a" shininess={100} />
      </mesh>
      <mesh position={[2.2, -1.55, 0]}>
        <boxGeometry args={[1.6, 0.2, 0.9]} />
        <meshPhongMaterial color="#1a2535" />
      </mesh>

      {/* Battery */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: R3F mesh does not support keyboard events */}
      <mesh position={[-1.7, -0.6, 0]} onClick={() => onPartClick("battery")}>
        <boxGeometry args={[0.3, 1.0, 0.3]} />
        <meshPhongMaterial color="#7cff4d" emissive="#0a2a0a" shininess={50} />
      </mesh>

      {/* Smart meter */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: R3F mesh does not support keyboard events */}
      <mesh
        position={[0, -0.5, 1.05]}
        onClick={() => onPartClick("smartmeter")}
      >
        <boxGeometry args={[0.3, 0.4, 0.02]} />
        <meshPhongMaterial
          color="#23c8ff"
          emissive="#0a2a3a"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Ground */}
      <mesh position={[0, -1.75, 0]}>
        <boxGeometry args={[8, 0.1, 4]} />
        <meshPhongMaterial color="#0f1a25" />
      </mesh>
    </>
  );
}

export default function DailyLifeSection() {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const sectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      className="py-24"
      style={{
        background:
          "radial-gradient(ellipse at 30% 50%, rgba(124,255,77,0.04) 0%, transparent 60%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={sectionRef} className="section-reveal">
          <div className="text-center mb-16">
            <p
              className="text-xs font-orbitron tracking-[0.3em] uppercase mb-3"
              style={{ color: "#7cff4d" }}
            >
              Everyday Impact
            </p>
            <h2 className="font-orbitron font-bold text-3xl sm:text-4xl text-white tracking-wide">
              RENEWABLE ENERGY IN DAILY LIFE
            </h2>
            <p className="text-gray-500 mt-3 text-sm">
              Click on different parts of the house to explore green tech
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="h-[400px] glass-card rounded-2xl overflow-hidden">
              <Canvas camera={{ position: [5, 3, 5], fov: 45 }}>
                <Suspense fallback={null}>
                  <HouseScene onPartClick={setActivePanel} />
                </Suspense>
              </Canvas>
            </div>

            <div>
              {activePanel && infoPanels[activePanel] ? (
                <div
                  className="glass-card rounded-2xl p-8 transition-all duration-500"
                  style={{
                    border: `1px solid ${infoPanels[activePanel].color}44`,
                  }}
                  data-ocid="dailylife.panel"
                >
                  <h3
                    className="font-orbitron font-bold text-2xl mb-4"
                    style={{ color: infoPanels[activePanel].color }}
                  >
                    {infoPanels[activePanel].title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {infoPanels[activePanel].desc}
                  </p>
                  <div
                    className="p-4 rounded-xl text-sm font-mono"
                    style={{
                      background: `${infoPanels[activePanel].color}15`,
                      border: `1px solid ${infoPanels[activePanel].color}33`,
                    }}
                  >
                    <span style={{ color: infoPanels[activePanel].color }}>
                      ⚡ {infoPanels[activePanel].stat}
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  className="glass-card rounded-2xl p-8 text-center"
                  data-ocid="dailylife.empty_state"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(infoPanels).map(([key, panel]) => (
                      <button
                        type="button"
                        key={key}
                        onClick={() => setActivePanel(key)}
                        className="p-4 rounded-xl text-left transition-all duration-200 hover:scale-105"
                        style={{
                          background: `${panel.color}10`,
                          border: `1px solid ${panel.color}33`,
                        }}
                        data-ocid="dailylife.button"
                      >
                        <div
                          className="font-orbitron font-semibold text-xs tracking-wider"
                          style={{ color: panel.color }}
                        >
                          {panel.title}
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="text-gray-600 text-xs mt-4 font-orbitron tracking-wider">
                    CLICK ON THE 3D HOUSE OR BUTTONS ABOVE
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
