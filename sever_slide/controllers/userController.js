const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Account = require("../models/account_db");


class UserControllers {
    async getUserByUserName(request, response) {
        console.log(request.params.username);
        try {
            const data = await Account.findOne({ username: request.params.username });
            console.log(data);
            response.status(200).json(data)
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }

    async updateUser(request, response) {
        console.log(request.params.username);
        try {
            const user_name = request.params.username;
            const updateData = request.body;
            const data = await Account.findOneAndUpdate({ username: user_name }, updateData);
            console.log(data);
            response.status(200).json({ messages: "Successfully updated the account!" })
        } catch (error) {
            response.status(500).json({ message: error.message })
        }

    }

    async addNewCategory(request, response){
        console.log(request.params.username);
        try {
            const { username, newCategoryID} = request.body;
            const user = await Account.findOneAndUpdate({ username: username }, { $push: { "categories": newCategoryID} });
            console.log(user);
            response.status(200).json({ messages: "Successfully updated the account!" })
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }

    async addNewThread(request, response){
        console.log(request.params.username);
        try {
            const { username, newThreadID} = request.body;
            const user = await Account.findOneAndUpdate({ username: username }, { $push: { "threads": newThreadID} });
            console.log(user);
            response.status(200).json({ messages: "Successfully updated the account!" })
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }

    async addNewPost(request, response){
        console.log(request.params.username);
        try {
            const { username, newPostID} = request.body;
            const user = await Account.findOneAndUpdate({ username: username }, { $push: { "posts": newPostID} });
            console.log(user);
            response.status(200).json({ messages: "Successfully updated the account!" })
        } catch (error) {
            response.status(500).json({ message: error.message })
        }
    }

    async deleteUser(request, response) {
        console.log(request.params.username);
        try {
            const user_name = request.params.username;
            const data = await Account.findOneAndDelete({ username: user_name });
            console.log(data);
            response.status(200).json({ messages: "Successfully deleted the account!" })
        } catch (error) {
            response.status(500).json({ message: error.message })
        }

    }

    async postLogin(request, response) {
        //console.log(request.body);
        const userData = request.body;
        const user = await Account.findOne({ username: userData.username }).exec();
        const re = await bcrypt.compare(userData.password, user.password);
        //console.log(re);
        if (!user) {
            response.status(401).json({ msg: 'Invalid username' })
        } else if (!re) {
            response.status(401).json({ msg: 'Invalid password' })
        } else {
            const payload = { subject: user._id };
            const token = jwt.sign(payload, process.env.JWT_SECRET);
            response.status(200).send({ token })
        }

    }

    async forgotUser(request, response) {
        console.log(request.params.username);
        try {
            const user_name = request.params.username;
            const updateData = req.body;
            const data = await Account.findOneAndUpdate({ username: user_name }, updateData);
            console.log(data);
            response.status(200).json({ messages: "Successfully updated the account!" })
        } catch (error) {
            response.status(500).json({ message: error.message })
        }

    }

    postRegister(request, response) {
        try {
            const { username, email, password, password2, first_name, last_name, categories } = request.body;

            //console.log(request.body);
            //console.log(typeof categories);
            //validate the user input registration
            if (password != password2) {
                response.status(400).json({ message: 'Password is not match!' })
            } else {
                //validation passed

                // check duplicate usernames or email
                Account.findOne({ username: username }).then((account) => {
                    if (account) {
                        response.status(400).json({ message: 'Username is already registered!' });
                    }
                });

                Account.findOne({ email: email }).then((account) => {
                    if (account) {
                        // user exists
                        response.status(400).json({ message: 'Email is already registered!' });
                    } else {
                        // users.add(name, email, password);
                        const newUser = new Account({
                            username,
                            email,
                            password,
                            first_name,
                            last_name,
                            categories
                        });

                        //console.log(username, email, password, categories);
                        bcrypt.genSalt(10, (err, salt) =>
                            bcrypt.hash(newUser.password, salt, async (err, hash) => {
                                if (err) throw err;
                                // set password to hash
                                newUser.password = hash;
                                // save user to database
                                await newUser
                                    .save()
                                    .then((user) => {
                                        console.log(user)
                                        response.status(200).json({ messages: "Successfully created an account!" })
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                        response.status(400).json({ messages: err.message })
                                    });
                            })
                        );
                    }
                });
            }
        } catch (error) {
            response.status(400).json({ message: error.message })
        }
    }

    postLogout(request, response) {
        request.logOut();
        response.status(200).json({ messages: "Successfully logged out!" })
    }

}
module.exports = new UserControllers();