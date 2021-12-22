const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Supplyer = require('../models/Supplyer');
const User = require('../models/User')
const UserReq = require('../models/UserReq')
const { body, validationResult } = require('express-validator');


//for supllyer
router.get('/allsupply', async (req, res) => {
    try {
        const supplye = await Supplyer.find();
        res.json(supplye)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.delete('/deletedata/:id', async (req,res) => {
    try {
        const data = await Supplyer.findByIdAndDelete(req.params.id)
        // const savedData = await data.save()
        res.json("dleted")
    } catch (error) {
        res.json(error)
    }
})

router.put('/updatedata/:id' ,async (req,res) => {
    try {
        // const { taxi_type, available_date, available_time, fare , commision , created_at, pickup_city, drop_city, status } = req.body;
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

    router.get('/alluser', async (req, res) => {
        try {
            const user = await User.find();
            res.json(user)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })
    
})


module.exports = router