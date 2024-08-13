
//Removed Trim, added eventOwner, genre and ticketPrice and gave ref to ticketPrice

import mongoose, { Schema } from "mongoose";


const ticketSchema = new Schema(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      // required: true,
    },
    category: {
      type: String,
      enum: ['normal', 'premium'], // Ticket types
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);


const eventSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true
      },
      poster: {
        type: String,
      },
      eventOwner: {
        type: Schema.Types.String,
        ref: 'User',
        required: true,
      },
      genre: {
        type: String,
        required: true,
        trim: true,
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
        type: Number,
      },
      ticketsSold: {
        type: Number,
      },
      expenditure: {
        type: Number,
      },
      staff: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }], // Array of staff members managing the event
      tickets: [ticketSchema], // Array of tickets for the event
      attendance: [
        {
          buyer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            // required: true,
          },
          status: {
            type: String,
            enum: ['Present', 'Absent'],
            default: 'Absent',
          },
        },
      ], // Attendance tracking for users (buyers)
    },
    { timestamps: true }
  );

  //Virtual for Revenue
  eventSchema.virtual('revenue').get(function() {
    return this.ticketPrice * this.ticketsSold;
  });

  eventSchema.set('toJSON', { virtuals: true});
  eventSchema.set('toObject', { virtuals: true});

  
  const Event = mongoose.model('Event', eventSchema);

  export default Event;
  export { ticketSchema };