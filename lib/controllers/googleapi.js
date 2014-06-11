'use strict';

var config = require('../../lib/config/env/development'),
    googleapis = require('googleapis'),
    OAuth2Client = googleapis.OAuth2Client,
    client = '800295360609-vr0e04v659g1f842kb9pi5e7iq637o7t.apps.googleusercontent.com',
    secret = config.google.secret,
    redirect = config.url.url + 'googledata',
    calendar_auth_url = '',
    oauth2Client = new OAuth2Client(client, secret, redirect);

var calendar_auth_url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: 'https://www.googleapis.com/auth/calendar'
});

var exporter = function(client) {
  exports.cal = client.calendar;
  exports.oauth = client.oauth2;
  exports.client = oauth2Client;
  exports.url = calendar_auth_url;
};

googleapis
  .discover('calendar', 'v3')
  .discover('oauth2', 'v2')
  .execute(function(err, client){
    if(!err)
      exporter(client);
  });

//export user auth link
exports.link = function(req, res) {
  res.json({link: calendar_auth_url});
};