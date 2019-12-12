const express = require("express");
const app = express();

// Routes
app.get("/", (req, res) => {
  res.send("Good Morning Code");
});

// Listenn to Requests
app.listen(5000);
