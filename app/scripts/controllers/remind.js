'use strict';

angular.module('reminderApp')
  .controller('RemindCtrl', function ($rootScope, $scope, $http, $location){
    $scope.reminder = {};

    //Get current user
    $http.get('api/users/me').success(function(user){
      $scope.reminder.ownerId = user._id;
    });

    $scope.newReminder = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        console.log($scope.reminder);
        //set date hour & min to match time object
        $scope.reminder.date.setHours($scope.reminder.time.getHours());
        $scope.reminder.date.setMinutes($scope.reminder.time.getMinutes());

        $http.post('/reminders', $scope.reminder)
        .success(function(reminder){
          console.log('returned reminder: ' + reminder);
          $location.path('/index');
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


    // Time selection //

    $scope.reminder.time = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.ismeridian = true;

    $scope.changed = function () {
      console.log('Time changed to: ' + $scope.reminder.time);
      console.log('Current hour is: ' + $scope.reminder.time.getHours());
    };

    // Get hour and minute from Time //

  });
