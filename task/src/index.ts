import { Worker } from "bullmq";
import DF from "ioredis";

export const redis = new DF({
  host: "localhost",
  port: 6380,
});

const worker = new Worker(
  "job",
  async (job: any) => {
    console.log(job.data);
    const { seatdetails, showId } = job.data;
    const seats = JSON.parse(seatdetails);
    console.log(seats, showId);

    redis.get(showId, (err, redisresult) => {
      if (!redisresult) return null;
      const newseatmap = JSON.parse(redisresult);
      for (const [row, col] of seats) {
        newseatmap.seatmatrix[row][col].islocked = false;
      }

      redis.set(showId, JSON.stringify(newseatmap));
      console.log("redis value upgrade after timeout");
    });
  },
  {
    connection: {
      host: "localhost",
      port: 6378,
    },
  }
);
