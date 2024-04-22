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

  try {
    await redis.get(showId, async (err, redisresult) => {
      if (redisresult) {
        seatmap = JSON.parse(redisresult).showdetails;
      } else {
        seatmap = await ShowCreate.findById(showId);
      }
    });
    // console.log(seatmap);
    for (const [row, col] of selectedSeat) {
      if (seatmap.seatmatrix[row][col].islocked)
        return res.json({ message: "locked" });
    }
    for (const [row, col] of selectedSeat) {
      seatmap.seatmatrix[row][col].islocked = true;
    }

    redis.set(showId, JSON.stringify({ showdetails: seatmap, success: true }));
    myQueue
      .add(
        "job",
        { seatdetails: JSON.stringify(selectedSeat), showId },
        { delay: 60000 }
      )
      .then((job: any) => {
        jobid = job.id;
      });
    next();
  } catch (error) {
    console.log("error happend in checkoutMiddleware", error);
  }
};
