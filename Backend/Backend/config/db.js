const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB Connected successfully');
    return true;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return false;
  }
};

module.exports = connectDB;