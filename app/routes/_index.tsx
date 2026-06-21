import { useState, useEffect } from "react";
import { useConfigurables } from "~/modules/configurables";
import {
  Map,
  Swords,
  Zap,
  Globe,
  Cpu,
  Users,
  ChevronRight,
  Twitter,
  MessageCircle,
  Shield,
  Flame,
  Star,
  Crown,
  ArrowRight,
  CheckCircle,
  Loader2,
  Menu,
  X,
} from "lucide-react";

// ─── Icon map ─────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Map,
  Swords,
  Zap,
  Globe,
  Cpu,
  Users,
  Shield,
  Flame,
  Star,
  Crown,
};

function FeatureIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICON_MAP[name] ?? Zap;
  return <Icon className={className} />;
}

// ─── Waitlist form ────────────────────────────────────────────────────────────
function WaitlistForm({ placeholder, ctaLabel }: { placeholder: string; ctaLabel: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json() as { success: boolean; message?: string; error?: string };

      if (data.success) {
        setStatus("success");
        setMessage(data.message ?? "You're on the waitlist!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {status === "success" ? (
        <div className="flex items-center gap-3 bg-green-900/30 border border-green-500/40 rounded-2xl px-6 py-4">
          <CheckCircle className="text-green-400 shrink-0" size={22} />
          <p className="text-green-300 font-semibold">{message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 text-sm transition-all"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="shrink-0 px-6 py-3.5 bg-orange-500 hover:bg-orange-400 disabled:opacity-60 text-white font-bold rounded-xl transition-all flex items-center gap-2 justify-center text-sm"
            style={{ backgroundColor: "#f97316" }}
          >
            {status === "loading" ? (
              <><Loader2 size={16} className="animate-spin" /> Joining...</>
            ) : (
              <>{ctaLabel} <ArrowRight size={16} /></>
            )}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="mt-2 text-red-400 text-sm text-center">{message}</p>
      )}
    </div>
  );
}

// ─── Stats counter ────────────────────────────────────────────────────────────
function WaitlistCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/waitlist/count")
      .then((r) => r.json())
      .then((d: { count?: number }) => {
        if (typeof d.count === "number") setCount(d.count + 2847);
      })
      .catch(() => setCount(2847));
  }, []);

  if (count === null) return null;

  return (
    <div className="flex items-center gap-2 justify-center mt-4">
      <div className="flex -space-x-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-7 h-7 rounded-full border-2 border-orange-500/30 bg-gradient-to-br from-orange-400 to-red-600"
          />
        ))}
      </div>
      <span className="text-white/60 text-sm">
        <span className="text-orange-400 font-bold">{count.toLocaleString()}+</span> creators already signed up
      </span>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ appName, logoUrl }: { appName: string; logoUrl?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3 shadow-xl" : "py-5"
      }`}
      style={{ backgroundColor: scrolled ? "#0f172a" : "transparent" }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          {logoUrl ? (
            <img src={logoUrl} alt={appName} className="h-9 w-auto" />
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#f97316" }}>
                <Flame size={18} className="text-white" />
              </div>
              <span className="text-white font-black text-xl tracking-tight">{appName}</span>
            </div>
          )}
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {["Features", "How It Works", "Templates"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-white/70 hover:text-white text-sm font-medium transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#waitlist"
            className="px-5 py-2.5 text-sm font-bold rounded-xl text-white transition-all hover:opacity-90"
            style={{ backgroundColor: "#f97316" }}
          >
            Join Waitlist
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-1"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pt-4 pb-6 space-y-3" style={{ backgroundColor: "#0f172a" }}>
          {["Features", "How It Works", "Templates"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setMenuOpen(false)}
              className="block text-white/80 hover:text-white py-2 font-medium border-b border-white/10"
            >
              {item}
            </a>
          ))}
          <a
            href="#waitlist"
            onClick={() => setMenuOpen(false)}
            className="block text-center px-5 py-3 mt-2 text-sm font-bold rounded-xl text-white"
            style={{ backgroundColor: "#f97316" }}
          >
            Join Waitlist
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function IndexPage() {
  const { config, loading } = useConfigurables();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0f172a" }}>
        <Loader2 className="animate-spin text-orange-500" size={40} />
      </div>
    );
  }

  const appName = config?.appName ?? "ForgeRealms";
  const tagline = config?.tagline ?? "Build a real multiplayer strategy game. No code. Just imagination.";
  const heroHeading = config?.heroHeading ?? "Forge Your Kingdom.\nRule the Realm.";
  const heroSubheading = config?.heroSubheading ?? "The first AI-powered studio for indie game creators.";
  const heroCTALabel = config?.heroCTALabel ?? "Start Building Free";
  const featuresHeading = config?.featuresHeading ?? "Everything You Need";
  const featuresSubheading = config?.featuresSubheading ?? "";
  const features = config?.features ?? [];
  const howItWorksHeading = config?.howItWorksHeading ?? "How It Works";
  const steps = config?.steps ?? [];
  const templatesHeading = config?.templatesHeading ?? "Choose Your World";
  const mapTemplates = config?.mapTemplates ?? [];
  const waitlistHeading = config?.waitlistHeading ?? "Join the Waitlist";
  const waitlistSubheading = config?.waitlistSubheading ?? "";
  const waitlistCTALabel = config?.waitlistCTALabel ?? "Join the Waitlist";
  const waitlistPlaceholder = config?.waitlistPlaceholder ?? "Enter your email address";
  const footerTagline = config?.footerTagline ?? tagline;
  const twitterUrl = config?.twitterUrl ?? "#";
  const discordUrl = config?.discordUrl ?? "#";
  const showStats = config?.showStats ?? true;
  const logoUrl = config?.logoUrl ?? "";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8fafc" }}>
      <Navbar appName={appName} logoUrl={logoUrl} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-20"
        style={{ backgroundColor: "#0f172a" }}
      >
        {/* Background texture / glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[120px] opacity-20"
            style={{ backgroundColor: "#f97316" }}
          />
          <div
            className="absolute bottom-10 right-10 w-96 h-96 rounded-full blur-[100px] opacity-10"
            style={{ backgroundColor: "#f97316" }}
          />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(rgba(249,115,22,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.3) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Badge */}
        <div className="relative z-10 mb-8 flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest" style={{ borderColor: "#f9731640", backgroundColor: "#f9731615", color: "#fb923c" }}>
          <Flame size={12} />
          AI-Powered Game Creation Studio
        </div>

        {/* Heading */}
        <h1
          className="relative z-10 text-center text-white font-black leading-none mb-6 max-w-4xl"
          style={{
            fontSize: "clamp(3rem, 8vw, 5.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          {heroHeading.split("\n").map((line, i) => (
            <span key={i} className="block">
              {i === 1 ? (
                <span style={{ color: "#f97316" }}>{line}</span>
              ) : line}
            </span>
          ))}
        </h1>

        {/* Subheading */}
        <p
          className="relative z-10 text-center max-w-2xl mb-10 leading-relaxed"
          style={{ color: "#94a3b8", fontSize: "clamp(1rem, 2.5vw, 1.2rem)" }}
        >
          {heroSubheading}
        </p>

        {/* CTAs */}
        <div className="relative z-10 flex flex-col sm:flex-row gap-4 mb-12">
          <a
            href="#waitlist"
            className="group flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-lg transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: "#f97316" }}
          >
            <Flame size={20} />
            {heroCTALabel}
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#how-it-works"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white/80 hover:text-white text-lg border transition-all hover:border-orange-500/50"
            style={{ borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.05)" }}
          >
            See How It Works
          </a>
        </div>

        {/* Social proof */}
        {showStats && (
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            {[
              { label: "No coding required", icon: <CheckCircle size={16} className="text-green-400" /> },
              { label: "Real multiplayer games", icon: <CheckCircle size={16} className="text-green-400" /> },
              { label: "Ships in minutes", icon: <CheckCircle size={16} className="text-green-400" /> },
            ].map(({ label, icon }) => (
              <div key={label} className="flex items-center gap-2 text-white/60 text-sm">
                {icon}
                {label}
              </div>
            ))}
          </div>
        )}

        {/* Decorative game UI elements */}
        <div className="relative z-10 mt-16 w-full max-w-5xl">
          <div
            className="relative rounded-2xl overflow-hidden border"
            style={{ backgroundColor: "#1e2a4a", borderColor: "rgba(249,115,22,0.2)" }}
          >
            {/* Fake browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "#0f172a" }}>
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <div className="flex-1 mx-4 px-4 py-1 rounded-lg text-xs text-white/30" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                play.forgerealms.gg/ironthrone-732
              </div>
            </div>
            {/* Fake game map preview */}
            <div className="relative h-64 sm:h-80 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-30" style={{
                background: "radial-gradient(ellipse at 30% 40%, #1a4a2a 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, #2a1a0a 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, #0a1a3a 0%, transparent 80%)",
              }} />
              {/* Map grid */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: "linear-gradient(rgba(249,115,22,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.2) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }} />
              {/* Castle markers */}
              {[
                { top: "25%", left: "20%", label: "Castle Ironfeld", color: "#f97316" },
                { top: "55%", left: "65%", label: "Dragonspur", color: "#60a5fa" },
                { top: "35%", left: "55%", label: "Dark Keep", color: "#a78bfa" },
              ].map(({ top, left, label, color }) => (
                <div key={label} className="absolute flex flex-col items-center gap-1" style={{ top, left }}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center border-2 shadow-lg" style={{ backgroundColor: `${color}20`, borderColor: color }}>
                    <Crown size={14} style={{ color }} />
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full hidden sm:block" style={{ backgroundColor: "#0f172a", color }}>
                    {label}
                  </span>
                </div>
              ))}
              {/* Resource indicators */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                {[
                  { icon: "⚔️", count: "12,847", label: "Troops" },
                  { icon: "🏰", count: "Level 24", label: "Castle" },
                  { icon: "💰", count: "2.4M", label: "Gold" },
                ].map(({ icon, count, label }) => (
                  <div key={label} className="px-3 py-2 rounded-xl text-center" style={{ backgroundColor: "rgba(15,23,42,0.8)", border: "1px solid rgba(249,115,22,0.2)" }}>
                    <div className="text-base">{icon}</div>
                    <div className="text-white font-bold text-xs">{count}</div>
                    <div className="text-white/40 text-xs">{label}</div>
                  </div>
                ))}
              </div>
              {/* AI Generate label */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold" style={{ backgroundColor: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)", color: "#fb923c" }}>
                <Zap size={12} />
                AI Generated — 3 minutes ago
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ────────────────────────────────────────────────────── */}
      {showStats && (
        <div className="py-12 px-6" style={{ backgroundColor: "#1e2a4a" }}>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "10 min", label: "Average time to first game" },
              { value: "0", label: "Lines of code needed" },
              { value: "1,000+", label: "Concurrent players supported" },
              { value: "3", label: "Proven genre templates" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-black text-3xl sm:text-4xl text-white mb-1">{value}</div>
                <div className="text-sm" style={{ color: "#94a3b8" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── FEATURES ──────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-6" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-5" style={{ backgroundColor: "#fff7ed", color: "#f97316", border: "1px solid #fed7aa" }}>
              <Zap size={12} />
              Powered by AI
            </div>
            <h2 className="font-black mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "#1e2a4a", lineHeight: 1.1 }}>
              {featuresHeading}
            </h2>
            {featuresSubheading && (
              <p className="max-w-2xl mx-auto text-lg" style={{ color: "#64748b" }}>
                {featuresSubheading}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl border transition-all hover:shadow-xl hover:-translate-y-1"
                style={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#fff7ed", border: "1px solid #fed7aa" }}
                >
                  <FeatureIcon name={feature.icon} className="text-orange-500" />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: "#1e2a4a" }}>
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-6" style={{ backgroundColor: "#0f172a" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-5" style={{ backgroundColor: "rgba(249,115,22,0.1)", color: "#fb923c", border: "1px solid rgba(249,115,22,0.2)" }}>
              <Shield size={12} />
              Simple Process
            </div>
            <h2 className="font-black text-white mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.1 }}>
              {howItWorksHeading}
            </h2>
          </div>

          <div className="space-y-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex gap-6 p-7 rounded-2xl border transition-all hover:border-orange-500/30"
                style={{ backgroundColor: "#1e2a4a", borderColor: "rgba(255,255,255,0.08)" }}
              >
                <div
                  className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center font-black text-xl"
                  style={{ backgroundColor: "rgba(249,115,22,0.15)", color: "#f97316", border: "1px solid rgba(249,115,22,0.25)" }}
                >
                  {step.number}
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white mb-2">{step.title}</h3>
                  <p style={{ color: "#94a3b8" }} className="leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAP TEMPLATES ───────────────────────────────────────────────────── */}
      <section id="templates" className="py-24 px-6" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-5" style={{ backgroundColor: "#fff7ed", color: "#f97316", border: "1px solid #fed7aa" }}>
              <Map size={12} />
              Genre Templates
            </div>
            <h2 className="font-black mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "#1e2a4a", lineHeight: 1.1 }}>
              {templatesHeading}
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: "#64748b" }}>
              Start from a proven template. Customize every faction, resource, and mechanic to make it yours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {mapTemplates.map((template, i) => (
              <div
                key={i}
                className="group rounded-2xl overflow-hidden border transition-all hover:shadow-2xl hover:-translate-y-1"
                style={{ backgroundColor: "#1e2a4a", borderColor: "#e2e8f0" }}
              >
                {/* Template visual */}
                <div
                  className="h-48 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: [
                      "linear-gradient(135deg, #1a3a1a 0%, #0f2a0f 50%, #1e2a4a 100%)",
                      "linear-gradient(135deg, #2a1a0a 0%, #1a0a0a 50%, #1e2a4a 100%)",
                      "linear-gradient(135deg, #0a1a3a 0%, #0a0a2a 50%, #0f172a 100%)",
                    ][i % 3],
                  }}
                >
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: "linear-gradient(rgba(249,115,22,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.3) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }} />
                  <div className="relative z-10 text-center">
                    <Crown size={48} style={{ color: "#f97316" }} className="mx-auto mb-2 drop-shadow-lg" />
                    <span className="text-white font-black text-xl">{template.name}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
                      style={{ backgroundColor: "rgba(249,115,22,0.15)", color: "#fb923c", border: "1px solid rgba(249,115,22,0.2)" }}
                    >
                      {template.genre}
                    </span>
                    <span className="text-xs flex items-center gap-1" style={{ color: "#94a3b8" }}>
                      <Users size={12} />
                      {template.players}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "#94a3b8" }}>
                    {template.description}
                  </p>
                  <a
                    href="#waitlist"
                    className="flex items-center gap-2 w-full justify-center py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                    style={{ backgroundColor: "#f97316", color: "#ffffff" }}
                  >
                    Build This World
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM / SOLUTION CALLOUT ──────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: "#1e2a4a" }}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8" style={{ backgroundColor: "rgba(249,115,22,0.1)", color: "#fb923c", border: "1px solid rgba(249,115,22,0.2)" }}>
            <Swords size={12} />
            The Problem We Solve
          </div>
          <h2 className="font-black text-white mb-6" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.1 }}>
            Big studios spend <span style={{ color: "#f97316" }}>$5M and 5 years</span> to build<br className="hidden sm:block" /> what you can now build in minutes.
          </h2>
          <p className="text-lg max-w-3xl mx-auto mb-12" style={{ color: "#94a3b8" }}>
            Mobile Strike. Kings of Avalon. Throne: Kingdom at War. These are billion-dollar games built by 50-person teams. The tools are deliberately complex — big studios like it that way. ForgeRealms tears down that wall.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { before: "$500K–$5M budget", after: "Free to start", icon: "💰" },
              { before: "10–50 person team", after: "Just you + AI", icon: "👥" },
              { before: "2–5 years of dev", after: "Minutes to launch", icon: "⏱️" },
            ].map(({ before, after, icon }) => (
              <div key={before} className="p-6 rounded-2xl" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="text-3xl mb-4">{icon}</div>
                <div className="text-sm mb-2 line-through" style={{ color: "#64748b" }}>{before}</div>
                <div className="font-bold text-lg" style={{ color: "#f97316" }}>{after}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAITLIST ───────────────────────────────────────────────────────── */}
      <section id="waitlist" className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: "#0f172a" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[120px] opacity-15"
            style={{ backgroundColor: "#f97316" }}
          />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8" style={{ backgroundColor: "rgba(249,115,22,0.1)", color: "#fb923c", border: "1px solid rgba(249,115,22,0.2)" }}>
            <Star size={12} />
            Early Access
          </div>
          <h2 className="font-black text-white mb-5" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.1 }}>
            {waitlistHeading}
          </h2>
          <p className="text-lg mb-10" style={{ color: "#94a3b8" }}>
            {waitlistSubheading}
          </p>
          <WaitlistForm placeholder={waitlistPlaceholder} ctaLabel={waitlistCTALabel} />
          <WaitlistCounter />
          <p className="mt-5 text-xs" style={{ color: "#475569" }}>
            No spam. No credit card required. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="py-12 px-6 border-t" style={{ backgroundColor: "#0f172a", borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#f97316" }}>
              <Flame size={18} className="text-white" />
            </div>
            <div>
              <div className="text-white font-black text-lg">{appName}</div>
              <div className="text-xs" style={{ color: "#475569" }}>{footerTagline}</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {twitterUrl && (
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:opacity-80"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8" }}
                aria-label="Twitter/X"
              >
                <Twitter size={16} />
              </a>
            )}
            {discordUrl && (
              <a
                href={discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:opacity-80"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8" }}
                aria-label="Discord"
              >
                <MessageCircle size={16} />
              </a>
            )}
          </div>

          <div className="text-xs" style={{ color: "#475569" }}>
            &copy; {new Date().getFullYear()} {appName}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
