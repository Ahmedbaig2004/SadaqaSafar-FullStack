import express from "express";
import { updateUserProfile, updateNGOProfile } from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/user", protect, updateUserProfile);
router.put("/ngo", protect, updateNGOProfile);

export default router;
