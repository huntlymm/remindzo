'use strict';

var googleApi = require('./googleapi'),
    reminders = require('./reminders');

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


//Given array of events, save each to DB
var saveEvents = function(calEvents, owner_id, phone) {
  console.log('saving events to DB..');
  calEvents.items.forEach(function(item) {
    var message = item.summary;
    var date = item.start.dateTime;
    var source = "Google" ;
    reminders.syncCreate({message: message, phone: phone, date: date, owner_id: owner_id, source: source});
  });
};

//Query google calendar api, pull events and save
var pullData = function(req, res) {
  //Only pull events from today forward
  var today = new Date();
  var owner_id = req.body.ownerId;
  var phone = req.body.phone;

  googleApi.cal.events.list({calendarId:"primary", maxResults:"3", timeMin:today.toISOString()}).withAuthClient(googleApi.client).execute(function(err, results){
    saveEvents(results, owner_id, phone);
    res.json({message: "SUCCESS!"});
  });
};

//Google auth callback function - save credentials after authorization
var processData = function(req, res) {
  var code = req.query.code;
  googleApi.client.getToken(code, function(err, tokens){
    googleApi.client.credentials = tokens;
  });
  res.redirect('/');
};





module.exports = {processData: processData, pullData: pullData};

