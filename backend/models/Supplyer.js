const mongoose = require('mongoose')
const { Schema } = mongoose;

const SupplyerSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    taxi_type: {
        type: Number,
        required: true
    },
    available_date: {
        type: Date,
        required: true,
    },
    available_time: {
        type: String,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    commision: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    pickup_city: {
        type: Number,
        required: true
    },
    drop_city: {
        type: Number,
        required: true
    },

});
module.exports = mongoose.model('supplyer', SupplyerSchema);