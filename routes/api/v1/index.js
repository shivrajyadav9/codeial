import express from 'express';

const router=express.Router();

import posts from './posts.js';
router.use('/posts', posts);

import users from './users.js';
router.use('/users',users);


export default router;