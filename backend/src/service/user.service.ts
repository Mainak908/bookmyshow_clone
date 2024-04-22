import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import UserModel, { Usertype } from "../models/user";

export async function findAndUpdateUser(
  query: FilterQuery<Usertype>,
  update: UpdateQuery<Usertype>,
  options: QueryOptions = {}
) {
  return UserModel.findOneAndUpdate(query, update, options);
}
