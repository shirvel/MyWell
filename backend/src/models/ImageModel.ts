import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  prompt: { type: String, required: true, unique: true },
  imageUrl: { type: String }, // Optional if you want to store the original URL
  imageData: { type: Buffer, required: true }, // Store the image as binary data
  contentType: { type: String, required: true }, // Store the MIME type of the image
}, { timestamps: true });

const ImageModel = mongoose.model('Image', ImageSchema);

export default ImageModel;
