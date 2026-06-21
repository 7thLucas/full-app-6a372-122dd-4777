import { useEffect, useMemo, useState } from "react";
import {
  Shield,
  Zap,
  Crosshair,
  Bomb,
  Skull,
  Cpu,
  Star,
  Crown,
  Swords,
  Flame,
  Filter,
  ArrowLeft,
  Loader2,
} from "lucide-react";

// ─── Types (mirror the backend models) ──────────────────────────────────────────
interface StatBlock {
  attack: number;
  defense: number;
  speed: number;
  range: number;
  hp: number;
}

interface FactionUnit {
  name: string;
  roleKey: string;
  flavor: string;
  stats: StatBlock;
  icon?: string;
}

interface Faction {
  key: string;
  name: string;
  tone: string;
  era: string;
  artStyle: string;
  lore: string;
  accentColor?: string;
  icon?: string;
  units: FactionUnit[];
}

interface TroopRole {
  key: string;
  name: string;
  tagline: string;
  description: string;
  baseStats: StatBlock;
  strongAgainst?: string | null;
  weakAgainst?: string | null;
  structureSpecialist?: boolean;
  accentColor?: string;
  icon?: string;
}

interface SkinRoleOverride {
  roleKey: string;
  name: string;
  flavor: string;
  icon?: string;
}

interface Skin {
  key: string;
  name: string;
  description: string;
  accentColor?: string;
  icon?: string;
  roleOverrides: SkinRoleOverride[];
}

// ─── Icon map ───────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Zap,
  Crosshair,
  Bomb,
  Skull,
  Cpu,
  Star,
  Crown,
  Swords,
  Flame,
};

function Icon({ name, className }: { name?: string; className?: string }) {
  const Cmp = ICON_MAP[name ?? "Swords"] ?? Swords;
  return <Cmp className={className} />;
}

const ROLE_ORDER = ["cavalry", "ranged", "infantry", "siege"];
const ROLE_LABEL: Record<string, string> = {
  cavalry: "Cavalry",
  ranged: "Ranged",
  infantry: "Infantry",
  siege: "Siege",
};

const TONE_STYLES: Record<string, string> = {
  "kid-friendly": "bg-pink-500/15 text-pink-300 border-pink-400/40",
  balanced: "bg-orange-500/15 text-orange-300 border-orange-400/40",
  hardcore: "bg-cyan-500/15 text-cyan-300 border-cyan-400/40",
};

// ─── Stat bar ───────────────────────────────────────────────────────────────────
function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  const pct = Math.min(100, Math.round((value / 160) * 100));
  return (
    <div className="flex items-center gap-2">
      <span className="w-12 shrink-0 text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="w-7 shrink-0 text-right text-[10px] font-bold tabular-nums text-slate-300">{value}</span>
    </div>
  );
}

// ─── Unit card ──────────────────────────────────────────────────────────────────
function UnitCard({
  unit,
  accent,
  skin,
}: {
  unit: FactionUnit;
  accent: string;
  skin: Skin | null;
}) {
  const override = skin?.roleOverrides.find((o) => o.roleKey === unit.roleKey) ?? null;
  const displayName = override ? override.name : unit.name;
  const displayFlavor = override ? override.flavor : unit.flavor;
  const displayIcon = override ? override.icon : unit.icon;
  const tint = skin ? skin.accentColor ?? "#84cc16" : accent;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#16213e]/70 p-4 transition-colors hover:border-white/25">
      <div className="mb-2 flex items-center justify-between">
        <span
          className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider"
          style={{ backgroundColor: `${accent}22`, color: accent }}
        >
          {ROLE_LABEL[unit.roleKey] ?? unit.roleKey}
        </span>
        <div
          className="flex h-8 w-8 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${tint}22`, color: tint }}
        >
          <Icon name={displayIcon} className="h-4 w-4" />
        </div>
      </div>

      <h4 className="text-base font-black leading-tight text-white">{displayName}</h4>
      <p className="mb-3 mt-0.5 text-xs leading-snug text-slate-400">{displayFlavor}</p>

      <div className="space-y-1">
        <StatBar label="ATK" value={unit.stats.attack} color={accent} />
        <StatBar label="DEF" value={unit.stats.defense} color={accent} />
        <StatBar label="SPD" value={unit.stats.speed} color={accent} />
        <StatBar label="RNG" value={unit.stats.range} color={accent} />
        <StatBar label="HP" value={unit.stats.hp} color={accent} />
      </div>
    </div>
  );
}

// ─── Faction card ───────────────────────────────────────────────────────────────
function FactionCard({ faction, skin }: { faction: Faction; skin: Skin | null }) {
  const accent = faction.accentColor ?? "#f97316";
  const units = [...faction.units].sort(
    (a, b) => ROLE_ORDER.indexOf(a.roleKey) - ROLE_ORDER.indexOf(b.roleKey),
  );

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#1e2a4a] shadow-xl">
      <div className="border-b border-white/10 p-5" style={{ background: `linear-gradient(135deg, ${accent}1f, transparent)` }}>
        <div className="flex items-start gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
            style={{ backgroundColor: `${accent}26`, color: accent }}
          >
            <Icon name={faction.icon} className="h-7 w-7" />
          </div>
          <div className="min-w-0">
            <h3 className="text-2xl font-black leading-tight text-white">{faction.name}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
                  TONE_STYLES[faction.tone] ?? "bg-white/10 text-slate-300 border-white/20"
                }`}
              >
                {faction.tone}
              </span>
              <span className="rounded-full border border-white/20 bg-white/5 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-slate-300">
                {faction.era}
              </span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-300">{faction.lore}</p>
        <p className="mt-2 text-xs italic leading-relaxed text-slate-500">{faction.artStyle}</p>
      </div>

      <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2">
        {units.map((unit) => (
          <UnitCard key={unit.roleKey} unit={unit} accent={accent} skin={skin} />
        ))}
      </div>
    </article>
  );
}

// ─── Counter triangle panel ─────────────────────────────────────────────────────
function RolePanel({ roles }: { roles: TroopRole[] }) {
  if (roles.length === 0) return null;
  return (
    <section className="mb-10 rounded-2xl border border-white/10 bg-[#16213e]/60 p-6">
      <h2 className="mb-1 text-xl font-black text-white">The Four-Role System</h2>
      <p className="mb-5 text-sm text-slate-400">
        The shared balance backbone. Counter triangle: Cavalry &gt; Ranged &gt; Infantry &gt; Cavalry. Siege specialises vs structures.
      </p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        {[...roles]
          .sort((a, b) => ROLE_ORDER.indexOf(a.key) - ROLE_ORDER.indexOf(b.key))
          .map((role) => {
            const accent = role.accentColor ?? "#f97316";
            return (
              <div key={role.key} className="rounded-2xl border border-white/10 bg-[#1e2a4a] p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${accent}26`, color: accent }}
                  >
                    <Icon name={role.icon} className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">{role.name}</h3>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{role.tagline}</p>
                  </div>
                </div>
                <p className="mb-3 text-xs leading-snug text-slate-400">{role.description}</p>
                <div className="flex flex-wrap gap-1.5 text-[10px] font-bold">
                  {role.structureSpecialist ? (
                    <span className="rounded-full bg-yellow-500/15 px-2 py-0.5 text-yellow-300">vs Structures</span>
                  ) : (
                    <>
                      <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-300">
                        beats {ROLE_LABEL[role.strongAgainst ?? ""] ?? "—"}
                      </span>
                      <span className="rounded-full bg-rose-500/15 px-2 py-0.5 text-rose-300">
                        loses to {ROLE_LABEL[role.weakAgainst ?? ""] ?? "—"}
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────────
export default function FactionsPage() {
  const [factions, setFactions] = useState<Faction[]>([]);
  const [roles, setRoles] = useState<TroopRole[]>([]);
  const [skins, setSkins] = useState<Skin[]>([]);
  const [loading, setLoading] = useState(true);

  const [toneFilter, setToneFilter] = useState<string>("all");
  const [eraFilter, setEraFilter] = useState<string>("all");
  const [zombieOn, setZombieOn] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [fRes, rRes, sRes] = await Promise.all([
          fetch("/api/factions").then((r) => r.json()),
          fetch("/api/troop-roles").then((r) => r.json()),
          fetch("/api/skins").then((r) => r.json()),
        ]);
        if (cancelled) return;
        setFactions(fRes?.data ?? []);
        setRoles(rRes?.data ?? []);
        setSkins(sRes?.data ?? []);
      } catch {
        // network errors leave empty state
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const zombieSkin = useMemo(() => skins.find((s) => s.key === "silly-zombies") ?? null, [skins]);
  const activeSkin = zombieOn ? zombieSkin : null;

  const tones = useMemo(() => Array.from(new Set(factions.map((f) => f.tone))), [factions]);
  const eras = useMemo(() => Array.from(new Set(factions.map((f) => f.era))), [factions]);

  const visible = factions.filter(
    (f) => (toneFilter === "all" || f.tone === toneFilter) && (eraFilter === "all" || f.era === eraFilter),
  );

  return (
    <div className="min-h-screen bg-[#1e2a4a] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#16213e]/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> ForgeRealms
          </a>
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-500/15 px-3 py-1 text-xs font-black uppercase tracking-wider text-orange-300">
            <Flame className="h-3.5 w-3.5" /> Faction Library
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
            Faction <span className="text-orange-500">Library</span>
          </h1>
          <p className="mt-3 max-w-2xl text-base text-slate-300">
            Three themed armies, one balance backbone. Every faction fields one unit per troop role, all inheriting the same
            role base stats — so they are perfectly matched against each other.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32 text-slate-400">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Summoning the armies...
          </div>
        ) : (
          <>
            <RolePanel roles={roles} />

            {/* Controls */}
            <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#16213e]/60 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <Filter className="h-3.5 w-3.5" /> Filter
                </span>
                <select
                  value={toneFilter}
                  onChange={(e) => setToneFilter(e.target.value)}
                  className="rounded-xl border border-white/15 bg-[#1e2a4a] px-3 py-1.5 text-sm font-semibold text-white outline-none focus:border-orange-400"
                >
                  <option value="all">All tones</option>
                  {tones.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <select
                  value={eraFilter}
                  onChange={(e) => setEraFilter(e.target.value)}
                  className="rounded-xl border border-white/15 bg-[#1e2a4a] px-3 py-1.5 text-sm font-semibold text-white outline-none focus:border-orange-400"
                >
                  <option value="all">All eras</option>
                  {eras.map((er) => (
                    <option key={er} value={er}>
                      {er}
                    </option>
                  ))}
                </select>
              </div>

              {/* Zombie skin toggle */}
              <button
                type="button"
                onClick={() => setZombieOn((v) => !v)}
                disabled={!zombieSkin}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-black uppercase tracking-wider transition-colors ${
                  zombieOn
                    ? "border-lime-400/60 bg-lime-500/20 text-lime-300"
                    : "border-white/15 bg-[#1e2a4a] text-slate-300 hover:border-lime-400/40"
                } disabled:cursor-not-allowed disabled:opacity-40`}
                title="Apply the Silly Zombies skin — same stats, just shamblier"
              >
                <Skull className="h-4 w-4" />
                {zombieOn ? "Zombie Skin: ON" : "Zombie Skin: OFF"}
              </button>
            </div>

            {activeSkin && (
              <div className="mb-6 flex items-start gap-3 rounded-2xl border border-lime-400/40 bg-lime-500/10 p-4">
                <Skull className="mt-0.5 h-5 w-5 shrink-0 text-lime-300" />
                <p className="text-sm text-lime-100">
                  <span className="font-black">{activeSkin.name} skin active.</span> {activeSkin.description} The stat bars below
                  are unchanged — proving the skin is purely cosmetic and reuses each unit&apos;s exact role stats.
                </p>
              </div>
            )}

            {visible.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-[#16213e]/60 p-12 text-center text-slate-400">
                No factions match those filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {visible.map((faction) => (
                  <FactionCard key={faction.key} faction={faction} skin={activeSkin} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
