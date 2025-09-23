import express from 'express';
import {
    signinController,
    signoutController,
    signupController,
} from '../Controller/auth.controller.js';

const router = express.Router();

// http://localhost:3000/api/auth/<endpoint>
router.post('/signup', signupController);
router.post('/signin', signinController);
router.post('/signout', signoutController);

export default router;
