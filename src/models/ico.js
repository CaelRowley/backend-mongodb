import mongoose from 'mongoose';

const icoSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    txid: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ICO = mongoose.model('ICO', icoSchema);

export default ICO;
