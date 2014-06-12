'use strict';

var googleApi = require('./googleapi'),
    reminders = require('./reminders');


//Given array of events, save each to DB
var saveEvents = function(calEvents, owner_id, phone) {
  console.log('saving events to DB..');
  calEvents.items.forEach(function(item) {
    console.log('this item will be saved: ' + item.summary);
    var message = item.summary;
    var startTime = item.start.dateTime;
    var endTime = item.end.dateTime;
    console.log(endTime);
    // var endTime = item.
    //Set remind time to 30 min before event start
    var remindDate = new Date(new Date(startTime).getTime() - (30*60*1000));
    console.log('remind date: ' + remindDate);
    var source = "Google" ;
    reminders.syncCreate({message: message, phone: phone, date: remindDate, owner_id: owner_id, source: source, startTime: startTime, endTime: endTime});
  });
};

//Query google calendar api, pull events and save
var pullData = function(req, res) {
  //Only pull events from Last Sunday to this saturday forward
  var today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  var lastSundayDiff = new Date().getDay();
  var nextSatDiff = (6 - lastSundayDiff);
  var sunday = new Date(today - lastSundayDiff * (24*60*60*1000));
  var saturday = new Date(today.getTime() + (nextSatDiff * (24*60*60*1000)));

  var owner_id = req.body.ownerId;
  var phone = req.body.phone;

  googleApi.cal.events.list({calendarId:"primary", maxResults:"100", timeMin:sunday.toISOString(), timeMax:saturday.toISOString()}).withAuthClient(googleApi.client).execute(function(err, results){
    console.log(results);
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
  res.redirect('/calendar');
};





module.exports = {processData: processData, pullData: pullData};

