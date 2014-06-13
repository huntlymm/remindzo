'use strict';

angular.module('reminderApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.world = {};

    $http.get('api/users/me').success(function (user){
      $scope.ownerId = user._id;
      $scope.phone = user.phone;
    });

  });
