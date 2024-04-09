import express from "express";
import {
  CreateMovie,
  CreateMovieTheatre,
  CreateShow,
} from "../controllers/adminController";

const router = express.Router();

router.route("/createshow").post(CreateShow);
router.route("/createmovie").post(CreateMovie);
router.route("/createmovietheatre").post(CreateMovieTheatre);

export default router;
