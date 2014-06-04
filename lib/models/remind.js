'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// **
// Reminder Schema

var RemindSchema = new Schema({
  message: String,
  phone: String,
  date: Date
});

// **
// Validations

RemindSchema.path('message').validate(function (str) {
  return str.length > 160;
}, 'Message must be less than 160 characters long');

mongoose.model('Remind', RemindSchema);
