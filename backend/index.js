const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(cors());
app.use(express.json());
app.use(require("./routes/fair"));
app.use(require("./routes/job"));
app.use(require("./routes/login"));
app.use(require("./routes/meeting"));
app.use(require("./routes/pitch"));
app.use(require("./routes/profile"));
app.use(require("./routes/signup"));
app.use(require("./routes/user"));
// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
