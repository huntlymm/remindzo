'use strict';

angular.module('reminderApp')
  .controller('IndexCtrl', function ($scope, $http) {
    $scope.reminders = {};

    //Get current user
    var findUser = $http.get('api/users/me').success(function(user){
      $scope.ownerId = user._id;
      console.log($scope.ownerId);
    });

    findUser.success(function() {
      $http.get('/reminders/?id=' + $scope.ownerId).success(function (reminders) {
          var remindersNoFormat = reminders;

          remindersNoFormat.forEach(function(reminder){
            reminder.date = moment(reminder.date).local().format("dddd, MMMM Do YYYY, h:mma");
          });
        });
    });

      $scope.reminders = remindersNoFormat;

    });
  });