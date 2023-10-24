const request = require('request');
var express = require('express');
const axios = require('axios');
var router = express.Router();
const contentfulEndpoint = 'https://cdn.contentful.com/spaces/m3h9iuk14rnq/environments/master/';
const contetnfulAccessToken = '867b911445d5af9f570b8d1ebe34769a136084ce6deb7f212ac1d34938579bc4';

/* get asset ulr */
router.get('/asset/:id', function(req, res, next) {
  axios({
    method: 'get',
    url: contentfulEndpoint + 'assets/' + req.params.id + '?access_token=' + contetnfulAccessToken,
  })
  .then(function (response) {
  	console.log(response.data.fields.file.url);
  	let contentType = response.data.fields.file.contentType;

  	request({
	  url: 'https:' + response.data.fields.file.url,
	    encoding: null
	  }, 
	  (err, resp, buffer) => {
	    if (!err && resp.statusCode === 200){
	      res.set("Content-Type", contentType);
	      res.send(resp.body);
	    }
	  });
  })
  .catch(function (error) {
    res.json({});
  });
  
});
 


router.get('/asset/tag/:tag', function(req, res, next) {
	let url = contentfulEndpoint + 'assets/?access_token=' + contetnfulAccessToken + '&metadata.tags.sys.id[all]=' + req.params.tag;
	console.log(url);
  axios({
    method: 'get',
    url: url
  })
  .then(function (response) {
  	console.log(response.data.items[0].fields.file.url);
  	let contentType = response.data.items[0].fields.file.contentType;

  	request({
	  url: 'https:' + response.data.items[0].fields.file.url,
	    encoding: null
	  }, 
	  (err, resp, buffer) => {
	    if (!err && resp.statusCode === 200){
	      res.set("Content-Type", contentType);
	      res.send(resp.body);
	    }
	  });
  })
  .catch(function (error) {
    res.json({});
  });
  
});

module.exports = router;
