const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post(`${import.meta.env.VITE_API_URL}/register`, async (req, res) => {

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

router.post(`${import.meta.env.VITE_API_URL}/login`, async(req, res) => {

    try{

        const{email, password} = req.body;

        //check if email is registered

        const find_user = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        ); 

        if(find_user.rows.length === 0)
        {
            return res.status(400).json({message: 'user not found'});  
        }

        const userInfo = find_user.rows[0];
        
        const passwordCheck = await bcrypt.compare(password, userInfo.password)
        if(!passwordCheck)
        {
            return res.status(400).json({message: 'password incorrect!'});  
        }

        const token = jwt.sign(
            {userId: userInfo.id, name:userInfo.name}, 
            process.env.JWT_SECRET, 
            {expiresIn: '24h'}
        )

        return res.status(200).json({token, name:userInfo.name});  





    }catch(err)
    {
        console.error(err);
        res.status(500).json({message: 'Server Error'});  
    }
}); 


router.get(`${import.meta.env.VITE_API_URL}/user`, async(req,res) => {

     try{

        const{email} = req.body;

        //check if email is registered

        const find_user = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        ); 

        if(find_user.rows.length === 0)
        {
            return res.status(400).json({message: 'user not found'});  
        }

        const userInfo = find_user.rows[0];
        return res.status(200).json({name:userInfo.name});  

    }catch(err)
    {
        console.error(err);
        res.status(500).json({message: 'Server Error'});  
    }
});


module.exports = router; 


