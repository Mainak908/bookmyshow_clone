import express from "express";
import { checkout } from "../controllers/bookingController";

const router = express.Router();

router.route("/checkout").get(checkout);

export default router;
