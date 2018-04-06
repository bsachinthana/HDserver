var mongoose = require('mongoose');
var subject= mongoose.Schema({}); 
module.exports = mongoose.model('Subject',subject );