const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Supplyer = require('../models/Supplyer');
const UserReq = require('../models/UserReq');


router.post('/customerrequest', fetchuser, async (req, res) => {
    try {
        console.log(req.body)
        // ,available_date:search_date
        const { pickup_city, drop_city, date } = req.body;
        const supply = await Supplyer.find({ pickup_city: pickup_city, drop_city: drop_city, available_date: date });
        res.json(supply)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/customerrequestdata', fetchuser, async (req, res) => {
    try {
        const { pickup_city, drop_city, available_date } = req.body
        const userReq = new UserReq({
            pickup_city,
            drop_city,
            available_date,
            user: req.user.id
        })
        const savedSupplyer = await userReq.save()
        // res.json(savedSupplyer)
        res.status(200).json(savedSupplyer)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})



module.exports = router