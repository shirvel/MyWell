import { Request, Response } from 'express';
import multer from 'multer';

const base = "http://" + process.env.IP + ":80/";

export const uploadImage = async (req: Request & { file?: multer.File }, res: Response) => {
    try {
        const file = req.file;
        if (!file) {
          return res.status(400).json({ message: 'No file uploaded' });
        }
        // Optionally, process the uploaded file (e.g., save it to database, return URL)
        console.log('File uploaded:', file);
        res.status(200).json({ message: 'File uploaded successfully', imageUrl: base + req.file.path });
      } catch (error) {
        console.error('Error uploading file:', error.message);
        res.status(500).json({ message: 'Server error' });
      }
  };