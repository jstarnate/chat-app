import User from '../models/User'
import Conversation from '../models/Conversation'

export default (io) => {

	io.of('/contacts').on('connection', (socket) => {
		let connectedUsers = []

		socket.on('user connects', (id) => {
			if (!connectedUsers.find(user => user.userId === id)) {
				connectedUsers.push({ userId: id, sid: socket.id })

				User.updateOne({ _id: id }, { $set: { online: true } }, (err) => {
					socket.broadcast.emit('online user', id)
				})
			}
		})

		socket.on('added to contacts', (data) => {
			Conversation.findOne({ users: { $in: [data.adderId, data.addedId] } })
				.populate({
					path: 'users',
					select: ['first_name', 'last_name', 'gender', 'image_path', 'online'],
					match: { _id: data.adderId }
				})
				.exec((err, convo) => {
					const contact = {
						_id: convo._id,
						user: convo.users[0],
						createdAt: convo.createdAt
					}

					socket.broadcast.emit('add to contacts', { id: data.addedId, contact })
				})
		})

		socket.on('disconnect', () => {
			const disconnectId = socket.id

			if (connectedUsers.find(user => user.sid === disconnectId)) {
				const authUser = connectedUsers.find(user => user.sid === disconnectId)

				if (!!authUser.userId) {
					User.updateOne({ _id: authUser.userId }, { $set: { online: false } }, (err) => {
						socket.broadcast.emit('offline user', authUser.userId)
						connectedUsers = connectedUsers.filter(user => user.userId !== authUser.userId)
					})
				}
				else {
					connectedUsers = connectedUsers.filter(user => user.sid !== disconnectId)
				}
			}
		})
	})

	io.of('/messages').on('connection', (socket) => {
		socket.on('send message', (data) => {
			const { _id, body, timestamp } = data.message
			socket.broadcast.emit(`receive message ${data.id}`, { _id, body, isSelf: false, timestamp })
		})
	})
}