import { Router } from 'express';
import messageController from '../controllers/messageController';

const router = Router();

router.post('/', messageController.getConversationMessages);

router.post('/store', messageController.store);

export default router;
