import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.2;
    if (atmosphereRef.current) atmosphereRef.current.rotation.y += delta * 0.15;
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshPhongMaterial
          color="#1a4a7a"
          emissive="#0a1f3a"
          shininess={30}
          wireframe={false}
        />
      </mesh>

      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1.51, 32, 32]} />
        <meshPhongMaterial
          color="#2d7a3a"
          transparent
          opacity={0.4}
          wireframe={true}
          wireframeLinewidth={0.5}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.65, 32, 32]} />
        <meshPhongMaterial
          color="#23c8ff"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {[0, 30, 60].map((angle) => (
        <mesh key={angle} rotation={[Math.PI / 2, (angle * Math.PI) / 180, 0]}>
          <torusGeometry args={[2.1 + (angle / 30) * 0.3, 0.008, 8, 100]} />
          <meshBasicMaterial
            color={
              angle === 0 ? "#7cff4d" : angle === 30 ? "#23c8ff" : "#ffd24a"
            }
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

function Particles() {
  const count = 200;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  return (
    <points>
      <primitive object={geo} />
      <pointsMaterial color="#7cff4d" size={0.04} transparent opacity={0.8} />
    </points>
  );
}

function GlobeScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} color="#23c8ff" intensity={1.5} />
      <pointLight position={[-10, -5, -5]} color="#7cff4d" intensity={0.8} />
      <Stars
        radius={80}
        depth={50}
        count={3000}
        factor={4}
        saturation={0}
        fade
      />
      <Earth />
      <Particles />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
    </>
  );
}

export default function HeroSection() {
  const handleScroll = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-16 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(35,200,255,0.08) 0%, transparent 60%), #0a0f14",
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,255,77,0.06) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(35,200,255,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid md:grid-cols-2 gap-8 items-center py-20">
        <div className="w-full h-[400px] md:h-[500px] order-2 md:order-1">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <Suspense fallback={null}>
              <GlobeScene />
            </Suspense>
          </Canvas>
        </div>

        <div className="order-1 md:order-2 flex flex-col gap-6">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase"
            style={{
              background: "rgba(124,255,77,0.1)",
              border: "1px solid rgba(124,255,77,0.3)",
              color: "#7cff4d",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[#7cff4d] animate-pulse" />
            Clean Energy Future
          </div>

          <h1 className="font-orbitron font-black leading-tight">
            <span className="block text-3xl sm:text-4xl lg:text-5xl text-white tracking-wider">
              POWERING THE FUTURE:
            </span>
            <span className="block text-3xl sm:text-4xl lg:text-5xl neon-text tracking-wider mt-1">
              RENEWABLE ENERGY
            </span>
            <span className="block text-3xl sm:text-4xl lg:text-5xl neon-cyan tracking-wider mt-1">
              REVOLUTION
            </span>
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed max-w-md">
            Explore cutting-edge sustainable solutions and their global impact.
            Discover how clean energy is reshaping the world.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => handleScroll("#solutions")}
              className="px-6 py-3 rounded-full font-orbitron font-semibold text-sm tracking-widest transition-all duration-300 hover:shadow-neon hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #7cff4d, #00ff88)",
                color: "#0a0f14",
              }}
              data-ocid="hero.primary_button"
            >
              DISCOVER SOLUTIONS
            </button>
            <button
              type="button"
              onClick={() => handleScroll("#india-map")}
              className="px-6 py-3 rounded-full font-orbitron font-semibold text-sm tracking-widest glass-card transition-all duration-300 hover:border-[#7cff4d]"
              style={{
                border: "1px solid rgba(124,255,77,0.4)",
                color: "#7cff4d",
              }}
              data-ocid="hero.secondary_button"
            >
              EXPLORE THE MAP
            </button>
          </div>

          <div
            className="flex flex-wrap gap-6 pt-4 border-t"
            style={{ borderColor: "rgba(124,255,77,0.15)" }}
          >
            {[
              { label: "Countries", value: "130+" },
              { label: "Jobs Created", value: "11.5M" },
              { label: "CO₂ Reduced", value: "2.8Gt" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-orbitron text-2xl font-bold neon-text">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 tracking-wider uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
