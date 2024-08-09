import mongoose,{Schema} from 'mongoose';

const ticketSchema = new Schema(
    {
      event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
      },
      buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
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
  
  const Ticket = mongoose.model('Ticket', ticketSchema);
  