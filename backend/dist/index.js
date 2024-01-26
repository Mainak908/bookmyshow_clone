"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
const port = 3001;
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET,PUT,POST,DELETE,UPDATE,OPTIONS"],
        credentials: true,
    },
});
mongoose_1.default.connect("mongodb://localhost:27017/movieBookingDB").then(() => {
    console.log("connected");
});
app.use(body_parser_1.default.json());
const movieSchema = new mongoose_1.default.Schema({
    title: String,
    bookings: [{ seat: String, user: String }],
});
const Movie = mongoose_1.default.model("Movie", movieSchema);
app.get("/api/movies", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield Movie.find();
        res.json(movies);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.post("/api/book", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId, seat, user } = req.body;
    const movie = yield Movie.findById(movieId);
    if (movie) {
        movie.bookings.push({ seat, user });
        yield movie.save();
    }
    // Emit the updated movie data to all connected clients
    io.emit("updateMovies", yield Movie.find());
    res.json(movie);
}));
app.post("/api/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, bookings } = req.body;
    const save = yield Movie.create({
        title,
        bookings,
    });
    res.json(save);
}));
io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("disconnect", () => console.log("User disconnected"));
});
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
