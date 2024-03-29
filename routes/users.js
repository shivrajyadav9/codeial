import express from 'express';
const router = express.Router();
import usersController from '../controllers/users_controller.js';
import passport from 'passport';

router.get('/profile',passport.checkAuthentication, usersController.signIn);
router.get('/profile/:id',passport.checkAuthentication, usersController.profile);
router.post('/update/:id',passport.checkAuthentication, usersController.update);
router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);

router.get('/forgot-password',usersController.forgotPassword);
router.post('/forgot-password-email/',usersController.createForgotPasswordToken);
router.get('/reset-password/:token',usersController.resetPassword);
router.post('/new-password',usersController.newPassword);

router.post('/create', usersController.create);

//use passport ass a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
),usersController.createSession)

router.get('/sign-out',usersController.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usersController.createSession)

export default router;