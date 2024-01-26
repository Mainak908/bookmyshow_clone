// models/seat.ts

import mongoose, { Document, Schema } from "mongoose";

export interface Seat extends Document {
  seatNumber: string;
  isBooked: boolean;
}

const seatSchema = new Schema<Seat>({
  seatNumber: String,
  isBooked: { type: Boolean, default: false },
});

export default mongoose.model<Seat>("Seat", seatSchema);
