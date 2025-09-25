// routes/sigfox.ts

import { Router } from 'express';
import { handleSigfoxCallback } from '../controllers/sigfoxController';

const router = Router();

// Endpoint para recibir callbacks de Sigfox
router.post('/callback', handleSigfoxCallback);

export default router;