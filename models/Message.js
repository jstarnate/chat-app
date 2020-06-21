import { Schema, model } from 'mongoose'

const messageSchema = new Schema({
	conversation: {
		type: Schema.Types.ObjectId,
		ref: 'Conversation'
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	body: {
		required: true,
		type: String,
		trim: true
	}
}, {
	timestamps: true
})

export default model('Message', messageSchema)