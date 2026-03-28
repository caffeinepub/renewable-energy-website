import { useRef, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const renewableStats = [
  { label: "CO₂ Emissions", value: 5, unit: "g/kWh", bar: 5 },
  { label: "Fuel Cost", value: 0, unit: "$/MWh (free)", bar: 0 },
  { label: "Water Usage", value: 12, unit: "L/MWh", bar: 10 },
  { label: "Jobs per GW", value: 4800, unit: "jobs", bar: 90 },
  { label: "Lifespan", value: 25, unit: "years", bar: 70 },
];

const fossilStats = [
  { label: "CO₂ Emissions", value: 820, unit: "g/kWh", bar: 95 },
  { label: "Fuel Cost", value: 40, unit: "$/MWh", bar: 75 },
  { label: "Water Usage", value: 2400, unit: "L/MWh", bar: 90 },
  { label: "Jobs per GW", value: 900, unit: "jobs", bar: 20 },
  { label: "Lifespan", value: 40, unit: "years (declining)", bar: 80 },
];

export default function ComparisonSection() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useScrollReveal<HTMLDivElement>();

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const pos = Math.max(
      10,
      Math.min(90, ((clientX - rect.left) / rect.width) * 100),
    );
    setSliderPos(pos);
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={sectionRef} className="section-reveal">
          <div className="text-center mb-16">
            <p
              className="text-xs font-orbitron tracking-[0.3em] uppercase mb-3"
              style={{ color: "#7cff4d" }}
            >
              Head to Head
            </p>
            <h2 className="font-orbitron font-bold text-3xl sm:text-4xl text-white tracking-wide">
              RENEWABLE VS FOSSIL FUELS
            </h2>
            <p className="text-gray-500 mt-3 text-sm">
              Drag the slider to reveal both sides
            </p>
          </div>

          <div
            ref={containerRef}
            className="relative rounded-2xl overflow-hidden cursor-ew-resize select-none h-[450px] sm:h-[380px]"
            onMouseMove={(e) => {
              if (e.buttons === 1) handleMove(e);
            }}
            onTouchMove={handleMove}
            style={{ border: "1px solid rgba(124,255,77,0.2)" }}
            data-ocid="comparison.panel"
          >
            {/* Left: Renewable */}
            <div
              className="absolute inset-0 flex flex-col justify-center p-8"
              style={{
                background:
                  "linear-gradient(135deg, rgba(124,255,77,0.08) 0%, rgba(10,15,20,0.95) 100%)",
                clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
              }}
            >
              <h3 className="font-orbitron font-bold text-xl text-[#7cff4d] mb-6 tracking-wider">
                🌱 RENEWABLE ENERGY
              </h3>
              <div className="space-y-4">
                {renewableStats.map((s) => (
                  <div key={s.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{s.label}</span>
                      <span className="text-[#7cff4d] font-semibold">
                        {s.value} {s.unit}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div
                        className="h-2 rounded-full bg-[#7cff4d] transition-all duration-1000"
                        style={{ width: `${s.bar}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Fossil */}
            <div
              className="absolute inset-0 flex flex-col justify-center p-8"
              style={{
                background:
                  "linear-gradient(135deg, rgba(10,15,20,0.95) 0%, rgba(255,100,50,0.08) 100%)",
                clipPath: `inset(0 0 0 ${sliderPos}%)`,
              }}
            >
              <h3 className="font-orbitron font-bold text-xl text-[#ff6b35] mb-6 tracking-wider text-right">
                🔥 FOSSIL FUELS
              </h3>
              <div className="space-y-4">
                {fossilStats.map((s) => (
                  <div key={s.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#ff6b35] font-semibold">
                        {s.value} {s.unit}
                      </span>
                      <span className="text-gray-300">{s.label}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div
                        className="h-2 rounded-full bg-[#ff6b35] transition-all duration-1000 ml-auto"
                        style={{ width: `${s.bar}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider handle */}
            <div
              className="absolute top-0 bottom-0 w-1 cursor-ew-resize z-10 flex items-center justify-center"
              style={{
                left: `${sliderPos}%`,
                transform: "translateX(-50%)",
                background: "rgba(255,255,255,0.8)",
              }}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
            >
              <div
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg"
                style={{ boxShadow: "0 0 15px rgba(124,255,77,0.5)" }}
              >
                <span className="text-gray-800 text-xs font-bold">↔</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
