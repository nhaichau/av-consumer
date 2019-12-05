const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//var cors = require('cors');

const avUsers = require("./routes/av-users");
const avAPIs = require("./routes/av-apis");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cross origin middleware
//app.use(cors());

// DB config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//app.get("/", (req, res) => res.send("Hello"));

// User routes
app.use("/api/av-users", avUsers);
app.use("/api/av-apis", avAPIs);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server is running on port " + port));
