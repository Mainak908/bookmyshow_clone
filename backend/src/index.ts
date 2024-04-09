import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { googleOauthHandler } from "./controllers/authController";
import { webHookfn } from "./controllers/bookingController";
import { InitFunction } from "./init";
import adminRoute from "./routes/adminRoute";
import {
  default as bookingRoute,
  default as generalRoute,
} from "./routes/generalRoute";

export const { myQueue, redis, stripe } = InitFunction();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
const port = 3001;

mongoose.connect(process.env.MONGOURI!).then(() => {
  console.log("connected");
});

app.post(
  "/api/v1/webhookend",
  express.raw({ type: "application/json" }),
  webHookfn
);
app.use(bodyParser.json());
app.use("/api/v1", bookingRoute);
app.use("/api/v1", adminRoute);
app.use("/api/v1", generalRoute);

app.get("/api/auth/callback/google", googleOauthHandler);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
