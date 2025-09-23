import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';
import { generateApiKey, regenerateApiKey, listApiKeys, deleteApiKey } from '../controllers/apiKeyController';

const router = Router();

// All API key routes require authentication
router.use(protect);

router.post('/', generateApiKey);
router.put('/:id', regenerateApiKey);
router.get('/', listApiKeys);
router.delete('/:id', deleteApiKey);

export default router;
