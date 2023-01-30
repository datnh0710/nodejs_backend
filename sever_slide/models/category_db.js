const mongoose = require("mongoose");

const category = new mongoose.Schema({
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
    }


});

const Category = mongoose.model("category-db", category);
module.exports = Category;