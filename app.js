const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Listing = require("./models/listing")
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const wrapAsync = require("./utils/wrapAsync")
const ExpressError = require("./utils/ExpressError")
const {listingSchema} = require("./schema")
const Review = require("./models/review")


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")))

app.engine('ejs', ejsMate)

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

main()
.then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err)
})

async function main() {
    await mongoose.connect(MONGO_URL)
}


app.get("/", (req, res)=>{
    res.send("Root working")
})

const validateListing = (req, res, err) =>{
        // from schema.js using joi
        let {error} = listingScheme.validate(req.body)
        if(error){
            let errMsg = error.details.map((el)=> el.message).join(",");
            throw new ExpressError(500, errMsg )
        }else{
            next();
        }
}


// Index Route
app.get("/listings",  wrapAsync(async (req, res)=>{
    let allListings =  await Listing.find({})
    console.log(allListings)
    res.render("listings/index", {allListings})
}))

// Create Route  (Add)
// "We place the 'create' route above the 'show' route because if it's placed below, it could cause confusion — for example, the /listings/new path might be mistaken for an ID in the show route."
app.get("/listings/new", (req, res)=>{
    res.render("listings/new.ejs")
})
 


// Add data to db
app.post("/listings",
    validateListing,
    wrapAsync(async (req, res, next)=>{

        // normal string price ko number mai karega
        req.body.listing.price = Number(req.body.listing.price)

        // Agar nan hai to 0 show karega
        
        const newListing = new Listing(req.body.listing)
        await newListing.save()
        res.redirect("/listings")
}));
 


// Edit Route
app.get("/listings/:id/edit",  wrapAsync(async(req, res)=>{
    let {id} = req.params
    const listing = await Listing.findById(id)
    res.render("listings/edit.ejs", {listing})
}))



// Update
app.put("/listings/:id",
    validateListing,
    wrapAsync(async(req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing})  // ...spread hojara hai
    res.redirect(`/listings/${id}`)
}))


// Delete
app.delete("/listings/:id",  wrapAsync(async(req, res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id)
    console.log(deletedListing);
    res.redirect("/listings")
}))

// Show Route  (Read)
app.get("/listings/:id",  wrapAsync(async (req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    console.log(listing)
    res.render("listings/show.ejs", {listing})
}))

// Review post route
app.post("/listings/:id/reviews", async(req, res)=>{
    let listing = await Listing.findById(req.params.id)
    let newReview = new Review(req.params.review)

    listing.reviews.push(newReview)
    await newReview.save()
    await listing.save()

    console.log("new Review saved");
    res.redirect(`/listings/${listing._id}`)
})


// giving error 
// app.all("*", (req, res, next) => {
//     next(new ExpressError(404, "Page not found!"));
// });

// we are using this instead of that because its also working like that
app.use((req, res, next) => {
    res.status(404).send("Page not found!");
});


// Defining middleware for handling error
app.use((err, req, res, next)=>{
    console.log(err);
    let {statusCode=500, message="Something went wrong!"} = err;
    res.status(statusCode).render("error.ejs", {message})
})
  




app.listen(3000, ()=>{
    console.log(`server is listening to port 3000`);
})