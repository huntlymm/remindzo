'use strict';

angular.module('reminderApp')
  .controller('RemindCtrl', function ($scope, Reminder){
    $scope.reminder = {};

    $scope.newReminder = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        console.log($scope.reminder);
      }
    };
  });