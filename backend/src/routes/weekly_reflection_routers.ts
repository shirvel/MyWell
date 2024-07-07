import express from "express";
const router = express.Router();
import weekly_reflection_controller from '../controllers/weekly_reflection_controller';

router.post("/", weekly_reflection_controller.createfeedback);
export default router;