const express = require("express");
const multer = require("multer");
const path = require("path");
const expressCamelCaseKeys = require("express-camelcase-keys");

const router = express.Router();

const navLinks = require("./nav-links");
const Product = require("../../models/Product");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

router.get("/", (req, res) => {
  const activeLink = "/uf";
  const renderData = {
    activeLink,
    navLinks,
    user: req.user,
    messages: req.flash("messages"),
  };

  res.render("pages/uf/dashboard", renderData);
});

router.get("/my-products", async (req, res) => {
  const products = await Product.find({ urbanFarmerId: req.user._id }).exec();

  const activeLink = "/uf/my-products";
  const renderData = {
    activeLink,
    navLinks,
    user: req.user,
    messages: req.flash("messages"),
    products,
  };

  res.render("pages/uf/my-products", renderData);
});

router.get("/new-product", (req, res) => {
  const activeLink = "/uf/new-product";
  const renderData = {
    activeLink,
    navLinks,
    user: req.user,
    messages: req.flash("messages"),
  };

  res.render("pages/uf/new-product", renderData);
});

router.post(
  "/new-product",
  upload.single("image"),
  expressCamelCaseKeys,
  async (req, res) => {
    const product = new Product({
      ...req.body,
      urbanFarmerId: req.user._id,
      imageUrl: `/${req.file.path.replaceAll("\\", "/")}`,
    });

    await product.save();

    const message = {
      message: `Product created successfully`,
      type: "Success",
    };

    req.flash("messages", message);

    res.redirect("/uf/new-product");
  }
);

router.get("/update-product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).exec();

  const renderData = {
    navLinks,
    user: req.user,
    messages: req.flash("messages"),
    product,
  };

  res.render("pages/uf/update-product", renderData);
});

router.post(
  "/update-product/:id",
  upload.single("image"),
  expressCamelCaseKeys,
  async (req, res) => {
    const productUpdate = { ...req.body };

    if (req.file) {
      productUpdate.imageUrl = `/${req.file.path.replaceAll("\\", "/")}`;
    }

    await Product.findOneAndUpdate({ _id: req.params.id }, productUpdate);

    const message = {
      message: `Product updated successfully`,
      type: "Success",
    };

    req.flash("messages", message);

    res.redirect("/uf/my-products");
  }
);

router.post("/activate-product/:id", async (req, res) => {
  await Product.findOneAndUpdate(
    { _id: req.params.id },
    { availability: true }
  );

  const message = {
    message: `Product activated successfully`,
    type: "Success",
  };

  req.flash("messages", message);

  res.redirect("/uf/my-products");
});

router.post("/delete-product/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);

  const message = {
    message: `Product deleted successfully`,
    type: "Success",
  };

  req.flash("messages", message);

  res.redirect("/uf/my-products");
});

router.post("/deactivate-product/:id", async (req, res) => {
  await Product.findOneAndUpdate(
    { _id: req.params.id },
    { availability: false }
  );

  const message = {
    message: `Product successfully deactivated`,
    type: "Success",
  };

  req.flash("messages", message);

  res.redirect("/uf/my-products");
});

router.get("/product-inspections", (req, res) => {
  const activeLink = "/uf/product-inspections";
  const renderData = {
    activeLink,
    navLinks,
    user: req.user,
    messages: req.flash("messages"),
  };

  res.render("pages/uf/product-inspections", renderData);
});

router.get("/bookings-and-orders", (req, res) => {
  const activeLink = "/uf/bookings-and-orders";
  const renderData = {
    activeLink,
    navLinks,
    user: req.user,
    messages: req.flash("messages"),
  };

  res.render("pages/uf/bookings-and-orders", renderData);
});

router.get("/communication", (req, res) => {
  const activeLink = "/uf/communication";
  const renderData = {
    activeLink,
    navLinks,
    user: req.user,
    messages: req.flash("messages"),
  };

  res.render("pages/uf/communication", renderData);
});

router.get("/reports", (req, res) => {
  const activeLink = "/uf/reports";
  const renderData = {
    activeLink,
    navLinks,
    user: req.user,
    messages: req.flash("messages"),
  };

  res.render("pages/uf/reports", renderData);
});

module.exports = router;
