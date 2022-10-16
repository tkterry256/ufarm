const express = require("express");
const path = require("path");

// require routers for the different users
const aoRouter = require("./routers/ao");

// set constants
const PORT = 3000;

// initialize app
const app = express();

// set view engine and base directory where views are located
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// set directory for static resources
app.use(express.static(path.join(__dirname, "public")));

// add routers for the different users
app.use("/ao", aoRouter("/ao"));

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get;

app.listen(PORT, () => {
  console.log(`The Sandbox server listening on port ${PORT}`);
});
