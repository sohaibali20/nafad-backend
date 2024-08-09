import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      index: true,
    },
    lastName: {
      type: String,
      required: true,
      index: true,
    },
    age: {
      type: Number,
      required: true,
      index: true,
    },
    gender: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String, // The password will be stored as a string
      required: true, // The field is required, so the document won't be saved without it
      minlength: 8, // Sets a minimum length of 8 characters for the password
      maxlength: 25, // Sets a max length of 25 characters for the password
      select: false, // Prevents the password from being returned in queries by default
      trim: true, // Trims any leading or trailing whitespace from the password
    },
    role: {
      type: String,
      enum: ["buyer", "admin", "eventowner"], // Role of the user, either a buyer or admin, event-owner
      required: true,
    },
    tickets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Ticket",
      },
    ],
  },
  { timestamps: true }
);

export const user = mongoose.model("User", userSchema);
