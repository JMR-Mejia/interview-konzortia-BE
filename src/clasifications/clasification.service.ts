import { Model, ObjectId } from "mongoose";

import MongoClient from "../lib/mongo";
import { BaseClasification, Clasification } from "./clasification.interface";
import { modelClasification } from "./clasification.model";

export default class ClasificationService {
  collection: string;
  mongoClient: MongoClient;
  model: Model<BaseClasification>;

  constructor() {
    this.mongoClient = new MongoClient();
    this.collection = "clasification";
    this.model = modelClasification;
  }

  async getClasifications(query?: any): Promise<Clasification[]> {
    try {
      const clasifications: Clasification[] = await this.mongoClient.getAll(
        this.model,
        query
      );
      return clasifications;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getClasification(id: string): Promise<Clasification | null> {
    try {
      const clasification: Clasification | null = await this.mongoClient.get(
        this.model,
        id,
      );
      return clasification;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createClasification(
    clasification: BaseClasification
  ): Promise<ObjectId> {
    try {
      const clasificationId: ObjectId = await this.mongoClient.create(
        new this.model(clasification)
      );
      return clasificationId;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateClasification(
    clasification: BaseClasification,
    id: string
  ): Promise<ObjectId | null> {
    try {
      const existClasification: Clasification | null =
        await this.getClasification(id);
      if (!existClasification) {
        return null;
      }
      const clasificationId: ObjectId | null = await this.mongoClient.update(
        this.model,
        clasification,
        id
      );

      return clasificationId;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteClasification(id: string): Promise<Clasification> {
    try {
      const clasification: Clasification = await this.mongoClient.delete(
        this.model,
        id
      );

      return clasification;
    } catch (error) {
      throw new Error(error);
    }
  }
}
