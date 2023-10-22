import express from 'express';
const  router = express.Router();
import passport from 'passport';

import commentsController from '../controllers/comments_controller.js';

router.post('/create',passport.checkAuthentication,commentsController.create);
router.get('/destroy/:id',passport.checkAuthentication,commentsController.destroy);

export default router;