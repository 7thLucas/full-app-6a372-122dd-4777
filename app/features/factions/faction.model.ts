import { prop, getModelForClass, modelOptions, Severity } from "@typegoose/typegoose";
import { TroopStatBlock } from "./troop-role.model";

/**
 * A single themed unit inside a faction, mapped to one of the four troop roles.
 * It inherits the role's base stats verbatim so every faction is balanced
 * against every other faction.
 */
export class FactionUnit {
  @prop({ type: String, required: true })
  public name!: string;

  /** Role key: "cavalry" | "ranged" | "infantry" | "siege" */
  @prop({ type: String, required: true, lowercase: true, trim: true })
  public roleKey!: string;

  /** Short themed flavour line for this unit. */
  @prop({ type: String, required: true })
  public flavor!: string;

  /** Inherited (copied) from the role base stats — kept inline for fast reads. */
  @prop({ type: () => TroopStatBlock, required: true, _id: false })
  public stats!: TroopStatBlock;

  /** lucide-react icon name for UI rendering. */
  @prop({ type: String, default: "Swords" })
  public icon?: string;
}

/**
 * A themed archetype layered on top of the four-role system.
 * Three are seeded: Cute Cartoon Kingdom, Medieval Kingdom, Futuristic Mech Army.
 * Each holds exactly one unit per troop role (4 units), all balanced.
 */
@modelOptions({
  schemaOptions: {
    collection: "tbl_factions",
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Faction {
  @prop({ type: String, required: true, unique: true, lowercase: true, trim: true })
  public key!: string;

  @prop({ type: String, required: true })
  public name!: string;

  /** Tone tag: "kid-friendly" | "balanced" | "hardcore" */
  @prop({ type: String, required: true })
  public tone!: string;

  /** Era tag, e.g. "fantasy", "medieval", "sci-fi". */
  @prop({ type: String, required: true })
  public era!: string;

  @prop({ type: String, required: true })
  public artStyle!: string;

  @prop({ type: String, required: true })
  public lore!: string;

  /** Hex accent colour for the faction card. */
  @prop({ type: String, default: "#f97316" })
  public accentColor?: string;

  /** lucide-react icon name representing the faction. */
  @prop({ type: String, default: "Shield" })
  public icon?: string;

  @prop({ type: () => [FactionUnit], required: true, _id: false, default: [] })
  public units!: FactionUnit[];
}

export const FactionModel = getModelForClass(Faction);
