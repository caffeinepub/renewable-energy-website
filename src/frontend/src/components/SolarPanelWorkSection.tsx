import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const steps = [
  {
    num: 1,
    title: "Sun Rays Strike Panel",
    desc: "Photons from sunlight hit the surface of silicon-based solar cells on the panel.",
    icon: "☀️",
  },
  {
    num: 2,
    title: "Photons Excite Electrons",
    desc: "Photon energy knocks electrons loose from silicon atoms, creating electron-hole pairs.",
    icon: "⚡",
  },
  {
    num: 3,
    title: "DC Current Generated",
    desc: "Free electrons flow through the circuit, generating direct current (DC) electricity.",
    icon: "🔋",
  },
  {
    num: 4,
    title: "Inverter Converts to AC",
    desc: "A solar inverter converts DC power into alternating current (AC) used in homes.",
    icon: "🔄",
  },
  {
    num: 5,
    title: "AC Powers Home & Grid",
    desc: "Clean AC electricity powers your home, with excess fed back into the utility grid.",
    icon: "🏠",
  },
];

const sunRayAngles = [0, 30, 60, 90, 120];

export default function SolarPanelWorkSection() {
  const sectionRef = useScrollReveal<HTMLDivElement>();
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveStep(i);
        },
        { threshold: 0.8 },
      );
      obs.observe(el);
      return obs;
    });
    return () => {
      for (const o of observers) o?.disconnect();
    };
  }, []);

  return (
    <section id="how-it-works" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={sectionRef} className="section-reveal">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="lg:sticky lg:top-24">
              <p
                className="text-xs font-orbitron tracking-[0.3em] uppercase mb-3"
                style={{ color: "#7cff4d" }}
              >
                Science Explained
              </p>
              <h2 className="font-orbitron font-bold text-3xl sm:text-4xl text-white tracking-wide mb-6">
                HOW A SOLAR PANEL WORKS
              </h2>
              <p className="text-gray-400 mb-10 leading-relaxed">
                A photovoltaic solar panel converts sunlight directly into
                electricity through the photoelectric effect discovered by
                Albert Einstein.
              </p>

              <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
                <svg
                  viewBox="0 0 200 160"
                  className="w-full"
                  aria-label="Solar Panel Diagram"
                >
                  <title>Solar Panel Working Diagram</title>
                  <defs>
                    <filter id="solarglow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <linearGradient
                      id="panelGrad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#1a3a6a" />
                      <stop offset="100%" stopColor="#0a1a3a" />
                    </linearGradient>
                  </defs>

                  <circle
                    cx="170"
                    cy="25"
                    r="18"
                    fill="#ffd24a"
                    filter="url(#solarglow)"
                    opacity="0.9"
                  >
                    <animate
                      attributeName="r"
                      values="18;20;18"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  {sunRayAngles.map((angle) => {
                    const rad = (angle - 40) * (Math.PI / 180);
                    const startX = 170 + Math.cos(rad) * 22;
                    const startY = 25 + Math.sin(rad) * 22;
                    const endX = 170 + Math.cos(rad) * 35;
                    const endY = 25 + Math.sin(rad) * 35;
                    return (
                      <line
                        key={angle}
                        x1={startX}
                        y1={startY}
                        x2={endX}
                        y2={endY}
                        stroke="#ffd24a"
                        strokeWidth="1.5"
                        opacity={activeStep === 0 ? "1" : "0.4"}
                      >
                        <animate
                          attributeName="opacity"
                          values={activeStep === 0 ? "1;0.5;1" : "0.3;0.3;0.3"}
                          dur="1.5s"
                          repeatCount="indefinite"
                        />
                      </line>
                    );
                  })}

                  <polygon
                    points="20,60 120,40 160,70 60,90"
                    fill="url(#panelGrad)"
                    stroke="#23c8ff"
                    strokeWidth="0.8"
                  />
                  {[0.25, 0.5, 0.75].map((t) => (
                    <line
                      key={t}
                      x1={20 + t * 100}
                      y1={60 + t * 30}
                      x2={120 + t * 40}
                      y2={40 + t * 30}
                      stroke="rgba(35,200,255,0.4)"
                      strokeWidth="0.4"
                    />
                  ))}

                  <path
                    d="M80,100 L80,130 L110,130"
                    stroke={
                      activeStep >= 2 ? "#ffd24a" : "rgba(255,210,74,0.2)"
                    }
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="4 2"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="20"
                      to="0"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </path>

                  <rect
                    x="110"
                    y="120"
                    width="30"
                    height="20"
                    rx="3"
                    fill={
                      activeStep >= 3
                        ? "rgba(124,255,77,0.2)"
                        : "rgba(124,255,77,0.05)"
                    }
                    stroke="#7cff4d"
                    strokeWidth="0.8"
                  />
                  <text
                    x="125"
                    y="132"
                    textAnchor="middle"
                    fontSize="5"
                    fill="#7cff4d"
                    fontFamily="Inter"
                  >
                    INV
                  </text>

                  <path
                    d="M140,130 L165,130 L165,110"
                    stroke={
                      activeStep >= 4 ? "#7cff4d" : "rgba(124,255,77,0.2)"
                    }
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="4 2"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="20"
                      to="0"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </path>

                  <polygon
                    points="155,100 185,100 185,80 170,68 155,80"
                    fill={
                      activeStep >= 4
                        ? "rgba(35,200,255,0.2)"
                        : "rgba(35,200,255,0.05)"
                    }
                    stroke="#23c8ff"
                    strokeWidth="0.8"
                  />

                  {steps.map((s, i) => (
                    <circle
                      key={s.num}
                      cx={20 + i * 40}
                      cy={150}
                      r="5"
                      fill={
                        activeStep === i ? "#7cff4d" : "rgba(124,255,77,0.2)"
                      }
                    />
                  ))}
                </svg>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {steps.map((step, i) => (
                <div
                  key={step.num}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className={`glass-card rounded-xl p-5 transition-all duration-500 ${activeStep === i ? "neon-border" : ""}`}
                  style={{
                    background:
                      activeStep === i
                        ? "rgba(124,255,77,0.06)"
                        : "var(--glass-bg)",
                    opacity: Math.abs(activeStep - i) > 1 ? 0.5 : 1,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-orbitron font-bold shrink-0"
                      style={{
                        background:
                          activeStep === i
                            ? "#7cff4d"
                            : "rgba(124,255,77,0.15)",
                        color: activeStep === i ? "#0a0f14" : "#7cff4d",
                        boxShadow:
                          activeStep === i
                            ? "0 0 15px rgba(124,255,77,0.5)"
                            : "none",
                      }}
                    >
                      {step.num}
                    </div>
                    <div>
                      <h3
                        className={`font-orbitron font-semibold text-sm tracking-wider ${activeStep === i ? "text-white" : "text-gray-400"}`}
                      >
                        {step.icon} {step.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
