import User from '../models/User'

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

		socket.on('add request', async (id) => {
			const user = await User.findById(id)
			socket.broadcast.emit(`display request count ${id}`, user.receivedRequests.length)
		})

		socket.on('request accepted', async (data) => {
			const user = await User.findById(data.authUserId, 'first_name last_name gender image_path receivedRequests')

			socket.broadcast.emit(`add to contacts ${data.requesterId}`, user)
			socket.broadcast.emit(`display request count ${data.authUserId}`, user.receivedRequests.length)
		})

		socket.on('request removed', async (id) => {
			const user = await User.findById(id)
			socket.broadcast.emit(`display request count ${id}`, user.receivedRequests.length)
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