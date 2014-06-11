'use strict';

angular.module('reminderApp')
  .controller('MainCtrl', function ($scope, $http, $location) {
    $scope.world = {};

    $http.get('api/users/me').success(function (user){
      $scope.ownerId = user._id;
      $scope.phone = user.phone;
    });

    $scope.googleIntegrate = '';
    $http.get('googleauth').success(function(url) {
        console.log(url.link);
        $scope.googleIntegrate = url.link;
      });

    $scope.googleSync = function() {
      $http.post('googledata/pull', {ownerId: $scope.ownerId, phone: $scope.phone}).success(function(status){
        console.log(status.message);
      });
    };
  });
