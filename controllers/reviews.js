const Listing = require("../models/listing")
const Review = require("../models/review")


module.exports.createReview = async(req, res)=>{
    let listing = await Listing.findById(req.params.id)
    let newReview = new Review(req.body.review)
    newReview.author = req.user._id;

    if(!listing){
        req.flash("error", "Listing doesn't exist where you reviewing!")
        return res.redirect("/listings")
    }
    listing.reviews.push(newReview)
    await newReview.save()
    await listing.save()

    req.flash("success", "New Review Created!")
    
    res.redirect(`/listings/${listing._id}`)
}


module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;

    let listing = await Listing.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId },
    });

    if (!listing) {
      req.flash("error", "Review you requested for does not exist!");
      return res.redirect("/listings");
    }

    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
  }