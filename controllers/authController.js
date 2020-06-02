import passport from 'passport'
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

		passport.authenticate('local', (err, user, info) => {
			if (err) return next(err)
			
			if (!user || !user.validPassword(password))
				return response.status(422).json({ auth: 'Incorrect combination.' })

			request.logIn(user._id, (err) => {
				if (err) return next(err)
				return response.status(200).json({ auth: 'Login successful!' })
			})
		})(request, response, next)
	}

	register(request, response) {
		User.create(request.body, (error, user) => {
			if (error) return response.status(422).json(error.errors)

			user.first_name = user.first_name.trim().replace(/\b[a-z]/g, (match) => match.toUpperCase())
			user.last_name = user.last_name.trim().replace(/\b[a-z]/g, (match) => match.toUpperCase())
			user.password = hashSync(user.password, 10)

			return response.status(200).json({ message: 'Success!' })
		})
	}

	logout(request, response) {
		request.logout()
		response.redirect('/index')
	}

}

export default new AuthController
