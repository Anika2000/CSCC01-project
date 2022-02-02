const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const meetingRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// Lists all the current meetings in the database 
meetingRoutes.route("/meetings").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("meetings")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//Gets the meeting info given the id
meetingRoutes.route("/meetings/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = {_id: ObjectId(req.params.id)};
  db_connect
      .collection("meetings")
      .findOne(myquery, function (err, result) {
        if (err) throw err;  
        res.json(result);
      });
});

meetingRoutes.route("/meetings/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    attendees: req.body.users,
    date_scheduled: req.body.date,
    jobId: req.body.jobId,
    title: req.body.title,
    meetingLink: req.body.meetingLink,
    hostBy: req.body.hostBy,
  };
  db_connect
  .collection("meetings")
  .insertOne(myobj, function (err, res) {
        if (err) throw err;
        return response.json(res);
    }); 
});

//get all the meetings greater than equal to the given date
meetingRoutes.route("/meeting/:date").get(function (req, res){
  let db_connect = dbo.getDb();
  let myquery = {date_scheduled: { $regex: req.params.date}}; 
  db_connect
    .collection("meetings")
    .findOne(myquery, function (err, result) {
      if (err) throw err; 
      res.json(result);
   }); 
}); 


module.exports = meetingRoutes;