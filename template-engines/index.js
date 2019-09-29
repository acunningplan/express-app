const express = require("express");
const helmet = require("helmet");
const app = express();

app.use(helmet());

// Receive and parse json
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Send back json
app.post("/ajax", (req, res) => {
  console.log(req);
  res.json("Test");
});

app.listen(8000);
console.log("Server listening on port 8000");
