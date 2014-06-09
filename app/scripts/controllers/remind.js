'use strict';

angular.module('reminderApp')
  .controller('RemindCtrl', function ($scope, $http, $location, DateProps, Reminder){

    $scope.reminder = {};

    //Get current user
    $http.get('api/users/me').success(function(user){
      $scope.reminder.ownerId = user._id;
      $scope.reminder.phone = user.phone || "";
    });

    $scope.newReminder = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        //set date hour & min to match time object
        Reminder.assignTime($scope);

        //create new reminder
        Reminder.create($scope.reminder, $location);
      }
    };

    //Format Calendar
    DateProps.calendarFormat($scope);
    $scope.reminder.date = new Date();

    // Format Time Selection //
    DateProps.timeFormat($scope);

  });