const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
     firstname: {
         type: String,
         required: true
     },

     lastname: {
        type: String,
        required: true
    },

    department: {
        type: String,
        required: true
    },

    post: {
        type: String,
        required: true
    },

}, {timestamps: true});

module.exports = mongoose.model('Employee', taskSchema);