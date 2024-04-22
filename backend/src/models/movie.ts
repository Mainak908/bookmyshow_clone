// models/movie.ts

import mongoose, { Document, Schema } from "mongoose";

export interface Movie extends Document {
  title: string;
  length: number;
  cast: string;
  crew: string;
  about: string;
  year: number;
  genre: string;
  url: string;
  rating: number;
}

const movieSchema = new Schema<Movie>({
  title: String,
  length: Number,
  cast: String,
  crew: String,
  about: String,
  year: Number,
  genre: String,
  url: String,
  rating: Number,
});

export default mongoose.model<Movie>("Movie", movieSchema);
