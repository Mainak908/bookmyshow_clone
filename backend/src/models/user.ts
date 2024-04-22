import { Date, Document, model, Schema } from "mongoose";
export interface Usertype extends Document {
  name?: string;
  email?: string;
  image?: string;
  phone?: string;
  emailVerified?: Date;
  refresh_token: string;
}
const userSchema = new Schema<Usertype>({
  name: String,
  email: String,
  image: String,
  phone: String,
  emailVerified: Date,
  refresh_token: String,
});

export default model<Usertype>("UserAcc", userSchema);
