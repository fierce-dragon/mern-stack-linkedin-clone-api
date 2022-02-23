import { Document, Schema, Model, model, Error } from "mongoose";
import bcrypt from "bcrypt-nodejs";

export interface IUser extends Document {
  email: string;
  password: string;
}

export const userSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
});

userSchema.methods.comparePassword = function (
  candidatePassword: string,
  callback: any
) {
  bcrypt.compare(
    candidatePassword,
    this.password,
    (err: Error, isMatch: boolean) => {
      callback(err, isMatch);
    }
  );
};

export const User: Model<IUser> = model<IUser>("User", userSchema);
