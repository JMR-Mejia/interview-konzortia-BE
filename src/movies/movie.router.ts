import { Router, Request, Response } from "express";
import { ObjectId } from "mongoose";
import { Movie, InputMovie } from "./movie.interface";
import MovieService from "./movie.service";

const movieService = new MovieService();
export const movieRouter = Router();

movieRouter.get("/", async (req: Request, res: Response) => {
  const query = req.query;
  try {
    const movies: Movie[] = await movieService.getMovies(query);
    res.status(200).json({
      movies,
      message: "Movies listed",
    });
  } catch (error) {
    console.log(error);
  }
});

movieRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const movie: Movie | null = await movieService.getMovie(id);

    if (!movie) {
      res.status(404).json({ error: { message: "Movie not found" } });
    }

    res.status(200).json({
      movie,
      message: "Movie found",
    });
  } catch (error) {
    res.status(500).json({ error: { message: error.message } });
  }
});

movieRouter.post("/", async (req: Request, res: Response) => {
  const newMovie: InputMovie = req.body;
  try {
    const movieId: ObjectId = await movieService.createMovie(newMovie);
    res.status(201).json({
      id: movieId,
      message: "Movie created",
    });
  } catch (error) {
    console.log(error);
  }
});

movieRouter.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateMovie: InputMovie = req.body;
  try {
    const movieId: ObjectId | null = await movieService.updateMovie(
      updateMovie,
      id
    );

    if (!movieId) {
      res.status(404).json({ error: { message: "Movie not found" } });
    }

    res.status(200).json({
      id: movieId,
      message: "Movie updated",
    });
  } catch (error) {}
});

movieRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const movie = await movieService.deleteMovie(id);

    if (!movie) {
      res.status(404).json({ error: { message: "Movie not found" } });
    }

    res.status(200).json({
      movie,
      message: "Movie deleted",
    });
  } catch (error) {}
});
