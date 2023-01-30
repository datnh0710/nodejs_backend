const mongoose = require("mongoose");

const post = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    content: {
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
    threadID: {
        type: String,
        require: true
    },
    votes: {
        type: Number,
        default: 0
    }


});

const Post = mongoose.model("post-db", post);
module.exports = Post;