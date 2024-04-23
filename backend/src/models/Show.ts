import { Document, Schema, model } from "mongoose";
import { Bookingtype } from "./booking";
import { Movie } from "./movie";
import { MovieHall } from "./movieHall";

interface matrixElement {
  reference: Bookingtype["_id"];
  seatNumber: string;
  fare: number;
  islocked: boolean;
}
export interface ShowType extends Document {
  movie: Movie["_id"];
  theatre: MovieHall["_id"];
  time: Date;
  seatmatrix: matrixElement[][];
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
  time: Date,

  seatmatrix: [
    [
      {
        reference: { type: Schema.Types.ObjectId, ref: "Booking" },
        seatNumber: String,
        fare: Number,
        islocked: {
          type: Boolean,
          default: false,
        },
      },
    ],
  ],
});

export default model<ShowType>("EveryShow", everyshow);
