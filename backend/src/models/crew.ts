import mongoose, { Document, Schema } from "mongoose";

export interface ICrew extends Document {
  birthplace: string;
  occupation: string[];
  about: string;
}

const crewSchema = new Schema<ICrew>({
  occupation: [String],
  birthplace: String,
  about: String,
});

export default mongoose.model<ICrew>("Crewdb", crewSchema);
