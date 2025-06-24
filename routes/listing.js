const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const listingsController = require("../controllers/listings");

const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingController = require("../controllers/listings");
const {storage} = require("../cloudConfig")

const multer = require("multer")
const upload = multer({ storage })

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// Create Route  (Add)
router.get("/new", isLoggedIn, listingController.newListingForm);


// show user's listings only
router.get("/my", isLoggedIn, async (req, res) => {
  const userId = req.user._id;
  const listings = await Listing.find({ owner: userId });
  res.render("listings/index", {
    allListings: listings,
    search: "",
    category: null,
    currentPage: 1,
    totalPages: 1
  });
});


router.get("/category/:name", listingsController.filterByCategory);


router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing));



// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

// catergory
router.get("/category/:category", async (req, res) => {
    const { category } = req.params;
    const allListings = await Listing.find({ category: category });
    res.render("listings/index", { allListings });
});




module.exports = router;
