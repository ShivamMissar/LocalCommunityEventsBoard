const express = require('express');
const cors = require('cors'); 
const dotenv = require('dotenv');
const pool = require('./db');



dotenv.config(); 

const app = express(); 
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Sever is running on port ${PORT}`);
    
});

