const express = require("express");
const router = express.Router();

// Load User model
const AVUser = require("../models/AVUser");

// @route   POST av-users/register
// @desc    Register av-users
// @access  Public
router.post("/register", (req, res) => {
  AVUser.findOne({ av_email: req.body.av_email }).then(av_user => {
    if (av_user) {
      return res.status(400).json({ av_email: "Email already exists" });
    } else {
      const newAVUser = new AVUser({
        av_email: req.body.av_email,
        av_password: req.body.av_password,
        api_client_id: req.body.api_client_id,
        api_client_secret: req.body.api_client_secret
      });

      newAVUser
        .save()
        .then(av_user => res.json(av_user))
        .catch(err => console.log(err));
    }
  });
});

module.exports = router;
