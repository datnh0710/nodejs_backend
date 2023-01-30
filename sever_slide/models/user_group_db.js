const mongoose = require("mongoose");

const user_group = new mongoose.Schema({
    user_name: {
        type: String,
        require: true,
    },
    group_name: {
        type: String,
        require: true,
    }

});

const User_Group = mongoose.model("user-group-db", user_group);
module.exports = User_Group;