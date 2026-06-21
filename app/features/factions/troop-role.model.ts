import { prop, getModelForClass, modelOptions, Severity } from "@typegoose/typegoose";

/**
 * Base stat block shared by every troop role and inherited by faction units.
 * This is the single balance source of truth: faction units copy these numbers,
 * and a future battle engine reads the same blocks.
 */
export class TroopStatBlock {
  @prop({ type: Number, required: true })
  public attack!: number;

  @prop({ type: Number, required: true })
  public defense!: number;

  @prop({ type: Number, required: true })
  public speed!: number;

  @prop({ type: Number, required: true })
  public range!: number;

  @prop({ type: Number, required: true })
  public hp!: number;
}

/**
 * The four-role troop system — the shared balance backbone.
 * Exactly four roles exist: cavalry, ranged, infantry, siege.
 *
 * Counter triangle: Cavalry > Ranged > Infantry > Cavalry.
 * Siege specializes against structures.
 */
@modelOptions({
  schemaOptions: {
    collection: "tbl_troop_roles",
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class TroopRole {
  /** Stable slug: "cavalry" | "ranged" | "infantry" | "siege" */
  @prop({ type: String, required: true, unique: true, lowercase: true, trim: true })
  public key!: string;

  @prop({ type: String, required: true })
  public name!: string;

  @prop({ type: String, required: true })
  public tagline!: string;

  @prop({ type: String, required: true })
  public description!: string;

  /** Base stats inherited by every faction unit mapped to this role. */
  @prop({ type: () => TroopStatBlock, required: true, _id: false })
  public baseStats!: TroopStatBlock;

  /** The role key this role is strong against (counter triangle). */
  @prop({ type: String, default: null })
  public strongAgainst?: string | null;

  /** The role key this role is weak against (counter triangle). */
  @prop({ type: String, default: null })
  public weakAgainst?: string | null;

  /** True for siege — specialises vs structures/area rather than the triangle. */
  @prop({ type: Boolean, default: false })
  public structureSpecialist?: boolean;

  /** Hex accent colour for UI rendering. */
  @prop({ type: String, default: "#f97316" })
  public accentColor?: string;

  /** lucide-react icon name for UI rendering. */
  @prop({ type: String, default: "Swords" })
  public icon?: string;
}

export const TroopRoleModel = getModelForClass(TroopRole);
