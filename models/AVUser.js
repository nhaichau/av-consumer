const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AVUserSchema = new Schema({
  av_email: {
    type: String,
    required: true
  },
  av_password: {
    type: String,
    required: true
  },
  api_client_id: {
    type: String,
    required: true
  },
  api_client_secret: {
    type: String,
    required: true
  }
});

module.exports = AVUser = mongoose.model("av-users", AVUserSchema);
