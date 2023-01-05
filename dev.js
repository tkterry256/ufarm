require("dotenv").config();

const mongoose = require("mongoose");

const User = require("./models/User");
const Product = require("./models/Product");

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

const db = mongoose.connection;
// Check connection
db.once("open", async function () {
  console.log("Connected to MongoDB");

  const urbanFarmerId = "636be551a3fbc187eed49781";
    const farmerOneId = "636bbf06c4ecf71839e047c0";
//   const farmerOneId = "636bbc2fc4ecf71839e047ac";

  const farmerOne = await User.findById(farmerOneId).exec();

  const docs = await Product.aggregate([
    { $match: { approvalStatus: "Pending" } },
    {
      $lookup: {
        from: "users",
        localField: "urbanFarmerId",
        foreignField: "_id",
        as: "urbanFarmer",
      },
    },
    { $match: { "urbanFarmer.ward": farmerOne.ward } },
    {
      $project: {
        "urbanFarmer.salt": 0,
        "urbanFarmer.hash": 0,
        "urbanFarmer.status": 0,
      },
    },
  ]).exec();

  console.log(docs.map((doc) => doc.urbanFarmer));

  process.exit(0);
});

// Check for db errors
db.on("error", function (err) {
  console.error(err);
});
