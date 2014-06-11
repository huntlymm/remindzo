'use strict';

// var client = require('twilio')('', '');

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Reminder = mongoose.model('Reminder');

var createReminder = function(data) {
  var newReminder = new Reminder(data);
  return newReminder;
};

var create = function (req, res) {
  var message = req.body.message;
  var phone = req.body.phone;
  var date = req.body.date;
  var owner_id = req.body.ownerId;
  var source = "Remindzo";

  var newReminder = createReminder({message: message, phone: phone, date: date, owner_id: owner_id, source: source});
  newReminder.save(function(err){
    if (err) console.log(err);
    return res.json({reminder: req.body});
  });
};

var syncCreate = function(data) {
  var newReminder = createReminder(data);
  newReminder.save(function(err){
    if (err) console.log(err);
    console.log("event saved: " + data.message);
  });
};

var index = function (req, res) {
  var owner_id = req.params.id;
  Reminder.find({owner_id: owner_id, source: "Remindzo"}, function(err, reminders){
    res.send(reminders);
  });
};

var show = function (req, res) {
  var reminderId = req.params.id;
  console.log(reminderId);
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

var update = function (req, res) {
  var reminderId = req.params.id;
  var message = req.body.message;
  var phone = req.body.phone;
  var date = req.body.date;

  Reminder.findByIdAndUpdate(reminderId, {message: message, phone: phone, date: date}, function(reminder) {
    res.send(reminder);
  });
};

module.exports = {create: create, index: index, show: show, remove: remove, update: update, syncCreate:syncCreate};