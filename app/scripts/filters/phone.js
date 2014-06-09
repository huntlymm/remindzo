'use strict';

angular.module('reminderApp')
.filter('phone', function() {
  return function(tel) {
    if (!tel) {return '';}

    var val = tel.toString();
    var areaCode = val.slice(0,3);
    var beg = val.slice(3,6);
    var end = val.slice(6);

    return "(" + areaCode + ") " + beg + "-" + end;
  };
});