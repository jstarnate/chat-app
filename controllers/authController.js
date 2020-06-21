import passport from 'passport'
import { sign as jwtSign } from 'jsonwebtoken'
import { hashSync } from 'bcrypt'
import User from '../models/User'

class AuthController {

	createResponseError(response, username, password) {
		response.status(422).json({
			username: { message: username },
			password: { message: password }
		})
	}
	
	login(request, response, next) {
		const { username, password } = request.body

		if (!username && !password)
			return this.createResponseError(response, 'Username is required.', 'Password is required.')

		if (!username)
			return this.createResponseError(response, 'Username is required.', null)

		if (!password)
			return this.createResponseError(response, null, 'Password is required.')

		passport.authenticate('signin', (error, user, info) => {
			if (error) return next(error)
			
			if (!user || !user.validPassword(password))
				return response.status(422).json({ auth: 'Incorrect combination.' })

			request.login(user._id, (err) => {
				if (err) return next(err)

				jwtSign({ sub: user._id }, process.env.JWT_SECRET, (jwtError, token) => {
					if (jwtError) throw jwtError
					return response.status(200).json({ token: `Bearer ${token}` })
				})
			})
		})(request, response, next)
	}

	register(request, response) {
		const { password, ...body } = request.body
		body.password = hashSync(password, 10)

		User.create(body, (error, user) => {
			if (error) return response.status(422).json(error.errors)

			request.login(user._id, (err) => {
				jwtSign({ sub: user._id }, process.env.JWT_SECRET, (jwtError, token) => {
					if (jwtError) throw jwtError
					return response.status(200).json({ token: `Bearer ${token}` })
				})
			})
		})
	}

	logout(request, response) {
		request.logout()
		return response.status(200).send('Logged out.')
	}

}

export default new AuthController
