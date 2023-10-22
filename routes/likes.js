import express from 'express';
const router = express.Router();

import likesController from '../controllers/likes_controller.js';

router.post('/toggle',likesController.toggleLike);

export default router;