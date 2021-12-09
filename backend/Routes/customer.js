const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Supplyer = require('../models/Supplyer');


router.post('/customerrequest', fetchuser, async (req, res) => {
    try {
        console.log(req.body)
        // ,available_date:search_date
        const {pickup_city,drop_city,search_date} = req.body;
        const supply = await Supplyer.find({pickup_city:pickup_city,drop_city:drop_city});
        res.json(supply)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router