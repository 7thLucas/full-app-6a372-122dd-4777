import { prop, getModelForClass, modelOptions, index } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { collection: "tbl_waitlist", timestamps: true } })
@index({ email: 1 }, { unique: true })
export class WaitlistEntry {
  @prop({ required: true, type: String, lowercase: true, trim: true })
  public email!: string;

  @prop({ type: String, default: "" })
  public source?: string;

  @prop({ type: Boolean, default: false })
  public notified?: boolean;
}

export const WaitlistModel = getModelForClass(WaitlistEntry);
