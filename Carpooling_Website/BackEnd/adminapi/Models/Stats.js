const mongoose = require("mongoose");

//the schema will define how will look like
const statsSchema = new mongoose.Schema({
  StatId: { type: Number },
  Month: { type: String },
  TotalRides: { type: String },
  OngoingRides: { type: String },
  CancelledRides: { type: String },
  CompletedRides: { type: String },
  TotalMonthyProfit: { type: String },
  TotalRevenu: { type: String },
  TotalDownloads: { type: String },
  TotalUsers: { type: String },
  TotalVisitors: { type: String },
  OverallRatings: {
    FiveStars: { type: String },
    FourStars: { type: String },
    ThreeStars: { type: String },
    TwoStars: { type: String },
    OneStar: { type: String },
  },
});

//the model will represent the db in mongoDB and have it to our schame that we created here
const limniStats = mongoose.model(
  "LimniStatistics",
  statsSchema,
  "LimniStatistics"
);

module.exports = limniStats;
