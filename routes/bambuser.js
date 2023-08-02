var express = require('express');
const axios = require('axios');
var router = express.Router();
const bambuserShowsEndpoint = 'https://liveshopping-api.bambuser.com/v1/shows/';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/vnd.bambuser.v1+json',
  'Authorization': 'Token ' + process.env.BAMBUSER_API_TOKEN
}

const buildObj = (response, id) => {
  let obj;
  response.data.results.forEach((event) => {
    obj = {
      items: [
        {
          fields: {
            name: event.id,
            title: event.title,
            metaDescription: event.description,
            featured: event,
            events:response.data.results
          }
          
        }
      ]
    };
  });
  return obj;
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
router.get('/shows', function(req, res, next) {
  axios({
    method: 'get',
    url: bambuserShowsEndpoint + '?' + new URLSearchParams(getOptions(req)).toString(),
    headers
  })
  .then(function (response) {
    res.json(response.data);
  })
  .catch(function (error) {
    res.json({});
  });
  
});

/* get individual show by id */
router.get('/show/:id', function(req, res, next) {
  axios({
    method: 'get',
    url: bambuserShowsEndpoint + req.params.id,
    headers
  })
  .then(function (response) {
    res.json(response.data);
  })
  .catch(function (error) {
    res.json({});
  });
});



/* get individual show by id */
router.get('/show/:id/products/', function(req, res, next) {
  axios({
    method: 'get',
    url: bambuserShowsEndpoint + req.params.id + '/products/',
    headers
  })
  .then(function (response) {
    res.json(response.data);
  })
  .catch(function (error) {
    res.json({});
  });
});

/* get individual show by id */
router.get('/details/:id', function(req, res, next) {
  axios({
    method: 'get',
    url: bambuserShowsEndpoint + '?limit=100',
    headers
  })
  .then(function (response) {
    let obj = buildObj(response, req.params.id);
    axios({
      method: 'get',
      url: bambuserShowsEndpoint + req.params.id + '/products/',
      headers
    })
    .then(function (response) {
      obj.items[0].fields.products = response.data;
      res.json(obj);
    })
    .catch(function (error) {
      res.json({});
    });
  })
  .catch(function (error) {
    res.json({});
  });
});

module.exports = router;
