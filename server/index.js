const express = require('express');
const cors = require('cors'); 
const dotenv = require('dotenv');
const pool = require('./db');
const authRoutes = require('./routes/auth');

dotenv.config(); 
const app = express(); 

// middleware first
app.use(cors());
app.use(express.json());

// routes after
app.use('/auth', authRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});