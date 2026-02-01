const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./Routes/authRoute'));
app.use('/api/tasks', require('./Routes/taskRoute'));

app.get('/', (req, res) => {
  res.send("Task Manager API is running...");
});

const PORT = process.env.PORT || 5000;

// Start server 
const startServer = async () => {
  try {
   await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

startServer();