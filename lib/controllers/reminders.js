'use strict';

  var client = require('twilio')('', '');

var newReminder = function(req, res) {

  var now = new Date();
  var hours = now.getHours();
  var min = now.getMinutes();
  var time = hours + ":" + min;
  console.log(time);
  console.log('newReminder triggered');

  client.sendMessage({
    to: '+19145224435',
    from: '+19143614442',
    body: 'this is to test the newest message sent at ' + time
  }, function(err, responseData){
     if (!err) { // "err" is an error received during the request, if any

        // "responseData" is a JavaScript object containing data received from Twilio.
        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

        console.log(responseData.from); // outputs "+14506667788"
        console.log(responseData.body); // outputs "word to your mother."
    }
  });
};

module.exports = {newReminder: newReminder};