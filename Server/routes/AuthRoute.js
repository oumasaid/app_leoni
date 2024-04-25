// AuthRoute.js

import express from 'express';
import { login, me, logOut, updateUserByAdmin,registerUser ,updateProfile} from '../controllers/Auth.js';
import { adminOnly } from '../middleware/AuthUser.js';
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.post('/login', login);
router.get('/me' ,verifyUser,me);
router.delete('/logout', logOut);
router.put('/users/:userId', adminOnly, updateUserByAdmin);
router.post('/users/register', registerUser);
router.post('/update-account',verifyUser,adminOnly,updateProfile)

export default router;
