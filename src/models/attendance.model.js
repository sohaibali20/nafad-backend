import mongoose,{Schema} from 'mongoose';

const attendanceSchema = new Schema(
{
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  attendancestatus: {
    type: String,
    enum: ['present', 'absent'], // Attendance status
    default: 'absent',
  } 
},
{ timestamps: true }
);

export const Attendance = mongoose.model('Attendance', attendanceSchema);