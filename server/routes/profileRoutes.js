import express from 'express';
import { protect, userOnly, ngoOnly } from '../middleware/authMiddleware.js';
import { updateUserProfile, updateNGOProfile } from '../controllers/profileController.js';

const router = express.Router();

// Profile routes with role-specific middleware
router.put('/user', protect, userOnly, updateUserProfile);
router.put('/ngo', protect, ngoOnly, updateNGOProfile);

export default router;