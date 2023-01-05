const express = require("express");

const navLinks = require("./nav-links");
const User = require("../../models/User");
const Product = require("../../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
  const farmerOnes = await User.aggregate([
    { $match: { role: "FarmerOne" } },
    { $group: { _id: "$role", count: { $sum: 1 } } },
    { $set: { farmerOnes: { $arrayElemAt: ["$farmerOnes", 0] } } },
  ]).exec();

  const activeFarmerOnes = await User.find({
    role: "FarmerOne",
    status: "Active",
  })
    .sort({ ward: "asc" })
    .exec();

  const stats = {
    farmerOnes: (farmerOnes && farmerOnes[0]) || { count: 0 },
    activeFarmerOnes,
  };

  const activeLink = "/ao";
  const renderData = { activeLink, navLinks, user: req.user, stats };
  return res.render("pages/ao/dashboard", renderData);
});

router.get("/farmer-ones", async (req, res) => {
  const farmerOnes = await User.find({ role: "FarmerOne" })
    .sort({ status: "asc", ward: "asc" })
    .exec();

  const activeLink = "/ao/farmer-ones";
  const renderData = {
    activeLink,
    navLinks,
    farmerOnes,
    messages: req.flash("messages"),
    user: req.user,
  };
  return res.render("pages/ao/farmer-ones", renderData);
});

router.get("/new-farmer-one", (req, res) => {
  const activeLink = "/ao/new-farmer-one";
  const renderData = {
    activeLink,
    navLinks,
    messages: req.flash("messages"),
    user: req.user,
  };

  return res.render("pages/ao/new-farmer-one", renderData);
});

router.post("/new-farmer-one", async (req, res) => {
  const farmerOne = new User({
    ...req.body,
    role: "FarmerOne",
  });

  const userAlreadyExists = await User.findOne({
    uniqueId: farmerOne.uniqueId,
  });

  if (userAlreadyExists) {
    const message = {
      message: `User with ID: ${farmerOne.uniqueId} already exists`,
      type: "Error",
    };

    req.flash("messages", message);

    return res.redirect("/ao/new-farmer-one");
  }
  const previousFarmerOne = await User.findOne({
    ward: farmerOne.ward,
    status: "Active",
  });

  if (!previousFarmerOne) {
    farmerOne.status = "Active";
  }

  await User.register(farmerOne, req.body.password);

  const message = {
    message: `User with ID: ${farmerOne.uniqueId} successfully registered`,
    type: "Success",
  };

  req.flash("messages", message);

  return res.redirect("/ao/new-farmer-one");
});

router.get("/update-farmer-one/:id", async (req, res) => {
  const farmerOne = await User.findById(req.params.id).exec();

  const renderData = {
    navLinks,
    farmerOne,
    user: req.user,
  };

  return res.render("pages/ao/update-farmer-one", renderData);
});

router.post("/update-farmer-one/:id", async (req, res) => {
  const farmerOne = await User.findById(req.params.id).exec();

  farmerOne.activitiesUndertaken = req.body.activitiesUndertaken;
  farmerOne.phoneNumber = req.body.phoneNumber;

  await farmerOne.save();

  const message = {
    message: `User with ID: ${farmerOne.uniqueId} successfully updated`,
    type: "Success",
  };

  req.flash("messages", message);

  return res.redirect("/ao/farmer-ones");
});

router.get("/activate-farmer-one/:id", async (req, res) => {
  const farmerOne = await User.findById(req.params.id).exec();
  const previousFarmerOne = await User.findOne({
    ward: farmerOne.ward,
    status: "Active",
  });

  previousFarmerOne.status = "Inactive";
  await previousFarmerOne.save();

  farmerOne.status = "Active";
  await farmerOne.save();

  const message = {
    message: `User with ID: ${farmerOne.uniqueId} successfully appointed`,
    type: "Success",
  };

  req.flash("messages", message);

  return res.redirect("/ao/farmer-ones");
});

router.get("/communication", (req, res) => {
  const activeLink = "/ao/communication";
  const renderData = { activeLink, navLinks, user: req.user };

  return res.render("pages/ao/communication", renderData);
});

router.get("/reports", (req, res) => {
  const activeLink = "/ao/reports";
  const renderData = { activeLink, navLinks, user: req.user };
  return res.render("pages/ao/reports", renderData);
});

module.exports = router;
