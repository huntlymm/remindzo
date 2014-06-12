'use strict';

var api = require('./controllers/api'),
    reminders = require('./controllers/reminders'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    reminders = require('./controllers/reminders'),
    session = require('./controllers/session'),
    google = require('./controllers/googleapi'),
    calendar = require('./controllers/calendarSync'),
    middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.route('/api/awesomeThings')
    .get(api.awesomeThings);

  app.route('/reminders')
    .post(reminders.create);

  app.route('/reminders/all/:id')
    .get(reminders.index);

  app.route('/reminders/:id')
    .get(reminders.show)
    .delete(reminders.remove)
    .post(reminders.update);

  app.route('/calreminders/:id')
    .get(reminders.calIndex);

  app.route('/api/users')
    .post(users.create)
    .put(users.changePassword);

  app.route('/api/users/phone')
    .put(users.changePhone);

  app.route('/api/users/me')
    .get(users.me);
  app.route('/api/users/:id')
    .get(users.show);

  app.route('/api/session')
    .post(session.login)
    .delete(session.logout);

  app.route('/googledata')
    .get(calendar.processData);

  app.route('/googledata/pull')
    .post(calendar.pullData);

  app.route('/googleauth')
    .get(google.link);


  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( middleware.setUserCookie, index.index);
};