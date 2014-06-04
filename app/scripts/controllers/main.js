'use strict';

angular.module('reminderApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
    $scope.splendid = function(){
      $http.get('/reminders');
    };
  });
