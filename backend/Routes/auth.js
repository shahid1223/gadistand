const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
const fetchuser = require('../middleware/fetchuser')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const JWT_SECRET = "shahidisagoodboy"

//Creat a User Using: POST "/api/auth"
router.post('/createuser', [
    body('name', 'Enter a name').isLength({ min: 3 }),
    body('mobile', 'Enter a valid Mobile Number').isNumeric(),
    body('password', 'Password Must be at least 5 charecter').isLength({ min: 3 }),
    body('role', 'Select Role').isNumeric({ min: 1 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let ser = await User.findOne({ mobile: req.body.mobile });
        if (ser) {
            return res.status(400).json({ error: "Sorry a user with this Mobile number is already exist" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPas = await bcrypt.hash(req.body.password, salt)

        let user = await User.create({
            name: req.body.name,
            mobile: req.body.mobile,
            password: secPas,
            role: req.body.role,
        })
        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken })
        res.json(user)
    } catch (error){
       return res.json("Some error accured")
        console.error(error.message);
    }
})

router.post('/login',[
    body('mobile', 'Enter a valid Mobile Number').isNumeric(),
    body('password','Password cannot be blank').exists(),
], async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { mobile , password} = req.body;
    try{
        let user = await User.findOne({mobile});
        if(!user){
            return res.json({error:"Try to login with correct credentials"});
        }
        const passwodcampare = await bcrypt.compare(password,user.password)
        if(!passwodcampare){
            return res.status(400).json({error:"Try to login with correct credentials"});
        }
        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken})
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server error")
    }
})
router.post('/getuser', fetchuser,  async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
module.exports = router