'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// **
// Reminder Schema

var ReminderSchema = new Schema({
  message: String,
  phone: String,
  date: Date,
  owner_id: Schema.Types.ObjectId,
  source: String
});

// **
// Validations

// ReminderSchema.path('message').validate(function (str) {
//   return str.length > 160;
// }, 'Message must be less than 160 characters long');


module.exports = mongoose.model('Reminder', ReminderSchema);
