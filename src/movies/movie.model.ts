import { Model, model, Schema } from "mongoose";
import { BaseMovie } from "./movie.interface";

const schemaMovie: Schema<
  BaseMovie,
  Model<BaseMovie>,
  BaseMovie
> = new Schema<BaseMovie>({
  name: { type: String, required: true },
  director: { type: String, required: true },
  clasification: [{ type: Schema.Types.ObjectId, ref: "clasification" }],
});

export const modelMovie: Model<BaseMovie> = model<BaseMovie>("movie", schemaMovie);
