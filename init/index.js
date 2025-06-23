require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const initData = require("./data");
const sampleReviews = require("./reviews");
const Listing = require("../models/listing");
const Review = require("../models/review");

const urlDB = process.env.ATLASDB_URL;

// Connect to MongoDB
async function main() {
  await mongoose.connect(urlDB);
}
main()
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// Seed function
const initDB = async () => {
  try {
    await Listing.deleteMany({});
    await Review.deleteMany({});

    console.log("🗑️ Existing listings and reviews deleted.");

    const createdReviews = await Review.insertMany(sampleReviews);
    console.log("✅ Sample reviews inserted.");

    const listingsWithReviews = initData.data.map((listing) => {
      const randomReviews = createdReviews
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 1);

      return {
        ...listing,
        owner: new mongoose.Types.ObjectId(listing.owner), // ✅ Owner string to ObjectId
        reviews: randomReviews.map((r) => r._id),
      };
    });

    await Listing.insertMany(listingsWithReviews);
    console.log("✅ Listings with random reviews inserted.");
    console.log("🌱 Seeding completed successfully.");
    mongoose.connection.close(); // 🔒 Close connection after seeding
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    mongoose.connection.close();
  }
};

initDB();
