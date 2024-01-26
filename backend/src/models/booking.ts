// models/booking.ts

import mongoose, { Document, Schema } from "mongoose";
import { Movie } from "./movie";
import { MovieHall } from "./movieHall";
import { Usertype } from "./user";

export interface Bookingtype extends Document {
  user: Usertype["_id"];
  movie: Movie["_id"];
  movieHall: MovieHall["_id"];
  seatNumber: string;
  seatType: string;
  date: Date;
}

const bookingSchema = new Schema<Bookingtype>({
  user: { type: Schema.Types.ObjectId, ref: "UserAcc" },
  movie: { type: Schema.Types.ObjectId, ref: "Movie" },
  movieHall: { type: Schema.Types.ObjectId, ref: "MovieHall" },
  seatNumber: String,
  seatType: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.model<Bookingtype>("Booking", bookingSchema);
