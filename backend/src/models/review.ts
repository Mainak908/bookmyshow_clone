import { Document, model, Schema } from "mongoose";

export interface Reviewtype extends Document {
  userId: Schema.Types.ObjectId;
  movie: Schema.Types.ObjectId;
  text: String;
  rating: number;
  movieId: String;
}

const userSchema = new Schema<Reviewtype>({
  userId: Schema.Types.ObjectId,
  movie: Schema.Types.ObjectId,
  text: String,
  rating: Number,
  movieId: String,
});

export default model<Reviewtype>("UserAcc", userSchema);
