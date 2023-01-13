const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
     firstname: {
         type: String,
         required: true
     },

     lastname: {
        type: String,
        required: true
    },

    des: {
        type: String,
        required: true
    },

    days: {
        type: String,
        required: true
    }

}, {timestamps: true});

module.exports = mongoose.model('Leave', leaveSchema);