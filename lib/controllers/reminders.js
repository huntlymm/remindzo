'use strict';

// var client = require('twilio')('', '');

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Reminder = mongoose.model('Reminder');

var create = function (req, res) {
  var message = req.body.message;
  var phone = req.body.phone;
  var date = req.body.date;
  var owner_id = req.body.ownerId;

  var newReminder = new Reminder({message: message, phone: phone, date: date, owner_id: owner_id});
  newReminder.save(function(err){
    if (err) console.log(err);
    return res.json({reminder: req.body});
  });


};

var index = function (req, res) {
  var owner_id = req.params.id;
  Reminder.find({owner_id: owner_id}, function(err, reminders){
    res.send(reminders);
  });
};

var show = function (req, res) {
  var reminderId = req.params.id;
  Reminder.findByIdAndRemove(reminderId, function (err, reminder) {
    res.send(reminder);
  });
};

var remove = function (req, res) {
  var reminderId = req.params.id;
  Reminder.findById(reminderId, function (err, reminder) {
    console.log(reminder.scheduledSms._id);
    res.send(reminder);
  });
};

var edit = function (req, res) {
  res.send("");
};

module.exports = {create: create, index: index, show: show, remove: remove, edit: edit};