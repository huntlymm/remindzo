'use strict';

angular.module('reminderApp')
  .controller('SettingsCtrl', function ($scope, $http, User, Auth) {
    $scope.errors = {};
    $scope.ownerId = {};
    $scope.user = {};
    $scope.phone = {};

    $scope.clearMessage = function () {
      $scope.message = '';
      $scope.message1 = '';
      $scope.phone.changed = '';
      $scope.errors.other = '';
    };

    $scope.clearPass = function () {
      $scope.user.oldPassword = '';
      $scope.user.newPassword = '';
    };

    $http.get('api/users/me').success(function (user){
      $scope.ownerId = user._id;
      $scope.phone.old = user.phone;
    });

    $scope.changePassword = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
          $scope.user.oldPassword = '';
          $scope.user.newPassword = '';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
        });
      }
		};

    $scope.changePhone = function(form1) {

      if(form1.$valid) {
        $http.put('/api/users/phone', {phone: $scope.phone.new, userid: $scope.ownerId}).then(function (user) {
            $scope.phone.changed = user.data.phone;
            $scope.phone.old = user.data.phone;
            $scope.phone.new = "";
            $scope.message1 = 'Phone number successfully changed to: ';
          });
      }
    };

  });
