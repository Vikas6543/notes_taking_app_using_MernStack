const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

dotenv.config();

// Connect to DB
const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database Connected');
  } catch (error) {
    console.log(error);
  }
};
connectDatabase();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', require('./routes/userRoute'));
app.use('/notes', require('./routes/noteRoute'));

// configuarations for deployment to vercel
if (process.env.NODE_ENV === 'production') {
  app.get('/', (req, res) => {
    app.use(express.static(path.resolve(__dirname, 'client', 'build')));
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// listening port
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
