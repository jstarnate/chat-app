import { v2 as cloudinary } from 'cloudinary'
import User from '../models/User'
import Conversation from '../models/Conversation'

class UserController {

	constructor() {
		const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } = process.env

		cloudinary.config({
			cloud_name: CLOUDINARY_CLOUD_NAME,
			api_key: CLOUDINARY_API_KEY,
			api_secret: CLOUDINARY_API_SECRET
		})
	}

	async getAuthUser(request, response) {
		try {
			const user = await User.findById(request.user, 'first_name last_name username gender image_path')
			response.status(200).json({ user })
		}
		catch (error) {
			response.status(500).send(error.message)
		}
	}

	async getContactInfo(request, response) {
		try {
			const user = await User.findById(request.query.id, 'first_name last_name gender image_path')
			response.status(200).json({user: {
				first_name: user.first_name,
				last_name: user.last_name,
				gender: user.gender,
				image_path: user.image_path ? user.image_path.replace(/\/image\/upload\//, '/image/upload/w_29,h_29/') : null
			}})
		}
		catch (error) {
			response.status(500).send(error.message)
		}
	}

	getAll(request, response) {
		User.findById(request.user, async (err, user) => {
			try {
				const users = await User.find(
					{ _id: { $nin: [request.user, ...user.sentRequests, ...user.receivedRequests, ...user.contacts] } },
					'first_name last_name username gender image_path'
				)
				response.status(200).json({ users })
			}
			catch (error) {
				response.status(500).send(error.message)
			}
		})
	}

	getContacts(request, response) {
		User.findById(request.user)
			.populate({ path: 'contacts', select: ['_id', 'first_name', 'last_name', 'gender', 'image_path', 'online'] })
			.exec((err, { contacts }) => {
				if (err) {
					return response.status(500).send('An error occured while fetching the contacts')
				}

				return response.json({ contacts })
			})
	}

	getRequests(request, response) {
		User.findById(request.user, { receivedRequests: 1, _id: 0 })
			.populate({ path: 'receivedRequests', select: ['first_name', 'last_name', 'gender', 'image_path'] })
			.exec((err, user) => {
				return response.json({ requests: user.receivedRequests })
			})
	}

	async getRequestsCount(request, response) {
		const { receivedRequests } = await User.findById(request.user)
		return response.json({ count: receivedRequests.length })
	}

	async update(request, response) {
		try {
			await User.updateOne({ _id: request.user }, { $set: request.body }, { runValidators: true })
			return response.json({ message: 'Success!' })
		}
		catch (error) {
			return response.status(422).json(error.errors)
		}
	}

	requestChat(request, response) {
		User.findOne({ _id: request.user }, async (err, user) => {
			if (user.receivedRequests.indexOf(request.body.id) !== -1) {
				return response.status(400).send('Resource already exists.')
			}
			else {
				try {
					await Promise.all([
						User.updateOne(
							{ _id: request.user },
							{ $push: { sentRequests: { $each: [request.body.id], $position: 0 } } }
						),
						User.updateOne(
							{ _id: request.body.id },
							{ $push: { receivedRequests: { $each: [request.user], $position: 0 } } }
						)
					])

					return response.json({ message: 'Success!' })
				}
				catch (error) {
					return response.status(403).json({ message: 'User already sent you a chat request' })
				}
			}
		})
	}

	async acceptRequest(request, response) {
		const updateAuthUser = User.updateOne(
			{ _id: request.user },
			{
				$pull: { receivedRequests: request.body.id },
				$push: { contacts: { $each: [request.body.id], $position: 0 } }
			}
		)

		const updateRequester = User.updateOne(
			{ _id: request.body.id },
			{
				$pull: { sentRequests: request.user },
				$push: { contacts: { $each: [request.user], $position: 0 } }
			}
		)

		try {
			await Promise.all([ updateAuthUser, updateRequester ])
			const convo = new Conversation({ users: [request.user, request.body.id] })

			convo.save(err => {
				response.json({ message: 'Success' })
			})
		}
		catch (error) {
			response.status(500).json({ message: 'An error occured while accepting the request.' })
		}
	}

	async removeRequest(request, response) {
		try {
			await Promise.all([
				User.updateOne({ _id: request.user }, { $pull: { receivedRequests: request.body.id } }),
				User.updateOne({ _id: request.body.id }, { $pull: { sentRequests: request.user } })
			])
			
			response.json({ message: 'Request removed.' })
		}
		catch (error) {
			response.status(500).json({ message: 'An error occured while removing the request.' })
		}
	}

	uploadImage(request, response) {
		cloudinary.uploader.upload(request.file.path, { folder: 'chat' }, (error, result) => {
			if (error) {
				return response.status(500).send(error)
			}

			const id = result.public_id.replace(/\//, '%2F')

			return response.json({ id, path: result.secure_url })
		})
	}

	deleteImage(request, response) {
		cloudinary.uploader.destroy(request.query.id, (error, result) => {
			return response.json({ message: 'Success!' })
		})
	}
}

const userController = new UserController()

export default userController