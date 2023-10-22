import express from 'express';
const router = express.Router();
console.log('router added successfully');

import homeController from '../controllers/home_controller.js';

router.get('/', homeController);
import users from'./users.js';
router.use('/users', users);
import posts from './posts.js';
router.use('/posts', posts);
import comments from './comments.js';
router.use('/comments',comments);
import likes from './likes.js';
router.use('/likes',likes);
import friendships from './friendships.js';
router.use('/friendships',friendships);

import api from './api/index.js';
router.use('/api', api);

export default router;