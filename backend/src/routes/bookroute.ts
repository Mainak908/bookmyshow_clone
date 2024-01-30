import express from "express";
import {
  CreateMovie,
  CreateMovieTheatre,
  CreateShow,
  UserCreate,
  bookingfn,
  find_Single_movie,
  find_movie,
  findhallbyid,
  findshowbyid,
  movietoshow,
  viewshow,
} from "../controllers/bookingC";
const router = express.Router();

router.route("/bookmovie").post(bookingfn);
router.route("/findmovie").get(find_movie);
router.route("/createshow").post(CreateShow);
router.route("/createmovie").post(CreateMovie);
router.route("/createmovietheatre").post(CreateMovieTheatre);
router.route("/createuser").post(UserCreate);
router.route("/viewshow").post(viewshow);
router.route("/find_Single_movie").post(find_Single_movie);
router.route("/movietoshow").post(movietoshow);
router.route("/findshowbyid").post(findshowbyid);
router.route("/findhallbyid").post(findhallbyid);

export default router;
