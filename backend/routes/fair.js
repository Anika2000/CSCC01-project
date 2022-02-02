const express = require("express");

const fairRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;
const binary = require("mongodb").Binary;

const parse = require("date-fns").parse;

// Create a new job fair based on the parameters provided.
fairRoutes.route("/fair/add").post(function (req, response) {
  let db_connect = dbo.getDb();

  const newFair = ({ title, description, host, start, end } = req.body);

  db_connect.collection("fairs").insertOne(newFair, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

// Create a new job fair post
fairRoutes.route("/fair/id/:id/posts").post(function (req, response) {
    let db_connect = dbo.getDb();
    let buff_image;
    if(req.files && req.files.image){
        buff_image = binary(req.files.image.data);
    }else{
        buff_image = new Buffer.from(req.body.image,'base64');
    }

    const newFairPost = {
        title: req.body.title,
        description: req.body.description,
        image: buff_image,
        fairid: req.params.id
    };

    db_connect.collection("fairposts").insertOne(newFairPost, (err, res) => {
        if (err) throw err;
        response.json(res);
    });
});

// Gets job fair by id
fairRoutes.route("/fair/id/:id").get(function (req, response) {
    let db_connect = dbo.getDb();
    let o_id = new ObjectId(req.params.id);
    db_connect
        .collection("fairs")
        .find({_id:o_id})
        .next(function (err, result) {
            response.json(result);
        });
});

// Gets job fair posts by job fair id
fairRoutes.route("/fair/id/:id/posts").get(function (req, response) {
    let db_connect = dbo.getDb();
    db_connect
        .collection("fairposts")
        .find({fairid: req.params.id})
        .toArray(function (err, result) {
            response.json(result);
        });
});

// Gets upcoming job fairs
fairRoutes.route("/fairs/upcoming").get(function (req, response) {
  let db_connect = dbo.getDb();

  db_connect
      .collection("fairs")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        // atlas will not allow $function in the free tier
          const dateFormat = "EEE MMM dd yyyyHH:mm:ss 'GMT'XX";
          const parseDate =(dateString)=>{
            return parse(dateString.substring(0, 32), dateFormat, new Date());
          };
          result = result
                .filter(fair => new Date() < parseDate(fair.end))
                .sort((a,b) => parseDate(a.start) - parseDate(b.start));
        response.json(result);
      });

});

// Gets upcoming job fairs
fairRoutes.route("/fairs/host/:host").get(function (req, response) {
    let db_connect = dbo.getDb();

    db_connect
        .collection("fairs")
        .find({host: req.params.host})
        .toArray(function (err, result) {
            if (err) throw err;
            // atlas will not allow $function in the free tier
            const dateFormat = "EEE MMM dd yyyyHH:mm:ss 'GMT'XX";
            const parseDate =(dateString)=>{
                return parse(dateString.substring(0, 32), dateFormat, new Date());
            };
            result = result
                .sort((a,b) => parseDate(a.start) - parseDate(b.start));
            response.json(result);
        });

});

// Add user as attendee for job fair
fairRoutes.route("/fair/id/:id/attend/:user").put(function (req, response) {
    let db_connect = dbo.getDb();
    let o_id = new ObjectId(req.params.id);
    db_connect.collection("fairs").updateOne(
        {_id: o_id, attendees: {$nin: [req.params.user]}},
        {$push: {attendees: req.params.user}},
        (err, res) => {
            if (err) throw err;
            response.json(res);
        });
});


// Delete job fair by id
fairRoutes.route("/fair/id/:id").delete(function (req, response) {
    let db_connect = dbo.getDb();
    let o_id = new ObjectId(req.params.id);
    db_connect
        .collection("fairposts")
        .deleteMany({fairid:req.params.id});
    db_connect
        .collection("fairs")
        .deleteOne({_id:o_id}, function (err, result) {
            response.json(result);
        });

});

// Delete job fair post by id
fairRoutes.route("/fair/posts/:id").delete(function (req, response) {
    let db_connect = dbo.getDb();
    let o_id = new ObjectId(req.params.id);
    db_connect
        .collection("fairposts")
        .deleteOne({_id:o_id}, function (err, result) {
            response.json(result);
        });
});


module.exports = fairRoutes;
