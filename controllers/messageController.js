import { Types } from 'mongoose'
import moment from 'moment'
import User from '../models/User'
import Message from '../models/Message'
import Conversation from '../models/Conversation'

const body = (name, isSelf) => ({
    _id: name._id,
    body: name.body,
    isSelf,
    timestamp: {
        iso: name.createdAt,
        standard: moment(name.createdAt).format('L h:mm A')
    }
})

class MessageController {
    
    getConversationMessages(request, response) {
    	Conversation.findById(request.body.id)
            .populate({
                path: 'messages',
                select: ['user', 'body', 'createdAt'],
                match: { createdAt: { $lt: new Date(request.body.date) } },
                options: {
                    sort: { createdAt: -1 },
                    limit: 10
                }
            })
            .exec((err, convo) => {
                if (!convo.messages.length) {
                    return response.json({ messages: [] })
                }

                const messages = convo.messages.map(message => body(message, message.user.equals(request.user._id))).reverse()

                return response.json({ messages })
            })
    }

    async store(request, response) {
    	const convo = await Conversation.findOne({ users: { $in: [request.user, request.body.id] } })
        const newMessage = new Message({ conversation: convo._id, user: request.user, body: request.body.message })
        const pushMessage = User.updateOne({ _id: request.user }, { $push: { messages: newMessage._id } })

    	convo.messages.push(newMessage._id)
    	
        await Promise.all([ convo.save(), newMessage.save(), pushMessage ])

    	return response.json({ message: body(newMessage, true) })
    }

}

const messageController = new MessageController

export default messageController