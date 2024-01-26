import { Request, Response } from "express";
import Movie from "../models/movie";
import MovieHall from "../models/movieHall";
import Booking from "../models/booking";

export const bookingfn = async (req: Request, res: Response) => {
  try {
    const { user, movieId, movieHallId, seatNumber, seatType } = req.body;

    // Check if the movie and movie hall exist
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(400).json({ message: "Invalid movie ID" });
    }

    const movieHall = await MovieHall.findById(movieHallId);
    if (!movieHall) {
      return res.status(400).json({ message: "Invalid movie hall ID" });
    }

    // Check if the seat type is valid
    const seatMatrixInfo = movieHall.seatMatrices.find(
      (matrixInfo) => matrixInfo.type === seatType
    );
    if (!seatMatrixInfo) {
      return res.status(400).json({ message: "Invalid seat type" });
    }

    // Check if the seat is available
    const seatRow = seatMatrixInfo.matrix.find((row) =>
      row.includes(seatNumber)
    );
    if (!seatRow) {
      return res.status(400).json({ message: "Invalid seat number" });
    }

    // Create a new booking
    const newBooking = new Booking({
      user,
      movie: movieId,
      movieHall: movieHallId,
      seatNumber,
      seatType,
    });

    await newBooking.save();

    // Mark the seat as booked
    const seat = seatMatrixInfo.matrix
      .flat()
      .find((s) => s.seatNumber === seatNumber);
    if (seat) {
      seat.isBooked = true;
      await movieHall.save();
    }

    res.status(201).json(newBooking);
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
