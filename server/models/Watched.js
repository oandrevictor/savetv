var mongoose = require('mongoose');
var Action = require('./Action');
var User = require('./User');
var DataStoreUtils = require('../utils/lib/dataStoreUtils');
var Schema = mongoose.Schema;

var WatchedSchema = new Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  hidden: {
    type: Boolean,
    required: true,
    default: false
  },
  _media: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time_spent: {
    type: Number,
    required: true
  },
  _action: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Action',
    required: false
  }
});

var Watched = mongoose.model('Watched', WatchedSchema);

module.exports = Watched;
