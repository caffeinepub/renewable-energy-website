import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface Metric {
  value: number;
  suffix: string;
  label: string;
  icon: string;
  color: string;
}

const metrics: Metric[] = [
  {
    value: 2.8,
    suffix: "Gt",
    label: "CO₂ Reduced",
    icon: "🌍",
    color: "#7cff4d",
  },
  {
    value: 35,
    suffix: "%",
    label: "Energy Savings",
    icon: "⚡",
    color: "#23c8ff",
  },
  {
    value: 11.5,
    suffix: "M",
    label: "Jobs Created",
    icon: "👷",
    color: "#ffd24a",
  },
  {
    value: 130,
    suffix: "+",
    label: "Countries Adopting",
    icon: "🌐",
    color: "#7cff4d",
  },
];

const benefits = [
  {
    icon: "🌱",
    title: "Zero Emissions",
    desc: "Clean energy sources produce no greenhouse gases during operation, fighting climate change.",
  },
  {
    icon: "💰",
    title: "Cost Savings",
    desc: "Renewable energy costs have dropped 90% in the last decade, making clean power cheapest ever.",
  },
  {
    icon: "🔋",
    title: "Energy Independence",
    desc: "Local renewable sources reduce dependence on imported fossil fuels and volatile energy markets.",
  },
  {
    icon: "🌊",
    title: "Water Conservation",
    desc: "Solar and wind use minimal water compared to coal and nuclear power plants.",
  },
  {
    icon: "🏙️",
    title: "Cleaner Cities",
    desc: "Reduced air pollution from power generation means healthier urban environments.",
  },
  {
    icon: "♾️",
    title: "Infinite Supply",
    desc: "Sun, wind, and water are virtually inexhaustible — unlike fossil fuels that will eventually run out.",
  },
];

function Counter({
  target,
  suffix,
  color,
}: { target: number; suffix: string; color: string }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);
  const animRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - (1 - progress) ** 3;
            countRef.current = target * ease;
            setCount(countRef.current);
            if (progress < 1) {
              animRef.current = requestAnimationFrame(animate);
            }
          };
          animRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animRef.current);
    };
  }, [target]);

  const display = target < 10 ? count.toFixed(1) : Math.round(count).toString();

  return (
    <div ref={containerRef}>
      <span className="font-orbitron text-5xl font-black" style={{ color }}>
        {display}
        {suffix}
      </span>
    </div>
  );
}

export default function BenefitsSection() {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      className="py-24"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(124,255,77,0.04) 0%, transparent 70%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={sectionRef} className="section-reveal">
          <div className="text-center mb-16">
            <p
              className="text-xs font-orbitron tracking-[0.3em] uppercase mb-3"
              style={{ color: "#7cff4d" }}
            >
              Global Impact
            </p>
            <h2 className="font-orbitron font-bold text-3xl sm:text-4xl text-white tracking-wide">
              WHY RENEWABLE ENERGY?
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="glass-card rounded-xl p-6 text-center"
              >
                <div className="text-3xl mb-3">{m.icon}</div>
                <Counter target={m.value} suffix={m.suffix} color={m.color} />
                <p className="text-sm text-gray-400 mt-2 tracking-wider">
                  {m.label}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className="glass-card rounded-xl p-6 neon-glow-hover"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-2xl mb-3">{b.icon}</div>
                <h3 className="font-orbitron font-semibold text-sm tracking-wider text-white mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
