import { Document, Schema, model } from "mongoose";
import { Seat } from "./seat";

interface SeatMatrix {
  type: "standard" | "vip" | "premium";
  matrix: Seat[][];
}
export interface MovieHall extends Document {
  name: string;
  seatMatrices: SeatMatrix[];
}
const movieHallSchema = new Schema({
  name: String,
  seatMatrices: [
    {
      type: {
        type: String,
        enum: ["standard", "vip", "premium"],
        required: true,
      },
      matrix: [[{ type: Schema.Types.ObjectId, ref: "Seat" }]],
    },
  ],
  movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
  location: String,
});

export default model<MovieHall>("MovieHall", movieHallSchema);
