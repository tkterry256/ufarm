const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  uniqueId: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    trim: true,
    required: true,
  },
  role: {
    type: String,
    trim: true,
    required: true,
    enum: ["AgricOfficer", "FarmerOne", "UrbanFarmer", "Public"],
  },
  ward: {
    type: String,
    trim: true,
    enum: ["Masajja 1", "Masajja 2", "Masajja 3", "Masajja 4"],
  },
  status: {
    type: String,
    trim: true,
    enum: ["Active", "Inactive"],
    default: "Inactive",
  },
  gender: {
    type: String,
    trim: true,
    enum: ["Male", "Female"],
  },
  dateOfBirth: {
    type: Date,
  },
  dateOfRegistration: {
    type: Date,
    default: Date.now,
  },
  ninNumber: {
    type: String,
    trim: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
    unique: true,
  },
  residenceDirections: {
    type: String,
    trim: true,
  },
  residenceType: {
    type: String,
    trim: true,
    enum: ["Permanent", "Temporary"],
  },
  residenceDuration: {
    type: Number,
    trim: true,
  },
  activitiesUndertaken: {
    type: String,
    trim: true,
  },
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "uniqueId" });

module.exports = mongoose.model("User", UserSchema);
