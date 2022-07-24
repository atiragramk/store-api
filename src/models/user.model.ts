import { Schema, model } from "mongoose";
import { TUser } from "../types";
import ModelMixIn from "../mixIns";

const userSchema = new Schema(
  {
    name: { type: String, required: [true, "Name required"] },
    email: {
      type: String,
      required: [true, "Email required"],
      validate: {
        validator: (value: string) => {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
        },
        message: () => "Email is invalid",
      },
    },
  },
  { timestamps: true }
);

class User extends ModelMixIn<TUser>("user", userSchema) {}
export default User;
