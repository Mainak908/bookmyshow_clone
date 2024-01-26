import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import bookingRoute from "./routes/bookroute";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
const port = 3001;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET,PUT,POST,DELETE,UPDATE,OPTIONS"],
    credentials: true,
  },
});

mongoose.connect("mongodb://localhost:27017/movieBookingDB").then(() => {
  console.log("connected");
});

app.use(bodyParser.json());
app.use("/api/v1", bookingRoute);

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => console.log("User disconnected"));
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
