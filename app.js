const express = require("express");
const request = require("request");
const app = express();
const bodyParser = require("body-parser");

// Routes
app.get("/", (req, res) => {
  res.send("Good Morning Code");
});

// Acess Token Route
app.get("/access_token", access, (req, res) => {
  res.status(200).json({ access_token: req.access_token });
});

app.get("/register", access, (req, resp) => {
  let url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl";
  let auth = "Bearer" + req.access_token;

  request(
    {
      url: url,
      method: "POST",
      headers: {
        Authorization: auth
      },
      json: {
        ShortCode: "600329",
        ResponseType: "Complete",
        ConfirmationURL: "https://f44fee8b.ngrok.io/confirmation",
        ValidationURL: "https://f44fee8b.ngrok.io/validation_url"
      }
    },
    function(error, response, body) {
      if (error) {
        console.log(error);

        resp.status(200).json(body);
      }
    }
  );
});

app.post("/confirmation", (req, res) => {
  console.log("................ confirmation .................");
  console.log(req.body);
});

app.post("/validation", (req, resp) => {
  console.log("................ validation .................");
  console.log(req.body);
});

app.get("/simulate", access, (req, res) => {
  let url = "";
  let auth = "Bearer" + req.access_token;

  request({
    url: url,
    method: "POST",
    headers: {
      Authorization: auth
    },
    json: {},
    function(error, response, body) {
      if (error) {
        console.log(error);
      } else {
        res.status(200).json(body);
      }
    }
  });
});

function access(req, res, next) {
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
        req.access_token = JSON.parse(body).access_token;
        next();
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
