//basic express.js template with routes and views and public folder using ejs as view engine and body-parser for parsing post requests and run on localhost:3000
//npm install express --save
//npm install ejs --save
//npm install body-parser --save
//npm install express-session --save
//npm install connect-flash --save
//npm install dotenv --save
//require modules for
//require modules
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var flash = require("connect-flash");
var nodemailer = require("nodemailer");
var sesTransport = require("nodemailer-ses-transport");
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
require("dotenv").config();
//set view engine
app.set("view engine", "ejs");

//set public folder
app.use(express.static(__dirname + "/public"));

//use body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//use express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

//use connect-flash
app.use(flash());

//use middleware to pass flash messages to all views
app.use(function (req, res, next) {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

//routes
app.get("/", function (req, res) {
  res.render("index");
});

//post route for form
app.post("/", function (req, res) {
  //get form data
  var name = req.body.name;
  var phone = req.body.phone;
  var message = req.body.message;
  //send form data to email with nodemailer and AWS ses
  var transporter = nodemailer.createTransport(
    sesTransport({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    })
  );
  var mailOptions = {
    from: process.env.FROM_EMAIL,
    to: process.env.TO_EMAIL,
    subject: "New Message from " + name,
    text: "Name: " + name + "\nPhone: " + phone + "\nMessage: " + message,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      //flash success message
      req.flash("success", "Your message has been sent!");
      //redirect to home page
      res.redirect("/");
    }
  });
});

//listen on port 3000
app.listen(process.env.PORT, function () {
  console.log("Server started on port 3000");
});


