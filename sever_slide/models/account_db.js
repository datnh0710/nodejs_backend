const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const account = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    picture_url: {
        type: String,
        required: false
    },
    last_active: {
        type: Date,
        default: Date.now
    },
    is_moderator: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: ""
    },
    user_status: {
        type: Boolean,
        default: true
    },
    categories: [{type:String}],
    threads: [{type:String}],
    posts: [{type:String}]

});

account.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.hash_password);
}

const Account = mongoose.model("account-db", account);
module.exports = Account;