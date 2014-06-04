'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing');

/**
 * Get awesome things
 */
var awesomeThings = function(req, res) {
  return res.json({hunt: "huntly"});
  // return Thing.find(function (err, things) {
  //   if (!err) {
  //     return res.json(things);
  //   } else {
  //     return res.send(err);
  //   }
  // });
};

module.exports = {awesomeThings: awesomeThings};