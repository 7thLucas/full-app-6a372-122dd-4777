import { prop, getModelForClass, modelOptions, Severity } from "@typegoose/typegoose";

/**
 * Per-role visual override applied by a skin. Only name/flavor/icon change —
 * NEVER the stats. This is the core design constraint: a skin is purely
 * cosmetic and reuses the underlying role's stats exactly.
 */
export class SkinRoleOverride {
  /** Role key this override applies to. */
  @prop({ type: String, required: true, lowercase: true, trim: true })
  public roleKey!: string;

  /** Display name to show instead of the unit's themed name. */
  @prop({ type: String, required: true })
  public name!: string;

  @prop({ type: String, required: true })
  public flavor!: string;

  @prop({ type: String, default: "Skull" })
  public icon?: string;
}

/**
 * A Skin is a VISUAL re-theme that can be applied over ANY faction's units
 * without changing their role stats. Silly Zombies is modelled as a skin,
 * NOT a separate balanced faction.
 */
@modelOptions({
  schemaOptions: {
    collection: "tbl_skins",
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Skin {
  @prop({ type: String, required: true, unique: true, lowercase: true, trim: true })
  public key!: string;

  @prop({ type: String, required: true })
  public name!: string;

  @prop({ type: String, required: true })
  public description!: string;

  @prop({ type: String, default: "#84cc16" })
  public accentColor?: string;

  @prop({ type: String, default: "Skull" })
  public icon?: string;

  /** Cosmetic-only overrides keyed by role. Stats are untouched. */
  @prop({ type: () => [SkinRoleOverride], required: true, _id: false, default: [] })
  public roleOverrides!: SkinRoleOverride[];
}

export const SkinModel = getModelForClass(Skin);
