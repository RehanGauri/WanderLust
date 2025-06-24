const Listing = require("../models/listing")
const opencage = require('opencage-api-client');
require("dotenv").config();


module.exports.index = async (req, res) => {
  const { search, page = 1, limit = 9 } = req.query;

  let query = {};
  if (search) {
    const regex = new RegExp(search, 'i');
    query = {
      $or: [
        { title: regex },
        { description: regex },
        { category: { $in: [regex] } }
      ]
    };
  }

  const total = await Listing.countDocuments(query);
  const allListings = await Listing.find(query)
    .skip((page - 1) * limit)
    .limit(limit);

  res.render("listings/index", {
    allListings,
    search: search || "",
    currentPage: parseInt(page),
    totalPages: Math.ceil(total / limit)
  });
};


module.exports.filterByCategory = async (req, res) => {
  const { name } = req.params;
  const { page = 1, limit = 9 } = req.query;

  const query = { category: name };
  const total = await Listing.countDocuments(query);
  const allListings = await Listing.find(query)
    .skip((page - 1) * limit)
    .limit(limit);

  res.render("listings/index", {
    allListings,
    search: "",
    category: name, // ✅ This is important for pagination
    currentPage: parseInt(page),
    totalPages: Math.ceil(total / limit)
  });
};



module.exports.newListingForm = (req, res)=>{
    res.render("listings/new.ejs")
    
}

module.exports.showListing = async (req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id)
    .populate({path: "reviews",
        populate: {
            path: "author",
        }
    })
    .populate("owner");
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!")
        return res.redirect("/listings")
    }
    res.render("listings/show.ejs", {listing})
}

// module.exports.createListing = async (req, res, next) => {
//   let url = req.file.path;
//   let filename = req.file.filename;

//   // Convert price to number
//   req.body.listing.price = Number(req.body.listing.price);
//   if (isNaN(req.body.listing.price)) {
//     req.body.listing.price = 0;
//   }

//   // Make sure categories is an array
//   if (req.body.listing.categories && !Array.isArray(req.body.listing.categories)) {
//     req.body.listing.categories = [req.body.listing.categories];
//   }

//   const newListing = new Listing(req.body.listing);
//   newListing.owner = req.user._id;
//   newListing.image = { url, filename };

//   await newListing.save();
//   req.flash("success", "New Listing Created!");
//   res.redirect("/listings");
// };
module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;

  req.body.listing.price = Number(req.body.listing.price);
  if (isNaN(req.body.listing.price)) {
    req.body.listing.price = 0;
  }

  if (req.body.listing.categories && !Array.isArray(req.body.listing.categories)) {
    req.body.listing.categories = [req.body.listing.categories];
  }

  const locationString = req.body.listing.location;

  let geoData = { geometry: { type: "Point", coordinates: [0, 0] } };

  try {
    const response = await opencage.geocode({
      q: locationString,
      key: process.env.OPENCAGE_KEY,
    });

    if (response.results.length > 0) {
      const { lat, lng } = response.results[0].geometry;
      geoData.geometry.coordinates = [lng, lat]; // longitude, latitude
    }
  } catch (err) {
    console.error("Geocoding error:", err.message);
  }

  const newListing = new Listing({
    ...req.body.listing,
    geometry: geoData.geometry,
    image: { url, filename },
    owner: req.user._id,
  });

  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};




module.exports.renderEditForm = async(req, res)=>{
    let {id} = req.params
    const listing = await Listing.findById(id)
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!")
        return res.redirect("/listings")
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250")

    res.render("listings/edit.ejs", {listing, originalImageUrl})
}


// module.exports.updateListing = async(req, res)=>{
//     let {id} = req.params;

//     let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing})  // ...spread hojara hai

//     if(typeof req.file !== "undefined"){
//         let url = req.file.path;
//         let filename = req.file.filename;
//         listing.image = {url, filename}
//         await listing.save()
//     }
//     req.flash("success", "Listing Updated!")
//     res.redirect(`/listings/${id}`)
// }

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body.listing;

  const listing = await Listing.findById(id);

  // Update lat/lng if location changed
  if (updatedData.location && updatedData.location !== listing.location) {
    try {
      const response = await opencage.geocode({
        q: updatedData.location,
        key: process.env.OPENCAGE_KEY,
      });

      if (response.results.length > 0) {
        const { lat, lng } = response.results[0].geometry;
        updatedData.geometry = {
          type: "Point",
          coordinates: [lng, lat],
        };
      }
    } catch (err) {
      console.error("Geocoding error during update:", err.message);
    }
  }

  // Apply changes
  const updatedListing = await Listing.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  // Update image if file is uploaded
  if (typeof req.file !== "undefined") {
    const url = req.file.path;
    const filename = req.file.filename;
    updatedListing.image = { url, filename };
    await updatedListing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};



module.exports.destroyListing = async(req, res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id)
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!")
    res.redirect("/listings")
}