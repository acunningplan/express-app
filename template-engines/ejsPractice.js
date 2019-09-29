const express = require("express");
const app = express();

const path = require("path");
const helmet = require("helmet");
app.use(helmet());

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const validateUser = (req, res, next) => {
  res.locals.validated = true;
  next()
}

app.use(validateUser)

app.get('/about', (req, res, next) => {
  res.render('about', {})
})

app.get("/", (req, res, next) => {
  res.render("index", {
    msg: "Success!",
    failMsg: "Failed!",
    html: '<p><img src="" /></p>'
  });
});

app.listen(3000);
