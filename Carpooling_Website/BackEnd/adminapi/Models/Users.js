const mongoose = require("mongoose");

//the schema will define how will look like
const userSchema = new mongoose.Schema({
  type: {
    genre: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
    },
    email: {
      type: String,
    },
    car: {
      type: String,
    },
    driverLicense: {
      type: String,
    },
    driverLicensePlate: {
      type: String,
    },
    image: {
      type: String,
    },
  },
});

//the model will represent the db in mongoDB and have it to our schema that we created here
const userModel = mongoose.model("LimniUsers", userSchema, "LimniUsers");

module.exports = userModel;
