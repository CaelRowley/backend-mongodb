import mongoose from 'mongoose';

const rateSchema = new mongoose.Schema(
  {
    currency: {
      type: String,
      required: true,
    },
    toEuro: {
      type: Number,
      required: true,
    }
  }
);

const Rate = mongoose.model('Rate', rateSchema);

export default Rate;
