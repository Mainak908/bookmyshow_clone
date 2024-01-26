import { Document, Schema, model } from "mongoose";

interface SeatMatrix {
  type: "standard" | "vip" | "premium";
  matrixStruct: boolean[][];
}
export interface MovieHall extends Document {
  name: string;
  location: string;
  seatMatrices: SeatMatrix[];
}
const movieHallSchema = new Schema<MovieHall>({
  name: String,
  seatMatrices: [
    {
      type: {
        type: String,
        enum: ["standard", "vip", "premium"],
        required: true,
      },
      matrixStruct: [[Boolean]],
    },
  ],
  location: String,
});

export default model<MovieHall>("MovieHall", movieHallSchema);
