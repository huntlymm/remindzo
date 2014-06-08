'use strict';

angular.module('reminderApp')
  .factory('Reminder', function ($http) {
    return {
      assignTime: function(scope){
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
      }
    };
  });