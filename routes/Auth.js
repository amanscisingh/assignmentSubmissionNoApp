const express = require('express');
const authRoute = express.Router();
require('dotenv').config({ path: '../config/.env' });
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
var path = require('path');

// @/api/auth/
// registering new users
authRoute.post('/register', async (req, res) => {
    try {
        console.log(req.body);
        const hashedPass = await bcrypt.hash(req.body.password, 10);

        const existingUser = await User.findOne({ email: req.body.email });
        console.log(existingUser);
        if (existingUser) {
            res.json({ status: false, message: 'User already exists' });
        } else {
            let user = new User({
                email: req.body.email,
                name: req.body.name,
                password: hashedPass,
            });
            console.log(user);
            try {
                await user.save();
                res.status(201).json({
                    status: true,
                    message: 'User created successfully',
                    userInfo: user
                });   
            } catch (error) {
                res.status(500).json({
                    status: false,
                    message: error
                });
            }        
        }

    } catch (error) {  // catching the error in hashing finction of bcryptj
        res.status(500).json({ status: false, message: error });
    }
})

// login users
authRoute.post('/login', async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    console.log(req.body);
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            try {
                const isMatch = await bcrypt.compare(password, existingUser.password);
                if (isMatch) {
                    const token = jwt.sign({
                        name: existingUser.name,
                        email: existingUser.email,
                    }, process.env.SECRET_TOKEN);
                    res.setHeader('Authorization', token)
                    res.json({
                        status: true,
                        message: 'User logged in successfully',
                        token,
                        userInfo: existingUser
                    });

                } else {
                    res.json({ status: false, message: 'Password does not matched, try again' });
                }
            } catch (error) {
                res.json({ status: false, message: error.message });
            }


        } else {
            res.json({ status: false, message: 'User not registered with this email' });
        }
        
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
})

// authenticating the tokens
authRoute.post('/authenticate', async (req, res) => {
    try {
        const token = req.body.token;
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = decoded;
        res.status(201).json({
            status:true,
            userInfo : decoded,
            message: "User authenticated successfully"
        })

    } catch (error) {
        res.json({ status: false, message: 'Authorization Error' });
    }
})

module.exports = authRoute;