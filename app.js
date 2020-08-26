var express = require("express"),
app = express();

//ENV setup
require('dotenv').config();

//Declaring varibles
var bodyParser = require("body-parser"),
	passportSetup = require("./config/passport-setup"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	User = require("./models/users"),
	expressSession = require("express-session"),
	flash = require('connect-flash'),
	path = require("path");

//passport setup
app.use(expressSession({
	secret: "Login app",
	resave: false,
	saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(user, done) {
 	done(null, user);
});

//app.use
app.use((req, res, next) => {
	//populate req.app.loacls with app info
	req.app.locals.currentUser = req.user;
	req.app.locals.message = req.flash('authentication');
	req.app.locals.err = req.flash('error');
	next();
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//connecting mongoose
mongoose.connect(process.env.DBURL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
}).then(() => {
	console.log("MongoDB has concected!")
}).catch((err) => {
	console.log("Something went wrong");
	console.log(err.message);
});

//Handling routs
//route file locations
var authenticationRouts = require("./routs/authentication"),
	indexRouts = require("./routs/index");
//using routs files
app.use(authenticationRouts);
app.use(indexRouts);

//app setings
app.set("view engine", "ejs");

var PORT = process.env.PORT || 5000;
app.listen(PORT, process.env.IP, () => {
	console.log("Server has started!");
});