const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const path = require("path");
const helmet = require("helmet");
app.use(helmet());

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
  if (req.query.msg === "fail") {
    res.locals.msg = "Incorrect username and password combination";
  } else {
    res.locals.msg = "";
  }
  next();
});

app.get("/", (req, res, next) => {
  res.send("Sanity check");
});

app.get("/login", (req, res, next) => {
  const msg = req.query.msg;
  if (msg === "fail") {
  }
  res.render("login", {});
});

app.post("/process_login", (req, res, next) => {
  const password = req.body.password;
  const username = req.body.username;

  if (password === "asdf") {
    res.cookie("username", username);
    res.redirect("/welcome");
  } else {
    res.redirect("/login?msg=fail&test=hello");
  }
});

app.get("/welcome", (req, res, next) => {
  res.render("welcome", {
    username: req.cookies.username
  });
});

app.param("id", (req, res, next, id) => {
  console.log("Relevant param is called: ", id);
  next();
});

app.get("/story/:id", (req, res, next) => {
  res.send(`<h1>Story ${req.params.id}</h1>`);
});

app.get("/statement", (req, res, next) => {
  // res.sendFile(
  //   path.join(__dirname, "userStatements/BankStatementChequing.png")
  // );
  
  res.download(
    path.join(__dirname, "userStatements/BankStatementChequing.png"), 'MyStatement.png'
  );
});

app.get("/logout", (req, res, next) => {
  res.clearCookie("username");
  res.redirect("/login");
});

app.listen(3000);
