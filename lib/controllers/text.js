'use strict';

var schedule = require('node-schedule'),
    client = require('twilio')('ACb13507282a5ed6f8c0e010500ccf708f', '1133fe6323623703df340894d8c184e0');


exports.sendText = function (message, phone, date) {
  console.log('text sent');
  console.log('message: ' + message);
  console.log('phone num is: ' + phone);
  console.log(date);

 client.sendSms({
      to: '+1' + phone,
      from: '+19143614442',
      body: message
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
};



