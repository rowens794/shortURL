var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var URL = require('../models/urls');

// Connection URL
var url = 'mongodb://rowens:Presario1@ds153732.mlab.com:53732/shorturl';

// connect to database
mongoose.connect(url);
db = mongoose.connection;


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});


//test get number
router.get('/initializeGet', function(req, res) {
  URL.Number.findOne({ '_id': '5afa2639cf156bbccd941a6e' }, function (err, response) {
    if (err) {
      res.send("Oops something went wrong"); 
    }
    // get the number, update by 1 and save
    else{
      response.number += 1;
      response.save()
      res.send(response.toObject().number.toString());
    }
  });
});

//Add new short URL to Database
router.get('/new/:url', function(req, res, next){

  //create newURL Object
  var newURL = new URL.shortURL;

  //validate and add redirectURL to object
  var sentURL = req.params.url;
  var prefix = 'http://';
  var prefixS = 'https://';
  if (sentURL.substr(0, prefix.length) !== prefix || sentURL.substr(0, prefixS.length) !== prefixS)
  {
    sentURL = prefix + sentURL;
  }

  newURL.redirectURL = sentURL;

  //get unique id from database
  URL.Number.findOne({ '_id': '5afa2639cf156bbccd941a6e' }, function (err, response) {
    if (err) {
      res.send("Oops something went wrong"); 
    }
    
    else{
      // get the number, update by 1 and save
      response.number += 1;
      response.save().then(function(){
        //after number is saved then save the new short URL to the Database
        newURL.shortURL = response.number;
        newURL.save(function(err, saveObject){
          if (err){
            res.send("something went wrong")
            }
          else{
            res.send("Your short URL is: https://agile-dawn-55687.herokuapp.com/" + (response.number))
            }
          })
        }
      );
    }
  });
})

//use new short url
router.get('/:number', function(req, res, next){
  shortURLNum = req.params.number;
  
  //get actual url from the database based on the shortURL code
  URL.shortURL.findOne({ 'shortURL': shortURLNum }, function (err, shortURLObject) {
    if (err || shortURLObject == null) {
      res.send("oops, something went wrong")
    }
    else{
      redirectURL = shortURLObject.redirectURL;
      console.log(redirectURL);

      //stuck here cannot redirect to exteral url
      res.redirect(redirectURL);
      next();
    }
  })
})


module.exports = router;
