import path from 'path'
import passport from 'passport'
import authMiddleware from '../middlewares/auth'
import guestMiddleware from '../middlewares/guest'
import authController from '../controllers/authController'
import userRoutes from '../routes/user'
import messageRoutes from '../routes/message'

export default (app) => {
	/*
	* GUEST
	*/
	app.get('/index', guestMiddleware, (request, response) => (
		response.sendFile(path.resolve(__dirname, '../dist/index.html'))
	))

	app.get('/register', guestMiddleware, (request, response) => (
		response.sendFile(path.resolve(__dirname, '../dist/register.html'))
	))

	app.post('/signin', guestMiddleware, authController.login)
	app.post('/signup', guestMiddleware, authController.register)
	

	/*
	* AUTH
	*/
	app.get(['/home', '/home/contacts/:id'], authMiddleware, (request, response) => (
		response.sendFile(path.resolve(__dirname, '../dist/app.html'))
	))
	
	app.post('/logout', passport.authenticate('jwt', { session: false }), authController.logout)


	/*
	* API
	*/
	app.use('/api/user', passport.authenticate('jwt', { session: false }), userRoutes)
	app.use('/api/messages', passport.authenticate('jwt', { session: false }), messageRoutes)
}