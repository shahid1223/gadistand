const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserReqSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    available_date: {
        type: Date,
        required: true,
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
module.exports = mongoose.model('UserReqSchema', UserReqSchema);