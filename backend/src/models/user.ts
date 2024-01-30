import mongoose, { Document, Schema } from "mongoose";
import { Bookingtype } from "./booking";

export interface Usertype extends Document {
  name: string;
  email: string;
  order: Bookingtype["_id"];
}
const userSchema = new mongoose.Schema<Usertype>({
  name: String,
  email: {
    type: String,
    required: true,
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: "Booking",
  },
});

export default mongoose.model<Usertype>("UserAcc", userSchema);
//database,collection,document
