import { NextFunction, Request, Response } from "express";
import { myQueue, redis } from "../index";
import ShowCreate from "../models/Show";

export let jobid: string;

export const checkoutMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { selectedSeat, search: showId } = req.body;
  let seatmap: any;
  redis.get(showId, async (err, redisresult) => {
    if (redisresult) {
      seatmap = JSON.parse(redisresult);
    } else {
      seatmap = await ShowCreate.findById(showId);
    }
    for (const [row, col] of selectedSeat) {
      seatmap.seatmatrix[row][col].islocked = true;
    }
    console.log("temp change operation done");
    redis.set(showId, JSON.stringify(seatmap));
  });
  myQueue
    .add(
      "job",
      { seatdetails: JSON.stringify(selectedSeat), showId },
      { delay: 60000 }
    )
    .then((job: any) => {
      jobid = job.id;
      console.log("job added");
    });

  next();
};
