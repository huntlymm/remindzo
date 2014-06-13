'use strict';

var mongoose = require('mongoose'),
  Reminder = mongoose.model('Reminder'),
  schedule = require('node-schedule'),
  text = require('../lib/controllers/text'),
  moment = require('moment');

//Create interval
var intervalRule = new schedule.RecurrenceRule();
intervalRule.minute = [0, new schedule.Range(0,60,5)];

//Query DB, find reminders with current time, send texts
var findAndSendReminders = function() {
    console.log("interval triggered");
    var currentDate = moment().utc().seconds(0).milliseconds(0);
    Reminder.find({date: currentDate}, function(err, reminders){
      reminders.forEach(function(reminder){
        text.sendText(reminder.owner, reminder.message, reminder.remindPhones, reminder.date, reminder.source);
      });
    });
};

var textSchedule = schedule.scheduleJob(intervalRule, findAndSendReminders);


