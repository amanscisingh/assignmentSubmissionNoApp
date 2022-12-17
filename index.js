require('dotenv').config({ path: './config/.env' });
const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3200;
const URI = process.env.MONGODB_URI;

mongoose.connect(URI)
    .then((connection)=>{
        console.log(`Connected to database `);
        app.listen(PORT, ()=> {
            console.log(`Server is running up at port ${PORT}`);
        })
        // console.log(connection);
    })
