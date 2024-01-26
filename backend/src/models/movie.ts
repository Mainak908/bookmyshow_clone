// models/movie.ts

import mongoose, { Document, Schema } from "mongoose";

export interface Movie extends Document {
  title: string;
  length: number;
  cast: string;
}

const movieSchema = new Schema<Movie>({
  title: String,
  length: Number,
  cast: String,
});

export default mongoose.model<Movie>("Movie", movieSchema);
