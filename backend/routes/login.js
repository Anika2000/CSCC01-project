const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

//This is used for hasing
const crypto = require("crypto");

//Session
const Session = require("./session")

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

//This section will verify your login credentials
recordRoutes.route("/login").post(function (req, response){
    let db_connect = dbo.getDb();

    let login_credentials = {
        user_email: req.body.username,
        user_password: req.body.password,
        user_type: '',
    };
    //Hashes Password
    login_credentials.user_password = crypto.createHash('md5').update(login_credentials.user_password).digest('hex');
    
    db_connect
        .collection("users")
        .findOne({user_email: login_credentials.user_email, user_password:login_credentials.user_password},function(err,result){
            if (err) throw err;
            if(result){   
                login_credentials.user_type = result.user_type;
                //CreateSession
                let session_info = Session.sessionCreate(login_credentials.user_email, login_credentials.user_type);
                response.json(session_info);
            }else{
                response.json(null);
            }
        });
    })

recordRoutes.route("/login/check").post(function (req, response){
    let db_connect = dbo.getDb();
    let session = {
        username: req.body.username,
        session_key: req.body.session_key,
        user_type: req.body.user_type
    };

    let sessionValid = false;
    db_connect.collection("sessions").findOne(session,function(err,result){
        if (err) throw err;
        if(result){   
            sessionValid = true;
        }
        response.json({sessionValid: sessionValid});
    });
})

recordRoutes.route("/logout").post(function (req, response){
    let db_connect = dbo.getDb();
    let session = {
        username: req.body.username,
        session_key: req.body.session_key,
        user_type: req.body.user_type
    };
    Session.sessionDelete(session);
})

module.exports = recordRoutes;