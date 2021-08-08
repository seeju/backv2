import mongoose from 'mongoose';

const MeetingSchema = new mongoose.Schema(
	{
	  date: {
		type: Date,
		required: true,
	  },
	  canceled_at: {
		type: Date,
	  },
	  lider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	  liderado:{type:mongoose.Schema.Types.ObjectId, ref: 'User'},
	},
	{
	  timestamps: true,
	},
  );
  
  export default mongoose.model('Meeting', MeetingSchema);