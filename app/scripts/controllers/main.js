'use strict';

angular.module('reminderApp')
  .controller('MainCtrl', function ($scope, $http, $location) {
    $scope.world = {};

    $scope.google = '';
    $http.get('googleauth').success(function(url) {
        console.log(url.link);
        $scope.google = url.link;
      });
  });
