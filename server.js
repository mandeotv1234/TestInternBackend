const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Import and use route
const route = require('./routes');
route(app); // ✅ Đây là chỗ đúng để gọi

// MongoDB connect & listen
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error(err));
