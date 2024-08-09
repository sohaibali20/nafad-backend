import mongoose,{Schema} from 'mongoose';

const dailysalesSchema = new Schema(
{
    date: {
        type: Date,
        required: true,
        index: true,
    },
    day: {
        type: String,
        required: true,
        index: true,
    },
    totalSales: {
        type: Number,
        required: true,
    },
    },{
    timestamps: true
    }
);

export const DailySales = mongoose.model('DailySales', dailysalesSchema);