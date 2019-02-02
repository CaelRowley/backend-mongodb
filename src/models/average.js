import mongoose from 'mongoose';

const averageSchema = new mongoose.Schema(
  {
    value: {
      type: Number,
      required: true,
    }
  }
);

const Average = mongoose.model('Average', averageSchema);

export default Average;
