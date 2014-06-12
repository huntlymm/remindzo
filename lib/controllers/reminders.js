'use strict';

// var client = require('twilio')('', '');

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Reminder = mongoose.model('Reminder'),
    Promise = require("bluebird");

var createReminder = function(data) {
  var newReminder = new Reminder(data);
  return newReminder;
};

var create = function (req, res) {
  var owner = req.body.owner;
  var message = req.body.message;
  var phone = req.body.phone;
  var remindPhones = [phone];
  var date = req.body.date;
  var owner_id = req.body.ownerId;
  var source = "Remindzo";

  var newReminder = createReminder({remindPhones: remindPhones, owner: owner, message: message, phone: phone, date: date, owner_id: owner_id, source: source});
  newReminder.save(function(err){
    if (err) console.log(err);
    return res.json({reminder: req.body});
  });
};

//Wrap "synced" reminder creation in promise, return when finished (so calendar refresh only occurs afterwards)
var syncCreate = function(data) {
  return new Promise(function(resolve, reject) {
    var newReminder = createReminder(data);
    newReminder.save(function(err){
      if (err) reject(err);
      else {
        console.log("event saved: " + data.message);
        resolve();
      }
    });
  });
};

var index = function (req, res) {
  var owner_id = req.params.id;
  Reminder.find({owner_id: owner_id, source: "Remindzo"}, function(err, reminders){
    res.send(reminders);
  });
};

var calIndex = function (req, res) {
  var owner_id = req.params.id;
  Reminder.find({owner_id: owner_id, source: "Google"}, function(err, reminders){
    res.send(reminders);
  });
};

var show = function (req, res) {
  var reminderId = req.params.id;
  Reminder.findById(reminderId, function (err, reminder) {
    console.log(reminder.message);
    res.send(reminder);
  });
};

var remove = function (req, res) {
  var reminderId = req.params.id;
  Reminder.findByIdAndRemove(reminderId, function (err, reminder) {
    res.send(reminder);
  });
};

//delete all google sync'd events occuring from today and going forward
var clearFutureCalEvents = function (ownerId, today) {
  return new Promise(function(resolve, reject) {
    Reminder.remove({owner_id: ownerId, source: "Google", startTime: {$gte: today}}, function(err, results) {
      console.log('these have been deleted...');
      console.log(results);
      resolve();
    });
  });
};

var update = function (req, res) {
  var reminderId = req.params.id;
  var message = req.body.message;
  var phone = req.body.phone;
  var date = req.body.date;

  Reminder.findByIdAndUpdate(reminderId, {message: message, phone: phone, date: date}, function(reminder) {
    res.send(reminder);
  });
};

module.exports = {create: create, index: index, show: show, remove: remove, update: update, syncCreate:syncCreate, calIndex: calIndex, clearFutureCalEvents: clearFutureCalEvents};