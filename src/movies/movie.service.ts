import { Model, ObjectId } from "mongoose";
import debugModule from "debug";

import MongoClient from "../lib/mongo";
import { BaseMovie, Movie, InputMovie } from "./movie.interface";
import { Clasification } from "../clasifications/clasification.interface";
import ClasificationService from "../clasifications/clasification.service";
import { modelMovie } from "./movie.model";

const log = debugModule("app:service:movies");

export default class MovieService {
  collection: string;
  model: Model<BaseMovie>;
  mongoClient: MongoClient;
  clasificationService: ClasificationService;

  constructor() {
    this.mongoClient = new MongoClient();
    this.clasificationService = new ClasificationService();
    this.collection = "movie";
    this.model = modelMovie;
  }

  async getMovies(query: any): Promise<Movie[]> {
    try {
      const movies: Movie[] = await this.mongoClient.getAll(
        this.model,
        query,
        "clasification"
      );
      return movies;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMovie(id: string): Promise<Movie | null> {
    try {
      const movie: Movie | null = await this.mongoClient.get(
        this.model,
        id,
        "clasification"
      );
      return movie;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createMovie(movie: InputMovie): Promise<ObjectId> {
    try {
      const clasifications: ObjectId[] = await Promise.all(
        movie.clasification.map(async (item) => {
          const clasification: Clasification[] =
            await this.clasificationService.getClasifications({
              name: item,
            });
          let id: ObjectId =
            clasification.length === 0
              ? await this.clasificationService.createClasification({
                  name: item,
                })
              : clasification[0]._id;
          return id;
        })
      );
      const id: ObjectId = await this.mongoClient.create(
        new this.model({
          name: movie.name,
          director: movie.director,
          clasification: clasifications,
        })
      );
      return id;
    } catch (error) {
      log(error);
      throw new Error(error.message);
    }
  }

  async updateMovie(movie: InputMovie, id: string): Promise<ObjectId | null> {
    try {
      const existMovie: Movie | null = await this.getMovie(id);
      if (!existMovie) {
        return null;
      }
      const clasifications: ObjectId[] = await Promise.all(
        movie.clasification.map(async (item) => {
          const clasification: Clasification[] =
            await this.clasificationService.getClasifications({
              name: item,
            });
          let id: ObjectId =
            clasification.length === 0
              ? await this.clasificationService.createClasification({
                  name: item,
                })
              : clasification[0]._id;
          return id;
        })
      );
      const movieId: ObjectId | null = await this.mongoClient.update(
        this.model,
        { name: movie.name, director: movie.director, clasifications },
        id
      );
      return movieId;
    } catch (error) {
      log(error);
      throw new Error(error.message);
    }
  }

  async deleteMovie(id: string): Promise<Movie | null> {
    try {
      const movieRemove: Movie = await this.mongoClient.delete(this.model, id);
      return movieRemove;
    } catch (error) {
      log(error);
      throw new Error(error.message);
    }
  }
}
