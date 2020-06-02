import { Schema, model } from 'mongoose'

const conversationSchema = new Schema({
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