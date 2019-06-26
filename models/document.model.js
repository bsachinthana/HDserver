var mongoose = require('mongoose');
var thingSchema = new mongoose.Schema({
    title: String,
    desc: String,
    date: {type:Date,default: Date.now},
    course:{type: mongoose.Schema.Types.ObjectId, ref:'Subject'},
    content:mongoose.Schema.Types.Mixed
  });

var Thing = mongoose.model('Thing', thingSchema);

module.exports = Thing;
