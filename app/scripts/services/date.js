'use strict';

angular.module('reminderApp')
  .factory('DateProps', function () {
    return {
      calendarFormat: function(scope) {
        scope.open = function($event) {
          $event.preventDefault();
          $event.stopPropagation();
          scope.opened = true;
        };

        scope.dateOptions = {
          formatYear: 'yy',
          startingDay: 1
        };

        scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        scope.format = scope.formats[0];

        //Can't set reminder before today
        scope.minDate = new Date();
      },
      timeFormat: function(scope) {
        scope.hstep = 1;
        scope.mstep = 15;

        scope.ismeridian = true;

        scope.reminder.time = new Date('October 13, 2014 12:00:00');

      }
    };
  });