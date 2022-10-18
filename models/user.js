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
  },
  ward: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    trim: true,
  },
  dateOfRegistration: {
    type: Date,
    trim: true,
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
  },
  durationOfStay: {
    type: Number,
    trim: true,
  },
  activitiesUndertaken: {
    type: [String],
    trim: true,
  },
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "uniqueId" });

module.exports = mongoose.model("User", UserSchema);
