const express = require("express");

const jobRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

// Return all job postings
jobRoutes.route("/jobs").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("joblistings")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Create a new job listing based on the parameters provided.
jobRoutes.route("/job/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  const newJobPosting = { ...req.body, jobApplicants: [] };
  db_connect
    .collection("joblistings")
    .insertOne(newJobPosting, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
});

// Add an applicant to the job identified
jobRoutes.route("/job/:_id/apply").post(function (req, response) {
  let db_connect = dbo.getDb();
  const { user } = req.body;
  db_connect
    .collection("joblistings")
    .updateOne(
      { _id: ObjectId(req.params._id) },
      { $push: { jobApplicants: user } },
      function (err, res) {
        if (err) throw err;
        response.json(res);
      }
    );
});

jobRoutes.route("/job/find").post(function (req, res){
  let db_connect = dbo.getDb();
  console.log(req.body);
  db_connect
    .collection("joblistings")
    .find(req.body)
    .toArray(function (err,result) {
      if (err) throw err;
      res.json(result);
    });
})

module.exports = jobRoutes;
