'use strict';

angular.module('reminderApp')
  .controller('CalendarCtrl', function CalendarCtrl($scope, $http) {



    //Find current user id, query DB and find google sync'd events, add to calendar
    var calRefresh = function() {
      $scope.calEvents = [];
      $http.get('api/users/me').success(function (user){
        $scope.ownerId = user._id;
        $scope.phone = user.phone;
        $http.get('/calreminders/' + user._id).success(function (reminders) {
          var i = 0;
          reminders.forEach(function (reminder) {
            i++;
            $scope.calEvents.push({id: i, title:reminder.message, start: new Date(reminder.startTime), end: new Date(reminder.endTime), allDay: false});
          });
        });
      });
    };

    calRefresh();

    //Pull current week's data from google
    $scope.googleSync = function() {
      $http.post('googledata/pull', {ownerId: $scope.ownerId, phone: $scope.phone}).success(function(status){
        console.log(status.message);
        calRefresh();
      });
    };



    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $http.get('api/users/me').success(function (user){
      $scope.userName = user.name;
    });

    /* event source that contains custom events on the scope */
    // $scope.events = [
    //   {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
    //   {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
    //   {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
    //   {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    // ];

    // $scope.calEventsExt = {
    //    color: '#f00',
    //    textColor: 'yellow',
    //    events: [
    //       {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
    //       {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
    //       {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    //     ]
    // };
    // /* alert on eventClick */
    // $scope.alertOnEventClick = function( event, allDay, jsEvent, view ){
    //     $scope.alertMessage = (event.title + ' was clicked ');
    // };
    // /* alert on Drop */
    //  $scope.alertOnDrop = function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view){
    //    $scope.alertMessage = ('Event Droped to make dayDelta ' + dayDelta);
    // };
    // /* alert on Resize */
    // $scope.alertOnResize = function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view ){
    //    $scope.alertMessage = ('Event Resized to make dayDelta ' + minuteDelta);
    // };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };
    /* add custom event*/
    $scope.addEvent = function() {
      $scope.events.push({
        title: 'Open Sesame',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        className: ['openSesame']
      });
    };
    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
      calendar.fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
      calendar.fullCalendar('render');
    };
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