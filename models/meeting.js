const mongoose = require('mongoose');
const User = require('../models/user');


const MeetingSchema = new mongoose.Schema(
	{
		lider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		liderado: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		data: { type: Date, required: true},
		frequencia: { type: Number, required: true},
		realizado: { type: Boolean, default: false}
	},
	{ collection: 'meetings' }
);

  
const Meeting = mongoose.model('Meeting', MeetingSchema);

module.exports = Meeting;