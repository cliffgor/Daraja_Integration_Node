const express = require("express");
const request = require("request");
const app = express();

// Routes
app.get("/", (req, res) => {
  res.send("Good Morning Code");
});

// Acess Token Route
app.get("/acess_token", (req, res) => {});

function acess(res, req, next) {
  // acess token
  let url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  let auth = new Buffer(
    "TTA39OwqmcvKNeGkUFdHi3SKKXVjkjnC:lPGq92TsJVM4GNch"
  ).toString("base64");

  request(
    {
      url: url,
      headers: {
        Authorization: "Basic " + auth
      }
    },
    (error, response, body) => {
      if (error) {
        console.log(error);
      } else {
        req.status(200).json(body);
      }
    }
  );
}

// Listenn to Requests
app.listen(5000, (err, live) => {
  if (err) {
    console.error(err);
  }

  console.log("Surver is Running Good Morning on Port 5000");
});
