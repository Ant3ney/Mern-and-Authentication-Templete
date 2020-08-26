//User model
var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
	username: String,
	name: String,
	id: String,
	password: String,
	type: String,
	email: String
});

module.exports = mongoose.model("User", userSchema);