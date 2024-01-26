import { Document, Schema, model } from "mongoose";
import { Movie } from "./movie";
import { MovieHall } from "./movieHall";
import { Bookingtype } from "./booking";

export interface ShowType extends Document {
  movie: Movie["_id"];
  theatre: MovieHall["_id"];
  time: TimeRanges;
  seatmatrix: [[Bookingtype["_id"]]];
}

const everyshow = new Schema<ShowType>({
  movie: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  theatre: {
    type: Schema.Types.ObjectId,
    ref: "MovieHall",
    required: true,
  },
  time: TimeRanges,
  seatmatrix: [[{ type: Schema.Types.ObjectId, ref: "Booking" }]],
});

export default model<ShowType>("EveryShow", everyshow);
//ami age show create krbo then user booking krbe...toh jakhn show create krbo moviehall theke particular shape ekhane first e copy paste krbo
