'use strict';

angular.module('reminderApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
