import mongoose, { Document, Schema } from "mongoose";

export interface ICast extends Document {
  born: string;
  birthplace: string;
  spouse: string;
  children: number;
  occupation: string[];
  about: string;
}

const castSchema = new Schema<ICast>({
  born: String,
  birthplace: String,
  spouse: String,
  children: Number,
  occupation: [String],
  about: String,
});

export default mongoose.model<ICast>("Castdb", castSchema);
