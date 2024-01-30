import { Request, Response } from "express";
import Movie from "../models/movie";
import MovieHall from "../models/movieHall";
import Booking from "../models/booking";
import ShowCreate from "../models/Show";
import UserAccCreate from "../models/user";
import mongoose from "mongoose";

function generateSeatMatrix(
  rows: number,
  fares: { rows: number; fare: number }[],
  bad: number[][]
) {
  const seatMatrix: any[] = [];

  for (let i = 1; i <= rows; i++) {
    const row: any[] = [];

    for (let j = 1; j <= 5; j++) {
      if (bad.some((pair) => pair[0] === i && pair[1] === j)) {
        row.push({
          seatNumber: "XX",
          fare: -1,
        });
      } else {
        const fareObj = fares.find((fareConfig) => i <= fareConfig.rows);
        const fare = fareObj ? fareObj.fare : -1;

        // Assuming a seat number format like 'A1', 'A2', ...
        const seatNumber = `${String.fromCharCode(65 + i - 1)}${j}`;
        row.push({
          seatNumber,
          fare,
        });
      }
    }

    seatMatrix.push(row);
  }

  return seatMatrix;
}
function generateRandomDate() {
  const currentDate = new Date();
  const nextWeek = new Date(currentDate);
  nextWeek.setDate(currentDate.getDate() + 7); // Set date to a week from now

  // Set time to 7 PM
  nextWeek.setHours(19, 0, 0, 0);

  // Random time within 24 hours
  const randomDate = new Date(nextWeek.getTime());

  return randomDate;
}
export const bookingfn = async (req: Request, res: Response) => {
  try {
    const { user, movie, theatre, seatNumber, time } = req.body;
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

    if (!showFind) {
      return res.json({ success: false, message: "no show found" });
    }
    const newBooking = new Booking({
      user,
      movie: movieId?._id,
      movieHall: movieHallId?._id,
      seatNumber,
    });

    const newbooksave = await newBooking.save();
    const i = seatNumber.first;
    const j = seatNumber.second;

    const updateConditions: { [key: string]: any } = {
      _id: showFind._id,
    };
    updateConditions[`seatmatrix.${i}.${j}.reference`] = { $exists: false };

    const updateOperation = {
      $set: {
        [`seatmatrix.${i}.${j}.reference`]: newbooksave._id,
      },
    };
    ShowCreate.updateOne(updateConditions, updateOperation, { upsert: true })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });

    res.status(201).json({ newBooking, showFind });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const find_movie = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find();

    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const find_Single_movie = async (req: Request, res: Response) => {
  const { movie_id } = req.body;
  const movie = await Movie.findById(movie_id);
  res.json(movie);
};

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

export const UserCreate = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = new UserAccCreate({
    name,
    email,
  });
  const userSave = await user.save();
  res.json({
    success: true,
    userSave,
  });
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

  res.json(result);
};

export const findshowbyid = async (req: Request, res: Response) => {
  const { showId } = req.body;
  const showdetails = await ShowCreate.findById(showId);
  res.json(showdetails);
};
export const findhallbyid = async (req: Request, res: Response) => {
  const { hallId } = req.body;
  const halldetails = await MovieHall.findById(hallId);
  res.json(halldetails);
};
