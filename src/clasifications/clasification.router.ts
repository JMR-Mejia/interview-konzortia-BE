import { Router, Request, Response } from "express";
import { ObjectId } from "mongoose";

import { BaseClasification, Clasification } from "./clasification.interface";
import ClasificationService from "./clasification.service";

const clasificationService = new ClasificationService();
export const clasificationRouter = Router();

clasificationRouter.get("/", async (req: Request, res: Response) => {
  const query = req.query;
  try {
    const clasifications: Clasification[] =
      await clasificationService.getClasifications(query);
    res.status(200).json({
      clasifications,
      message: "Clasifications listed",
    });
  } catch (error) {
    res.status(500).json({ error: { message: error.message } });
  }
});

clasificationRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const clasification: Clasification | null =
      await clasificationService.getClasification(id);

    if (!clasification) {
      res
        .status(404)
        .json({
          error: {
            message: "Not found",
          },
        })
        .send();
    }

    res.status(200).json({
      clasification,
      message: "Clasification found",
    });
  } catch (error) {
    res.status(500).json({ error: { message: error.message } });
  }
});

clasificationRouter.post("/", async (req: Request, res: Response) => {
  const newClasification: BaseClasification = req.body;
  try {
    const clasificationId: ObjectId =
      await clasificationService.createClasification(newClasification);

    res.status(201).json({
      id: clasificationId,
      message: "Clasification created",
    });
  } catch (error) {
    res.status(500).json({ error: { message: error.message } });
  }
});

clasificationRouter.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateClasification: BaseClasification = req.body;

  try {
    const clasificationId: ObjectId | null =
      await clasificationService.updateClasification(updateClasification, id);
    if (!clasificationId) {
      res
        .status(404)
        .json({
          error: {
            message: "Not found",
          },
        })
        .send();
    }

    res.status(200).json({
      clasificationId,
      message: "Clasification updated",
    });
  } catch (error) {
    res.status(500).json({ error: { message: error.message } });
  }
});

clasificationRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const clasification: Clasification =
      await clasificationService.deleteClasification(id);
    if (!clasification) {
      res
        .status(404)
        .json({
          error: {
            message: "Not found",
          },
        })
        .send();
    }

    res.status(200).json({
      clasification,
      message: "Clasification deleted",
    });
  } catch (error) {
    res.status(500).json({ error: { message: error.message } });
  }
});
