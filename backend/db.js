const mongoose = require('mongoose')
const MONGOURI = "mongodb+srv://shahid:shahid@cluster0.zbodk.mongodb.net/gadistand?retryWrites=true&w=majority"
const connectTOMongo = () => {
  mongoose.connect(MONGOURI,()=>{
      console.log("Connected to db")
  })
}

module.exports = connectTOMongo