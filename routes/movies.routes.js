import express from "express";
import {
  getAllMovies,
  addMovie,
  getMovie,
  deleteMovie,
  updateMovie,
} from "../controllers/movies.controllers.js";

const router = express.Router();

router.get("/", getAllMovies);

router.post("/", addMovie);

router.get("/:id", getMovie);

router.delete("/:id", deleteMovie);

router.patch("/:id", updateMovie);

export default router;
