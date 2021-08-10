const mongoose = require('mongoose');
const User = require('../models/user');


const MeetingSchema = new mongoose.Schema(
	{
		data: { type: Date, required: true},
		frequencia: { type: Number, required: true},
		realizado: { type: Boolean, default: false}
	},
	{ collection: 'meetings' }
);

  
const Meeting = mongoose.model('Meeting', MeetingSchema);

module.exports = Meeting;