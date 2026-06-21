/*
 * Default Configurable Data — seeded into Mongo on first boot.
 *
 * BEFORE EDITING: read ./RULES.md (especially R5: schema and defaults must
 * stay in sync) and ./configurables.schema.ts. For per-type schema and
 * default-value samples, see RULES.md §5 "Field Type Reference".
 */

export type TBrandColor = {
  // Base
  background: string;
  foreground: string;
  // Card
  card: string;
  cardForeground: string;
  // Popover
  popover: string;
  popoverForeground: string;
  // Primary
  primary: string;
  primaryForeground: string;
  // Secondary
  secondary: string;
  secondaryForeground: string;
  // Muted
  muted: string;
  mutedForeground: string;
  // Accent
  accent: string;
  accentForeground: string;
  // Destructive
  destructive: string;
  destructiveForeground: string;
  // Border / Input / Ring
  border: string;
  input: string;
  ring: string;
  // Charts
  chart1?: string;
  chart2?: string;
  chart3?: string;
  chart4?: string;
  chart5?: string;
  // Navbar
  navbarBackground: string;
  // Sidebar
  sidebarBackground: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
};

export type TFont = {
  headingFont: string;
  textFont: string;
};

export type TFeature = {
  icon: string;
  title: string;
  description: string;
};

export type TStep = {
  number: string;
  title: string;
  description: string;
};

export type TMapTemplate = {
  name: string;
  genre: string;
  description: string;
  players: string;
  imageUrl?: string;
};

export type TDefaultConfigurableData = {
  appName: string;
  logoUrl: string;
  brandColor: TBrandColor;
  font: TFont;
  // Hero
  tagline?: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroCTALabel?: string;
  heroImageUrl?: string;
  // Features
  featuresHeading?: string;
  featuresSubheading?: string;
  features?: TFeature[];
  // How it works
  howItWorksHeading?: string;
  steps?: TStep[];
  // Templates
  templatesHeading?: string;
  mapTemplates?: TMapTemplate[];
  // Waitlist
  waitlistHeading?: string;
  waitlistSubheading?: string;
  waitlistCTALabel?: string;
  waitlistPlaceholder?: string;
  // Footer/Social
  footerTagline?: string;
  twitterUrl?: string;
  discordUrl?: string;
  // Feature flags
  showTestimonials?: boolean;
  showStats?: boolean;
};

export const defaultConfigurablesData: TDefaultConfigurableData = {
  appName: "ForgeRealms",
  logoUrl: "",
  brandColor: {
    // Base
    background:        "#f8fafc",
    foreground:        "#0f172a",
    // Card
    card:              "#ffffff",
    cardForeground:    "#1e2a4a",
    // Popover
    popover:           "#ffffff",
    popoverForeground: "#0f172a",
    // Primary
    primary:           "#f97316",
    primaryForeground: "#ffffff",
    // Secondary
    secondary:           "#1e2a4a",
    secondaryForeground: "#ffffff",
    // Muted
    muted:           "#f1f5f9",
    mutedForeground: "#64748b",
    // Accent
    accent:           "#fff7ed",
    accentForeground: "#1e2a4a",
    // Destructive
    destructive:           "#ef4444",
    destructiveForeground: "#fafafa",
    // Border / Input / Ring
    border: "#e2e8f0",
    input:  "#e2e8f0",
    ring:   "#f97316",
    // Charts
    chart1: "#f97316",
    chart2: "#ea580c",
    chart3: "#1e2a4a",
    chart4: "#d4a017",
    chart5: "#0f172a",
    // Navbar
    navbarBackground: "#0f172a",
    // Sidebar
    sidebarBackground:        "#1e2a4a",
    sidebarForeground:        "#f8fafc",
    sidebarPrimary:           "#f97316",
    sidebarPrimaryForeground: "#ffffff",
    sidebarAccent:            "#0f172a",
    sidebarAccentForeground:  "#f8fafc",
    sidebarBorder:            "#334155",
    sidebarRing:              "#f97316",
  },
  font: {
    headingFont: "Montserrat",
    textFont: "Inter",
  },
  // ── ForgeRealms Content ────────────────────────────────────────────────
  tagline: "Build a real multiplayer strategy game. No code. Just imagination.",
  heroHeading: "Forge Your Kingdom.\nRule the Realm.",
  heroSubheading: "The first AI-powered studio where indie creators build real, deployable multiplayer strategy games — no team, no code, no $2M budget.",
  heroCTALabel: "Start Building Free",
  heroImageUrl: "",
  featuresHeading: "Everything You Need to Launch a Real Game",
  featuresSubheading: "Our AI agents handle every layer — from world generation to multiplayer server setup — so you stay in creative control.",
  features: [
    {
      icon: "Map",
      title: "Genre-Authentic Map Templates",
      description: "Start from proven templates modeled on Mobile Strike, Kings of Avalon, and Throne: Kingdom at War. Pick your world, own your vision.",
    },
    {
      icon: "Swords",
      title: "AI Faction & Unit Designer",
      description: "Define your factions, units, and combat mechanics through conversation. Our AI designs and balances everything automatically.",
    },
    {
      icon: "Zap",
      title: "One-Click Game Generation",
      description: "Hit Generate and receive a fully playable multiplayer game — complete with persistent state, alliances, resources, and real-time combat.",
    },
    {
      icon: "Globe",
      title: "Live Multiplayer Server",
      description: "Every game ships with a dedicated multiplayer server. Real players, real-time interaction, real alliances — not a demo.",
    },
    {
      icon: "Cpu",
      title: "AI Balance Tuning",
      description: "Our AI continuously monitors and tunes game balance so your strategy game stays engaging long after launch.",
    },
    {
      icon: "Users",
      title: "Built for Indie Creators",
      description: "No 50-person team required. No engine expertise. If you can imagine it, ForgeRealms can build it.",
    },
  ],
  howItWorksHeading: "From Idea to Live Game in Minutes",
  steps: [
    {
      number: "01",
      title: "Pick Your Map Template",
      description: "Choose from genre-authentic templates — medieval kingdoms, sci-fi empires, or post-apocalyptic warzones — each pre-built with proven multiplayer mechanics.",
    },
    {
      number: "02",
      title: "Customize Your World",
      description: "Name your factions, design your units, set your resource economy, and write your lore — all through a conversational AI interface.",
    },
    {
      number: "03",
      title: "Hit Generate",
      description: "Our AI toolchain orchestrates world generation, unit balancing, event scripting, and multiplayer server setup in one click.",
    },
    {
      number: "04",
      title: "Launch & Play",
      description: "Share your live game URL. Real players join, form alliances, gather resources, and wage war — in your world, by your rules.",
    },
  ],
  templatesHeading: "Choose Your World",
  mapTemplates: [
    {
      name: "Iron Throne",
      genre: "Medieval Fantasy",
      description: "Castles, knights, and dragon-haunted lands. A classic kingdom-builder with alliance warfare and siege mechanics.",
      players: "Up to 1,000 players",
      imageUrl: "",
    },
    {
      name: "Steel Dominion",
      genre: "Modern Warfare",
      description: "Command military bases, deploy strike forces, and dominate the global theater. Inspired by Mobile Strike.",
      players: "Up to 2,000 players",
      imageUrl: "",
    },
    {
      name: "Void Ascendancy",
      genre: "Sci-Fi Empire",
      description: "Colonize star systems, build fleets, and forge galactic alliances in an AI-generated universe.",
      players: "Up to 5,000 players",
      imageUrl: "",
    },
  ],
  waitlistHeading: "Be First to Forge Your Realm",
  waitlistSubheading: "Join thousands of indie creators on the early access waitlist. Get priority access, exclusive templates, and founder-tier pricing.",
  waitlistCTALabel: "Join the Waitlist",
  waitlistPlaceholder: "Enter your email address",
  footerTagline: "Build a real multiplayer strategy game. No code. Just imagination.",
  twitterUrl: "https://twitter.com/forgerealms",
  discordUrl: "https://discord.gg/forgerealms",
  showTestimonials: false,
  showStats: true,
};
