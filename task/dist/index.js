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
exports.redis = void 0;
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
exports.redis = new ioredis_1.default({
    host: process.env.REDISHOST || "localhost",
    port: Number(process.env.REDISPORT) || 6380,
});
new bullmq_1.Worker("job", (job) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(job.data);
    const { seatdetails, showId } = job.data;
    const seats = JSON.parse(seatdetails);
    console.log(seats, showId);
    exports.redis.get(showId, (err, redisresult) => {
        if (!redisresult)
            return null;
        const newseatmap = JSON.parse(redisresult);
        for (const [row, col] of seats) {
            newseatmap.showdetails.seatmatrix[row][col].islocked = false;
        }
        exports.redis.set(showId, JSON.stringify(newseatmap));
        console.log("redis value upgrade after timeout");
    });
}), {
    connection: {
        host: "localhost",
        port: 6378,
    },
});
