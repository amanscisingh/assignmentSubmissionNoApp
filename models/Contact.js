const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Contact", ContactSchema);