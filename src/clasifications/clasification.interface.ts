import { ObjectId } from "mongoose";

export interface BaseClasification {
  name: string;
}

export interface Clasification extends BaseClasification {
  _id: ObjectId;
}
