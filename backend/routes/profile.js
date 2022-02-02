const express = require("express");
const fs = require('fs')
// profileRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const profileRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

const binary = require("mongodb").Binary;

profileRoutes.route("/searchprofile").get(function(req, res) {
  let db_connect = dbo.getDb();
  db_connect.collection("profiles")
  .find({})
  .project({ 'user_name': 1, 'first_name': 1, 'last_name': 1, 'avatar': 1, 'resume': 1 })
  .toArray(function (err, result) {
    if (err) throw err;
    res.json(result);
  })
})
// This section will help you get a list of all the records.
profileRoutes.route("/profile").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("profiles")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single profile by username
profileRoutes.route("/profile/:user_name").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = {user_name: String( req.params.user_name )};
  db_connect
    .collection("profiles")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    })
});

profileRoutes.route("/profile/create").post(function (req,response){
  let db_connect = dbo.getDb();
  let newvalues = {
    user_name: req.body.email,
    first_name: '',
    last_name: '',
    phone: '',
    bio: '',
    avatar: '',
    resume: '',
  };
  db_connect
    .collection("profiles")
    .findOne({user_name: String( req.params.user_name )}, function (err, result) {
      if(!result){
        db_connect.collection("profiles").insertOne(newvalues, function (err, res) {
          if (err) throw err;
          response.json(res);
        });  
      }
    })
});

// This section will help you update a record by id.
profileRoutes.route("/profile/update/:user_name").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = {user_name: String( req.params.user_name )};
  let buff_avatar = "";
  let buff_resume = "";
  if(req.files && req.files.avatar){
    buff_avatar = binary(req.files.avatar.data);
  }else{
    buff_avatar = new Buffer.from(req.body.avatar,'base64');
  }
  if(req.files && req.files.resume){
    buff_resume = binary(req.files.resume.data);
  }else{
    buff_resume = new Buffer.from(req.body.resume,'base64');
  }
  db_connect
    .collection("profiles")
    .findOne(myquery, function (err, result) {
      if(result){
        let newvalues = {
          $set: {
              user_name: req.body.user_name,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              phone: req.body.phone,
              bio: req.body.bio,
              avatar: buff_avatar,
              resume: buff_resume,
          },
        };
        db_connect
        .collection("profiles")
        .updateOne(myquery, newvalues, function (err, res) {
          if (err) throw err;
          response.json(res);
        });
      }
    })
});

module.exports = profileRoutes;
