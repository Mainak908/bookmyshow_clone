import express from "express";
import {
  logOutHandler,
  otpSenderHandler,
  phoneLoginHandler,
} from "../controllers/authController";

const router = express.Router();

router.route("/verifyOTP").post(phoneLoginHandler);
router.route("/generateOTP").post(otpSenderHandler);
router.route("/logout").get(logOutHandler);

export default router;
