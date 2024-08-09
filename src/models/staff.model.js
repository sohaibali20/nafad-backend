import mongoose,{Schema} from 'mongoose';

const staffSchema = new Schema(
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
      Avatar:{
            type: String,
            required: true,
      },
      status:{
            type: String,
            required: true,
            enum: ['active', 'inactive'],
      },
      email: {
          type: String,
          required: true,
          index: true,
          unique: true,
      },
      password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 25,
      },
      events: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Event',
        },
      ],
    },
    { timestamps: true }
  );
  
  const Ticket = mongoose.model('Ticket', ticketSchema);
  