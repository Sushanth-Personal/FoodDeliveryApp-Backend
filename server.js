const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ConnectDB = require('./config/db');
const authRoutes = require('./auth/routes/authRoutes');
const authenticateToken = require('./auth/middlewares/authMiddleware');
const morgan = require('morgan');
const cors = require("cors");
const app = express();

dotenv.config();
ConnectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use('/api', authenticateToken);  
app.use('/auth', authRoutes);

//To create a health checking ping at a set interval to keep the hosting site active
// app.get('/health', (req, res) => {
//   res.status(200).json({ message: "Healthy" });
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Successfully Connected with PORT: ", PORT);
});