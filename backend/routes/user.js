const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const userRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
//This is used for hasing
const crypto = require("crypto");

// Lists all the current users in the database 
userRoutes.route("/users").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Creates a new user using POST request
userRoutes.route("/user/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    user_email: req.body.user_email,
    user_password: req.body.user_password,
    user_type: req.body.user_type,
  };

  //Hashes Password
  myobj.user_password = crypto.createHash('md5').update(myobj.user_password).digest('hex');

  //if email already exists then do not add
  db_connect.collection("users").findOne({user_email: req.body.user_email}, function(err, user){
    if (err){
      return response.json('An error occured')
    } else if(user){
      return response.json('User cannot be added')
    }else{
      db_connect.collection("users").insertOne(myobj, function (err, res) {
        if (err) throw err;
        return response.json(res);
      });
    }
  }); 
}); 

//Gets the correct document in JSON form from the database using the given email 
userRoutes.route("/useremail/:user_email").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = {user_email: String(req.params.user_email)};
  db_connect
      .collection("users")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

module.exports = userRoutes;

