import express from 'express';
import passport from 'passport';

const  router=express.Router();

import postsApi from  '../../../controllers/api/v1/posts_api.js';

router.get('/',postsApi.index);

router.delete('/:id',passport.authenticate('jwt',{session:false}),postsApi.destroy);// session false to prevent session cookies generated


export default router;