require('dotenv').config({ path: './config/.env' });
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
var path = require('path');
const app = express();
const PORT = process.env.PORT || 3200;
const URI = process.env.MONGODB_URI;

app.use(express.json(), cors());
app.use(express.static('public'));

app.get('/', async (req, res)=> {
    var options = {
        root: path.join(__dirname, '/public')
    };

    res.sendFile('login.html', options);
})

// app.get('/uploadCSV', async (req, res)=> {
//     var options = {
//         root: path.join(__dirname, '/public')
//     };

//     res.sendFile('upload.html', options);
// })

app.use('/api', require('./routes/api'));
app.use('/api/auth', require('./routes/Auth'));

mongoose.connect(URI)
    .then((connection)=>{
        console.log(`Connected to database `);
        app.listen(PORT, ()=> {
            console.log(`Server is running up at port ${PORT}`);
        })
        // console.log(connection);
    })
