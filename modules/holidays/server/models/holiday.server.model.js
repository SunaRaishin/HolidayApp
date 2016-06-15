'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Holiday Schema
 */
var HolidaySchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Holiday name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  startDate: {
    type: String,
    default: '',
    required: 'Please enter a starting date'
  },
  endDate: {
    type: String,
    default: '',
    required: 'Please enter a starting date'
  },
  status: {
    type: [{
      type: String,
      enum: ['Pending', 'Moderator-Approved', 'Moderator-Declined', 'Admin-Approved', 'Admin-Declined']
    }],
    default: 'Pending'
  }
});

mongoose.model('Holiday', HolidaySchema);
