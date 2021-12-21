const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Supplyer = require('../models/Supplyer');
const UserReq = require('../models/UserReq');
const { body, validationResult } = require('express-validator');

router.post('/customerrequest', fetchuser, [
    body('pickup_city', ' Enter pickup_city').isNumeric({ min: 3 }),
    body('drop_city', ' Enter drop_city').isNumeric({ min: 3 }),
    body('available_date', ' Enter Date').notEmpty()
] ,async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // for cutomer data save
        const { pickup_city, drop_city, available_date } = req.body;
        const userReq =  new UserReq({
            pickup_city,
            drop_city,
            available_date,
            user: req.user.id
        })
        const savedSupplyer = await userReq.save()
        // for search taxi
        const supply = await Supplyer.find({ pickup_city: pickup_city, drop_city: drop_city });
        res.json(supply)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/customerrequestdata', fetchuser, async (req, res) => {
    try {
        const { pickup_city, drop_city , available_date } = req.body
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