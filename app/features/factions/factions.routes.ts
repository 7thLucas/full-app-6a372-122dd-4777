import { Router, type Request, type Response } from "express";
import { TroopRoleModel } from "./troop-role.model";
import { FactionModel } from "./faction.model";
import { SkinModel } from "./skin.model";
import { createLogger } from "~/lib/logger";

const router = Router();
const logger = createLogger("Factions");

/**
 * GET /api/troop-roles
 * The four-role troop system with base stats and counter relationships.
 */
router.get("/api/troop-roles", async (_req: Request, res: Response) => {
  try {
    const roles = await TroopRoleModel.find().sort({ createdAt: 1 }).lean();
    return res.json({ success: true, data: roles });
  } catch (error) {
    logger.error("Failed to fetch troop roles:", error);
    return res.status(500).json({ success: false, error: "Failed to fetch troop roles." });
  }
});

/**
 * GET /api/factions
 * The faction library — themed archetypes, each with 4 role-mapped units.
 * Optional query filters: ?tone=kid-friendly&era=medieval
 */
router.get("/api/factions", async (req: Request, res: Response) => {
  try {
    const { tone, era } = req.query as { tone?: string; era?: string };
    const filter: Record<string, string> = {};
    if (tone) filter.tone = tone;
    if (era) filter.era = era;

    const factions = await FactionModel.find(filter).sort({ createdAt: 1 }).lean();
    return res.json({ success: true, data: factions });
  } catch (error) {
    logger.error("Failed to fetch factions:", error);
    return res.status(500).json({ success: false, error: "Failed to fetch factions." });
  }
});

/**
 * GET /api/factions/:key
 * A single faction by its slug key.
 */
router.get("/api/factions/:key", async (req: Request, res: Response) => {
  try {
    const faction = await FactionModel.findOne({ key: req.params.key }).lean();
    if (!faction) {
      return res.status(404).json({ success: false, error: "Faction not found." });
    }
    return res.json({ success: true, data: faction });
  } catch (error) {
    logger.error("Failed to fetch faction:", error);
    return res.status(500).json({ success: false, error: "Failed to fetch faction." });
  }
});

/**
 * GET /api/skins
 * Visual skins (e.g. Silly Zombies) that can be applied over any faction's
 * units WITHOUT changing role stats.
 */
router.get("/api/skins", async (_req: Request, res: Response) => {
  try {
    const skins = await SkinModel.find().sort({ createdAt: 1 }).lean();
    return res.json({ success: true, data: skins });
  } catch (error) {
    logger.error("Failed to fetch skins:", error);
    return res.status(500).json({ success: false, error: "Failed to fetch skins." });
  }
});

export default router;
