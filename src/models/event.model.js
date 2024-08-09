import mongoose, { Schema } from "mongoose";
const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    poster: {
      type: String,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },
    totalTickets: {
      type: number,
    },
    ticketsSold: {
      type: number,
    },
    revenue: {
      type: String,
    },

    expenditure: {
      type: String,
    },
    staff: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ], // Array of staff members managing the event
    tickets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Ticket",
      },
    ],
    attendance: [
      {
        buyer: {
          type: Schema.Types.ObjectId,
          ref: "User",
          // required: true,
        },
        status: {
          type: String,
          enum: ["Present", "Absent"],
          default: "Absent",
        },
      },
    ], // Attendance tracking for users (buyers)
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
