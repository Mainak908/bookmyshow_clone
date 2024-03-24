import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
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

mongoose.connect("mongodb://admin:password@localhost:27017/").then(() => {
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
