const mongoose = require("mongoose");

//the schema will define how will look like
const scheduledRidesSchema = new mongoose.Schema({
  driver: {
    type: String,
  },
  image: {
    type: String,
  },
  rating: {
    type: Number,
  },
  totalratings: {
    type: Number,
  },
  fromdestination: {
    type: String,
  },
  todestination: {
    type: String,
  },
  car: {
    type: String,
  },
  numberseats: {
    type: Number,
  },
  latitudeorigin: {
    type: Number,
  },
  longitudeorigin: {
    type: Number,
  },
  latitudedestination: {
    type: Number,
  },
  longitudedestination: {
    type: Number,
  },
});

//the model will represent the db in mongoDB and have it to our schema that we created here
const scheduledRidesModel = mongoose.model(
  "ScheduledRides",
  scheduledRidesSchema,
  "ScheduledRides"
);

module.exports = scheduledRidesModel;
