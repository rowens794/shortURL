var mongoose = require("mongoose");
var Schema = mongoose.Schema;


//URL schema--------------------------------
var urlSchema = new Schema({
    redirectURL: String,
    shortURL: String,
});

module.exports.shortURL = mongoose.model("shortURL", urlSchema);


//counter schema--------------------------------
var numberSchema = new Schema({
    number: Number,
});

module.exports.Number = mongoose.model("Number", numberSchema);