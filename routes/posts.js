import express from 'express';
const router = express.Router();
import passport from 'passport';

import postsController from '../controllers/posts_controller.js';

router.post('/create',passport.checkAuthentication,postsController.create);
router.get('/destroy/:id',passport.checkAuthentication,postsController.destroy);

export default router;