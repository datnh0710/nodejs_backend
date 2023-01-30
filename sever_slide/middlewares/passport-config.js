const { Strategy } = require("passport-local");
const passport = require("passport");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// load account model
const Account = require("../models/account_db");

async function authenticateUser(email, password, done) {
	const user = Account.findOne({ email: email }).then((user) => {
		if (!user) {
			console.log("No user with that email");
			return done(null, false, { message: "No user with that email" });
		}
		bcrypt.compare(password, user.password, (err, isMatch) => {
			if (err) throw err;
			if (isMatch) {
				console.log("User Authenticated");
				return done(null, user);
			} else {
				console.log("Password incorrect");
				return done(null, false, { message: "Password incorrect" });
			}
		});
	});
}
function setupPassport() {
	const formNames = { usernameField: "email", passwordField: "password" };
	const localStrategy = new Strategy(formNames, authenticateUser);
	passport.use(localStrategy);
	passport.serializeUser((user, done) => done(null, user.id));
	passport.deserializeUser((id, done) => {
		Account.findById(id, (err, user) => {
			done(err, user);
		});
	});
}
setupPassport();
module.exports = passport;
