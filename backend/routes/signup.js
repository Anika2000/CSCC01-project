const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

//This will hash any passwords
const crypto = require("crypto");
let salt = 'f844b09ff50c'

// This section will help you get a list of all the records.
recordRoutes.route("/signup").post(function (req, response) {
    let db_connect = dbo.getDb();

    let login_credentials = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        type: req.body.type
      };

    //Hashes Password
    login_credentials.password = crypto.createHash('md5').update(login_credentials.password).digest('hex');

    //check if username exists
    let query = {username: login_credentials.username};

    let existing_usernames = db_connect
    .collection("login_credentials").find(query)
    .count();

    let existing_emails = db_connect
    .collection("login_credentials").find(query)
    .count();

    existing_usernames.then(function(existing_usernames){
        console.log("Number Existing:" + existing_usernames)
        if(existing_usernames == 0){
            db_connect.collection("login_credentials").insertOne(login_credentials, function (err, res) {
                if (err) throw err;
            });
            response.json({SignUp:true});
            console.log('Signed Up User: ', login_credentials.username);
        }else{
            console.log('Signed Up Failed, Username Exists, User: ', login_credentials.username);
            response.json({SignUp:false});
        }
    });

});

module.exports = recordRoutes;
