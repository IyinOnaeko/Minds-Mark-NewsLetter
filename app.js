//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { post } = require("request");
const { json } = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
      },
    ],
  };

  var jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/18975404ac";

  var options = {
    method: "POST",
    auth: "MindsMark:8686eae980c69296061041635f14149b-us14",
  };

  https.request(url, options, function (response) {
  response.on("data", function(data){
    console.log(JSON.parse(data));
  })
  });                       
});                     

app.listen(3000, function () {
  console.log("port started on 3000");
});

// API KEY
// 8686eae980c69296061041635f14149b-us14

// 18975404ac
