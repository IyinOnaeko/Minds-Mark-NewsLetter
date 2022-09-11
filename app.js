//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { post } = require("request");
const { json } = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const path = require("path");
require("dotenv").config();

mailchimp.setConfig({
  apiKey: process.env.API_KEY,
  server: process.env.SERVER,
});

const app = express();

//all the images and custom css which are static must be in public folder to render templates along with bootsrap
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html"); //static
});

app.post("/", async function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  // js object to hold data, an array of objects
  const listId = process.env.LIST_ID;
  const subscribingUser = {
    firstName,
    lastName,
    email,
  };

  try {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName,
      },
    });

    console.log(response.status);

    res.sendFile(path.join(__dirname + "/success.html"));
  } catch (error) {
    res.sendFile(path.join(__dirname + "/failure.html"));
  }
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("port started on 3000");
});
