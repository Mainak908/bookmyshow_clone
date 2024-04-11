import express from "express";
import {
  otpSenderHandler,
  phoneLoginHandler,
} from "../controllers/authController";

const router = express.Router();

router.route("/verifyOTP").post(phoneLoginHandler);
router.route("/generateOTP").post(otpSenderHandler);

export default router;
