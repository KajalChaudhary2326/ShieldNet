import { useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, BarChart3, Eye, Menu, Shield, X } from "lucide-react";
import { OfflineStatusBadge } from "./OfflineStatusBadge";
import { ThemeToggle } from "./ThemeToggle";
import { Sparkle3DBackground } from "./Sparkle3DBackground";
import { AuthBar } from "./AuthBar";

interface NavItem {
  to: string;
  label: string;
  icon?: any;
  end?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About", end: false },
  { to: "/architecture", label: "Architecture", end: false },
  { to: "/dashboard/explainability", label: "Explainability", icon: Eye, end: false },
  { to: "/dashboard/baseline", label: "Baseline Comparison", icon: BarChart3, end: false },
  { to: "/dashboard", label: "Live Demo", end: false },
];

export function Layout({ children }: { children: ReactNode }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const location = useLocation();

  const isNavActive = (to: string, end?: boolean) => {
    if (end) {
      return location.pathname === to;
    }
    if (to === "/dashboard") {
      return (
        location.pathname.startsWith("/dashboard") &&
        !location.pathname.startsWith("/dashboard/explainability") &&
        !location.pathname.startsWith("/dashboard/baseline")
      );
    }
    return location.pathname === to || location.pathname.startsWith(`${to}/`);
  };

  return (
    <div className="sentinel-app min-h-screen bg-grid" style={{ backgroundColor: "var(--color-base)" }}>
      <Sparkle3DBackground />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[var(--color-accent)] focus:px-4 focus:py-2 focus:text-[var(--color-base)]"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b backdrop-blur-sm" style={{ borderColor: "var(--color-border)", backgroundColor: "color-mix(in srgb, var(--color-base) 88%, transparent)" }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setIsMobileNavOpen(false)}>
            <div
              className="flex h-9 w-9 items-center justify-center rounded-md"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 16%, transparent)" }}
            >
              <Shield size={16} style={{ color: "var(--color-accent)" }} />
            </div>
            <div>
              <div className="text-base font-semibold tracking-tight text-[var(--color-text-primary)]">SHIELDNET</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">SIH26153 · NTRO</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 xl:gap-1.5 lg:flex">
            {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => {
              const active = isNavActive(to, end);
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsMobileNavOpen(false)}
                  className={`nav-glow inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs xl:text-sm font-medium transition-colors ${
                    active
                      ? "active text-[var(--color-accent)] font-semibold"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  }`}
                  style={{
                    backgroundColor: active ? "color-mix(in srgb, var(--color-accent) 12%, transparent)" : "transparent",
                  }}
                >
                  {Icon && <Icon size={14} className="opacity-80 shrink-0" />}
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex shrink-0">
            <ThemeToggle />
            <OfflineStatusBadge />
            <AuthBar />
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--color-accent)] px-3.5 py-2 text-sm font-medium text-[var(--color-base)] transition-opacity hover:opacity-90 shadow-sm"
            >
              Try Live Demo
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-label="Toggle navigation menu"
              className="inline-flex items-center justify-center rounded-md border p-2 glow-box"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}
              onClick={() => setIsMobileNavOpen((prev) => !prev)}
            >
              {isMobileNavOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {isMobileNavOpen && (
          <div className="border-t px-4 py-3 lg:hidden" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-panel)" }}>
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => {
                const active = isNavActive(to, end);
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setIsMobileNavOpen(false)}
                    className={`nav-glow inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "active text-[var(--color-accent)] font-semibold"
                        : "text-[var(--color-text-secondary)]"
                    }`}
                    style={{
                      backgroundColor: active ? "color-mix(in srgb, var(--color-accent) 12%, transparent)" : "transparent",
                    }}
                  >
                    {Icon && <Icon size={15} className="opacity-80 shrink-0" />}
                    <span>{label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="mt-3 flex items-center justify-between gap-3 border-t pt-3" style={{ borderColor: "var(--color-border)" }}>
              <OfflineStatusBadge />
              <Link
                to="/dashboard"
                onClick={() => setIsMobileNavOpen(false)}
                className="inline-flex items-center gap-2 rounded-md bg-[var(--color-accent)] px-3 py-2 text-sm font-medium text-[var(--color-base)]"
              >
                Try Live Demo
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </header>

      <main id="main-content" className="relative z-10 mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="relative z-10 border-t" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-panel)" }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-base font-semibold text-[var(--color-text-primary)]">Forecasting attacks before they complete.</div>
              <div className="mt-1 text-sm text-[var(--color-text-secondary)]">SHIELDNET helps defenders see the next state of the network before compromise.</div>
            </div>
            <div className="inline-flex w-fit items-center rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]" style={{ borderColor: "var(--color-border)" }}>
              ShieldNet · NTRO · Blockchain &amp; Cybersecurity
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t pt-4 text-sm md:flex-row md:items-center md:justify-between" style={{ borderColor: "var(--color-border)" }}>
            <div className="font-mono text-xs text-[var(--color-text-muted)]">
              Offline Neural World Model Architecture (Constraint C4 Compliant)
            </div>
            <div className="flex flex-wrap items-center gap-4 text-[var(--color-text-muted)]">
              <Link to="/" className="hover:text-[var(--color-text-primary)]">Home</Link>
              <Link to="/about" className="hover:text-[var(--color-text-primary)]">About</Link>
              <Link to="/architecture" className="hover:text-[var(--color-text-primary)]">Architecture</Link>
              <Link to="/dashboard/explainability" className="hover:text-[var(--color-text-primary)]">Explainability</Link>
              <Link to="/dashboard/baseline" className="hover:text-[var(--color-text-primary)]">Baseline Comparison</Link>
              <Link to="/dashboard" className="hover:text-[var(--color-text-primary)]">Live Demo</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

