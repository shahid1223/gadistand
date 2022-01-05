const mongoose = require('mongoose')
const MONGOURI = ""
const connectTOMongo = () => {
  mongoose.connect(MONGOURI,()=>{
      console.log("Connected to db")
  })
}

module.exports = connectTOMongo
