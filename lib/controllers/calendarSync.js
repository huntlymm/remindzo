'use strict';

var googleApi = require('./googleapi');

var getData = function() {
  // googleApi.oauth.userinfo.get().withAuthClient(googleApi.client).execute(function(err, results){
  //     console.log ('listing results from userinfo...');
  //     console.log(results);
  // });
  googleApi.cal.events.list({calendarId:"primary", maxResults:"2", timeMin:"2014-5-16T10:00:00.000-07:00"}).withAuthClient(googleApi.client).execute(function(err, results){
    console.log ('listing results from calendar...');
    console.log(results);
  });
};

exports.processData = function(req, res) {
  var code = req.query.code;
  console.log(code);
  googleApi.client.getToken(code, function(err, tokens){
    googleApi.client.credentials = tokens;
    getData();
  });
  res.json({});
};


