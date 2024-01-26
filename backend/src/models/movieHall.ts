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
      matrix: [[Boolean]], //matrix er body banate hobe true or false | ekta movie thetre e koto type er matrix hote pare.booking er time e eta frntend e send krbo and render krbo
    },
  ],
  location: String,
});

export default model<MovieHall>("MovieHall", movieHallSchema);
