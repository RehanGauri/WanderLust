const { string, required } = require("joi");
const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose")


const userSchema = new Schema({
    email: {
        type: String,
        required : true
    }
})

userSchema.plugin(passportLocalMongoose)
// we are using plugin because it automatically add username, hashing, salting, hashingpassword that's why we only add only email in userSchema

module.exports = mongoose.model("User", userSchema)