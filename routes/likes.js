import express from 'express';
const router = express.Router();

import likesController from '../controllers/likes_controller.js';

router.get('/toggle',likesController.toggleLike);

export default router;