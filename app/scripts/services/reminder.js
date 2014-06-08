'use strict';

angular.module('reminderApp')
  .factory('Reminder', function ($http) {
    return {
      assignTime: function(scope){
        console.log(scope.reminder.date);
        scope.reminder.date.setHours(scope.reminder.time.getHours());
        scope.reminder.date.setMinutes(scope.reminder.time.getMinutes());
        scope.reminder.date.setSeconds(0);
        scope.reminder.date.setMilliseconds(0);
      },
      create: function(data, location) {
        $http.post('/reminders', data)
        .success(function(reminder){
          location.path('/index');
        });
      },
      find: function(id, scope) {
        $http.get('/reminders/' + id)
        .success(function(reminder){
          console.log('from find service: ' +reminder);
          scope.reminder = reminder;
          scope.reminder.date = new Date(reminder.date);
          scope.reminder.time = new Date(reminder.date);
        });
      },
      update: function(data, id, location) {
        $http.post('/reminders/' + id, data)
        .success(function(reminder){
          console.log('reminder ' + reminder.message + ' was updated');
          location.path('index');
        });
      }
    };
  });