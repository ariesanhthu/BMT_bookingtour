import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connString = process.env.MONGODB_URI || '';
    await mongoose.connect(connString, {
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
