import { model, Model, Schema } from "mongoose";
import { BaseClasification } from "./clasification.interface";

const schemaClasification: Schema<
  BaseClasification,
  Model<BaseClasification>,
  BaseClasification
> = new Schema<BaseClasification>({
  name: { type: String, required: true },
});

export const modelClasification: Model<BaseClasification> = model<BaseClasification>(
  "clasification",
  schemaClasification
);
