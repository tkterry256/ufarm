const mongoose = require("mongoose");
const { Schema, SchemaTypes } = mongoose;

const ProductSchema = new Schema({
  urbanFarmerId: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    trim: true,
    required: true,
    enum: ["Horticulture", "Poultry", "Dairy"],
  },
  type: {
    type: String,
    trim: true,
    required: true,
    enum: ["Organic", "Non organic"],
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  dateOfRegistration: {
    type: Date,
    required: true,
    default: Date.now,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  modeOfPayment: {
    type: String,
    trim: true,
    required: true,
    enum: ["Cash", "Mobile Money"],
  },
  modeOfDelivery: {
    type: String,
    trim: true,
    required: true,
    enum: ["Pick Up", "Home Delivery"],
  },
  imageUrl: {
    type: String,
    trim: true,
    required: true
  },
  approvalStatus: {
    type: String,
    required: true,
    trim: true,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  availability: {
    type: Boolean,
    required: true,
    default: true
  }
});

module.exports = mongoose.model("Product", ProductSchema);
