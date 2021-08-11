const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true  },
		password: { type: String, required: true },
		admin: { type: Boolean, default: false }
	},
	{ collection: 'users' }
);


const User = mongoose.model('User', UserSchema);

module.exports = User;