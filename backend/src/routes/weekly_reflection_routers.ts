import express from "express";
const router = express.Router();
import weekly_reflection_controller from '../controllers/weekly_reflection_controller';

router.post("/", weekly_reflection_controller.createfeedback);
router.get("/", weekly_reflection_controller.getAllfeedback); 
export default router;