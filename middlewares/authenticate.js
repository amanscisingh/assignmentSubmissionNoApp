const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../config/.env' });

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = decoded;
        console.log("user authenticated successfully")
        next();

    } catch (error) {
        res.json({ status: false, message: 'Authorization Error', error });
    }
}

module.exports = authenticate;