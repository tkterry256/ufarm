const express = require("express");

const navLinks = require("./nav-links");
const User = require("../../models/User");
const Product = require("../../models/Product");

const router = express.Router();

router.get("/", (req, res) => {
  const activeLink = "/fo";
  const renderData = { activeLink, navLinks, user: req.user };

  res.render("pages/fo/dashboard", renderData);
});

router.get("/urban-farmers", async (req, res) => {
  const urbanFarmers = await User.find({
    role: "UrbanFarmer",
    ward: req.user.ward,
  }).exec();

  const activeLink = "/fo/urban-farmers";
  const renderData = { activeLink, navLinks, urbanFarmers, user: req.user };

  res.render("pages/fo/urban-farmers", renderData);
});

router.get("/new-urban-farmer", (req, res) => {
  const activeLink = "/fo/new-urban-farmer";
  const renderData = {
    activeLink,
    navLinks,
    messages: req.flash("messages"),
    user: req.user,
  };

  res.render("pages/fo/new-urban-farmer", renderData);
});

router.post("/new-urban-farmer", async (req, res) => {
  try {
    const urbanFarmer = new User({
      ...req.body,
      role: "UrbanFarmer",
      ward: req.user.ward,
    });
    const userAlreadyExists = await User.findOne({
      uniqueId: urbanFarmer.uniqueId,
    });

    if (userAlreadyExists) {
      const message = {
        message: `User with ID: ${urbanFarmer.uniqueId} already exists`,
        type: "Error",
      };

      req.flash("messages", message);

      return res.redirect("/fo/new-urban-farmer");
    }

    await User.register(urbanFarmer, req.body.password);

    const message = {
      message: `User with ID: ${urbanFarmer.uniqueId} successfully registered`,
      type: "Success",
    };

    req.flash("messages", message);

    return res.redirect("/fo/new-urban-farmer");
  } catch (err) {
    console.log(err);
    res.redirect("/oops");
  }
});

router.get("/product-inspections", async (req, res) => {
  const unInspectedProducts = await Product.aggregate([
    { $match: { approvalStatus: "Pending" } },
    {
      $lookup: {
        from: "users",
        localField: "urbanFarmerId",
        foreignField: "_id",
        as: "urbanFarmer",
      },
    },
    { $set: { urbanFarmer: { $arrayElemAt: ["$urbanFarmer", 0] } } },
    { $match: { "urbanFarmer.ward": req.user.ward } },
    {
      $project: {
        "urbanFarmer.salt": 0,
        "urbanFarmer.hash": 0,
        "urbanFarmer.status": 0,
      },
    },
  ]).exec();

  const activeLink = "/fo/product-inspections";
  const renderData = {
    activeLink,
    navLinks,
    user: req.user,
    products: unInspectedProducts,
    messages: req.flash("messages"),
  };

  res.render("pages/fo/product-inspections", renderData);
});

router.post("/approve-product/:id", async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, {
    approvalStatus: "Approved",
  });

  const message = {
    message: `Product successfully approved`,
    type: "Success",
  };

  req.flash("messages", message);

  res.redirect("/fo/product-inspections");
});

router.get("/bookings-and-orders", (req, res) => {
  const activeLink = "/fo/bookings-and-orders";
  const renderData = { activeLink, navLinks, user: req.user };

  res.render("pages/fo/bookings-and-orders", renderData);
});

router.get("/communication", (req, res) => {
  const activeLink = "/fo/communication";
  const renderData = { activeLink, navLinks, user: req.user };

  res.render("pages/fo/communication", renderData);
});

module.exports = router;
