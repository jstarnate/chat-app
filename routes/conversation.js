import { Router } from 'express';
import conversationController from '../controllers/conversationController';

const router = Router();

router.get('/seen', conversationController.getSeenStatus);
router.put('/nullify-seener', conversationController.nullifySeener);

export default router;
