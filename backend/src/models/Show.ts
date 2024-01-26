import { Document, Schema, model } from "mongoose";

const everyshow = new Schema({
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
  seatmatrix: [[{ type: Schema.Types.ObjectId, ref: "Seat" }]],
});

//seatmatrix er ekta type hobe based on thetre
