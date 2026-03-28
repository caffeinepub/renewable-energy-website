import { Menu, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Solutions", href: "#solutions" },
  { label: "India Map", href: "#india-map" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Quiz", href: "#quiz" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-card shadow-lg" : "bg-transparent"}`}
      style={{
        borderBottom: scrolled ? "1px solid rgba(124,255,77,0.15)" : "none",
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <button
          type="button"
          className="flex items-center gap-2"
          onClick={() => handleNav("#home")}
          data-ocid="nav.link"
        >
          <Zap className="w-6 h-6" style={{ color: "var(--neon-green)" }} />
          <span className="font-orbitron font-bold text-lg tracking-widest neon-text">
            SYNAPSE ENERGY
          </span>
        </button>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                type="button"
                onClick={() => handleNav(link.href)}
                className="text-xs uppercase tracking-widest font-medium text-gray-400 hover:text-[#7cff4d] transition-colors duration-200"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="md:hidden text-gray-400 hover:text-[#7cff4d]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden glass-card border-t border-[rgba(124,255,77,0.15)] px-4 py-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => handleNav(link.href)}
                  className="text-sm uppercase tracking-widest text-gray-300 hover:text-[#7cff4d] transition-colors w-full text-left"
                  data-ocid="nav.link"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
