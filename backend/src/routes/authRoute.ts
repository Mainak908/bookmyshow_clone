import express from "express";
import {
  logOutHandler,
  loggedinCheckHandler,
  otpSenderHandler,
  phoneLoginHandler,
  refreshAccessToken,
  tokenSenderHandler,
  urlSender,
} from "../controllers/authController";

const router = express.Router();

router.route("/verifyOTP").post(phoneLoginHandler);
router.route("/generateOTP").post(otpSenderHandler);
router.route("/logout").get(logOutHandler);
router.route("/token").get(tokenSenderHandler);
router.route("/url").get(urlSender);
router.route("/logged_in").get(loggedinCheckHandler);
router.route("/refresh").post(refreshAccessToken);

export default router;
