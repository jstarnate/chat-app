import { Schema, model } from 'mongoose'

const conversationSchema = new Schema({
    requester: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	acceptor: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	users: [
        { type: Schema.Types.ObjectId, ref: 'User' }
    ],
    messages: [
        { type: Schema.Types.ObjectId, ref: 'Message' }
    ]
}, {
    timestamps: true
})

export default model('Conversation', conversationSchema)