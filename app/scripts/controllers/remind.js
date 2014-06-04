'use strict';

angular.module('reminderApp')
  .controller('RemindCtrl', function ($scope, $http, $location){
    $scope.reminder = {};

    $scope.newReminder = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        $http.post('/reminders', $scope.reminder)
        .success(function(err){
          console.log(err);
          $location.path('/');
        });
      }
    };

    //Popup calendar for date selection//

    //default selection is today
    $scope.today = function() {
      $scope.reminder.date = new Date();
    };
    $scope.today();

    //can't select before today
    $scope.toggleMin = function() {
      $scope.minDate = new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };


    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

  });
