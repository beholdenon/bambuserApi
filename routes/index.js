var express = require('express');
const axios = require('axios');
var router = express.Router();
const bambuserToken = 'HVsum6UqSkDx6P676BA8YhpNyHjYpTAfWahWR3x4Npdm';
const bambuserShowsEndpoint = 'https://liveshopping-api.bambuser.com/v1/shows/';

/* GET home page. */
router.get('/', function(req, res, next) {
  axios({
    method: 'get',
    url: bambuserShowsEndpoint,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.bambuser.v1+json',
      'Authorization': 'Token ' + bambuserToken
    }
  })
    .then(function (response) {
      console.log(response);
      res.json(response.data);
    });
  
});

module.exports = router;
