import { Schema, model } from 'mongoose';

const conversationSchema = new Schema(
    {
        adder: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        added: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        seener: {
            type: String,
            default: null,
        },
        users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    },
    {
        timestamps: true,
    }
);

export default model('Conversation', conversationSchema);
