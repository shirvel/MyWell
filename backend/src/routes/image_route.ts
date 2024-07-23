import express from "express";
import { uploadImage } from "../controllers/image_controller";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
      const ext = file.originalname.split('.')
          .filter(Boolean)
          .slice(1)
          .join('.')
      cb(null, Date.now() + "." + ext)
  }
})
const upload = multer({storage: storage})

router.post("/upload", upload.single('image'), uploadImage);

export default router