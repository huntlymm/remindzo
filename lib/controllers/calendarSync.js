'use strict';

var googleApi = require('./googleapi'),
    reminders = require('./reminders'),
    Promise = require("bluebird");

//check if event includes attendees with remindzo url in email
var checkRemindzo = function(attendees) {
  var theseAttendees = attendees || [];
  var save = false;
  theseAttendees.forEach(function (attendee) {
    if ( attendee.email.match(/remindzo\.com/) ) {
      save = true;
    }
  });
  return save;
};

// extract phone numbers from event attendees (add owner's phone if attendee == self)
var findPhoneNums = function (attendees, phone) {
  console.log('finding phone numbers..');
  console.log(attendees);
  var nums = [];
  attendees.forEach(function (attendee) {
    console.log('this is the attendee..');
    console.log(attendee);
    if (checkRemindzo([attendee])) {
      console.log('parsing emails...');
      var num = attendee.email.replace(/@remindzo\.com/i, "");
      console.log('the number = ' + num);
      if (num === "self") {
        nums.push(phone);
      } else {
        nums.push(num);
      }
    }
  });
  return nums;
};

//Given array of events, save each to DB. Wrap entire save function in promise, resolve when all saves are complete
var saveEvents = function(calEvents, owner_id, phone, owner) {
  return new Promise(function(resolve, reject) {
    console.log('saving events to DB..');
    var promiseArr = calEvents.items.map(function(item) {
      // Only save event if attendee emails include a remindzo domain
      if ( checkRemindzo(item.attendees) ) {

        var remindPhones = findPhoneNums(item.attendees, phone);
        console.log('these are the final phone nums... ');
        console.log(remindPhones);
        var message = item.summary;
        var startTime = item.start.dateTime;
        var endTime = item.end.dateTime;
        //Set remind time to 30 min before event start
        var remindDate = new Date(new Date(startTime).getTime() - (30*60*1000));
        var source = "Google" ;

        // syncCreate returns promise
        return reminders.syncCreate({message: message, phone: phone, remindPhones: remindPhones,date: remindDate, owner_id: owner_id, source: source, startTime: startTime, endTime: endTime, owner: owner});
      }
    });
    // resolve once all events are saved
    Promise.all(promiseArr).then(function(){
      console.log('all events saved');
      resolve();
    });
  });
};

//check if user has authenticated with google & given app permissions
var checkAuth = function (req, res) {
  if (googleApi.client.credentials === null) {
    res.send({authenticated: false});
  } else {
    res.send({authenticated: true});
  }
};

//Query google calendar api, pull events and save
var pullData = function(req, res) {
  //check if user is authenticated
  console.log('credentials...');
  console.log(googleApi.client.credentials);

  //Only pull events from the present day through the following saturday
  var today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  var nextSatDiff = (7 - (new Date().getDay()));
  var saturday = new Date(today.getTime() + (nextSatDiff * (24*60*60*1000)));
  var owner_id = req.body.ownerId;
  var phone = req.body.phone;
  var owner = req.body.owner;

  //Clear all previously synced google events from DB (that are in the future- don't edit past events)
  reminders.clearFutureCalEvents(owner_id, today).then(function() {

    //Call to Google Calendar API, save returned events
    googleApi.cal.events.list({calendarId:"primary", maxResults:"100", timeMin:today.toISOString(), timeMax:saturday.toISOString()}).withAuthClient(googleApi.client).execute(function(err, results){
        console.log('google sync err: ' + err);
        saveEvents(results, owner_id, phone, owner).then(function() {
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

module.exports = {processData: processData, pullData: pullData, checkAuth: checkAuth};

