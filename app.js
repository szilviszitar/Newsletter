const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");
const { subscribe } = require("diagnostics_channel");

const app = express();

client.setConfig({
  apiKey: "23eb34a9cab02202a71b9e487ab7d1f8-us9",
  server: "us9",
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/singnup.html");
});



app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const email = req.body.eMail;
  const lastName = req.body.lName;

  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };

  console.log(subscribingUser);

  const response = client.lists
    .addListMember("9c841ffe34", {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName,
      },
    })
    .then(
      (ssss) => {
        console.log("Successfully added contact as an audience member.");
        res.sendFile(__dirname + "/success.html");
      },
      (reasonfffff) => {
        res.sendFile(__dirname + "/failure.html");
      }
    );
});

app.post("/failure", function(req, res){
    res.redirect("/")
});

app.listen(process.env.PORT  || 3000, function () {
  console.log("Server is running! ");
});
