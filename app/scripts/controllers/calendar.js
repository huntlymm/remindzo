'use strict';

angular.module('reminderApp')
  .controller('CalendarCtrl', function CalendarCtrl($scope, $http, $route) {

    //Get google auth link
    $scope.googleIntegrate = '';
    $http.get('googleauth').success(function(url) {
        $scope.googleIntegrate = url.link;
      });

    //check if user has authorized access to google calendar
    $http.get('/googledata/checkauth').success(function (status) {
      $scope.authenticated = status.authenticated;
      $scope.nonauth = !status.authenticated;
    });


    //Find current user id, query DB and find google sync'd events, add to calendar

    $scope.calRefresh = function() {
      $scope.calEvents = [];
      $http.get('api/users/me').success(function (user){
        $scope.ownerId = user._id;
        $scope.phone = user.phone;
        $scope.owner = user.name;
        $http.get('/calreminders/' + user._id).success(function (reminders) {
          var i = 0;
          reminders.forEach(function (reminder) {
            i++;
            $scope.calEvents.push({id: i, title:reminder.message, start: new Date(reminder.startTime), end: new Date(reminder.endTime), allDay: false});
          });
          $scope.eventSources = [$scope.calEvents];
          $scope.myCalendar.fullCalendar('rerenderEvents');
        });
      });
    };

    //Pull current week's data from google
    $scope.googleSync = function() {
      $http.post('googledata/pull', {ownerId: $scope.ownerId, phone: $scope.phone, owner: $scope.owner}).success(function(status){
        console.log('data pulled and saved to db');
        $scope.calRefresh();
        $route.reload();
      });
    };

    //refresh calendar on page load
    $scope.calRefresh();

    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 500,
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

    $scope.eventSources = [$scope.calEvents];
  });