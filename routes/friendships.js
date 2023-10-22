import express from 'express';
const router = express.Router();

import friendshipsController from '../controllers/friendships_controller.js';

router.get('/toggle',friendshipsController.toggle);

export default router;
