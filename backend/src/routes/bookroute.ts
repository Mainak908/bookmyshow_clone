import express from "express";
import { bookingfn, find_movie } from "../controllers/bookingC";
const router = express.Router();

router.route("/bookmovie").post(bookingfn);
router.route("/findmovie").post(find_movie);

export default router;
