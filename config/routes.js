import path from 'path'
import authMiddleware from '../middlewares/auth'
import guestMiddleware from '../middlewares/guest'
import authController from '../controllers/authController'
import userRoutes from '../routes/user'
import messageRoutes from '../routes/message'

export default (app) => {
	app.get('/index', guestMiddleware, (request, response) => response.sendFile(path.resolve(__dirname, '../dist/index.html')))
	app.get('/register', guestMiddleware, (request, response) => response.sendFile(path.resolve(__dirname, '../dist/register.html')))
	app.post('/signin', guestMiddleware, authController.login)
	app.post('/signup', guestMiddleware, authController.register)
	
	app.get(['/home', '/home/contacts/:id'], authMiddleware, (request, response) => response.sendFile(path.resolve(__dirname, '../dist/app.html')))
	app.get('/logout', authMiddleware, authController.logout)

	app.use('/api/user', userRoutes)
	app.use('/api/messages', messageRoutes)
}