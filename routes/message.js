import { Router } from 'express'
import messageController from '../controllers/messageController'

const router = Router()

router.get('/', messageController.getConversationMessages)

router.post('/store', messageController.store)

export default router