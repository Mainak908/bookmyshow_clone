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
  const { movieId } = req.body;

  redis.get(movieId, async (err, redisResult) => {
    if (err) {
      console.error("Error fetching data from Redis:", err);
    }
    if (redisResult) {
      res.json(JSON.parse(redisResult));
    } else {
      const result = await ShowCreate.aggregate([
        {
          $match: {
            movie: new mongoose.Types.ObjectId(movieId),
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
      console.log("data fetched from server");

      redis.set(movieId, JSON.stringify(result), (err) => {
        if (err) {
          console.error("Error storing data in Redis:", err);
        }
      });
      res.json(result);
    }
  });
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
