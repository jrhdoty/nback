'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Game Schema
 */
var GameSchema = new Schema({
  user_id: String,
  date: {type:Date, default: Date.now},
  scores: {
    correct : Number,
    incorrect: Number,
    missed: Number
  }
});


module.exports = mongoose.model('Game', GameSchema);