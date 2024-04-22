import { Request, Response } from "express";
import mongoose from "mongoose";
import { redis } from "../index";
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

export const findshowbyid = async (req: Request, res: Response) => {
  const { showId } = req.body;
  redis.get(showId, async (err, data) => {
    if (data) {
      console.log("findshowbyid redis hit");
      res.json(JSON.parse(data));
    } else {
      const showdetails = await ShowCreate.findById(showId);
      redis.set(showId, JSON.stringify(showdetails));
      res.json(showdetails);
    }
  });
};
export const findhallbyid = async (req: Request, res: Response) => {
  const { hallId } = req.body;

  redis.get(hallId, async (err, data) => {
    if (data) {
      res.json(JSON.parse(data));
    } else {
      const halldetails = await MovieHall.findById(hallId);
      redis.set(hallId, JSON.stringify(halldetails));
      res.json(halldetails);
    }
  });
};
