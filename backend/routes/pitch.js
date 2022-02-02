const express = require("express");

const pitchRoutes = express.Router();

const dbo = require("../db/conn");

const { MongoClient, GridFSBucket } = require("mongodb");

// Upload a new elevator pitch to the server.
pitchRoutes.route("/pitch/add").post((req, res) => {
  let db_connect = dbo.getDb();

  if (!req.files) return;
  const { elevatorPitch } = req.files;

  const { username } = req.body;

  if (elevatorPitch) {
    const buffer = elevatorPitch.data;

    const bucket = new GridFSBucket(db_connect, { bucketName: "pitchFiles" });
    const cursor = bucket.find({ filename: username });

    cursor.next((err, file) => {
      if (err) throw err;
      if (file)
        bucket.delete(file._id, (err, result) => {
          if (err) throw err;
        });
    });

    let myquery = {user_name: username};
    db_connect
        .collection("profiles")
        .findOne(myquery, function (err, result) {
          if (result) {
            db_connect
                .collection("profiles")
                .updateOne(myquery, {$set: { hasPitch: true }});
          }
        });

    bucket.openUploadStream(username).end(buffer);
    res.status(200).send("Done uploading");
  }
});


pitchRoutes.route("/pitch/watch/:user").get( (req, res) => {
  let db_connect = dbo.getDb();

  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Range header required");
  }

  const username = req.params.user;
  if (!username) {
    res.status(400).send("Pitch user required");
  }

  db_connect.collection("pitchFiles.files").findOne({ filename: username}, (err, file) => {
    if (!file) {
      res.status(404).send("Video not found");
      return;
    }
    const videoLength = file.length;
    const videoStart = Number(range.replace(/\D/g, ""));
    const videoEnd = videoLength - 1;
    const contentLength = videoEnd - videoStart + 1;

    res.writeHead(206, {
      "Content-Range": `bytes ${videoStart}-${videoEnd}/${videoLength}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    });

    const bucket = new GridFSBucket(db_connect, { bucketName: "pitchFiles" });
    const stream = bucket.openDownloadStreamByName(username, {start: videoStart, end: videoEnd});
    stream.pipe(res);
  });



});

module.exports = pitchRoutes;
