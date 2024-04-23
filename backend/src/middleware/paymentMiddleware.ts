import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Ijwt } from "../controllers/bookingController";
import { redis } from "../index";

interface Idata {
  selectedSeat: any[];
  search: string;
}

function coordinateToCell(coordinate: any[]) {
  let column = String.fromCharCode(65 + coordinate[0]);
  let row = coordinate[1] + 1;
  return column + row;
}
export const checkoutMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { selectedSeat, search: showId } = req.body as Idata;
  const Pipeline = redis.pipeline();
  let isLocked = false;
  try {
    const { accessToken } = req.cookies;
    const { _id: userid } = jwt.decode(accessToken) as Ijwt;
    if (!userid) return;

    selectedSeat.forEach((seat) => {
      Pipeline.get(`${showId}${coordinateToCell(seat)}`);
    });

    const returndata = await Pipeline.exec();

    returndata?.forEach((data) => {
      if (data[1]) {
        isLocked = true;
        return;
      }
    });

    if (isLocked) {
      return res.json({ message: "locked" });
    }
    selectedSeat.forEach((seat) => {
      Pipeline.set(`${showId}${coordinateToCell(seat)}`, userid, "EX", 120);
    });

    await Pipeline.exec();

    next();
  } catch (error) {
    console.log("something error happend in checkoutMiddleware ", error);
  }
};
