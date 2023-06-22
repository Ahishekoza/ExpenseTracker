import express from 'express';
import { loginUser, registerUser } from '../controller/userController.js';
const router = express.Router()

// --RegisterUser --------------------------------
router.post('/registerUser',registerUser)

// --------Login User
router.post('/login',loginUser)

export default router