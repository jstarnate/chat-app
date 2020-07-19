import Conversation from '../models/Conversation'

class ConversationController {

	async getSeenStatus(request, response) {
		const convo = await Conversation.findById(request.query.convoId)

		return response.json({ seen: convo.seener && convo.seener === request.query.userId })
	}

	async nullifySeener(request, response) {
		await Conversation.updateOne({ _id: request.body.id }, { $set: { seener: null } })

		return response.json({ success: true })
	}

}

const conversationController = new ConversationController

export default conversationController