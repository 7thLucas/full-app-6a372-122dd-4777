import { createLogger } from "~/lib/logger";
import { TroopRoleModel } from "./troop-role.model";
import { FactionModel } from "./faction.model";
import { SkinModel } from "./skin.model";

const logger = createLogger("FactionsSeed");

// ─── Four-role troop system: the shared balance backbone ────────────────────────
// Counter triangle: Cavalry > Ranged > Infantry > Cavalry.
// Siege specializes vs structures.
const TROOP_ROLES = [
  {
    key: "cavalry",
    name: "Cavalry",
    tagline: "Fast flanking shock",
    description:
      "High speed and attack, low range. Cavalry rides down ranged lines before they can volley, but breaks against a braced infantry wall.",
    baseStats: { attack: 85, defense: 45, speed: 95, range: 10, hp: 120 },
    strongAgainst: "ranged",
    weakAgainst: "infantry",
    structureSpecialist: false,
    accentColor: "#f97316",
    icon: "Zap",
  },
  {
    key: "ranged",
    name: "Ranged",
    tagline: "Distance damage",
    description:
      "High range, low defense. Ranged shreds slow infantry from afar, but folds the moment fast cavalry closes the gap.",
    baseStats: { attack: 70, defense: 30, speed: 50, range: 90, hp: 80 },
    strongAgainst: "infantry",
    weakAgainst: "cavalry",
    structureSpecialist: false,
    accentColor: "#38bdf8",
    icon: "Crosshair",
  },
  {
    key: "infantry",
    name: "Infantry",
    tagline: "Frontline hold",
    description:
      "High defense and hp, medium attack. The unmovable wall that absorbs cavalry charges, but gets whittled down by ranged fire.",
    baseStats: { attack: 60, defense: 90, speed: 45, range: 15, hp: 160 },
    strongAgainst: "cavalry",
    weakAgainst: "ranged",
    structureSpecialist: false,
    accentColor: "#a3a3a3",
    icon: "Shield",
  },
  {
    key: "siege",
    name: "Siege",
    tagline: "Structure & area breaker",
    description:
      "Massive attack versus structures and areas, but slow and fragile in the open. Specialises outside the counter triangle — bring an escort.",
    baseStats: { attack: 130, defense: 40, speed: 20, range: 60, hp: 110 },
    strongAgainst: null,
    weakAgainst: null,
    structureSpecialist: true,
    accentColor: "#eab308",
    icon: "Bomb",
  },
];

// ─── Three themed factions on the four roles ────────────────────────────────────
// Every unit inherits its role's base stats so all factions are balanced.
function unitsForFaction(theme: Record<string, { name: string; flavor: string; icon: string }>) {
  return TROOP_ROLES.map((role) => ({
    name: theme[role.key].name,
    roleKey: role.key,
    flavor: theme[role.key].flavor,
    stats: { ...role.baseStats },
    icon: theme[role.key].icon,
  }));
}

const FACTIONS = [
  {
    key: "cute-cartoon-kingdom",
    name: "Cute Cartoon Kingdom",
    tone: "kid-friendly",
    era: "fantasy",
    artStyle: "Bright, playful, rounded cartoon art — pastel banners, big eyes, squishy proportions, zero gore.",
    lore:
      "In a land made of candy hills and giggling rivers, the Cute Cartoon Kingdom defends its jam reserves with the fiercest hugs ever thrown. Their armies look adorable — and hit exactly as hard as everyone else's.",
    accentColor: "#f472b6",
    icon: "Star",
    units: unitsForFaction({
      cavalry: { name: "Pony Pouncers", flavor: "Galloping plush ponies that bonk archers flat.", icon: "Zap" },
      ranged: { name: "Bubble Slingers", flavor: "Toss sticky bubblegum bombs from way back.", icon: "Crosshair" },
      infantry: { name: "Marshmallow Guard", flavor: "Squishy but unbreakable front line of fluff.", icon: "Shield" },
      siege: { name: "Cupcake Catapult", flavor: "Lobs giant frosted cupcakes that flatten walls.", icon: "Bomb" },
    }),
  },
  {
    key: "medieval-kingdom",
    name: "Medieval Kingdom",
    tone: "balanced",
    era: "medieval",
    artStyle: "Classic high-fantasy realism — polished steel, heraldic banners, stone keeps and torchlight.",
    lore:
      "The Medieval Kingdom is the textbook standard against which all armies are measured: disciplined knights, steady longbows, and siege trains that have cracked a hundred castle gates.",
    accentColor: "#f97316",
    icon: "Crown",
    units: unitsForFaction({
      cavalry: { name: "Royal Lancers", flavor: "Plate-armoured knights who shatter archer lines.", icon: "Zap" },
      ranged: { name: "Longbow Yeomen", flavor: "Volleys that darken the sky over the field.", icon: "Crosshair" },
      infantry: { name: "Shieldwall Footmen", flavor: "Locked shields that turn cavalry into a stop.", icon: "Shield" },
      siege: { name: "Iron Trebuchet", flavor: "Hurls boulders that bring fortress walls down.", icon: "Bomb" },
    }),
  },
  {
    key: "futuristic-mech-army",
    name: "Futuristic Mech Army",
    tone: "hardcore",
    era: "sci-fi",
    artStyle: "Sleek sci-fi industrial — neon accents, carbon plating, hovering chassis and plasma glow.",
    lore:
      "Forged in orbital foundries, the Futuristic Mech Army trades flesh for alloy. Every chassis is precision-tuned — but the laws of balance bind even synthetic war: their mechs counter exactly the same way as a knight's horse.",
    accentColor: "#22d3ee",
    icon: "Cpu",
    units: unitsForFaction({
      cavalry: { name: "Hoverstrike Riders", flavor: "Anti-grav bikes that overrun ranged emplacements.", icon: "Zap" },
      ranged: { name: "Railgun Drones", flavor: "Pin-point plasma from beyond return-fire range.", icon: "Crosshair" },
      infantry: { name: "Bulwark Mechs", flavor: "Walking ablative walls that soak the charge.", icon: "Shield" },
      siege: { name: "Siege Walker", flavor: "Quad-legged platform that levels structures.", icon: "Bomb" },
    }),
  },
];

// ─── Silly Zombies — a SKIN, not a faction ──────────────────────────────────────
// Cosmetic-only overrides per role. Stats are NEVER touched — applying this skin
// reuses the underlying unit's exact role stats.
const ZOMBIE_SKIN = {
  key: "silly-zombies",
  name: "Silly Zombies",
  description:
    "A goofy undead re-skin you can slap over ANY faction's troops. Same stats, same roles, same balance — just shamblier. Purely cosmetic.",
  accentColor: "#84cc16",
  icon: "Skull",
  roleOverrides: [
    { roleKey: "cavalry", name: "Galloping Ghouls", flavor: "Zombies riding... other zombies. Don't ask.", icon: "Skull" },
    { roleKey: "ranged", name: "Bone Chuckers", flavor: "Lob their own spare ribs from a safe distance.", icon: "Skull" },
    { roleKey: "infantry", name: "Shambling Wall", flavor: "Falls apart, reassembles, refuses to move.", icon: "Skull" },
    { roleKey: "siege", name: "Rotting Battering Goon", flavor: "A very large, very confused zombie vs walls.", icon: "Skull" },
  ],
};

export async function seedFactions(): Promise<void> {
  try {
    // ─── Troop roles ──────────────────────────────────────────────────────────
    for (const role of TROOP_ROLES) {
      await TroopRoleModel.updateOne({ key: role.key }, { $set: role }, { upsert: true });
    }
    logger.info(`✅ Seeded ${TROOP_ROLES.length} troop roles`);

    // ─── Factions ─────────────────────────────────────────────────────────────
    for (const faction of FACTIONS) {
      await FactionModel.updateOne({ key: faction.key }, { $set: faction }, { upsert: true });
    }
    logger.info(`✅ Seeded ${FACTIONS.length} factions (${FACTIONS.length * 4} units)`);

    // ─── Zombie skin ──────────────────────────────────────────────────────────
    await SkinModel.updateOne({ key: ZOMBIE_SKIN.key }, { $set: ZOMBIE_SKIN }, { upsert: true });
    logger.info("✅ Seeded Silly Zombies skin");
  } catch (error) {
    logger.error("❌ Failed to seed factions:", error);
  }
}
