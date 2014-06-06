'use strict';

var schedule = require('node-schedule'),
    client = require('twilio')('ACb13507282a5ed6f8c0e010500ccf708f', '97d108d92cfe2ee667da77a7c4af4a74');


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



