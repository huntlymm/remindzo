'use strict';

var schedule = require('node-schedule'),
    client = require('twilio')('ACb13507282a5ed6f8c0e010500ccf708f', '1133fe6323623703df340894d8c184e0');


exports.sendText = function (owner, message, phoneNums, date) {
  console.log('name: ' + owner);
  console.log('text sent');
  console.log('message: ' + message);
  console.log(date);

//Send out text to every number in phone numbers
  phoneNums.forEach(function(phoneNum) {
    client.sendSms({
        to: '+1' + phoneNum,
        from: '+19143614442',
        body: 'Reminder: ' + message
    }, function(error, message) {
        if (!error) {
            console.log('Success! The SID for this SMS message is:');
            console.log(message.sid);
            console.log('Message sent on:');
            console.log(message.dateCreated);
        } else {
            console.log('Oops! There was an error.');
        }
    });
  });
};



