'use strict';

angular.module('reminderApp')
  .controller('EditCtrl', function ($scope, $routeParams, $location, DateProps, Reminder){

    $scope.reminder = {};
    $scope.reminderId = $routeParams.id;
    Reminder.find($scope.reminderId, $scope);

    console.log($scope.reminder);

    $scope.updateReminder = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        //set date hour & min to match time object
        Reminder.assignTime($scope);

        //update reminder
        Reminder.update($scope.reminder, $scope.reminderId, $location);
      }
    };

     //Format Calendar
    DateProps.calendarFormat($scope);

    // Format Time Selection //
    DateProps.timeFormat($scope);
  });