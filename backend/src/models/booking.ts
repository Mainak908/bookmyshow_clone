// models/booking.ts

import mongoose, { Document, Schema } from "mongoose";
import { Usertype } from "./user";

export interface Bookingtype extends Document {
  user: Usertype["_id"];

  seatNumber: [first: number, second: number][];

  date: Date;
}

const bookingSchema = new Schema<Bookingtype>({
  user: { type: Schema.Types.ObjectId, ref: "UserAcc" },

  seatNumber: {
    type: [
      [
        { type: Number, required: true }, // first
        { type: Number, required: true }, // second
      ],
    ],
    required: true,
  },

  date: { type: Date, default: Date.now },
});

export default mongoose.model<Bookingtype>("Booking", bookingSchema);
