import { Router } from 'express'
import multer from 'multer'
import userController from '../controllers/userController'
import trimRequest from '../middlewares/trimRequest'

const router = Router()
const upload = multer({ dest: './storage' })

router.get('/', userController.getAuthUser)
router.get('/all', userController.getAll)
router.get('/contacts', userController.getContacts)
router.get('/requests', userController.getRequests)
router.get('/requests/count', userController.getRequestsCount)

router.post('/contacts/add', userController.addContact)
router.post('/contacts/request', userController.requestChat)
router.post('/contacts/accept', userController.acceptRequest)
router.post('/contacts/remove_request', userController.removeRequest)
router.post('/upload', upload.single('image'), userController.uploadImage)

router.put('/update', trimRequest, userController.update)

router.delete('/upload/delete-image', userController.deleteImage)

export default router