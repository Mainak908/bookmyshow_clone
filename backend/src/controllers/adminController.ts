import { Request, Response } from "express";
import ShowCreate from "../models/Show";
import Movie from "../models/movie";
import MovieHall from "../models/movieHall";
import {
  generateRandomDate,
  generateSeatMatrix,
} from "../service/admin.service";

export const CreateShow = async (req: Request, res: Response) => {
  const { movieName, theatre_name } = req.body;

  const find_movie = await Movie.findOne({
    title: movieName,
  });
  const movieId = find_movie?._id;

  const find_theatre = await MovieHall.findOne({
    name: theatre_name,
  });
  const theatreId = find_theatre?._id;
  const SeatMatrix = find_theatre?.seatMatrices[0];

  const newshow = new ShowCreate({
    movie: movieId,
    theatre: theatreId,
    time: generateRandomDate(),
    seatmatrix: SeatMatrix,
  });
  const save_show = await newshow.save();
  res.json({
    success: true,
    save_show,
  });
};

export const CreateMovie = async (req: Request, res: Response) => {
  const { title, length, cast, year, genre, url, rating } = req.body;
  const moviecreate = new Movie({
    title,
    length,
    cast,
    rating,
    year,
    genre,
    url,
  });
  const save_movie = await moviecreate.save();
  res.json({
    success: true,
    save_movie,
  });
};

export const CreateMovieTheatre = async (req: Request, res: Response) => {
  const { name, badSeat, location, rows, fares } = req.body;

  const sendmatrix = generateSeatMatrix(rows, fares, badSeat);

  const mvTheatreCreate = new MovieHall({
    name,
    seatMatrices: [sendmatrix],
    location,
  });

  const saveTheatre = await mvTheatreCreate.save();
  res.json({
    success: true,
    saveTheatre,
  });
};
