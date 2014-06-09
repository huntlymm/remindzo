'use strict';

angular.module('reminderApp')
  .controller('SettingsCtrl', function ($scope, $http, User, Auth) {
    $scope.errors = {};
    $scope.ownerId = {};

    $http.get('api/users/me').success(function (user){
      $scope.ownerId = user._id;
    });

    $scope.changePassword = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
        });
      }
		};

    $scope.changePhone = function (form) {
      $scope.submitted = true;

      if(form.$valid) {
        function()
      }
    };
  });
