import { Document, Schema, model } from "mongoose";

export interface MovieHall extends Document {
  name: string;
  location: string;
  seatMatrices: { seatNumber: string; fare: number }[][][];
}

const movieHallSchema = new Schema<MovieHall>({
  name: String,
  seatMatrices: [[[{ seatNumber: String, fare: Number }]]],
  location: String,
});

export default model<MovieHall>("MovieHall", movieHallSchema);
