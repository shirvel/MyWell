import express from "express";
const router = express.Router();
import generateImageController from '../controllers/generate_image_from_ai_controller';
import authMiddleware from '../common/auth_middleware';
import rateLimit from 'express-rate-limit';

// Apply a rate limit of 10 requests per minute per IP
const generateImageLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per `window` (here, per minute)
  message: 'Too many requests from this IP, please try again later.',
});
router.post("/generate-image", authMiddleware,generateImageLimiter, generateImageController.generateImageController);
export default router;