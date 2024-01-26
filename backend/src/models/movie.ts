// models/movie.ts

import mongoose, { Document, Schema } from "mongoose";

export interface Movie extends Document {
  title: string;
  length: number;
}

const movieSchema = new Schema<Movie>({
  title: String,
  length: Number,
});

export default mongoose.model<Movie>("Movie", movieSchema);
