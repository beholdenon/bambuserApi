var express = require('express');
const axios = require('axios');
var router = express.Router();
const bambuserToken = 'HVsum6UqSkDx6P676BA8YhpNyHjYpTAfWahWR3x4Npdm';
const bambuserShowsEndpoint = 'https://liveshopping-api.bambuser.com/v1/shows/';

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/vnd.bambuser.v1+json',
  'Authorization': 'Token ' + bambuserToken
}

const buildObj = (response) => {
  return {
      items: [
        {
          fields: {
            name: response.data.id,
            title: response.data.title,
            metaDescription: response.data.description,
            event:response.data
          }
          
        }
      ]
    };
}

const getOptions = (req) => {
  return {
    limit: req.query.limit || 100,
    state: req.query.state || 'all',
    isPublished: req.query.isPublished || true,
    isTestShow: req.query.isTestShow || false
  }
}

/* get all shows */
router.get('/', function(req, res, next) {
  axios({
    method: 'get',
    url: bambuserShowsEndpoint + '?' + new URLSearchParams(getOptions(req)).toString(),
    headers
  })
  .then(function (response) {
    res.json(buildObj(response));
  })
  .catch(function (error) {
    res.json({});
  });
  
});

/* get individual show by id */
router.get('/:id', function(req, res, next) {
  axios({
    method: 'get',
    url: bambuserShowsEndpoint + req.params.id,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.bambuser.v1+json',
      'Authorization': 'Token ' + bambuserToken
    }
  })
  .then(function (response) {
    res.json(buildObj(response));
  })
  .catch(function (error) {
    res.json({});
  });
});

module.exports = router;
