import express from "express";
import { checkout } from "../controllers/bookingController";
import { checkoutMiddleware } from "../middleware/paymentMiddleware";

const router = express.Router();

router.route("/checkout").post(checkoutMiddleware, checkout);

export default router;
