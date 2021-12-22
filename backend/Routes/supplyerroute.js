const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Supplyer = require('../models/Supplyer');
const { body, validationResult } = require('express-validator');


router.get('/allsupply', fetchuser, async (req, res) => {
    try {
        const supplye = await Supplyer.find({ user: req.user.id });
        res.json(supplye)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


router.post('/createsupply', fetchuser, [
    body('taxi_type', 'Enter taxi_type').isNumeric({ min: 1 }),
    body('available_date', ' Enter available_date').isDate(),
    body('available_time', ' Enter available_time').isLength({ min: 3 }),
    body('fare', ' Enter fare').isNumeric(),
    body('commision', ' Enter commision').isNumeric(),
    body('pickup_city', ' Enter pickup_city').isNumeric({ min: 3 }),
    body('drop_city', ' Enter drop_city').isNumeric({ min: 3 }),
    body('status', ' Select Status').isNumeric(),
], async (req, res) => {
    try {
        const { taxi_type, available_date, available_time, fare , commision , created_at, pickup_city, drop_city, status } = req.body;
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
       console.log(available_date.slice(0, 10))
        const supplyer = new Supplyer({
            taxi_type,
            available_date,
            available_time,
            fare,
            commision,
            created_at,
            pickup_city,
            drop_city,
            status,
            user: req.user.id
        })
        const savedSupplyer = await supplyer.save()

        // res.json(savedSupplyer)
        res.status(200).json("success")

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

    router.put('/updatedata/:id', fetchuser ,async (req,res) => {
        try {
            const supplyer = await Supplyer.findById(req.params.id)
            supplyer.taxi_type = req.body.taxi_type
            supplyer.available_date = req.body.available_date
            supplyer.available_time = req.body.available_time
            supplyer.fare = req.body.fare
            supplyer.commision = req.body.commision
            supplyer.created_at = req.body.created_at
            supplyer.pickup_city = req.body.pickup_city
            supplyer.drop_city = req.body.drop_city
            supplyer.status = req.body.status
            const savedData = await supplyer.save()
            res.json(savedData)
        } catch (error) {
            res.json(error)
        }
        
    })
})
module.exports = router