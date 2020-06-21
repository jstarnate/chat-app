import moment from 'moment'
import User from '../models/User'
import Message from '../models/Message'
import Conversation from '../models/Conversation'

class MessageController {
    
    async getConversationMessages(request, response) {
    	Conversation.findOne({ users: { $in: [request.user, request.query.id] } })
            .populate({ path: 'messages', select: ['user', 'body', 'createdAt'] })
            .exec(async (err, convo) => {
                const messages = convo.messages.map(message => ({
                    _id: message._id,
                    body: message.body,
                    isSelf: message.user.equals(request.user),
                    timestamp: moment(message.createdAt).format('L h:mm A')
                }))

                const user = await User.findById(request.query.id, 'first_name last_name gender image_path')

                response.json({
                    messages,
                    user: {
                        first_name: user.first_name,
                        last_name: user.last_name,
                        gender: user.gender,
                        image_path: user.image_path ? user.image_path.replace(/\/image\/upload\//, '/image/upload/w_29,h_29/') : null
                    }
                })
            })
    }

    async store(request, response) {
    	const convo = await Conversation.findOne({ users: { $in: [request.user, request.body.id] } })
        const newMessage = new Message({ conversation: convo._id, user: request.user, body: request.body.message })

    	convo.messages.push(newMessage._id)
    	
        await Promise.all([
            convo.save(),
            newMessage.save(),
            User.updateOne({ _id: request.user }, { $push: { messages: newMessage._id } })
        ])

    	return response.json({ message: {
    		_id: newMessage._id,
    		body: newMessage.body,
    		isSelf: true,
    		timestamp: moment(newMessage.createdAt).format('L h:mm A')
    	}})
    }

}

const messageController = new MessageController

export default messageController