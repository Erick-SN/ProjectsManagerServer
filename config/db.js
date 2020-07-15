const mongoose = require('mongoose');
require('dotenv').config({ path: 'vars.env' });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('Connection success');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
