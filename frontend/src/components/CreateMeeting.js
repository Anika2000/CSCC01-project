/* eslint-disable */
// include required modules
const jwt = require("jsonwebtoken");
const config = require("frontend/src/config.js");
const rp = require("request-promise");

const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
var email, userid, resp;
const port = 3000;

// Using the ApiKey and APISecret from config.js
const payload = {
  iss: config.APIKey,
  exp: new Date().getTime() + 5000,
};
const token = jwt.sign(payload, config.APISecret);

// get the form
// app.get('/', (req,res) => res.send(req.body));
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express and Zoom API" });
});

// use userinfo from the form and make a post request to /userinfo
app.post("/meeting", (req, res) => {
  // store the email address of the user in the email variable
  email = req.body.email;
  // check if the email was stored in the console
  //   console.log(email);
  // Store the options for Zoom API which will be used to make an API call later.
  var options = {
    // You can use a different uri if you're making an API call to a different Zoom endpoint.
    method: "POST",
    uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
    // qs: {
    //     status: 'active'
    // },
    body: {
      // topic: "Test Meeting",
      // type: 1,
      // // pre_schedule: "true",
      // // start_time: "2021-11-25T12:00:00Z",
      // // duration: 30
      // settings: {
      //   host_video: "true",
      //   participant_video: "true",
      // },
      topic: "Demo Meeting 1",
      type: 2,
      start_time: "2020-05-05 12:00:00",
      password: "Hey123",
      agenda: "This is the meeting description",
      settings: {
        host_video: false,
        participant_video: false,
        join_before_host: false,
        mute_upon_entry: true,
        use_pmi: false,
        approval_type: 0,
      },
    },
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true, // Parse the JSON string in the response
  };

  // Use request-promise module's .then() method to make request calls.
  // rp(options)
  //     .then(function (response) {
  //       //printing the response on the console
  //         console.log('User has', response);
  //         //console.log(typeof response);
  //         resp = response
  //         //Adding html to the page
  //         var title1 ='<center><h3>Your token: </h3></center>'
  //         var result1 = title1 + '<code><pre style="background-color:#aef8f9;">' + token + '</pre></code>';
  //         var title ='<center><h3>User\'s information:</h3></center>'
  //         //Prettify the JSON format using pre tag and JSON.stringify
  //         var result = title + '<code><pre style="background-color:#aef8f9;">'+JSON.stringify(resp, null, 2)+ '</pre></code>'
  //         res.send(result1 + '<br>' + result);

  //     })
  //     .catch(function (err) {
  //         // API call failed...
  //         console.log('API call failed, reason ', err);
  //     });

  rp(options)
    .then(function (response) {
      // logic for your response
      console.log("response is: ", response.join_url);
      let dataRes = {
        join_url: response.join_url,
      };
      res.status(200).json(dataRes);
    })
    .catch(function (err) {
      // API call failed...
      console.log("API call failed, reason ", err);
    });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
