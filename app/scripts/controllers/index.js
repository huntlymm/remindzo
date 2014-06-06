'use strict';

angular.module('reminderApp')
  .controller('IndexCtrl', function ($scope, $http) {
    $scope.reminders = [];
    $scope.ownerId = {};

    //Get current user //
    var findUser = $http.get('api/users/me').success(function (user){
      $scope.ownerId = user._id;
    });

    //Get user's reminders//
    findUser.success(function() {
      $http.get('/reminders/all/' + $scope.ownerId).success(function (reminders) {
          console.log(reminders);
          var remindersNoFormat = reminders;

          //format dates//
          remindersNoFormat.forEach(function(reminder){
              reminder.date = moment(reminder.date).local().format("dddd, MMMM Do YYYY, h:mma");
            });
          $scope.reminders = remindersNoFormat;
        });
    });

    //Delete reminder//

    $scope.delete = function(reminderId) {
      $http.delete('reminders/' + reminderId).success(function (reminder) {
        console.log('reminder deleted: ' + reminder);
        $scope.reminders = $scope.reminders.filter(function (rem) {
          return rem._id !== reminder._id;
        });
      });
    };


  });