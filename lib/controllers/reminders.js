'use strict';

// var client = require('twilio')('', '');

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Reminder = mongoose.model('Reminder');

var create = function (req, res) {
  console.log(req.body);
  var message = req.body.message;
  var phone = req.body.phone;
  var date = req.body.date;

  var newReminder = new Reminder({message: message, phone: phone, date: date});
  newReminder.save(function(err){
    if (err) console.log(err);
    return res.json({message: req.body.message});
  });
};

var index = function (req, res) {
  Reminder.find(function(err, reminders){
    res.send(reminders);
  });
};

var show = function (req, res) {
  var reminderId = req.params.id;

  Reminder.findById(reminderId, function (err, reminder) {
    console.log(reminder);
    res.send(reminder);
  });
};

module.exports = {create: create, index: index, show: show};