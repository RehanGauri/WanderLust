const mongoose = require("mongoose");
const initData = require("./data");
const sampleReviews = require("./reviews"); // <- new file
const Listing = require("../models/listing");
const Review = require("../models/review");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  await Review.deleteMany({});

  // Insert sample reviews
  const createdReviews = await Review.insertMany(sampleReviews);

  // Attach random reviews to each listing
  const listingsWithReviews = initData.data.map((listing) => {
    const randomReviews = createdReviews
      .sort(() => 0.5 - Math.random()) // shuffle
      .slice(0, Math.floor(Math.random() * 3) + 1); // 1-3 reviews

    return {
      ...listing,
      reviews: randomReviews.map((r) => r._id),
    };
  });

  await Listing.insertMany(listingsWithReviews);

  console.log("Listings and reviews seeded successfully.");
};

initDB();
