const mongoose = require("mongoose");

const thread = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    creator: {
        type: String,
        require: true,
    },
    created: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: ""
    },
    categoryID: {
        type: String,
        require: true
    },
    votes: {
        type: Number,
        default: 0
    }


});

const Thread = mongoose.model("thread-db", thread);
module.exports = Thread;