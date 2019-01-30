import mongoose from 'mongoose';

import ICO from './ico';

const connectDb = () => {
  return mongoose.connect(
    process.env.DATABASE_URL,
    { useNewUrlParser: true },
  );
};

const models = { ICO };

export { connectDb };

export default models;
