const express = require("express");

//For Session Key Creation
const randomstring = require("randomstring");

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


//This function will create a session
function sessionCreate(username, type){
    let db_connect = dbo.getDb();

    let session = {
        username: username,
        user_type: type,
        session_key: '',
        created_at: '',
    }
    session.session_key = randomstring.generate(64);
    //Session auto delete after 1 day
    session.created_at = new Date();
    db_connect.collection("sessions").createIndex( { "created_at": 1 }, { expireAfterSeconds: 86400 } )

    db_connect.collection("sessions").insertOne(session, function(err, res){
        if (err) throw err;
    })

    return session;
}

//Deletes a Session
function sessionDelete(session){
    let db_connect = dbo.getDb();
    db_connect.collection('sessions').deleteOne(session);
}

module.exports = {sessionCreate,sessionDelete};