const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

// Load User model
const AVUser = require("../models/AVUser");

// @route   POST av-apis/last-datapoints
// @desc    Get access token from AirVantage
// @access  Public
router.post("/last-datapoints", (req, res) => {
    console.log(req.body.av_email);
    AVUser.findOne({ av_email: req.body.av_email }).then(av_user => {
        if (!av_user) {
            return res.json({ av_email: "User not found" });
        } else {

            let http_body = {
                username: av_user.av_email,
                password: av_user.av_password,
                grant_type: "password"
            };

            const encodeFormData = (data) => {
                return Object.keys(data)
                    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                    .join('&');
            }

            let http_authorization = new Buffer.from(
                av_user.api_client_id + ":" + av_user.api_client_secret
            ).toString("base64");

            let http_headers = {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Basic " + http_authorization
            };

            fetch("https://eu.airvantage.net/api/oauth/token", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + http_authorization
                },
                body: encodeFormData(http_body)
            })
                .then(response => fetchData = response.json())
                .then(fetchData => {
                    fetch("https://eu.airvantage.net/api/v1/systems/3b24cca62e5b45338c7e9e927bc19abc/data?ids=phone.custom.1,phone.custom.2,phone.custom.3,phone.custom.4", {
                        method: "GET",
                        headers: {
                            'Authorization': fetchData.token_type + ' ' + fetchData.access_token
                        }
                    })
                        .then(response => systemData = response.json())
                        .then(systemData => res.send(systemData));
                });
        }
    });
});

module.exports = router;
