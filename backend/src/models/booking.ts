// models/booking.ts

import mongoose, { Document, Schema } from "mongoose";
import { Movie } from "./movie";
import { MovieHall } from "./movieHall";

export interface Booking extends Document {
  user: string;
  movie: Movie["_id"];
  movieHall: MovieHall["_id"];
  seatNumber: string;
  seatType: string;
  date: Date;
}

const bookingSchema = new Schema<Booking>({
  user: String,
  movie: { type: Schema.Types.ObjectId, ref: "Movie" },
  movieHall: { type: Schema.Types.ObjectId, ref: "MovieHall" },
  seatNumber: String,
  seatType: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.model<Booking>("Booking", bookingSchema);
