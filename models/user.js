const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const Listing = require("./listing"); 
const Review = require("./review");   

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

// Adds username, hash, salt, etc.
userSchema.plugin(passportLocalMongoose);

userSchema.post("findOneAndDelete", async function (deletedUser) {
  if (deletedUser) {
    // Delete all listings created by this user
    await Listing.deleteMany({ owner: deletedUser._id });


    await Review.deleteMany({ author: deletedUser._id });

    console.log(`Deleted listings and reviews for user: ${deletedUser.username}`);
  }
});

module.exports = mongoose.model("User", userSchema);
