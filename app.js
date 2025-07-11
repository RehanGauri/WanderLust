require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const ExpressError = require("./utils/ExpressError")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const flash = require("connect-flash")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/user")

const listingRouter = require("./routes/listing")
const reviewsRouter = require("./routes/review")
const userRouter = require("./routes/user")


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")))

// const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
const dbUrl = process.env.ATLASDB_URL

main()
.then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err)
})

async function main() {
    await mongoose.connect(dbUrl)
}

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600
})

store.on("error", ()=>{
    console.log("Error in Mongo Session Store", err);
})

const sessionOptions = {
    store,
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}




app.get("/", (req, res)=>{
    res.redirect("/listings")
})




app.use(session(sessionOptions))
app.use(flash())

app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use((req, res, next)=>{
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    res.locals.currUser = req.user;
    next()
})


app.engine('ejs', ejsMate)








app.use("/listings", listingRouter)
app.use("/listings/:id/reviews", reviewsRouter)
app.use(userRouter)



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