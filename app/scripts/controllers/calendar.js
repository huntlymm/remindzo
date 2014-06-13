'use strict';

angular.module('reminderApp')
  .controller('CalendarCtrl', function CalendarCtrl($scope, $http) {

    //Find current user id, query DB and find google sync'd events, add to calendar
    $scope.calRefresh = function() {
      $scope.calEvents = [];
      $http.get('api/users/me').success(function (user){
        console.log('calender refreshing..');
        $scope.ownerId = user._id;
        $scope.phone = user.phone;
        $scope.owner = user.name;
        $http.get('/calreminders/' + user._id).success(function (reminders) {
          var i = 0;
          reminders.forEach(function (reminder) {
            i++;
            $scope.calEvents.push({id: i, title:reminder.message, start: new Date(reminder.startTime), end: new Date(reminder.endTime), allDay: false});
          });
          console.log($scope.calEvents);
        });
      });
    };

    //Pull current week's data from google
    $scope.googleSync = function() {
      $http.post('googledata/pull', {ownerId: $scope.ownerId, phone: $scope.phone, owner: $scope.owner}).success(function(status){
        console.log(status.message);
        $scope.calRefresh();
      });
    };

    $scope.calRefresh();

    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 600,
        allDaySlot: false,
        editable: true,
        defaultView: 'agendaWeek',
        header:{
          left: $scope.userName + 's Calendar',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }
    };

    /* event sources array*/
    $scope.eventSources = [$scope.calEvents];
  });