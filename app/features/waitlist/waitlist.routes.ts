import { Router, type Request, type Response } from "express";
import { WaitlistModel } from "./waitlist.model";
import { EmailService } from "@qb/email";
import { createLogger } from "~/lib/logger";

const router = Router();
const logger = createLogger("Waitlist");

/**
 * POST /api/waitlist
 * Register an email on the ForgeRealms waitlist.
 */
router.post("/api/waitlist", async (req: Request, res: Response) => {
  try {
    const { email, source = "landing_page" } = req.body as { email?: string; source?: string };

    if (!email || typeof email !== "string") {
      return res.status(400).json({ success: false, error: "Email is required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, error: "Please enter a valid email address." });
    }

    const normalised = email.trim().toLowerCase();

    // Check for duplicate
    const existing = await WaitlistModel.findOne({ email: normalised });
    if (existing) {
      return res.status(200).json({ success: true, message: "You're already on the waitlist!" });
    }

    await WaitlistModel.create({ email: normalised, source });
    logger.info(`New waitlist signup: ${normalised}`);

    // Send confirmation email if SMTP is configured
    try {
      await EmailService.sendEmail({
        to: normalised,
        subject: "You're on the ForgeRealms waitlist!",
        content: `Hey, creator!\n\nYou've secured your spot on the ForgeRealms early access waitlist.\n\nForgeRealms is the first AI-powered studio where indie creators build real, deployable multiplayer strategy games — no code, no team, no $2M budget.\n\nWe'll reach out with priority access, exclusive templates, and founder-tier pricing when we open the gates.\n\nStay epic,\nThe ForgeRealms Team\n\nForgeRealms — Build a real multiplayer strategy game. No code. Just imagination.`,
      });
    } catch (emailErr) {
      // Email sending failure should not block the signup
      logger.warn("Confirmation email failed (SMTP not configured or error).");
    }

    return res.status(201).json({
      success: true,
      message: "You're on the waitlist! We'll be in touch soon.",
    });
  } catch (error) {
    logger.error("Waitlist signup error:", error);
    return res.status(500).json({ success: false, error: "Something went wrong. Please try again." });
  }
});

/**
 * GET /api/waitlist/count
 * Returns the number of waitlist signups (public stat for social proof).
 */
router.get("/api/waitlist/count", async (_req: Request, res: Response) => {
  try {
    const count = await WaitlistModel.countDocuments();
    return res.json({ count });
  } catch (error) {
    logger.error("Waitlist count error:", error);
    return res.status(500).json({ error: "Failed to get count." });
  }
});

export default router;
