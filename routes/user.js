import { Router } from 'express'
import multer from 'multer'
import userController from '../controllers/userController'

const router = Router()
const upload = multer({ dest: './storage' })

router.get('/', userController.getAuthUser)
router.get('/all', userController.getAll)
router.get('/contact-info', userController.getContactInfo)

router.post('/contacts', userController.getContacts)
router.post('/contacts/add', userController.addToContacts)
router.post('/upload', upload.single('image'), userController.uploadImage)

router.put('/update', userController.update)

router.delete('/upload/delete-image', userController.deleteImage)

export default router