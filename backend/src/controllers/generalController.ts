import { Request, Response } from "express";
import mongoose from "mongoose";
import { redis } from "../index";
import { asynchandler } from "../middleware/ErrorMiddleware";
import ShowCreate from "../models/Show";
import Movie from "../models/movie";
import MovieHall from "../models/movieHall";

export const find_movie = async (req: Request, res: Response) => {
  const movies = await Movie.find();
  res.json(movies);
};
export const find_Single_movie = async (req: Request, res: Response) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  res.json(movie);
};

export const viewshow = async (req: Request, res: Response) => {
  const { movie, theatre, time } = req.body;
  const movieId = await Movie.findOne({
    title: movie,
  });

  const movieHallId = await MovieHall.findOne({
    name: theatre,
  });

  const showFind = await ShowCreate.findOne({
    movie: movieId?._id,
    theatre: movieHallId?._id,
    time: new Date(time),
  });
  res.json({
    showFind,
  });
};

export const movietoshow = async (req: Request, res: Response) => {
  const { movieId, date } = req.body;

  const desiredDate = new Date(date);
  desiredDate.setHours(0, 0, 0, 0);
  const tomorrow = new Date();
  tomorrow.setDate(desiredDate.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const result = await ShowCreate.aggregate([
    {
      $match: {
        movie: mongoose.Types.ObjectId.createFromHexString(movieId),
        time: {
          $gte: desiredDate,
          $lt: tomorrow,
        },
      },
    },
    {
      $lookup: {
        from: "moviehalls",
        localField: "theatre",
        foreignField: "_id",
        as: "alltheatre",
      },
    },
    {
      $unwind: "$alltheatre",
    },
    {
      $project: {
        time: 1,
        theatreName: "$alltheatre.name",
        _id: 1,
      },
    },
  ]);

  res.json(result);
};

export const findshowbyid = asynchandler(
  async (req: Request, res: Response) => {
    const Pipeline = redis.pipeline();
    const { showId } = req.body;

    let showdetails = await ShowCreate.findById(showId);

    showdetails?.seatmatrix.forEach((perArray) => {
      perArray.forEach((element) => {
        if (!element.reference && element.seatNumber != "XX")
          Pipeline.get(`${showId}${element.seatNumber}`);
      });
    });

    const redisdata = await Pipeline.exec();

    if (!redisdata) return;
    let index = 0;
    showdetails?.seatmatrix.forEach((perArray) => {
      perArray.forEach((element) => {
        if (
          !element.reference &&
          element.seatNumber != "XX" &&
          redisdata[index++][1]
        ) {
          element.islocked = true;
        }
      });
    });

    res.json({ showdetails, success: true });
  }
);

export const findhallbyid = async (req: Request, res: Response) => {
  const { hallId } = req.body;

  redis.get(hallId, async (err, data) => {
    if (data) {
      res.json(JSON.parse(data));
    } else {
      const halldetails = await MovieHall.findById(hallId); //TODO:
      redis.set(hallId, JSON.stringify(halldetails), "EX", 3000);
      res.json(halldetails);
    }
  });
};
