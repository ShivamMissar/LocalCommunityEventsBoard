const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {

    try {
        const { name, email, password } = req.body;

        //check if user email already exists 
        const existingEmail = await pool.query(
            'SELECT * FROM users WHERE email = $1', [email]
        );

        if (existingEmail.rows.length > 0) {
            return res.status(400).json({ message: 'Email already exists - please login' });
        }
        else {

            const hashedPassword = await bcrypt.hash(password, 10);
            const saveUser = await pool.query(
                'INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING *',
                [name, email, hashedPassword]
            );

            const user = saveUser.rows[0];

            return res.status(201).json({
                message: 'User registered successfully',
                userId: user.id,
                name: user.name
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server Error'});  
    }

});


