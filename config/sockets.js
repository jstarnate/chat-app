import User from '../models/User'

export default (io) => {

	io.of('/contacts').on('connection', (socket) => {
		const connectedUsers = []
		
		socket.on('user connects', (userId) => {
			if (connectedUsers.indexOf(userId) === -1) {
				connectedUsers.push(userId)

				User.updateOne({ _id: userId }, { $set: { online: true } }, (err) => {
					socket.broadcast.emit('online user', userId)
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
			connectedUsers.splice(connectedUsers.indexOf('5ee6806ec82d1b685024cdf5'), 1)

			User.updateOne({ _id: '5ee6806ec82d1b685024cdf5' }, { $set: { online: false } }, (err) => {
				socket.broadcast.emit('offline user', '5ee6806ec82d1b685024cdf5')
			})
		})
	})

	io.of('/messages').on('connection', (socket) => {
		socket.on('send message', (data) => {
			const { _id, body, timestamp } = data.message
			socket.broadcast.emit(`receive message ${data.id}`, { _id, body, isSelf: false, timestamp })
		})
	})
}