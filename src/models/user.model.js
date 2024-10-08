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
        trim: true, // Trims any leading or trailing whitespace from the password
      },
      role: {
        type: String,
        enum: ['buyer', 'admin', 'eventowner'], // Role of the user, either a buyer or admin, event-owner
        default: 'buyer', // Defaults to buyer if no role is provided
      },
      tickets: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Event.tickets'
        }
      ],
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema)

export default User;