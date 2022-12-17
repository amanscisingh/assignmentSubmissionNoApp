const express = require('express');
const authenticate = require('../middlewares/Authenticate');
const apiRoute = express.Router();
const Contacts = require('../models/Contact');

apiRoute.get('/contacts', async (req, res)=> {
    try {
        const allContacts = await Contacts.find({});
        res.status(200).send({
            status: true,
            data:allContacts
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            error: error
        })
    }
})

apiRoute.post('/contacts', authenticate, async (req, res) => {
    try {
        console.log(req.body);
        let contact = new Contacts({
            name: req.body.name,
            email: req.body.email,
            phone: parseInt(req.body.phone),
            linkedin: req.body.linkedin
        })

        await contact.save();
        res.status(200).send({
            status: true,
            data:contact
        })

    } catch (error) {
        res.status(500).send({
            status: false,
            error: error
        })
    }
})

module.exports = apiRoute;