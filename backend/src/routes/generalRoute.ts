import express from "express";
import {
  find_Single_movie,
  find_movie,
  findhallbyid,
  findshowbyid,
  movietoshow,
  viewshow,
} from "../controllers/generalController";
const router = express.Router();

router.route("/findmovie").get(find_movie);
router.route("/viewshow").post(viewshow);
router.route("/find_Single_movie/:id").get(find_Single_movie);
router.route("/movietoshow").post(movietoshow);
router.route("/findshowbyid").post(findshowbyid);
router.route("/findhallbyid").post(findhallbyid);

export default router;
