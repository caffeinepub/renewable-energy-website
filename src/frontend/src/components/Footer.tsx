import { Zap } from "lucide-react";

const navLinks = [
  { label: "About", href: "#home" },
  { label: "Solutions", href: "#solutions" },
  { label: "India Map", href: "#india-map" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Quiz", href: "#quiz" },
];

function SocialIcon({
  children,
  href,
}: { children: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full flex items-center justify-center glass-card transition-all duration-300 hover:scale-110 hover:border-[#7cff4d]"
      style={{ border: "1px solid rgba(124,255,77,0.2)" }}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="py-16 mt-8"
      style={{
        borderTop: "1px solid rgba(124,255,77,0.12)",
        background: "rgba(10,15,20,0.8)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6" style={{ color: "var(--neon-green)" }} />
              <span className="font-orbitron font-bold text-lg tracking-widest neon-text">
                SYNAPSE ENERGY
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Empowering a sustainable future through interactive education
              about renewable energy technologies and their global impact.
            </p>
          </div>

          <div>
            <h4 className="font-orbitron text-xs tracking-widest uppercase text-gray-400 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => handleNav(link.href)}
                    className="text-sm text-gray-500 hover:text-[#7cff4d] transition-colors"
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-orbitron text-xs tracking-widest uppercase text-gray-400 mb-4">
              Follow Us
            </h4>
            <div className="flex gap-3 mb-6">
              <SocialIcon href="https://twitter.com">
                <svg
                  className="w-4 h-4"
                  style={{ color: "#23c8ff" }}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <title>Twitter / X</title>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://linkedin.com">
                <svg
                  className="w-4 h-4"
                  style={{ color: "#0088ff" }}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <title>LinkedIn</title>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://youtube.com">
                <svg
                  className="w-4 h-4"
                  style={{ color: "#ff4444" }}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <title>YouTube</title>
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </SocialIcon>
            </div>
          </div>
        </div>

        <div
          className="pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-center text-xs text-gray-600">
            &copy; {year}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#7cff4d] transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
