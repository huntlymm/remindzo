'use strict';

var googleApi = require('./googleapi'),
    reminders = require('./reminders'),
    Promise = require("bluebird");


//Given array of events, save each to DB. Wrap entire save function in promise, resolve when all saves are complete
var saveEvents = function(calEvents, owner_id, phone) {
  return new Promise(function(resolve, reject) {
    console.log('saving events to DB..');
    var promiseArr = calEvents.items.map(function(item) {
      console.log('this item will be saved: ' + item.summary);
      var message = item.summary;
      var startTime = item.start.dateTime;
      var endTime = item.end.dateTime;
      //Set remind time to 30 min before event start
      var remindDate = new Date(new Date(startTime).getTime() - (30*60*1000));
      var source = "Google" ;

      // syncCreate returns promise
      return reminders.syncCreate({message: message, phone: phone, date: remindDate, owner_id: owner_id, source: source, startTime: startTime, endTime: endTime});
    });
    // resolve once all events are saved
    Promise.all(promiseArr).then(function(){
      console.log('all events saved');
      resolve();
    });
  });
};

//Query google calendar api, pull events and save
var pullData = function(req, res) {
  //Only pull events from the present day through the following saturday
  var today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  var nextSatDiff = (6 - (new Date().getDay()));
  var saturday = new Date(today.getTime() + (nextSatDiff * (24*60*60*1000)));
  var owner_id = req.body.ownerId;
  var phone = req.body.phone;

  //Clear all previously synced google events from DB (that are in the future- don't edit past events)
  reminders.clearFutureCalEvents(owner_id, today).then(function() {
    //Call to Google Calendar API, save returned events
    googleApi.cal.events.list({calendarId:"primary", maxResults:"100", timeMin:today.toISOString(), timeMax:saturday.toISOString()}).withAuthClient(googleApi.client).execute(function(err, results){
        saveEvents(results, owner_id, phone).then(function() {
          console.log('sending back JSON (should be after all saves');
        res.json({message: "success!"});
        });
      });
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

