const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
const { types } = require("joi");

const listingSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [lng, lat]
      default: [0, 0],
    },
  },
  country: {
    type: String,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: [String],
    enum: [
      "trending",
      "rooms",
      "iconic-cities",
      "mountains",
      "castles",
      "amazing-pools",
      "camping",
      "farms",
      "arctic",
      "domes",
      "boats",
    ],
    default: [],
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
