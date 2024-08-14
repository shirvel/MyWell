import express from "express";
const router = express.Router();
import weekly_reflection_controller from '../controllers/weekly_reflection_controller';
import authMiddleware from '../common/auth_middleware';

router.post("/", authMiddleware, weekly_reflection_controller.createfeedback);
router.get("/", authMiddleware, weekly_reflection_controller.getAllfeedback); 
export default router;