import { ObjectId } from "mongoose";
import { Clasification } from "../clasifications/clasification.interface";

export interface InputMovie {
  name: string;
  director: string;
  clasification: string[];
}

export interface BaseMovie {
  name: string;
  director: string;
  clasification: Clasification[];
}

export interface Movie extends BaseMovie {
  _id: ObjectId;
}
