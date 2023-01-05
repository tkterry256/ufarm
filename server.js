require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const flash = require("connect-flash");

const aoRouter = require("./routers/ao/ao");
const foRouter = require("./routers/fo/fo");
const ufRouter = require("./routers/uf/uf");

const User = require("./models/User");
const Product = require("./models/Product");

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
const db = mongoose.connection;

// Check connection
db.once("open", function () {
  console.log("Connected to MongoDB");
});
// Check for db errors
db.on("error", function (err) {
  console.error(err);
});

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

const expressSession = require("express-session")({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
});

app.use(expressSession);
app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(require("express-camelcase-keys"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "public", "uploads"))
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

function ensureRole(role) {
  return function (req, res, next) {
    if (req.session.user.role === role) {
      next();
    } else {
      res.redirect("/404");
    }
  };
}

app.use("/ao", ensureLoggedIn(), ensureRole("AgricOfficer"), aoRouter);
app.use("/fo", ensureLoggedIn(), ensureRole("FarmerOne"), foRouter);
app.use("/uf", ensureLoggedIn(), ensureRole("UrbanFarmer"), ufRouter);

app.get("/", ensureLoggedOut("/route"), (req, res) => {
  res.render("pages/login");
});

app.get("/login", ensureLoggedOut("/route"), (req, res) => {
  res.render("pages/login");
});

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/route");
  }
);

app.get("/register", ensureLoggedOut("/route"), (req, res) => {
  res.render("pages/register");
});

app.post("/register", async (req, res) => {
  const user = new User({
    ...req.body,
    role: "Public",
  });

  const userAlreadyExists = await User.findOne({
    uniqueId: user.uniqueId,
  });

  if (userAlreadyExists) {
    const message = {
      message: `User with email: "${user.uniqueId}" already exists`,
      type: "Error",
    };

    req.flash("messages", message);

    return res.redirect("/register");
  }

  await User.register(user, req.body.password);

  const message = {
    message: `Registration successful`,
    type: "Success",
  };

  req.flash("messages", message);

  res.redirect("/login");
});

app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

app.get("/route", ensureLoggedIn(), (req, res) => {
  const roleToRoute = {
    AgricOfficer: "/ao",
    FarmerOne: "/fo",
    UrbanFarmer: "/uf",
    Public: "/market",
  };
  res.redirect(roleToRoute[req.user.role]);
});

app.get("/market", async (req, res) => {
  const products = await Product.find({
    availability: true,
    approvalStatus: "Approved",
  }).exec();

  const renderData = {
    messages: req.flash("messages"),
    user: req.user,
    products
  };

  res.render("pages/market", renderData);
});

app.get("/404", (req, res) => {
  res.render("pages/404");
});

app.get("/oops", (req, res) => {
  res.render("pages/oops");
});

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500);
  res.redirect("/oops");
});

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`The UFarm server is listening on port ${PORT}`);
});
