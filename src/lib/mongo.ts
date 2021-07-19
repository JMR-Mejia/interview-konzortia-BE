import { connect, Model, ObjectId } from "mongoose";
import debugModule from "debug";

import { dbHost, dbName, dbPassword, dbPort, dbUser } from "../config";

const errors = debugModule("app:mongo:error");

const USER: string = encodeURIComponent(dbUser);
const PASSWORD: string = encodeURIComponent(dbPassword);
const DB_NAME: string = dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${dbHost}${
  dbPort ? ":" + dbPort : ""
}/${DB_NAME}?retryWrites=true&w=majority`;

export default class MongoClient {
  constructor() {
    this.connect();
  }

  async connect(): Promise<void> {
    try {
      await connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (error) {
      errors(error);
      throw new Error(error);
    }
  }

  async getAll(
    modelItem: Model<any>,
    query: any = {},
    join?: string
  ): Promise<any> {
    try {
      const items = await modelItem
        .find(query)
        .populate(join);
      return items;
    } catch (error) {
      errors(error);
      throw new Error(error);
    }
  }

  async get(modelItem: Model<any>, id: string, join?: string): Promise<any> {
    try {
      const item= await modelItem.findById(id).populate(join).exec();
      return item;
    } catch (error) {
      errors(error);
      throw new Error(error);
    }
  }

  async create(newModelItem: any): Promise<ObjectId> {
    try {
      const { _id } = await newModelItem.save();
      return _id;
    } catch (error) {
      errors(error);
      throw new Error(error);
    }
  }

  async update(
    modelItem: Model<any>,
    item: any,
    id: string
  ): Promise<ObjectId | null> {
    try {
      const { _id } = await modelItem.findByIdAndUpdate(id, item);
      return _id;
    } catch (error) {
      errors(error);
      throw new Error(error);
    }
  }

  async delete(modelItem: Model<any>, id: string): Promise<any> {
    try {
      const itemRemove = await modelItem.findByIdAndDelete(id);
      return itemRemove;
    } catch (error) {
      errors(error);
      throw new Error(error);
    }
  }
}
